import { Badge } from "@glass-ui-kit/glass"
import { ArrowUpRight } from "lucide-react"

export default function BadgeLink() {
  return (
    <div className="flex items-center justify-center gap-4">
      <a href="#link">
        <Badge>
          Open link
          <ArrowUpRight />
        </Badge>
      </a>
    </div>
  )
}
