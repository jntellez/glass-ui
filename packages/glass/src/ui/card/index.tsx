import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const cardVariants = cva("rounded-glass-sm text-foreground", {
  variants: {
    variant: {
      default: "glass",
      soft: "glass glass-soft",
      strong: "glass glass-strong",
    },
    padding: {
      none: "p-0",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
  },
})

type CardProps = React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof cardVariants> & {
    asChild?: boolean
  }

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, asChild = false, ...props }, ref) => {
    if (asChild) {
      return <Slot className={cn(cardVariants({ variant, padding }), className)} {...props} />
    }

    return (
      <div ref={ref} className={cn(cardVariants({ variant, padding }), className)} {...props} />
    )
  },
)

Card.displayName = "Card"

export { Card, cardVariants }
