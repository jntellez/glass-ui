import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const accordionItemVariants = cva(
  [
    "rounded-glass-sm border border-glass-border",
    "overflow-hidden transition-colors duration-200",
    "data-[state=open]:border-glass-border-strong",
    "data-[disabled]:opacity-60",
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

type AccordionItemProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> &
  VariantProps<typeof accordionItemVariants>

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, variant, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(accordionItemVariants({ variant }), className)}
    {...props}
  />
))

AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Trigger
    ref={ref}
    className={cn(
      "group flex flex-1 items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium transition-all",
      "hover:bg-white/10",
      "data-[state=open]:bg-white/5 data-[state=open]:text-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/50 focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="flex-1">{children}</span>
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 16 16"
      className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
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
  </AccordionPrimitive.Trigger>
))

AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "grid text-sm transition-[grid-template-rows,opacity] duration-200 ease-out",
      "data-[state=closed]:grid-rows-[0fr] data-[state=closed]:opacity-0",
      "data-[state=open]:grid-rows-[1fr] data-[state=open]:opacity-100",
      className,
    )}
    {...props}
  >
    <div className="overflow-hidden">
      <div className="px-4 pt-2 pb-4 text-muted-foreground">{children}</div>
    </div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = "AccordionContent"

const AccordionHeader = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Header>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Header>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Header ref={ref} className={cn("flex", className)} {...props} />
))

AccordionHeader.displayName = "AccordionHeader"

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Root ref={ref} className={cn("w-full", className)} {...props} />
))

Accordion.displayName = "Accordion"

const accordionVariants = accordionItemVariants

export {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
  accordionItemVariants,
  accordionVariants,
}
