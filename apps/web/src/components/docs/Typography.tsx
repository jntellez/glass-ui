import * as React from "react"
import { cn } from "@/lib/utils"

export const H1 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn("scroll-m-20 text-4xl font-semibold tracking-tight", className)}
      {...props}
    />
  ),
)
H1.displayName = "H1"

export const H2 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mt-10 first:mt-0",
        className,
      )}
      {...props}
    />
  ),
)
H2.displayName = "H2"

export const H3 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("scroll-m-20 text-2xl font-semibold mt-8", className)} {...props} />
  ),
)
H3.displayName = "H3"

export const H4 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h4 ref={ref} className={cn("scroll-m-20 text-xl font-medium mt-6", className)} {...props} />
  ),
)
H4.displayName = "H4"

export const P = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "text-base leading-7 text-muted-foreground [&:not(:first-child)]:mt-6",
        className,
      )}
      {...props}
    />
  ),
)
P.displayName = "P"

export const Lead = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-lg text-muted-foreground", className)} {...props} />
))
Lead.displayName = "Lead"

export const Small = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <small
      ref={ref}
      className={cn("text-sm font-medium leading-none text-muted-foreground", className)}
      {...props}
    />
  ),
)
Small.displayName = "Small"

export const InlineCode = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <code
      ref={ref}
      className={cn(
        "relative rounded bg-black/5 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className,
      )}
      {...props}
    />
  ),
)
InlineCode.displayName = "InlineCode"

export const Blockquote = React.forwardRef<
  HTMLQuoteElement,
  React.HTMLAttributes<HTMLQuoteElement>
>(({ className, ...props }, ref) => (
  <blockquote
    ref={ref}
    className={cn("mt-6 border-l-2 border-primary pl-6 italic text-muted-foreground", className)}
    {...props}
  />
))
Blockquote.displayName = "Blockquote"
