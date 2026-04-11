import { Button } from "@glass-ui-kit/glass"
import { Layers } from "lucide-react"

export default function ButtonSizes() {
  return (
    <div className="flex items-end gap-6">
      <div className="flex gap-2">
        <Button size="sm">Small</Button>
        <Button size="icon-sm" aria-label="Small layers">
          <Layers />
        </Button>
      </div>

      <div className="flex gap-2">
        <Button size="md">Default</Button>
        <Button size="icon" aria-label="Medium layers">
          <Layers />
        </Button>
      </div>

      <div className="flex gap-2">
        <Button size="lg">Large</Button>
        <Button size="icon-lg" aria-label="Large layers">
          <Layers />
        </Button>
      </div>
    </div>
  )
}
