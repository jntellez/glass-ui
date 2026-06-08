import { Badge } from "@glass-ui-kit/glass"
import { LoaderCircle } from "lucide-react"

export default function BadgeSpinner() {
  return (
    <div className="flex items-center justify-center gap-4">
      <Badge>
        <LoaderCircle className="animate-spin" />
        Sending
      </Badge>
    </div>
  )
}
