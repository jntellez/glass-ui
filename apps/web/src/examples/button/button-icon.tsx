import { Button } from "@glass-ui-kit/glass"
import { MapPin } from "lucide-react"

export default function ButtonIcon() {
  return (
    <div className="flex flex-wrap items-end gap-6">
      <Button className="glass btn-icon w-6 h-6">
        <MapPin className="w-3 h-3" />
      </Button>

      <Button className="glass btn-icon w-8 h-8">
        <MapPin className="w-4 h-4" />
      </Button>

      <Button className="glass btn-icon w-10 h-10">
        <MapPin className="w-5 h-5" />
      </Button>
    </div>
  )
}