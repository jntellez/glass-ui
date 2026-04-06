import { Card } from "@glass-ui-kit/glass"
import { Users } from "lucide-react"

export default function CardDefault() {
  return (
    <Card className="max-w-sm w-full mx-auto">
      <div className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-sm font-medium text-foreground">Documind Workspace</h3>
        <Users className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="text-2xl font-bold">12 Active Users</div>
      <p className="text-xs text-muted-foreground mt-1">+2 joined in the last 7 days</p>
    </Card>
  )
}
