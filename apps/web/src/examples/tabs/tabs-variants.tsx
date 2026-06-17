import { Tabs, TabsContent, TabsList, TabsTrigger } from "@glass-ui-kit/glass"

const variants = [
  { label: "Default", value: "default" as const },
  { label: "Soft", value: "soft" as const },
  { label: "Strong", value: "strong" as const },
]

export default function TabsVariants() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-5">
      {variants.map((variant) => (
        <Tabs
          key={variant.value}
          defaultValue="overview"
          className="mx-auto w-full max-w-lg space-y-3"
        >
          <TabsList
            variant={variant.value}
            aria-label={`${variant.label} tabs`}
            className="grid w-full max-w-sm grid-cols-3"
          >
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="sr-only">
            Overview
          </TabsContent>
          <TabsContent value="activity" className="sr-only">
            Activity
          </TabsContent>
          <TabsContent value="members" className="sr-only">
            Members
          </TabsContent>
        </Tabs>
      ))}
    </div>
  )
}
