import { Button } from "@glass-ui-kit/glass"
import { MapPin } from "lucide-react"

export default function ButtonIcon() {
  return (
    <div className="flex items-end gap-6">
      <Button size="icon-sm" aria-label="Small location action">
        <MapPin />
      </Button>

      <Button size="icon" aria-label="Soft location action">
        <MapPin />
      </Button>

      <Button size="icon-lg" aria-label="Large location action">
        <MapPin />
      </Button>
    </div>
  )
}
