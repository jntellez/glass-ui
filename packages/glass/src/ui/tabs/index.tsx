import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const tabsListVariants = cva(
  [
    "inline-flex w-fit items-center gap-1 rounded-glass-md border border-glass-border p-1 shadow-glass-sm",
    "data-[orientation=vertical]:w-full data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
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

const tabsTriggerVariants = cva(
  [
    "inline-flex min-w-0 flex-1 items-center justify-center rounded-glass-sm text-sm font-medium leading-5 whitespace-nowrap",
    "text-muted-foreground transition-all duration-200",
    "hover:bg-white/10 hover:text-foreground",
    "focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:bg-white/10 focus-visible:text-foreground",
    "disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    "data-[state=active]:glass data-[state=active]:shadow-glass-sm data-[state=active]:text-foreground",
    "data-[orientation=vertical]:justify-start",
  ],
  {
    variants: {
      size: {
        sm: "h-5 px-2 text-xs leading-4",
        md: "h-6 px-2.5 text-sm leading-5",
        lg: "h-8 px-3.5 text-base leading-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>

type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> &
  VariantProps<typeof tabsTriggerVariants>

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Root ref={ref} className={cn("w-full", className)} {...props} />
))

Tabs.displayName = "Tabs"

const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, TabsListProps>(
  ({ className, variant, ...props }, ref) => (
    <TabsPrimitive.List
      ref={ref}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  ),
)

TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, size, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ size }), className)}
    {...props}
  />
))

TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-3 rounded-glass-md border border-glass-border glass p-4 text-sm leading-6 text-muted-foreground shadow-glass-sm",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/50 focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
))

TabsContent.displayName = "TabsContent"

const tabsVariants = tabsListVariants

export {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  tabsListVariants,
  tabsTriggerVariants,
  tabsVariants,
}
