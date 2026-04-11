import * as React from "react"
import { cn } from "../../lib/utils"

const NativeOption = React.forwardRef<HTMLOptionElement, React.ComponentProps<"option">>(
  ({ className, ...props }, ref) => {
    return (
      <option
        ref={ref}
        data-slot="native-select-option"
        className={cn("bg-[Canvas] text-[CanvasText]", className)}
        {...props}
      />
    )
  },
)

const NativeGroup = React.forwardRef<HTMLOptGroupElement, React.ComponentProps<"optgroup">>(
  ({ className, ...props }, ref) => {
    return (
      <optgroup
        ref={ref}
        data-slot="native-select-optgroup"
        className={cn("bg-[Canvas] text-[CanvasText]", className)}
        {...props}
      />
    )
  },
)

const NativeSelect = React.forwardRef<HTMLSelectElement, React.ComponentProps<"select">>(
  ({ className, children, ...props }, ref) => {
    const hasCustomSurface =
      typeof className === "string" && (className.includes("glass") || className.includes("bg-"))

    const hasSizeClass =
      typeof className === "string" && /(^|\s)(input-sm|input-md|input-lg)(\s|$)/.test(className)

    return (
      <div className="relative w-full min-w-0">
        <select
          data-slot="native-select"
          ref={ref}
          className={cn(
            "peer flex w-full appearance-none rounded-glass-sm py-0 pr-9 transition-all duration-200",
            "text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
            "disabled:cursor-not-allowed disabled:opacity-50",
            !hasSizeClass && "input-md",
            !hasCustomSurface && [
              "bg-transparent",
              "border border-glass-border",
              "shadow-glass-sm",
            ],
            className,
          )}
          {...props}
        >
          {children}
        </select>

        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 16 16"
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground peer-disabled:opacity-50"
        >
          <path
            d="m4 6 4 4 4-4"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    )
  },
)

NativeOption.displayName = "NativeOption"
NativeGroup.displayName = "NativeGroup"
NativeSelect.displayName = "NativeSelect"

export { NativeGroup, NativeOption, NativeSelect }
