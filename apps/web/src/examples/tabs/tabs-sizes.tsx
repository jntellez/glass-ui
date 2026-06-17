import { Tabs, TabsContent, TabsList, TabsTrigger } from "@glass-ui-kit/glass"

const sizes = [
  { label: "Small", value: "sm" as const },
  { label: "Default", value: "md" as const },
  { label: "Large", value: "lg" as const },
]

export default function TabsSizes() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-5">
      {sizes.map((size) => (
        <Tabs key={size.value} defaultValue="overview" className="mx-auto w-full">
          <TabsList aria-label={`${size.label} tabs`} className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" size={size.value}>
              Overview
            </TabsTrigger>
            <TabsTrigger value="activity" size={size.value}>
              Activity
            </TabsTrigger>
            <TabsTrigger value="members" size={size.value}>
              Members
            </TabsTrigger>
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
