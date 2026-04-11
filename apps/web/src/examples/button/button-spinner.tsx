import { Button } from "@glass-ui-kit/glass"
import { LoaderCircle } from "lucide-react"

export default function ButtonSpinner() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Button disabled>
        <LoaderCircle className="animate-spin" />
        Loading
      </Button>

      <Button size="icon" aria-label="Loading" disabled>
        <LoaderCircle className="animate-spin" />
      </Button>

      <Button disabled>
        Loading
        <LoaderCircle className="animate-spin" />
      </Button>
    </div>
  )
}
