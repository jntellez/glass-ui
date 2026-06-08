import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { useFieldControlProps } from "../field/use-field-control-props"

const textareaVariants = cva(
  [
    "flex min-h-0 w-full min-w-0 rounded-glass-sm resize-y transition-all duration-200",
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
        transparent: "glass-outline",
      },
      size: {
        sm: "min-h-16 px-2 py-1.5 text-xs leading-4",
        md: "min-h-20 px-2.5 py-2 text-sm leading-5",
        lg: "min-h-24 px-3.5 py-2.5 text-base leading-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
)

type TextareaProps = Omit<React.ComponentPropsWithoutRef<"textarea">, "size"> &
  VariantProps<typeof textareaVariants>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, ...props }, ref) => {
    const fieldControlProps = useFieldControlProps(props)

    return (
      <textarea
        ref={ref}
        className={cn(textareaVariants({ variant, size }), className)}
        {...props}
        {...fieldControlProps}
      />
    )
  },
)

Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }
