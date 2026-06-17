import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const collapsibleVariants = cva(
  [
    "flex w-full flex-col items-start gap-2 transition-colors duration-200",
    "data-[disabled]:opacity-60",
  ],
  {
    variants: {
      variant: {
        default: "[&>[data-slot=collapsible-trigger]]:glass",
        soft: "[&>[data-slot=collapsible-trigger]]:glass [&>[data-slot=collapsible-trigger]]:glass-soft",
        strong:
          "[&>[data-slot=collapsible-trigger]]:glass [&>[data-slot=collapsible-trigger]]:glass-strong",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

const collapsibleTriggerVariants = cva(
  [
    "group inline-flex max-w-full items-center justify-between whitespace-nowrap text-left font-medium",
    "rounded-glass-sm transition-all duration-200 transform-gpu will-change-transform antialiased",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/50 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "hover:scale-98 active:scale-95 active:duration-100",
    "text-foreground/88 hover:text-foreground data-[state=open]:text-foreground",
  ],
  {
    variants: {
      size: {
        sm: "h-6 gap-1.5 px-2 text-xs leading-4 [&_[data-slot=collapsible-chevron]]:size-3",
        md: "h-8 gap-2 px-2.5 text-sm leading-5 [&_[data-slot=collapsible-chevron]]:size-4",
        lg: "h-10 gap-2.5 px-3.5 text-base leading-6 [&_[data-slot=collapsible-chevron]]:size-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

type CollapsibleProps = React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root> &
  VariantProps<typeof collapsibleVariants>

type CollapsibleTriggerProps = Omit<
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>,
  "asChild"
> &
  VariantProps<typeof collapsibleTriggerVariants> & {
    asChild?: never
  }

const Collapsible = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Root>,
  CollapsibleProps
>(({ className, variant, ...props }, ref) => (
  <CollapsiblePrimitive.Root
    ref={ref}
    data-variant={variant ?? "default"}
    className={cn(collapsibleVariants({ variant }), className)}
    {...props}
  />
))

Collapsible.displayName = "Collapsible"

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
  CollapsibleTriggerProps
>(({ className, children, size, asChild: _asChild, ...props }, ref) => (
  <CollapsiblePrimitive.Trigger
    ref={ref}
    data-slot="collapsible-trigger"
    className={cn(collapsibleTriggerVariants({ size }), className)}
    {...props}
  >
    <span className="min-w-0 flex-1 truncate">{children}</span>
    <svg
      data-slot="collapsible-chevron"
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 16 16"
      className="shrink-0 text-current/70 transition-transform duration-200 group-data-[state=open]:rotate-180"
    >
      <path
        d="m4 6 4 4 4-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  </CollapsiblePrimitive.Trigger>
))

CollapsibleTrigger.displayName = "CollapsibleTrigger"

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.Content
    ref={ref}
    className={cn(
      "grid w-full text-sm transition-[grid-template-rows,opacity] duration-200 ease-out",
      "data-[state=closed]:grid-rows-[0fr] data-[state=closed]:opacity-0",
      "data-[state=open]:grid-rows-[1fr] data-[state=open]:opacity-100",
      className,
    )}
    {...props}
  >
    <div className="overflow-hidden">
      <div className="pl-1 pt-1 text-muted-foreground">{children}</div>
    </div>
  </CollapsiblePrimitive.Content>
))

CollapsibleContent.displayName = "CollapsibleContent"

export { Collapsible, CollapsibleContent, CollapsibleTrigger, collapsibleVariants }
