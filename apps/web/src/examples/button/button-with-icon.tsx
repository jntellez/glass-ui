import { Button } from "@glass-ui-kit/glass"
import { CirclePlus, Download } from "lucide-react"

export default function ButtonWithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Button className="glass">
        <CirclePlus className="w-4 h-4" />
        Add
      </Button>

      <Button className="glass">
        Download
        <Download className="w-4 h-4" />
      </Button>
    </div>
  )
}