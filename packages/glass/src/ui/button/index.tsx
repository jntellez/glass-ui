import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap rounded-glass-sm font-medium",
    "transition-all duration-200 transform-gpu will-change-transform antialiased",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/50 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    "hover:scale-98 active:scale-95 active:duration-100",
  ],
  {
    variants: {
      variant: {
        default: [
          "glass",
          "hover:bg-glass-bg/80 hover:border-glass-border/80 hover:shadow-glass-sm",
          "active:bg-glass-bg/60 active:border-glass-border/60",
        ],
        soft: [
          "glass glass-soft",
          "hover:bg-glass-bg/80 hover:border-glass-border/80 hover:shadow-glass-sm",
          "active:bg-glass-bg/60 active:border-glass-border/60",
        ],
        strong: [
          "glass glass-strong",
          "hover:bg-glass-bg/80 hover:border-glass-border/80 hover:shadow-glass-sm",
          "active:bg-glass-bg/60 active:border-glass-border/60",
        ],
        transparent: [
          "glass-outline",
          "hover:bg-glass-bg-soft/60 hover:border-glass-border-soft/80",
          "active:bg-glass-bg-soft/40 active:border-glass-border-soft/60",
        ],
        ghost: [
          "border border-transparent bg-transparent shadow-none",
          "hover:bg-glass-bg-soft/60 hover:border-glass-border-soft/80",
          "active:bg-glass-bg-soft/40 active:border-glass-border-soft/60",
        ],
      },
      size: {
        sm: "h-6 gap-1.5 px-2 text-xs leading-4 [&_svg]:size-3",
        md: "h-8 gap-2 px-2.5 text-sm leading-5 [&_svg]:size-4",
        lg: "h-10 gap-2.5 px-3.5 text-base leading-6 [&_svg]:size-5",
        "icon-sm": "size-6 shrink-0 p-0 [&_svg]:size-3",
        icon: "size-8 shrink-0 p-0 [&_svg]:size-4",
        "icon-lg": "size-10 shrink-0 p-0 [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
)

type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

const Button = React.forwardRef<HTMLElement, ButtonProps>(
  ({ className, variant, size, asChild = false, disabled, onClick, tabIndex, ...props }, ref) => {
    const Comp = (asChild ? Slot : "button") as React.ElementType

    const handleClick: React.MouseEventHandler<HTMLElement> = (event) => {
      if (disabled && asChild) {
        event.preventDefault()
        event.stopPropagation()
        return
      }

      onClick?.(event as never)
    }

    return (
      <Comp
        {...props}
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref as React.Ref<HTMLElement>}
        disabled={asChild ? undefined : disabled}
        aria-disabled={asChild && disabled ? true : undefined}
        data-disabled={disabled ? "" : undefined}
        tabIndex={asChild && disabled ? -1 : tabIndex}
        onClick={handleClick}
      />
    )
  },
)

Button.displayName = "Button"

export { Button, buttonVariants }
