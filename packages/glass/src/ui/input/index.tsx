import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { useFieldControlProps } from "../field/use-field-control-props"

const inputVariants = cva(
  [
    "flex w-full min-w-0 rounded-glass-sm transition-all duration-200",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
    "text-foreground placeholder:text-muted-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
    "aria-[invalid=true]:border-destructive/50 aria-[invalid=true]:focus-visible:ring-destructive/50 dark:aria-[invalid=true]:border-destructive/80",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: "glass",
        soft: "glass glass-soft",
        strong: "glass glass-strong",
        transparent: "bg-transparent border border-glass-border",
      },
      size: {
        sm: "h-6 px-2 text-xs leading-4",
        md: "h-8 px-2.5 text-sm leading-5",
        lg: "h-10 px-3.5 text-base leading-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
)

type InputProps = Omit<React.ComponentPropsWithoutRef<"input">, "size"> &
  VariantProps<typeof inputVariants>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, size, ...props }, ref) => {
    const fieldControlProps = useFieldControlProps(props)

    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, size }), className)}
        ref={ref}
        {...props}
        {...fieldControlProps}
      />
    )
  },
)
Input.displayName = "Input"

export { Input, inputVariants }
