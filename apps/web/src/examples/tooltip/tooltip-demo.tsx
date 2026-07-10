import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@glass-ui-kit/glass"

const actions = [
  {
    label: "Share",
    hint: "Share this view with your team.",
  },
  {
    label: "Archive",
    hint: "Move this item out of the active queue.",
  },
  {
    label: "Duplicate",
    hint: "Create a copy with the current settings.",
  },
] as const

export default function TooltipDemo() {
  return (
    <TooltipProvider delayDuration={120}>
      <div className="mx-auto flex w-full max-w-md flex-wrap items-center justify-center gap-3">
        {actions.map((action) => (
          <Tooltip key={action.label}>
            <TooltipTrigger asChild>
              <Button variant="strong" size="sm">
                {action.label}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{action.hint}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}
