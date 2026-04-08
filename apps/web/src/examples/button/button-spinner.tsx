import { Button } from "@glass-ui-kit/glass"
import { LoaderCircle } from "lucide-react"

export default function ButtonSpinner() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Button className="glass" disabled>
        <LoaderCircle className="w-4 h-4 animate-spin" />
        Loading
      </Button>

      <Button className="glass btn-icon" disabled>
        <LoaderCircle className="w-4 h-4 animate-spin" />
      </Button>

      <Button className="glass" disabled>
        Loading
        <LoaderCircle className="w-4 h-4 animate-spin" />
      </Button>
    </div>
  )
}
