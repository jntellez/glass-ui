import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const tooltipContentVariants = cva(
  [
    "glass z-50 max-w-xs rounded-glass-sm border border-glass-border px-3 py-1.5 text-xs leading-5 text-foreground shadow-glass-md outline-none",
    "data-[state=closed]:animate-out data-[state=instant-open]:animate-in data-[state=delayed-open]:animate-in",
    "data-[state=closed]:fade-out-0 data-[state=instant-open]:fade-in-0 data-[state=delayed-open]:fade-in-0",
    "data-[state=closed]:zoom-out-95 data-[state=instant-open]:zoom-in-95 data-[state=delayed-open]:zoom-in-95",
    "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
    "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  ],
  {
    variants: {},
  },
)

type TooltipContentProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>

const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger
const TooltipPortal = TooltipPrimitive.Portal

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, align = "center", collisionPadding = 8, sideOffset = 10, ...props }, ref) => (
  <TooltipPortal>
    <TooltipPrimitive.Content
      ref={ref}
      align={align}
      collisionPadding={collisionPadding}
      sideOffset={sideOffset}
      className={cn(tooltipContentVariants(), className)}
      {...props}
    />
  </TooltipPortal>
))

TooltipContent.displayName = "TooltipContent"

const TooltipArrow = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <TooltipPrimitive.Arrow
    ref={ref}
    className={cn("fill-white/16 dark:fill-white/12", className)}
    {...props}
  />
))

TooltipArrow.displayName = "TooltipArrow"

export {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
  tooltipContentVariants,
}
