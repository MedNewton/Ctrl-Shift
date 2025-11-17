"use client";

import { useEffect, useRef } from "react";
import { Stack, Typography } from "@mui/material";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { HiOutlineArrowRight } from "react-icons/hi";
import { motion, useReducedMotion } from "motion/react";
import theme from "@/theme/theme";
import BlackButton from "@/components/ui/blackButton";

type Props = {
    ornamentSrc?: string;        // e.g. "/ornament-hero.png"
    bg?: string;                 // overlay/red background color
    /** Base follow brush radius (device px) */
    brushRadius?: number;
    /** Mask fade-out speed per frame (0..1) */
    fade?: number;
    /** Brush opacity strength (0..1) inside blob */
    strength?: number;
    /** Ornament opacity when revealed (0..1) */
    revealOpacity?: number;

    // Behaviour
    idleSpeedPxPerSec?: number;  // faster idle wander
    followLerp?: number;         // 0..1, chase stiffness
    minSeparationPx?: number;    // keep idle spots far apart

    // Sizes
    brushRadiusFollow?: number;  // default = brushRadius
    brushRadiusIdle?: number;    // default = brushRadius * 1.25
};

type Spot = { x: number; y: number; vx: number; vy: number };

export default function MobileVisions({
    ornamentSrc = "/ornament-hero.png",
    bg = "#952527",
    brushRadius = 140,
    fade = 0.06,
    strength = 0.6,
    revealOpacity = 0.55,
    idleSpeedPxPerSec = 140,
    followLerp = 0.25,
    minSeparationPx = 260,
    brushRadiusFollow,
    brushRadiusIdle,
}: Props) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const isReduced = useReducedMotion();

    const tImage = 0.10, tNews = tImage + 0.15, tTitles = tImage + 0.3, tCta = tTitles + 0.45;

    useEffect(() => {
        const canvas = canvasRef.current!;
        const section = sectionRef.current!;
        const ctx = canvas.getContext("2d", { alpha: true })!;
        const mask = document.createElement("canvas");
        const mctx = mask.getContext("2d", { alpha: true })!;

        let w = 0, h = 0, raf = 0;
        let lastTime = performance.now();

        // pointer state
        let mouseX = -9999, mouseY = -9999, pointerInside = false, following = false;

        // two spots
        const spots: Spot[] = [
            { x: 0, y: 0, vx: 0, vy: 0 },
            { x: 0, y: 0, vx: 0, vy: 0 },
        ];

        // leader when following (single spot)
        let leadX = 0, leadY = 0;

        // radii
        const rFollow = Math.max(1, (brushRadiusFollow ?? brushRadius));
        const rIdle = Math.max(1, (brushRadiusIdle ?? Math.round(brushRadius * 1.25)));
        let currRadius = rFollow; // eased for smooth transitions

        // watercolor brushes (offscreen)
        let brushIdle = createBlobBrush(rIdle, strength);
        let brushFollow = createBlobBrush(rFollow, strength);

        // ornament
        let ornament: HTMLImageElement | null = null;
        let ornamentReady = false;

        // --- watercolor blob brush factory ---
        function createBlobBrush(radius: number, softness = 0.9) {
            const size = Math.ceil(radius * 2.4);
            const half = size / 2;
            const c = document.createElement("canvas");
            c.width = size; c.height = size;
            const g = c.getContext("2d", { alpha: true })!;

            g.clearRect(0, 0, size, size);

            // 1) many soft “splats” with jitter
            const splats = Math.round(28 + radius * 0.08);
            for (let i = 0; i < splats; i++) {
                const ang = Math.random() * Math.PI * 2;
                const dist = (Math.random() ** 0.7) * radius * 0.75;
                const cx = half + Math.cos(ang) * dist;
                const cy = half + Math.sin(ang) * dist;

                const r = radius * (0.25 + Math.random() * 0.45);
                const a = 0.12 + Math.random() * 0.18;

                const rad = g.createRadialGradient(cx, cy, 0, cx, cy, r);
                rad.addColorStop(0.0, `rgba(255,255,255,${a})`);
                rad.addColorStop(0.6, `rgba(255,255,255,${a * 0.6})`);
                rad.addColorStop(1.0, `rgba(255,255,255,0)`);
                g.globalCompositeOperation = "lighter";
                g.fillStyle = rad;
                g.beginPath();
                g.arc(cx, cy, r, 0, Math.PI * 2);
                g.fill();
            }

            // 2) envelope to unify the silhouette
            const env = g.createRadialGradient(half, half, radius * 0.2, half, half, radius * 1.05);
            env.addColorStop(0.0, `rgba(255,255,255,${0.55 * (typeof softness === "number" ? softness : 0.9)})`);
            env.addColorStop(1.0, `rgba(255,255,255,0)`);
            g.globalCompositeOperation = "lighter";
            g.fillStyle = env;
            g.beginPath();
            g.arc(half, half, radius * 1.05, 0, Math.PI * 2);
            g.fill();

            // 3) tiny holes for watercolor edge breakup
            g.globalCompositeOperation = "destination-out";
            const holes = Math.round(10 + radius * 0.06);
            for (let i = 0; i < holes; i++) {
                const ang = Math.random() * Math.PI * 2;
                const dist = radius * (0.65 + Math.random() * 0.5);
                const cx = half + Math.cos(ang) * dist;
                const cy = half + Math.sin(ang) * dist;
                const r = radius * (0.05 + Math.random() * 0.08);
                const hgrad = g.createRadialGradient(cx, cy, 0, cx, cy, r);
                hgrad.addColorStop(0.0, `rgba(0,0,0,0.06)`);
                hgrad.addColorStop(1.0, `rgba(0,0,0,0)`);
                g.fillStyle = hgrad;
                g.beginPath();
                g.arc(cx, cy, r, 0, Math.PI * 2);
                g.fill();
            }

            // 4) unify with a light blur
            g.filter = "blur(6px)";
            g.globalCompositeOperation = "source-over";
            g.drawImage(c, 0, 0);

            return { canvas: c, baseRadius: radius };
        }

        // stamp brush at (x,y) with scale = radius/baseRadius
        function stampBlob(
            targetCtx: CanvasRenderingContext2D,
            brush: { canvas: HTMLCanvasElement; baseRadius: number },
            x: number, y: number,
            radius: number
        ) {
            const img = brush.canvas;
            const br = brush.baseRadius;
            const scale = Math.max(0.01, radius / br);
            const wImg = img.width * scale;
            const hImg = img.height * scale;
            targetCtx.save();
            targetCtx.globalCompositeOperation = "lighter";
            targetCtx.drawImage(img, x - wImg / 2, y - hImg / 2, wImg, hImg);
            targetCtx.restore();
        }

        // utils
        const randVel = (speed: number) => {
            const a = Math.random() * Math.PI * 2;
            return { vx: Math.cos(a) * speed, vy: Math.sin(a) * speed };
        };

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const rect = canvas.getBoundingClientRect();
            w = Math.max(1, Math.floor(rect.width * dpr));
            h = Math.max(1, Math.floor(rect.height * dpr));
            canvas.width = w; canvas.height = h;
            mask.width = w; mask.height = h;
            ctx.setTransform(1, 0, 0, 1, 0, 0);

            // place far apart
            const speed = idleSpeedPxPerSec * dpr;
            spots[0].x = w * 0.25; spots[0].y = h * 0.35; Object.assign(spots[0], randVel(speed));
            spots[1].x = w * 0.75; spots[1].y = h * 0.65; Object.assign(spots[1], randVel(speed));

            leadX = (spots[0].x + spots[1].x) * 0.5;
            leadY = (spots[0].y + spots[1].y) * 0.5;

            // rebuild watercolor brushes in case DPR/size changed
            brushIdle = createBlobBrush(rIdle, strength);
            brushFollow = createBlobBrush(rFollow, strength);
        };

        // window-level pointer (text overlay won't block)
        const onMove = (e: PointerEvent) => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const rect = section.getBoundingClientRect();
            const inside =
                e.clientX >= rect.left && e.clientX <= rect.right &&
                e.clientY >= rect.top && e.clientY <= rect.bottom;

            pointerInside = inside;
            if (!inside) { following = false; return; }

            mouseX = (e.clientX - rect.left) * dpr;
            mouseY = (e.clientY - rect.top) * dpr;
            following = true;
        };
        const onLeaveViewport = () => { pointerInside = false; following = false; };

        const enforceSeparation = (desired: number) => {
            const dx = spots[1].x - spots[0].x;
            const dy = spots[1].y - spots[0].y;
            const dist = Math.hypot(dx, dy);
            if (dist < desired && dist > 0.0001) {
                const overlap = (desired - dist) * 0.5;
                const nx = dx / dist, ny = dy / dist;
                spots[0].x -= nx * overlap;
                spots[0].y -= ny * overlap;
                spots[1].x += nx * overlap;
                spots[1].y += ny * overlap;
            }
        };

        const updateIdle = (dt: number) => {
            const margin = rIdle * 1.2; // idle brush is bigger
            for (const s of spots) {
                s.x += s.vx * dt;
                s.y += s.vy * dt;

                if (s.x < margin) { s.x = margin; s.vx = Math.abs(s.vx); }
                if (s.x > w - margin) { s.x = w - margin; s.vx = -Math.abs(s.vx); }
                if (s.y < margin) { s.y = margin; s.vy = Math.abs(s.vy); }
                if (s.y > h - margin) { s.y = h - margin; s.vy = -Math.abs(s.vy); }

                // gentle randomness
                if (Math.random() < 0.01) {
                    const speed = Math.hypot(s.vx, s.vy) || idleSpeedPxPerSec;
                    const tweak = (Math.random() - 0.5) * 0.8;
                    const ang = Math.atan2(s.vy, s.vx) + tweak;
                    s.vx = Math.cos(ang) * speed;
                    s.vy = Math.sin(ang) * speed;
                }
            }
            enforceSeparation(minSeparationPx);
        };

        const splitFromCursor = () => {
            // split apart when leaving follow
            const speed = Math.hypot(spots[0].vx, spots[0].vy) || idleSpeedPxPerSec;
            const baseAng = Math.random() * Math.PI * 2;
            const sep = Math.max(minSeparationPx * 0.6, rIdle * 0.8);

            spots[0].x = leadX - Math.cos(baseAng) * sep * 0.5;
            spots[0].y = leadY - Math.sin(baseAng) * sep * 0.5;
            spots[1].x = leadX + Math.cos(baseAng) * sep * 0.5;
            spots[1].y = leadY + Math.sin(baseAng) * sep * 0.5;

            spots[0].vx = Math.cos(baseAng) * speed;
            spots[0].vy = Math.sin(baseAng) * speed;
            spots[1].vx = -spots[0].vx;
            spots[1].vy = -spots[0].vy;
        };

        const tick = () => {
            const now = performance.now();
            const dt = Math.max(0.001, (now - lastTime) / 1000);
            lastTime = now;

            // fade mask (revealed areas close back to red)
            mctx.save();
            mctx.globalCompositeOperation = "destination-out";
            mctx.fillStyle = `rgba(0,0,0,${fade})`;
            mctx.fillRect(0, 0, w, h);
            mctx.restore();

            // ease brush size between modes
            const targetRadius = (following && pointerInside) ? rFollow : rIdle;
            currRadius += (targetRadius - currRadius) * 0.2;

            if (following && pointerInside) {
                // single spot follows cursor
                leadX += (mouseX - leadX) * followLerp;
                leadY += (mouseY - leadY) * followLerp;

                // stamp FOLLOW blob
                stampBlob(mctx, brushFollow, leadX, leadY, currRadius);

                // co-locate both logical spots at leader for continuity
                spots[0].x = leadX; spots[0].y = leadY;
                spots[1].x = leadX; spots[1].y = leadY;
            } else {
                if (!pointerInside && following) splitFromCursor();
                following = false;

                // wander independently; stamp IDLE blobs (bigger)
                updateIdle(dt);
                stampBlob(mctx, brushIdle, spots[0].x, spots[0].y, currRadius);
                stampBlob(mctx, brushIdle, spots[1].x, spots[1].y, currRadius);

                // keep leader near midpoint for smooth re-entry
                leadX = (spots[0].x + spots[1].x) * 0.5;
                leadY = (spots[0].y + spots[1].y) * 0.5;
            }

            // === composite: ornament masked, red behind ===
            ctx.clearRect(0, 0, w, h);

            if (ornamentReady && ornament) {
                const ow = ornament.naturalWidth;
                const oh = ornament.naturalHeight;
                const scale = Math.max(w / ow, h / oh);
                const dw = ow * scale;
                const dh = oh * scale;
                const dx = (w - dw) / 2;
                const dy = (h - dh) / 2;

                ctx.save();
                ctx.globalAlpha = Math.max(0, Math.min(1, revealOpacity));
                ctx.drawImage(ornament, dx, dy, dw, dh);

                ctx.globalCompositeOperation = "destination-in";
                ctx.drawImage(mask, 0, 0);
                ctx.restore();
            }

            // red background behind whatever remains
            ctx.save();
            ctx.globalCompositeOperation = "destination-over";
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);

            // Add color stops (0 = start, 1 = end)
            gradient.addColorStop(0, '#942629');    // 0% - top color
            gradient.addColorStop(1, '#2E0C0D');    // 100% - bottom color

            // Use the gradient as fillStyle
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, w, h);
            ctx.restore();

            ctx.globalCompositeOperation = "source-over";
            raf = requestAnimationFrame(tick);
        };

        // init
        const img = new Image();
        img.src = ornamentSrc;
        ornament = img;
        void img.decode().then(() => (ornamentReady = true));

        resize();
        window.addEventListener("resize", resize, { passive: true });
        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerdown", onMove, { passive: true });
        window.addEventListener("pointerleave", onLeaveViewport, { passive: true });

        raf = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerdown", onMove);
            window.removeEventListener("pointerleave", onLeaveViewport);
        };
    }, [
        ornamentSrc, bg, brushRadius, fade, strength, revealOpacity,
        idleSpeedPxPerSec, followLerp, minSeparationPx, brushRadiusFollow, brushRadiusIdle
    ]);

    return (
        <Stack
            ref={sectionRef}
            sx={{
                backgroundColor: "transparent",
                position: "relative",
                width: "100%",
                height: "100%",
                minHeight: { xs: "55vh", md: "60vh" },
                overflow: "hidden",
                borderRadius: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
                mx: "auto",
                mb: 4,
            }}
        >
            {/* effect layer */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

            {/* content (clickable text/CTA stays above) */}
            <div className="relative z-10 h-full" />

            <Stack width="fit-content" gap={4} alignItems="center" sx={{ position: "relative", zIndex: 2 }}>

                {/* titles */}
                <Stack alignItems="center" gap={1}>
                    <motion.div
                        initial={isReduced ? { opacity: 0 } : { y: 18, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: tTitles, duration: isReduced ? 0.25 : 0.5, ease: "easeOut" }}
                        style={{ position: "relative", zIndex: 2 }}
                    >
                        <Stack alignItems="center" justifyContent="center" gap={0.5} width="fit-content">
                            <Typography variant="subtitle1" fontWeight={500} color={theme.palette.text.secondary} textAlign="center">
                                Art Exhibition
                            </Typography>
                            <Typography variant="h4" fontWeight={600} color={theme.palette.text.primary} textAlign="center">
                                Visions 2026
                            </Typography>
                        </Stack>
                    </motion.div>

                    <motion.div
                        initial={isReduced ? { opacity: 0 } : { y: 18, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: tTitles + 0.2, duration: isReduced ? 0.25 : 0.5, ease: "easeOut" }}
                        style={{ position: "relative", zIndex: 2 }}
                    >
                        <Stack direction="row" alignItems="center" justifyContent="center" gap={0.5} width="fit-content">
                            <Typography variant="subtitle1" fontWeight={500} color={theme.palette.text.primary} textAlign="center" sx={{ width: "90%" }}>
                            Visions 2026 explores the evolving dialogue between value, meaning, and creation.
                            <br />Through themes of hybridization, concrescence, and crystallization, the exhibition reveals how the “dematerialization” of value reshapes artistic expression.
                            <br />Aesthetic, economic, and symbolic dimensions merge and transform, guided by a network of interconnected actors.
                            </Typography>
                        </Stack>
                    </motion.div>
                </Stack>
            </Stack>
        </Stack>
    );
}
