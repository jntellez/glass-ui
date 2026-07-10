import { Separator } from "@glass-ui-kit/glass"

const sections = [
  {
    title: "Workspace",
    description: "Shared defaults for members, notifications, and visibility.",
  },
  {
    title: "Security",
    description: "Protect sign-in flows, sessions, and device approvals.",
  },
  {
    title: "Billing",
    description: "Manage invoices, plans, and cost controls for the team.",
  },
] as const

export default function SeparatorDemo() {
  return (
    <div className="mx-auto w-full max-w-md rounded-glass-lg border border-glass-border/60 bg-white/8 p-4 shadow-glass-sm">
      <div className="space-y-4">
        {sections.map((section, index) => (
          <div key={section.title} className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-foreground">{section.title}</h3>
              <p className="text-sm text-muted-foreground">{section.description}</p>
            </div>
            {index < sections.length - 1 ? <Separator decorative /> : null}
          </div>
        ))}
      </div>
    </div>
  )
}
