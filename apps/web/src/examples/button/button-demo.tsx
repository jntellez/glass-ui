import { Button } from "@glass-ui-kit/glass"
import { Layers } from "lucide-react"

export default function ButtonDemo() {
  return (
    <div className="flex items-center justify-center gap-4">
      <Button variant="default">Button</Button>

      <Button variant="strong" size="icon" aria-label="Layers">
        <Layers />
      </Button>
    </div>
  )
}
