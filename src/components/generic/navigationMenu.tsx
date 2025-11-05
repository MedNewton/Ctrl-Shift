"use client";

import { useState } from "react";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/utils/cn";

type NavigationMenuProps = React.ComponentProps<typeof RadixNavigationMenu.Root>;

export function NavigationMenu({ className, children, ...props }: NavigationMenuProps) {
  return (
    <RadixNavigationMenu.Root
      data-slot="navigation-menu"
      data-viewport={false}
      className={cn("relative flex max-w-max flex-1 items-center justify-center", className)}
      {...props}
    >
      {children}
    </RadixNavigationMenu.Root>
  );
}

type NavigationMenuListProps = React.ComponentProps<typeof RadixNavigationMenu.List>;

export function NavigationMenuList({ className, ...props }: NavigationMenuListProps) {
  return (
    <RadixNavigationMenu.List
      data-slot="navigation-menu-list"
      className={cn(
        // ↓ Less space between items
        "group flex flex-1 list-none items-center justify-center gap-0",
        className
      )}
      {...props}
    />
  );
}

type NavigationMenuItemProps = React.ComponentProps<typeof RadixNavigationMenu.Item>;

export function NavigationMenuItem({ className, ...props }: NavigationMenuItemProps) {
  return (
    <RadixNavigationMenu.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  );
}

type NavigationMenuTriggerProps = React.ComponentProps<typeof RadixNavigationMenu.Trigger>;

