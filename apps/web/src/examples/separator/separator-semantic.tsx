import { Separator } from "@glass-ui-kit/glass"

export default function SeparatorSemantic() {
  return (
    <section className="mx-auto w-full max-w-md rounded-glass-lg border border-glass-border/60 bg-white/8 p-4 shadow-glass-sm">
      <div className="space-y-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
            Incident update
          </p>
          <h3 className="mt-2 text-sm font-medium text-foreground">Service status</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Authentication recovered across all regions. Monitoring remains active.
          </p>
        </div>

        <Separator aria-label="Current incident status and follow-up actions" />

        <div>
          <h4 className="text-sm font-medium text-foreground">Next actions</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            Confirm delayed jobs, notify stakeholders, and close the status page once queues
            stabilize.
          </p>
        </div>
      </div>
    </section>
  )
}
