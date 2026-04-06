import { Badge } from "@glass-ui-kit/glass"
import { ArrowUpRight } from "lucide-react"

export default function BadgeLink() {
  return (
    <div className="flex items-center justify-center gap-4">
      <a href="#link">
        <Badge className="glass">
          Open link
          <ArrowUpRight className="ml-1 h-3 w-3" />
        </Badge>
      </a>
    </div>
  )
}
