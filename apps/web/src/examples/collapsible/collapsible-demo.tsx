import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@glass-ui-kit/glass"

export default function CollapsibleDemo() {
  return (
    <Collapsible defaultOpen className="mx-auto w-full max-w-sm">
      <CollapsibleTrigger>Primary</CollapsibleTrigger>
      <CollapsibleContent>
        <div className="space-y-2 rounded-glass-sm border border-glass-border/50 bg-white/5 p-3">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-medium text-foreground">Background</span>
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              /tokens/bg
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-medium text-foreground">Foreground</span>
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              /tokens/fg
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-medium text-foreground">Border</span>
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              /tokens/border
            </span>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
