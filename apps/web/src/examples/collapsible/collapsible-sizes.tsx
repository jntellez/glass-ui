import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@glass-ui-kit/glass"

const sizes = [
  { label: "Small", value: "sm" as const },
  { label: "Medium", value: "md" as const },
  { label: "Large", value: "lg" as const },
]

export default function CollapsibleSizes() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-3">
      {sizes.map((size) => (
        <Collapsible key={size.value} className="w-full max-w-sm">
          <CollapsibleTrigger size={size.value}>{size.label} trigger</CollapsibleTrigger>
          <CollapsibleContent>
            <div className="rounded-glass-sm border border-glass-border/50 bg-white/5 p-3">
              <p className="text-xs text-muted-foreground">
                Match button-like sizing while keeping the disclosure layout light.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  )
}
