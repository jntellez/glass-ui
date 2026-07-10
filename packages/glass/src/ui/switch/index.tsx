import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { useFieldControlProps } from "../field/use-field-control-props"

const switchVariants = cva(
  [
    "glass peer inline-flex shrink-0 items-center rounded-full border border-glass-border/80 bg-glass-bg/80 shadow-glass-sm transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/50 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=checked]:border-transparent data-[state=checked]:bg-[var(--accent)]",
  ],
  {
    variants: {
      size: {
        sm: "h-5 w-9 p-0.5",
        md: "h-6 w-11 p-0.5",
        lg: "h-7 w-14 p-0.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

const switchThumbVariants = cva(
  [
    "pointer-events-none block rounded-full border border-white/50 bg-white/90 shadow-[0_4px_18px_rgba(0,0,0,0.24)]",
    "transition-transform duration-200 ease-out will-change-transform",
    "data-[state=unchecked]:translate-x-0",
  ],
  {
    variants: {
      size: {
        sm: "size-4 data-[state=checked]:translate-x-4",
        md: "size-5 data-[state=checked]:translate-x-5",
        lg: "size-6 data-[state=checked]:translate-x-7",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> &
  VariantProps<typeof switchVariants>

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(
  (
    {
      className,
      size,
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      ...props
    },
    ref,
  ) => {
    const fieldControlProps = useFieldControlProps({
      id: props.id,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
    })

    return (
      <SwitchPrimitive.Root
        ref={ref}
        id={fieldControlProps.id}
        aria-label={ariaLabel}
        aria-labelledby={fieldControlProps["aria-labelledby"]}
        aria-describedby={fieldControlProps["aria-describedby"]}
        aria-invalid={fieldControlProps["aria-invalid"]}
        className={cn(switchVariants({ size }), className)}
        {...props}
      >
        <SwitchPrimitive.Thumb className={cn(switchThumbVariants({ size }))} />
      </SwitchPrimitive.Root>
    )
  },
)

Switch.displayName = "Switch"

export { Switch, switchThumbVariants, switchVariants }
