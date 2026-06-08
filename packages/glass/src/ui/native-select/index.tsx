import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { useFieldControlProps } from "../field/use-field-control-props"

const nativeSelectVariants = cva(
  [
    "peer flex w-full min-w-0 rounded-glass-sm transition-all duration-200",
    "text-foreground",
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
      uiSize: {
        sm: "",
        md: "",
        lg: "",
      },
      listbox: {
        false: "appearance-none py-0 pr-9",
        true: "pr-2",
      },
    },
    compoundVariants: [
      {
        listbox: false,
        uiSize: "sm",
        className: "h-6 pl-2 text-xs leading-4",
      },
      {
        listbox: false,
        uiSize: "md",
        className: "h-8 pl-2.5 text-sm leading-5",
      },
      {
        listbox: false,
        uiSize: "lg",
        className: "h-10 pl-3.5 text-base leading-6",
      },
      {
        listbox: true,
        uiSize: "sm",
        className: "min-h-16 px-2 py-1.5 text-xs leading-4",
      },
      {
        listbox: true,
        uiSize: "md",
        className: "min-h-20 px-2.5 py-2 text-sm leading-5",
      },
      {
        listbox: true,
        uiSize: "lg",
        className: "min-h-24 px-3.5 py-2.5 text-base leading-6",
      },
    ],
    defaultVariants: {
      variant: "default",
      uiSize: "md",
      listbox: false,
    },
  },
)

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

type NativeSelectProps = React.ComponentPropsWithoutRef<"select"> &
  VariantProps<typeof nativeSelectVariants>

const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, children, multiple, size, uiSize, variant, ...props }, ref) => {
    const isListbox = multiple || (typeof size === "number" && size > 1)
    const fieldControlProps = useFieldControlProps(props)

    return (
      <div className="relative w-full min-w-0">
        <select
          data-slot="native-select"
          ref={ref}
          className={cn(nativeSelectVariants({ listbox: isListbox, uiSize, variant }), className)}
          multiple={multiple}
          size={size}
          {...props}
          {...fieldControlProps}
        >
          {children}
        </select>

        {!isListbox ? (
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
        ) : null}
      </div>
    )
  },
)

NativeOption.displayName = "NativeOption"
NativeGroup.displayName = "NativeGroup"
NativeSelect.displayName = "NativeSelect"

export { NativeGroup, NativeOption, NativeSelect, nativeSelectVariants }
