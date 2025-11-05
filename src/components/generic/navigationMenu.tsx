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
      className={cn(
        "group inline-flex items-center justify-center cursor-pointer",
        "h-10 w-auto px-3 md:px-4 gap-[3px] rounded-[10px]",
        "bg-transparent text-white font-medium text-sm",
        "border-b border-transparent outline-none select-none transition-all",
        // pill hover like Link:
        "hover:rounded-[10rem] hover:bg-[#6e1b1d]",
        // optional: tone down the old dark hover/ focus styles:
        // "hover:border-b-[#575757]",
        // "focus-visible:bg-[#1D1D1D] focus-visible:border-b-[#575757]",
        className
      )}
      {...props}
    >
      {children}
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
        "bg-[#6e1b1d] backdrop-blur-sm",
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
