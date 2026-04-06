import { Button } from "@glass-ui-kit/glass"
import { Layers } from "lucide-react"

export default function ButtonDemo() {
  return (
    <div className="flex items-center justify-center gap-4">
      <Button className="glass">Button</Button>

      <Button className="glass btn-icon w-8 h-8">
        <Layers className="w-4 h-4" />
      </Button>
    </div>
  )
}
