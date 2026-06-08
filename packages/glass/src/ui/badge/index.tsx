import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  [
    "inline-flex h-fit items-center whitespace-nowrap rounded-full font-normal transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/50 focus-visible:ring-offset-2",
  ],
  {
    variants: {
      variant: {
        default: "glass",
        soft: "glass glass-soft",
        strong: "glass glass-strong",
        transparent: "bg-transparent border border-glass-border shadow-none",
      },
      size: {
        sm: "gap-1 px-2 py-0.5 text-[11px] leading-4 [&_svg]:size-3",
        md: "gap-1 px-2.5 py-0.5 text-xs leading-4 [&_svg]:size-3",
        lg: "gap-1.5 px-3 py-1 text-sm leading-5 [&_svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
)

type BadgeProps = React.ComponentPropsWithoutRef<"span"> & VariantProps<typeof badgeVariants>

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return <span ref={ref} className={cn(badgeVariants({ variant, size }), className)} {...props} />
  },
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
