import { Tabs, TabsContent, TabsList, TabsTrigger } from "@glass-ui-kit/glass"

export default function TabsVertical() {
  return (
    <Tabs defaultValue="overview" orientation="vertical" className="mx-auto w-full max-w-[180px]">
      <TabsList aria-label="Workspace sections" className="w-full max-w-[180px] shrink-0">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="integrations">Tools</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="sr-only">
        Overview
      </TabsContent>
      <TabsContent value="integrations" className="sr-only">
        Tools
      </TabsContent>
      <TabsContent value="activity" className="sr-only">
        Activity
      </TabsContent>
    </Tabs>
  )
}
