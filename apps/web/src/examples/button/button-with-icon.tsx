import { Button } from "@glass-ui-kit/glass"
import { CirclePlus, Download } from "lucide-react"

export default function ButtonWithIcon() {
  return (
    <div className="flex gap-6">
      <Button>
        <CirclePlus />
        Add
      </Button>

      <Button>
        Download
        <Download />
      </Button>
    </div>
  )
}
