import { Tabs, TabsContent, TabsList, TabsTrigger } from "@glass-ui-kit/glass"

const tabs = [
  {
    value: "overview",
    label: "Overview",
    title: "Overview",
    description: "Review the workspace summary and key metrics.",
    note: "Everything stays in a compact, stable panel.",
  },
  {
    value: "analytics",
    label: "Analytics",
    title: "Analytics",
    description: "Track trends and compare recent performance.",
    note: "Switch views without shifting the layout.",
  },
  {
    value: "reports",
    label: "Reports",
    title: "Reports",
    description: "Open saved reports and check the latest exports.",
    note: "The panel height stays consistent across tabs.",
  },
  {
    value: "settings",
    label: "Settings",
    title: "Settings",
    description: "Manage defaults and update workspace preferences.",
    note: "Use the same structure for every tab view.",
  },
] as const

export default function TabsDemo() {
  return (
    <Tabs defaultValue="overview" className="mx-auto flex w-full max-w-md flex-col gap-4">
      <TabsList aria-label="Project sections" className="mx-auto grid w-full max-w-md grid-cols-4">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-0 flex flex-col gap-5">
          <div className="space-y-1.5">
            <h3 className="text-base font-semibold tracking-tight">{tab.title}</h3>
            <p className="text-sm text-muted-foreground">{tab.description}</p>
          </div>

          <p className="text-xs text-muted-foreground">{tab.note}</p>
        </TabsContent>
      ))}
    </Tabs>
  )
}
