import { Card, Button } from "@glass-ui-kit/glass"
import { Sparkles } from "lucide-react"

export default function CardStrong() {
  return (
    <Card variant="strong" className="max-w-sm w-full mx-auto">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Unlock Analytics</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Upgrade to the Pro plan to access advanced metrics, custom reporting, and priority support.
      </p>
      <Button variant="strong" className="w-full">
        Upgrade Now
      </Button>
    </Card>
  )
}
