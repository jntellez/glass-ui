import { Button } from "@glass-ui-kit/glass"
import { Layers } from "lucide-react"

export default function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-end gap-6">
      <div className="flex items-start gap-2">
        <Button className="glass btn-sm">Small</Button>
        <Button className="glass btn-icon w-6 h-6">
          <Layers className="w-3 h-3" />
        </Button>
      </div>

      <div className="flex items-start gap-2">
        <Button className="glass">Default</Button>
        <Button className="glass btn-icon w-8 h-8">
          <Layers className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-start gap-2">
        <Button className="glass btn-lg">Large</Button>
        <Button className="glass btn-icon w-10 h-10">
          <Layers className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}