import * as React from "react"
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Field,
  FieldDescription,
  Input,
  Label,
  Textarea,
} from "@glass-ui-kit/glass"
import type { TokenValues } from "./customization-tokens"

export type PreviewSceneId = "overview" | "components" | "content"

const DASHBOARD_REVENUE_TREND = [
  { height: 38, period: "baseline" },
  { height: 52, period: "baseline" },
  { height: 46, period: "baseline" },
  { height: 64, period: "baseline" },
  { height: 58, period: "baseline" },
  { height: 76, period: "baseline" },
  { height: 88, period: "baseline" },
  { height: 82, period: "baseline" },
  { height: 94, period: "baseline" },
  { height: 108, period: "current" },
  { height: 102, period: "current" },
  { height: 116, period: "current" },
] as const

interface PreviewSceneRenderProps {
  values: TokenValues
  previewMode: "light" | "dark"
}

export interface PreviewSceneDefinition {
  id: PreviewSceneId
  label: string
  panelLabel: string
  render: (props: PreviewSceneRenderProps) => React.ReactNode
}

function PreviewSample({
  name,
  title,
  description,
  surfaceClassName,
  background,
  border,
  blur,
  accent,
  accentForeground,
}: {
  name: string
  title: string
  description: string
  surfaceClassName?: string
  background: string
  border: string
  blur: string
  accent: string
  accentForeground: string
}) {
  return (
    <article aria-label={name} className="space-y-3">
      <Card className={surfaceClassName ? `space-y-4 p-4 ${surfaceClassName}` : "space-y-4 p-4"}>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <p className="text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge style={{ backgroundColor: accent, color: accentForeground }}>
            Accent emphasis
          </Badge>
          <Button type="button" size="sm" className="glass glass-soft">
            Save note
          </Button>
        </div>
        <dl className="grid gap-2 text-sm text-muted-foreground">
          <div>
            <dt className="font-medium text-foreground">Background</dt>
            <dd>
              {`Background ${background}`}
              <span className="sr-only">{background}</span>
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Border</dt>
            <dd>
              {`Border ${border}`}
              <span className="sr-only">{border}</span>
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Blur</dt>
            <dd>
              {`Blur ${blur}`}
              <span className="sr-only">{blur}</span>
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Accent</dt>
            <dd>
              {`Accent ${accent}`}
              <span className="sr-only">{accent}</span>
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Accent foreground</dt>
            <dd>
              {`Accent foreground ${accentForeground}`}
              <span className="sr-only">{accentForeground}</span>
            </dd>
          </div>
        </dl>
      </Card>
    </article>
  )
}

