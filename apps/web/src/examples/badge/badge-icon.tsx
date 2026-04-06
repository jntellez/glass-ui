import { Badge } from "@glass-ui-kit/glass"
import { Clock } from "lucide-react"

export default function BadgeIcon() {
  return (
    <div className="flex items-center justify-center gap-4">
      <Badge className="glass">
        <Clock className="mr-1 h-3 w-3" />
        Pending
      </Badge>
    </div>
  )
}
