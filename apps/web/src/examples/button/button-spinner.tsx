import { Button } from "@glass-ui-kit/glass"
import { LoaderCircle } from "lucide-react"

export default function ButtonSpinner() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Button className="glass">
        <LoaderCircle className="w-4 h-4 animate-spin" />
        Loading
      </Button>

      <Button className="glass btn-icon w-8 h-8">
        <LoaderCircle className="w-4 h-4 animate-spin" />
      </Button>

      <Button className="glass">
        Loading
        <LoaderCircle className="w-4 h-4 animate-spin" />
      </Button>
    </div>
  )
}