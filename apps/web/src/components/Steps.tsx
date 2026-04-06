import { cn } from "@/lib/utils"
import React from "react"

export default function Steps({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "ml-4 border-l border-glass-border pl-8 [counter-reset:step]",
        "[&>h3]:relative [&>h3]:mt-8 [&>h3]:mb-4",
        "[&>h3]:[counter-increment:step]",
        "[&>h3::before]:absolute [&>h3::before]:-left-12 [&>h3::before]:flex [&>h3::before]:h-8 [&>h3::before]:w-8 [&>h3::before]:items-center [&>h3::before]:justify-center [&>h3::before]:rounded-full [&>h3::before]:bg-glass-bg [&>h3::before]:backdrop-blur-md [&>h3::before]:shadow-glass-sm [&>h3::before]:border [&>h3::before]:border-glass-border [&>h3::before]:text-sm [&>h3::before]:font-medium [&>h3::before]:text-foreground [&>h3::before]:content-[counter(step)]",
        className,
      )}
    >
      {children}
    </div>
  )
}