export function NavigationMenuTrigger({ className, children, ...props }: NavigationMenuTriggerProps) {
  return (
    <RadixNavigationMenu.Trigger
      data-slot="navigation-menu-trigger"
      {...props}
      className={cn(
        // base (flat)
        "relative group/btn inline-flex items-center justify-center cursor-pointer select-none",
        "h-10 px-3 md:px-4 gap-1 rounded-[999px] text-sm font-medium",
        "text-white/92 border border-transparent",
        "transition-all duration-200 will-change-[background,box-shadow,transform,filter]",
        "overflow-hidden isolate",                // <-- clip effects; own stacking context
        // hover/open/focus → turn on glass
        "hover:bg-[rgba(149,37,39,0.26)]",
        "hover:backdrop-blur-md hover:backdrop-saturate-150 hover:backdrop-contrast-125",
        "hover:border-white/5",
        "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-10px_28px_rgba(149,37,39,0.32),0_10px_34px_-14px_rgba(0,0,0,0.6)]",
        "data-[state=open]:bg-[rgba(149,37,39,0.26)] data-[state=open]:backdrop-blur-md data-[state=open]:border-white/20",
        "data-[state=open]:shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-10px_28px_rgba(149,37,39,0.32),0_10px_34px_-14px_rgba(0,0,0,0.6)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E39A01] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        className
      )}
    >
      {/* TOP sheen */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[999px] opacity-0
                   shadow-[inset_0_16px_28px_-18px_rgba(255,255,255,0.25)]
                   transition-opacity duration-200
                   group-hover/btn:opacity-100
                   data-[state=open]:opacity-100
                   group-focus-visible/btn:opacity-100" />

      {/* Edge rim */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[999px] opacity-0
                   ring-1 ring-inset ring-[rgba(227,154,1,0.08)]
                   transition-opacity duration-200
                   group-hover/btn:opacity-100
                   data-[state=open]:opacity-100
                   group-focus-visible/btn:opacity-100" />

      {/* Specular glare (now clipped by overflow-hidden) */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-1 left-0 h-[140%] w-full rounded-[999px]
                   bg-[radial-gradient(120px_60px_at_50%_0%,rgba(255,255,255,0.35),transparent_60%)]
                   opacity-0 translate-y-1 transition-all duration-300
                   group-hover/btn:opacity-20 group-hover/btn:translate-y-0
                   data-[state=open]:opacity-20 data-[state=open]:translate-y-0
                   group-focus-visible/btn:opacity-20 group-focus-visible/btn:translate-y-0" />

      {/* Noise grain */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[999px] opacity-0
                   [background-image:var(--noise)] [background-size:120px_120px]
                   transition-opacity duration-200
                   group-hover/btn:opacity-[0.08]
                   data-[state=open]:opacity-[0.08]
                   group-focus-visible/btn:opacity-[0.08]" />

      <span className="relative z-[1]">{children}</span>
    </RadixNavigationMenu.Trigger>
  );
}

type NavigationMenuContentProps = React.ComponentProps<typeof RadixNavigationMenu.Content>;

export function NavigationMenuContent({ className, ...props }: NavigationMenuContentProps) {
  return (
    <RadixNavigationMenu.Content
      data-slot="navigation-menu-content"
      className={cn(
        "top-full left-0 p-1 mt-1.5 z-50 w-full overflow-hidden rounded-xl md:absolute md:left-1/2 md:w-auto md:-translate-x-1/2",
        "bg-[#952527]/45 backdrop-blur-2xl backdrop-saturate-125 border border-white/10",
        "motion-safe:data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52",
        "motion-safe:data-[motion=to-end]:slide-out-to-right-52 motion-safe:data-[motion=to-start]:slide-out-to-left-52",
        "motion-safe:data-[state=closed]:zoom-out-95 motion-safe:data-[state=open]:zoom-in-95 motion-safe:data-[motion^=from-]:animate-in motion-safe:data-[motion^=to-]:animate-out",
        "motion-safe:duration-200 motion-safe:data-[state=closed]:animate-out motion-safe:data-[state=open]:animate-in",
        "motion-safe:data-[state=open]:fade-in-0 motion-safe:data-[state=closed]:zoom-out-95 motion-safe:data-[state=open]:zoom-in-95 motion-safe:data-[state=closed]:fade-out-0",
        "**:data-[slot=navigation-menu-link]:focus:outline-none **:data-[slot=navigation-menu-link]:focus:ring-0",
        className
      )}
      {...props}
    />
  );
}

type NavigationMenuContentItemProps = React.ComponentProps<typeof RadixNavigationMenu.Link>;

export function NavigationMenuContentItem({ children, className, ...props }: NavigationMenuContentItemProps) {
    const [isHovered, setIsHovered] = useState(false);
    const isReducedMotion = useReducedMotion();
  
    const interactionProps = !isReducedMotion && {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      onFocus: () => setIsHovered(true),
      onBlur: () => setIsHovered(false),
    };
  
    return (
      <RadixNavigationMenu.Link
        data-slot="navigation-menu-content-item"
        className={cn(
          "relative flex rounded-lg p-1 outline-none",         // <- `flex` so it can stretch
          className                                           // <- now your usage classes win (e.g., `p-0`, `flex-1`)
        )}
        {...props}
        {...interactionProps}
      >
        <div className="relative z-10 flex h-full flex-col gap-0.5">{children}</div>
        {!isReducedMotion && isHovered && (
          <motion.div
            className="absolute inset-0 z-1 rounded-[inherit]"
            layoutId="background"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0 }}
          />
        )}
      </RadixNavigationMenu.Link>
    );
  }

type NavigationMenuLinkProps = React.ComponentProps<typeof RadixNavigationMenu.Link>;

export function NavigationMenuLink({ className, ...props }: NavigationMenuLinkProps) {
  return (
    <RadixNavigationMenu.Link
      data-slot="navigation-menu-link"
      className={cn(
        "flex flex-col items-center justify-center",
        "h-10 w-auto px-3 md:px-4 gap-[3px] rounded-[10px]",
        "bg-transparent text-primary-muted font-medium text-sm",
        "border-b border-transparent outline-none select-none transition-all",
        // ↓ Hover: pill radius 10rem + light background
        "hover:rounded-[10rem] hover:bg-[#F0F0EF]",
        // Keep/remove these as you prefer; they’re no longer needed for the lighter hover look:
        // "hover:border-b-[#575757]",
        // "focus-visible:bg-[#1D1D1D] focus-visible:border-b-[#575757]",
        className
      )}
      {...props}
    />
  );
}
