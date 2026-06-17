import { Button, Popover, PopoverContent, PopoverTrigger } from "@glass-ui-kit/glass"

export default function PopoverDemo() {
  return (
    <div className="mx-auto flex w-full max-w-sm items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="strong">Share project</Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 space-y-3">
          <div className="space-y-1.5">
            <p className="text-sm font-semibold text-foreground">Quick share</p>
            <p className="text-sm text-muted-foreground">
              Send a focused update without moving away from the current view.
            </p>
          </div>

          <div className="rounded-glass-sm border border-glass-border/50 bg-white/5 p-3">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="font-medium text-foreground">Link access</span>
              <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Team only
              </span>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
