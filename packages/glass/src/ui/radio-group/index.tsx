import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { useFieldControlProps } from "../field/use-field-control-props"

const radioGroupVariants = cva("grid gap-2", {
  variants: {
    orientation: {
      vertical: "",
      horizontal: "flex flex-wrap items-center gap-3",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
})

const radioGroupItemVariants = cva(
  [
    "glass peer inline-flex shrink-0 items-center justify-center rounded-full border border-glass-border/80 bg-glass-bg/80 shadow-glass-sm transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/50 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
    "data-[state=checked]:border-transparent data-[state=checked]:bg-[var(--accent)]",
  ],
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

const radioGroupIndicatorVariants = cva(
  "rounded-full bg-white/95 shadow-[0_0_0_1px_rgba(255,255,255,0.24)]",
  {
    variants: {
      size: {
        sm: "size-1.5",
        md: "size-2",
        lg: "size-2.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

type RadioGroupProps = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> &
  VariantProps<typeof radioGroupVariants>

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, orientation, ...props }, ref) => {
  const fieldControlProps = useFieldControlProps(props)

  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      orientation={orientation}
      className={cn(radioGroupVariants({ orientation }), className)}
      {...props}
      {...fieldControlProps}
    />
  )
})

RadioGroup.displayName = "RadioGroup"

type RadioGroupItemProps = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> &
  VariantProps<typeof radioGroupItemVariants>

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, size, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(radioGroupItemVariants({ size }), className)}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <span className={cn(radioGroupIndicatorVariants({ size }))} />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
))

RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem, radioGroupItemVariants, radioGroupVariants }