export const PREVIEW_SCENES: readonly PreviewSceneDefinition[] = [
  {
    id: "overview",
    label: "Dashboard",
    panelLabel: "Dashboard scene",
    render: ({ previewMode, values }) => (
      <div className="space-y-4">
        <Card className="space-y-4 p-5">
          <header className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="glass glass-soft">Analytics</Badge>
                <Badge className="glass">Live</Badge>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Revenue command center</h3>
              <p className="max-w-2xl text-sm text-muted-foreground">
                {`Representative admin surfaces update immediately as you edit ${previewMode} tokens while keeping a compact, production-like dashboard layout.`}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" className="glass glass-soft">
                Export CSV
              </Button>
              <Button type="button" className="glass">
                Compare periods
              </Button>
              <Button type="button" className="glass glass-strong">
                Share report
              </Button>
            </div>
          </header>

          <section aria-labelledby="dashboard-kpis" className="space-y-3">
            <h4 id="dashboard-kpis" className="sr-only">
              Key performance indicators
            </h4>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <Card className="space-y-2 p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-muted-foreground">Net revenue</p>
                  <Badge className="glass">+12%</Badge>
                </div>
                <p className="text-2xl font-semibold text-foreground">$128.4k</p>
                <p className="text-xs text-muted-foreground">
                  Default glass for core metrics with dense supporting copy.
                </p>
              </Card>
              <Card className="glass-soft space-y-2 p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-muted-foreground">Activation rate</p>
                  <Badge className="glass glass-soft">Soft</Badge>
                </div>
                <p className="text-2xl font-semibold text-foreground">68.9%</p>
                <p className="text-xs text-muted-foreground">
                  Supporting insights stay calm on softer glass treatment.
                </p>
              </Card>
              <Card className="space-y-2 p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-muted-foreground">Pipeline coverage</p>
                  <Badge className="glass">34 deals</Badge>
                </div>
                <p className="text-2xl font-semibold text-foreground">4.2x</p>
                <p className="text-xs text-muted-foreground">
                  Secondary KPIs fill the canvas without becoming visual noise.
                </p>
              </Card>
              <Card className="glass-strong space-y-2 p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-muted-foreground">Incident queue</p>
                  <Badge className="glass glass-strong">3 open</Badge>
                </div>
                <p className="text-2xl font-semibold text-foreground">07m</p>
                <p className="text-xs text-muted-foreground">
                  Strong glass treatment highlights urgent operational states.
                </p>
              </Card>
            </div>
          </section>

          <div className="grid gap-4 xl:grid-cols-[1.7fr_1fr]">
            <Card className="space-y-4 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Performance overview</h4>
                  <p className="text-xs text-muted-foreground">
                    Traffic, conversion, and retention move together across the current week.
                  </p>
                </div>
                <Badge className="glass">Updated 2m ago</Badge>
              </div>
              <div className="grid gap-3 lg:grid-cols-[1.4fr_0.9fr]">
                <div className="rounded-[var(--glass-radius-md)] border border-[var(--glass-border-soft)] bg-background/35 p-4">
                  <div className="flex h-40 items-end gap-2">
                    {DASHBOARD_REVENUE_TREND.map((point, index) => (
                      <div key={index} className="flex min-w-0 flex-1 flex-col justify-end gap-2">
                        <div
                          aria-hidden="true"
                          className="rounded-full"
                          style={{
                            height: point.height,
                            backgroundColor:
                              point.period === "current"
                                ? values["--accent"]
                                : "color-mix(in srgb, var(--accent) 45%, transparent)",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex justify-between text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    <span>Mon</span>
                    <span>Wed</span>
                    <span>Fri</span>
                    <span>Sun</span>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  <div className="rounded-[var(--glass-radius-md)] border border-[var(--glass-border)] bg-background/45 p-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Forecast
                    </p>
                    <p className="mt-2 text-lg font-semibold text-foreground">$154k target</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Pacing 9% ahead of plan after campaign relaunch.
                    </p>
                  </div>
                  <div className="rounded-[var(--glass-radius-md)] border border-[var(--glass-border-soft)] bg-background/35 p-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Retention
                    </p>
                    <p className="mt-2 text-lg font-semibold text-foreground">92.1%</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Enterprise cohorts stabilized after the onboarding fix.
                    </p>
                  </div>
                  <div className="rounded-[var(--glass-radius-md)] border border-[var(--glass-border-soft)] bg-background/35 p-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Escalations
                    </p>
                    <p className="mt-2 text-lg font-semibold text-foreground">5 due today</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Queue ownership is balanced across support and ops.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid gap-4">
              <Card className="glass-soft space-y-4 p-4">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Traffic mix</h4>
                  <p className="text-xs text-muted-foreground">
                    Soft glass surfaces support secondary distribution visuals.
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    ["Organic search", "46%", "46%"],
                    ["Lifecycle email", "29%", "29%"],
                    ["Partner referrals", "17%", "17%"],
                    ["Direct", "8%", "8%"],
                  ].map(([label, value, width]) => (
                    <div key={label} className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2 text-sm">
                        <span className="text-foreground">{label}</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                      <div className="h-2 rounded-full bg-background/45">
                        <div
                          aria-hidden="true"
                          className="h-full rounded-full"
                          style={{ width, backgroundColor: values["--accent"] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="glass-strong space-y-3 p-4">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Action queue</h4>
                    <p className="text-xs text-muted-foreground">
                      Strong glass pulls attention to items that need action first.
                    </p>
                  </div>
                  <Badge className="glass glass-strong">Priority</Badge>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  {[
                    ["Billing export retry", "Due in 14m"],
                    ["Approve campaign budget", "Awaiting finance"],
                    ["Review onboarding anomaly", "3 assigned"],
                  ].map(([title, detail]) => (
                    <div
                      key={title}
                      className="rounded-[var(--glass-radius-md)] border border-[var(--glass-border-strong)] bg-background/35 px-3 py-2"
                    >
                      <p className="font-medium text-foreground">{title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
                    </div>
                  ))}
                </div>
                <Button type="button" size="sm" className="glass glass-strong w-full">
                  Review alerts
                </Button>
              </Card>
            </div>
          </div>
        </Card>

        <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
          <Card className="space-y-3 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-semibold text-foreground">Recent activity</h4>
                <p className="text-xs text-muted-foreground">
                  Compact event lists help validate hierarchy and density inside the preview canvas.
                </p>
              </div>
              <Button type="button" size="sm" className="glass">
                View timeline
              </Button>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                [
                  "North America report shared",
                  "1 minute ago",
                  "Finance team opened the weekly revenue snapshot.",
                ],
                [
                  "Trial cohort reached target",
                  "12 minutes ago",
                  "Activation crossed the 65% threshold for the launch segment.",
                ],
                [
                  "Warehouse sync completed",
                  "27 minutes ago",
                  "Attribution events backfilled without new warnings.",
                ],
                [
                  "Support digest scheduled",
                  "Today at 15:00",
                  "Three critical updates will be included in the next briefing.",
                ],
              ].map(([title, time, detail]) => (
                <div
                  key={title}
                  className="rounded-[var(--glass-radius-md)] border border-[var(--glass-border-soft)] bg-background/35 p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-foreground">{title}</p>
                    <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                      {time}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{detail}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="glass-soft space-y-3 p-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-semibold text-foreground">Launch readiness</h4>
                <p className="text-xs text-muted-foreground">
                  A lower supporting panel rounds out the dashboard without turning it into a
                  component dump.
                </p>
              </div>
              <Badge className="glass">84%</Badge>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              {[
                ["Messaging QA", "Ready"],
                ["Attribution audit", "In review"],
                ["Finance sign-off", "Pending"],
              ].map(([label, status]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-3 rounded-[var(--glass-radius-md)] border border-[var(--glass-border-soft)] bg-background/35 px-3 py-2"
                >
                  <span className="text-foreground">{label}</span>
                  <Badge className="glass glass-soft">{status}</Badge>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" size="sm" className="glass glass-soft">
                Open checklist
              </Button>
              <Button type="button" size="sm" className="glass glass-strong">
                Resolve blockers
              </Button>
            </div>
          </Card>
        </div>
      </div>
    ),
  },
  {
    // Keep the persisted `components` id so existing saved editor state restores correctly.
    id: "components",
    label: "Settings",
    panelLabel: "Settings scene",
    render: () => (
      <div className="space-y-4">
        <Card className="space-y-4 p-5">
          <header className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="glass glass-soft">Preferences</Badge>
                <Badge className="glass">Workspace sync healthy</Badge>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Workspace administration</h3>
              <p className="max-w-2xl text-sm text-muted-foreground">
                Settings previews should feel like a complete operations screen with dense forms,
                clear statuses, and realistic secondary panels across multiple glass surfaces.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" className="glass glass-soft">
                View audit log
              </Button>
              <Button type="button" className="glass">
                Test notifications
              </Button>
              <Button type="button" className="glass glass-strong">
                Save changes
              </Button>
            </div>
          </header>

          <div className="grid gap-4 xl:grid-cols-[1.7fr_1fr]">
            <div className="grid gap-4">
              <Card className="space-y-4 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Workspace profile</h4>
                    <p className="text-xs text-muted-foreground">
                      Primary identity, ownership, and launch details on the default glass surface.
                    </p>
                  </div>
                  <Badge className="glass">Updated today</Badge>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <Field className="space-y-1.5">
                    <Label htmlFor="settings-team-name">Workspace name</Label>
                    <Input
                      id="settings-team-name"
                      defaultValue="Northstar Growth Cloud"
                      className="glass glass-soft"
                    />
                    <FieldDescription>
                      Shown across invites, exports, and stakeholder digests.
                    </FieldDescription>
                  </Field>
                  <Field className="space-y-1.5">
                    <Label htmlFor="settings-owner-email">Operations owner</Label>
                    <Input id="settings-owner-email" type="email" defaultValue="ops@northstar.io" />
                  </Field>
                  <Field className="space-y-1.5">
                    <Label htmlFor="settings-region">Primary region</Label>
                    <Input id="settings-region" defaultValue="United States · enterprise cluster" />
                  </Field>
                  <Field className="space-y-1.5">
                    <Label htmlFor="settings-launch-window">Launch window</Label>
                    <Input id="settings-launch-window" defaultValue="Monday · 09:30 PT" />
                  </Field>
                </div>
                <Field className="space-y-1.5">
                  <Label htmlFor="settings-summary">Workspace summary</Label>
                  <Textarea
                    id="settings-summary"
                    rows={3}
                    defaultValue="Revenue, lifecycle, and launch monitoring are routed through one shared workspace so operations, finance, and support can respond from the same source of truth."
                    variant="soft"
                  />
                </Field>
              </Card>

              <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                <Card className="glass-soft space-y-4 p-4">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">
                      Notification preferences
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Softer glass keeps dense control groups calm without flattening hierarchy.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <Field className="flex items-start gap-3 rounded-[var(--glass-radius-md)] border border-[var(--glass-border-soft)] bg-background/35 p-3">
                      <Checkbox id="settings-alerts" defaultChecked />
                      <div className="space-y-1">
                        <Label htmlFor="settings-alerts">Escalate anomaly alerts</Label>
                        <FieldDescription>
                          Route revenue and activation spikes to Slack and the on-call channel.
                        </FieldDescription>
                      </div>
                    </Field>
                    <Field className="flex items-start gap-3 rounded-[var(--glass-radius-md)] border border-[var(--glass-border-soft)] bg-background/35 p-3">
                      <Checkbox id="settings-digest" defaultChecked />
                      <div className="space-y-1">
                        <Label htmlFor="settings-digest">Send daily executive digest</Label>
                        <FieldDescription>
                          Include movement, blockers, and scheduled launch decisions every morning.
                        </FieldDescription>
                      </div>
                    </Field>
                    <Field className="flex items-start gap-3 rounded-[var(--glass-radius-md)] border border-[var(--glass-border-soft)] bg-background/35 p-3">
                      <Checkbox id="settings-approvals" />
                      <div className="space-y-1">
                        <Label htmlFor="settings-approvals">
                          Require finance approval for billing exports
                        </Label>
                        <FieldDescription>
                          Prevent external destination syncs until billing owners confirm the run.
                        </FieldDescription>
                      </div>
                    </Field>
                  </div>
                </Card>

                <Card className="glass-strong space-y-4 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">Security and launch</h4>
                      <p className="text-xs text-muted-foreground">
                        Stronger glass highlights trust and release readiness states.
                      </p>
                    </div>
                    <Badge className="glass glass-strong">Protected</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    {[
                      ["Single sign-on", "Required"],
                      ["Audit retention", "365 days"],
                      ["Launch freeze", "Ends in 14h"],
                    ].map(([label, status]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between gap-3 rounded-[var(--glass-radius-md)] border border-[var(--glass-border-strong)] bg-background/35 px-3 py-2"
                      >
                        <span className="text-foreground">{label}</span>
                        <Badge className="glass glass-strong">{status}</Badge>
                      </div>
                    ))}
                  </div>
                  <Button type="button" size="sm" className="glass glass-strong w-full">
                    Review launch controls
                  </Button>
                </Card>
              </div>
            </div>

            <div className="grid gap-4">
              <Card className="space-y-4 p-4">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">
                      Connected destinations
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Operational integrations and delivery status should read clearly at a glance.
                    </p>
                  </div>
                  <Badge className="glass">4 active</Badge>
                </div>
                <div className="space-y-2">
                  {[
                    ["Salesforce pipeline sync", "Healthy", "5 min cadence"],
                    ["Warehouse export", "Needs approval", "Finance sign-off pending"],
                    ["Slack incident relay", "Live", "Posting to #northstar-ops"],
                  ].map(([title, status, detail]) => (
                    <div
                      key={title}
                      className="rounded-[var(--glass-radius-md)] border border-[var(--glass-border-soft)] bg-background/35 p-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium text-foreground">{title}</p>
                        <Badge
                          className={status === "Needs approval" ? "glass glass-strong" : "glass"}
                        >
                          {status}
                        </Badge>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
                    </div>
                  ))}
                </div>
                <Button type="button" size="sm" className="glass w-full">
                  Manage destinations
                </Button>
              </Card>

              <Card className="glass-soft space-y-4 p-4">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Billing and usage</h4>
                    <p className="text-xs text-muted-foreground">
                      Compact supporting metrics help test density inside side-column cards.
                    </p>
                  </div>
                  <Badge className="glass glass-soft">Scale plan</Badge>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <div className="rounded-[var(--glass-radius-md)] border border-[var(--glass-border-soft)] bg-background/35 p-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Seats
                    </p>
                    <p className="mt-2 text-lg font-semibold text-foreground">42 / 50 used</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Eight admin seats remain for launch week staffing.
                    </p>
                  </div>
                  <div className="rounded-[var(--glass-radius-md)] border border-[var(--glass-border-soft)] bg-background/35 p-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Monthly events
                    </p>
                    <p className="mt-2 text-lg font-semibold text-foreground">8.4M processed</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Forecast lands 6% under the included usage ceiling.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    ),
  },
  {
    id: "content",
    label: "Content",
    panelLabel: "Content scene",
    render: ({ values }) => (
      <div className="space-y-4">
        <Card className="space-y-4 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="glass glass-soft">Editorial</Badge>
                <Badge className="glass">Ready for review</Badge>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Launch narrative workspace</h3>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                Content previews should read like a real publishing workflow with polished long-form
                reading, approvals, and shipping context instead of a loose collection of examples.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" size="sm" className="glass glass-soft">
                Review notes
              </Button>
              <Button type="button" size="sm" className="glass">
                Open draft
              </Button>
              <Button type="button" size="sm" className="glass glass-strong">
                Schedule publish
              </Button>
            </div>
          </div>
          <div className="grid gap-4 xl:grid-cols-[1.65fr_1fr]">
            <Card className="space-y-4 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Quarterly product brief
                  </p>
                  <h4 className="mt-1 text-lg font-semibold text-foreground">
                    Shipping a calmer customization workflow for design systems
                  </h4>
                </div>
                <Badge className="glass">Draft v12</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span>By Maya Chen</span>
                <span>Updated 18 minutes ago</span>
                <span>Audience: Product, design, support</span>
              </div>
              <div className="space-y-3 text-sm leading-6 text-muted-foreground">
                <p>
                  Teams reviewing glass tokens need to judge whether long-form reading still feels
                  calm while dense product messaging, metadata, and inline emphasis remain easy to
                  scan in both themes.
                </p>
                <p>
                  This editorial workspace pairs a realistic article body with adjacent production
                  context so reviewers can evaluate hierarchy, rhythm, and surface contrast without
                  the preview slipping into a component gallery.
                </p>
                <div className="rounded-[var(--glass-radius-md)] border border-[var(--glass-border-soft)] bg-background/35 p-4">
                  <p className="text-sm font-medium text-foreground">Editor callout</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Clarify how the softer and stronger glass variants help teams distinguish
                    reading surfaces, review notes, and urgent publication blockers inside the same
                    workflow.
                  </p>
                </div>
                <p>
                  Final copy should support launch readiness by tying visual polish back to concrete
                  outcomes: faster approvals, stronger trust signals, and clearer operational
                  handoffs for teams working across shared dashboards and settings panels.
                </p>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  ["Read time", "6 min"],
                  ["Inline comments", "14 open"],
                  ["Approval stage", "Legal review"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-[var(--glass-radius-md)] border border-[var(--glass-border-soft)] bg-background/35 p-3"
                  >
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {label}
                    </p>
                    <p className="mt-2 text-base font-semibold text-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid gap-4">
              <Card className="glass-soft space-y-3 p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-foreground">Editorial metrics</p>
                  <Badge className="glass">Healthy</Badge>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <div className="rounded-[var(--glass-radius-md)] border border-[var(--glass-border-soft)] bg-background/35 p-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Readability
                    </p>
                    <p className="mt-2 text-lg font-semibold text-foreground">Grade 8.4</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Body copy stays concise after legal revisions.
                    </p>
                  </div>
                  <div className="rounded-[var(--glass-radius-md)] border border-[var(--glass-border-soft)] bg-background/35 p-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Organic reach
                    </p>
                    <p className="mt-2 text-lg font-semibold text-foreground">+18% forecast</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Topic cluster outperforms the last launch narrative.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="glass-strong space-y-3 p-4">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Publishing queue</h4>
                    <p className="text-xs text-muted-foreground">
                      Strong glass surfaces emphasize items that can block release.
                    </p>
                  </div>
                  <Badge className="glass glass-strong">2 blockers</Badge>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  {[
                    ["Homepage launch brief", "Waiting on leadership quote"],
                    ["Release notes digest", "Design screenshots due"],
                    ["Customer email", "Approved for tomorrow 09:00"],
                  ].map(([title, detail]) => (
                    <div
                      key={title}
                      className="rounded-[var(--glass-radius-md)] border border-[var(--glass-border-strong)] bg-background/35 px-3 py-2"
                    >
                      <p className="font-medium text-foreground">{title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </Card>

        <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <PreviewSample
            name="Review checklist sample"
            title="Review checklist"
            description="Default glass surface for editorial QA, metadata checks, and handoff confidence."
            background={values["--glass-bg"]}
            border={values["--glass-border"]}
            blur={values["--glass-blur"]}
            accent={values["--accent"]}
            accentForeground={values["--accent-foreground"]}
          />
          <div className="grid gap-4">
            <PreviewSample
              name="Inline callout sample"
              title="Inline callout"
              description="Soft treatment for contextual notes, strategy highlights, and content sidebars."
              surfaceClassName="glass-soft"
              background={values["--glass-bg-soft"]}
              border={values["--glass-border-soft"]}
              blur={values["--glass-blur-soft"]}
              accent={values["--accent"]}
              accentForeground={values["--accent-foreground"]}
            />
            <PreviewSample
              name="Publication blocker sample"
              title="Publication blocker"
              description="Strong surface for urgent editor notes and release gating communication."
              surfaceClassName="glass-strong"
              background={values["--glass-bg-strong"]}
              border={values["--glass-border-strong"]}
              blur={values["--glass-blur-strong"]}
              accent={values["--accent"]}
              accentForeground={values["--accent-foreground"]}
            />
          </div>
        </div>
      </div>
    ),
  },
]
