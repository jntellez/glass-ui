import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@glass-ui-kit/glass"

export default function CollapsibleDisabled() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-3">
      <Collapsible defaultOpen className="w-full max-w-sm">
        <CollapsibleTrigger>Available</CollapsibleTrigger>
        <CollapsibleContent>
          <div className="rounded-glass-sm border border-glass-border/50 bg-white/5 p-3">
            <p className="text-xs text-muted-foreground">
              Active disclosures reveal supporting rows directly under the trigger.
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible disabled className="w-full max-w-sm">
        <CollapsibleTrigger>Locked</CollapsibleTrigger>
        <CollapsibleContent>
          <p className="text-xs text-muted-foreground">This content stays unavailable.</p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
