import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@glass-ui-kit/glass"

const variants = [
  { label: "Default", value: "default" as const },
  { label: "Soft", value: "soft" as const },
  { label: "Strong", value: "strong" as const },
]

export default function CollapsibleVariants() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-3">
      {variants.map((variant) => (
        <Collapsible key={variant.value} variant={variant.value} className="w-full max-w-sm">
          <CollapsibleTrigger>{variant.label}</CollapsibleTrigger>
          <CollapsibleContent>
            <div className="rounded-glass-sm border border-glass-border/50 bg-white/5 p-3">
              <p className="text-xs text-muted-foreground">
                Use {variant.label.toLowerCase()} trigger emphasis when the disclosure should stay
                lighter than an accordion item.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  )
}
