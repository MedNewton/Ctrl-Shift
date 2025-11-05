// types/lottie.ts
export type Vec2 = [number, number];

export interface LottieTransform {
  p?: { k?: unknown }; // position: can be Vec2, or { k: Vec2 } in some exports
}

export interface LottieLayer {
  nm?: string;              // layer name
  ks?: LottieTransform;     // transform
  // keep the rest open so we don't over-constrain:
  [key: string]: unknown;
}

export interface LottieMeta {
  lottielabInfoHTML?: unknown;
  [key: string]: unknown;
}

export interface LottieJSON {
  w?: number;               // comp width
  h?: number;               // comp height
  layers?: LottieLayer[];
  metadata?: LottieMeta;
  [key: string]: unknown;
}

// -------- Type guards (no `any` used) --------
function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
}

function isVec2(x: unknown): x is Vec2 {
  return Array.isArray(x) && x.length >= 2 && typeof x[0] === "number" && typeof x[1] === "number";
}

/** Some exports wrap position as { k: [x, y] } */
function extractPosition(ly: LottieLayer): Vec2 | null {
  const pk = ly.ks?.p?.k;
  if (isVec2(pk)) return pk;

  if (isRecord(pk) && "k" in pk) {
    const v = pk.k;
    if (isVec2(v)) return v;
  }
  return null;
}

/** Immutably clone & strip watermark bits (no `any`). */
export function stripLottieWatermark(input: LottieJSON): LottieJSON {
  // deep clone without `any`
  const cloned: LottieJSON = JSON.parse(JSON.stringify(input)) as LottieJSON;

  // 1) Remove LottieLab info overlay
  if (cloned.metadata && "lottielabInfoHTML" in cloned.metadata) {
    const meta = { ...cloned.metadata };
    delete meta.lottielabInfoHTML;
    cloned.metadata = meta;
  }

  // 2) Heuristically remove a bottom-right watermark layer
  if (Array.isArray(cloned.layers) && typeof cloned.w === "number" && typeof cloned.h === "number") {
    const w = cloned.w;
    const h = cloned.h;

    cloned.layers = cloned.layers.filter((ly) => {
      const name = typeof ly.nm === "string" ? ly.nm : "";
      const p = extractPosition(ly);
      const isBottomRight = p ? p[0] > w * 0.6 && p[1] > h * 0.6 : false;
      const looksLikeWatermark = /group layer/i.test(name) && isBottomRight;
      return !looksLikeWatermark;
    });
  }

  return cloned;
}
