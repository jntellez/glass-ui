import { Button, Separator } from "@glass-ui-kit/glass"

const actions = ["Preview", "Share", "Export"] as const

export default function SeparatorVertical() {
  return (
    <div className="mx-auto flex w-full max-w-md items-center justify-center rounded-full border border-glass-border/60 bg-white/8 px-3 py-2 shadow-glass-sm">
      {actions.map((action, index) => (
        <div key={action} className="flex items-center">
          <Button variant="transparent" size="sm">
            {action}
          </Button>
          {index < actions.length - 1 ? (
            <Separator orientation="vertical" decorative className="mx-1 h-6" />
          ) : null}
        </div>
      ))}
    </div>
  )
}
