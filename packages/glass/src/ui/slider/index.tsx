import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { useFieldControlProps } from "../field/use-field-control-props"

const sliderVariants = cva(
  [
    "relative flex w-full touch-none select-none items-center",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-40 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
  ],
  {
    variants: {
      variant: {
        default: "",
        soft: "",
        strong: "",
        transparent: "",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
)

const sliderTrackVariants = cva(
  [
    "relative grow overflow-hidden rounded-full border transition-colors duration-200",
    "data-[orientation=horizontal]:h-full data-[orientation=horizontal]:w-full",
    "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-full",
  ],
  {
    variants: {
      variant: {
        default: "glass border-glass-border/70 bg-glass-bg/70 shadow-glass-sm",
        soft: "glass glass-soft border-glass-border-soft/80 bg-glass-bg-soft/70 shadow-glass-sm",
        strong:
          "glass glass-strong border-glass-border-strong/80 bg-glass-bg-strong/75 shadow-glass-sm",
        transparent: "border-glass-border bg-transparent shadow-none",
      },
      size: {
        sm: "data-[orientation=horizontal]:h-1 data-[orientation=vertical]:w-1",
        md: "data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5",
        lg: "data-[orientation=horizontal]:h-2 data-[orientation=vertical]:w-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
)

const sliderRangeVariants = cva(
  "absolute rounded-full data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
  {
    variants: {
      variant: {
        default: "bg-white/85 dark:bg-white/75",
        soft: "bg-white/80 dark:bg-white/70",
        strong: "bg-white/90 dark:bg-white/80",
        transparent: "bg-foreground/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

const sliderThumbVariants = cva(
  [
    "glass shrink-0 rounded-full border border-white/40 shadow-glass-sm transition-transform duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/50 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "hover:scale-105 active:scale-95",
  ],
  {
    variants: {
      variant: {
        default: "bg-glass-bg/95",
        soft: "glass-soft bg-glass-bg-soft/95",
        strong: "glass-strong bg-glass-bg-strong/95",
        transparent: "bg-glass-bg border-glass-border",
      },
      size: {
        sm: "size-3.5",
        md: "size-4.5",
        lg: "size-5.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
)

type SliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> &
  VariantProps<typeof sliderVariants>

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  (
    {
      className,
      variant,
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

    const thumbAriaLabelledBy = ariaLabel
      ? undefined
      : (ariaLabelledBy ?? fieldControlProps["aria-labelledby"])
    const thumbCount = props.value?.length ?? props.defaultValue?.length ?? 1

    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn(sliderVariants({ variant, size }), className)}
        {...props}
        id={fieldControlProps.id}
      >
        <SliderPrimitive.Track
          className={cn(sliderTrackVariants({ variant, size }))}
          aria-hidden="true"
        >
          <SliderPrimitive.Range className={cn(sliderRangeVariants({ variant }))} />
        </SliderPrimitive.Track>
        {Array.from({ length: thumbCount }).map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            className={cn(sliderThumbVariants({ variant, size }))}
            aria-label={ariaLabel}
            aria-labelledby={thumbAriaLabelledBy}
            aria-describedby={fieldControlProps["aria-describedby"]}
            aria-invalid={fieldControlProps["aria-invalid"]}
          />
        ))}
      </SliderPrimitive.Root>
    )
  },
)

Slider.displayName = "Slider"

export { Slider, sliderRangeVariants, sliderThumbVariants, sliderTrackVariants, sliderVariants }
