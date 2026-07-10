import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const separatorVariants = cva(
  [
    "shrink-0 rounded-full bg-glass-border/80 transition-colors",
    "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full",
    "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch",
  ],
  {
    variants: {
      inset: {
        false: "",
        true: [
          "data-[orientation=horizontal]:w-[calc(100%-1rem)] data-[orientation=horizontal]:self-center",
          "data-[orientation=vertical]:h-[calc(100%-1rem)] data-[orientation=vertical]:self-center",
        ],
      },
    },
    defaultVariants: {
      inset: false,
    },
  },
)

type SeparatorProps = React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> &
  VariantProps<typeof separatorVariants>

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(({ className, orientation = "horizontal", decorative = false, inset, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(separatorVariants({ inset }), className)}
    {...props}
  />
))

Separator.displayName = "Separator"

export { Separator, separatorVariants }
