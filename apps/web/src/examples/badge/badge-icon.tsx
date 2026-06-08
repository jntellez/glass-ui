import { Badge } from "@glass-ui-kit/glass"
import { Clock } from "lucide-react"

export default function BadgeIcon() {
  return (
    <div className="flex items-center justify-center gap-4">
      <Badge>
        <Clock />
        Pending
      </Badge>
    </div>
  )
}
