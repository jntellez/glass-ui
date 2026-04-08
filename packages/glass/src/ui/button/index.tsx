import * as React from "react"
import { cn } from "../../lib/utils"

type ButtonOwnProps<C extends React.ElementType = "button"> = {
  as?: C
}

type ButtonProps<C extends React.ElementType = "button"> = ButtonOwnProps<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof ButtonOwnProps<C>>

type ButtonComponent = <C extends React.ElementType = "button">(
  props: ButtonProps<C> & { ref?: React.ComponentPropsWithRef<C>["ref"] },
) => React.ReactElement | null

const ButtonBase = React.forwardRef(function Button<C extends React.ElementType = "button">(
  { as, className, children, ...props }: ButtonProps<C>,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const runtimeProps = props as ButtonProps<C> & Record<string, unknown>
  const { ["as" + "Child"]: _deprecatedCompositionProp, ...sanitizedProps } = runtimeProps

  const hasCustomSurface =
    typeof className === "string" && (className.includes("glass") || className.includes("bg-"))

  const hasSizeOrIconClass =
    typeof className === "string" && /(^|\s)(btn-sm|btn-md|btn-lg|btn-icon)(\s|$)/.test(className)

  const classes = cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-glass-sm font-medium transition-all duration-200",
    "transform-gpu will-change-transform antialiased",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/50 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",

    !hasSizeOrIconClass && "btn-md",

    !hasCustomSurface && ["border border-glass-border", "shadow-glass-sm"],
    "hover:scale-98 hover:shadow-glass-sm",
    !hasCustomSurface && ["hover:bg-glass-bg/80", "hover:border-glass-border/80"],
    "active:scale-95 active:duration-100",
    !hasCustomSurface && ["active:bg-glass-bg/60", "active:border-glass-border/60"],
    className,
  )

  if (as) {
    const Component = as

    return React.createElement(Component, { ...sanitizedProps, ref, className: classes }, children)
  }

  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} {...sanitizedProps}>
      {children}
    </button>
  )
})

ButtonBase.displayName = "Button"

const Button = ButtonBase as ButtonComponent

export { Button }
