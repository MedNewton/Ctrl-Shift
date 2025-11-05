"use client";
import Link from "next/link";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import { cn } from "@/utils/cn";

type Props = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

export function PlainContentItem({ href, className, children }: Props) {
  return (
    <RadixNavigationMenu.Link asChild>
      <Link
        href={href}
        className={cn("block h-full px-1", className)}
      >
        <div className="h-full rounded-lg bg-transparent">
          {children}
        </div>
      </Link>
    </RadixNavigationMenu.Link>
  );
}
