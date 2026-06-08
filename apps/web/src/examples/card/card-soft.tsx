import { Card, Button } from "@glass-ui-kit/glass"
import { GitBranch } from "lucide-react"

export default function CardSoft() {
  return (
    <Card
      variant="soft"
      padding="sm"
      className="max-w-sm w-full mx-auto flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <div className="glass glass-soft rounded-full p-1.5">
          <GitBranch className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-medium">Repository</h4>
          <p className="text-xs text-muted-foreground">Connected to main branch</p>
        </div>
      </div>
      <Button variant="soft" size="sm">
        Configure
      </Button>
    </Card>
  )
}
