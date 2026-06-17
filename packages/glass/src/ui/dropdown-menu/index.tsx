import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const dropdownMenuContentVariants = cva(
  [
    "relative z-50 min-w-[12rem] overflow-hidden rounded-glass-md border border-glass-border p-1 shadow-glass-md outline-none",
    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
    "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  ],
  {
    variants: {
      variant: {
        default: "glass",
        soft: "glass glass-soft",
        strong: "glass glass-strong",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

const dropdownMenuItemVariants = cva([
  "relative flex cursor-default select-none items-center gap-2 rounded-glass-sm px-2 py-1.5 text-sm outline-none transition-colors",
  "text-foreground/90 hover:bg-white/10 focus:bg-white/10 data-[highlighted]:bg-white/10 data-[highlighted]:text-foreground",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0",
])

type DropdownMenuContentProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Content
> &
  VariantProps<typeof dropdownMenuContentVariants>

type DropdownMenuSubContentProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubContent
> &
  VariantProps<typeof dropdownMenuContentVariants>

const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuGroup = DropdownMenuPrimitive.Group
const DropdownMenuPortal = DropdownMenuPrimitive.Portal
const DropdownMenuSub = DropdownMenuPrimitive.Sub
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(
  (
    { className, align = "start", collisionPadding = 8, sideOffset = 8, variant, ...props },
    ref,
  ) => (
    <DropdownMenuPortal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        align={align}
        collisionPadding={collisionPadding}
        sideOffset={sideOffset}
        className={cn(dropdownMenuContentVariants({ variant }), className)}
        {...props}
      />
    </DropdownMenuPortal>
  ),
)

DropdownMenuContent.displayName = "DropdownMenuContent"

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(dropdownMenuItemVariants(), "pr-8", className)}
    {...props}
  >
    {children}
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 16 16"
      className="ml-auto size-3 text-current/70"
    >
      <path
        d="m6 4 4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  </DropdownMenuPrimitive.SubTrigger>
))

DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger"

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  DropdownMenuSubContentProps
>(({ className, collisionPadding = 8, sideOffset = 8, variant, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    collisionPadding={collisionPadding}
    sideOffset={sideOffset}
    className={cn(dropdownMenuContentVariants({ variant }), className)}
    {...props}
  />
))

DropdownMenuSubContent.displayName = "DropdownMenuSubContent"

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(dropdownMenuItemVariants(), className)}
    {...props}
  />
))

DropdownMenuItem.displayName = "DropdownMenuItem"

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    checked={checked}
    className={cn(dropdownMenuItemVariants(), "pl-8", className)}
    {...props}
  >
    <span className="absolute left-2 flex size-4 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
          className="size-3.5"
        >
          <path d="M13 4 6 11 3 8" />
        </svg>
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))

DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem"

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(dropdownMenuItemVariants(), "pl-8", className)}
    {...props}
  >
    <span className="absolute left-2 flex size-4 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <span className="size-2 rounded-full bg-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))

DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem"

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-xs font-medium tracking-[0.08em] text-muted-foreground uppercase",
      className,
    )}
    {...props}
  />
))

DropdownMenuLabel.displayName = "DropdownMenuLabel"

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-glass-border", className)}
    {...props}
  />
))

DropdownMenuSeparator.displayName = "DropdownMenuSeparator"

const DropdownMenuShortcut = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "ml-auto text-[11px] tracking-[0.16em] text-muted-foreground uppercase",
      className,
    )}
    {...props}
  />
))

DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

const dropdownMenuVariants = dropdownMenuContentVariants

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  dropdownMenuContentVariants,
  dropdownMenuItemVariants,
  dropdownMenuVariants,
}
