import { Input, Button, Card } from "@glass-ui-kit/glass"

export default function InputComposition() {
  return (
    <Card>
      <div className="flex flex-col gap-1.5 mb-4">
        <h3 className="text-lg font-semibold">Join Our Newsletter</h3>
        <p className="text-sm text-muted-foreground">
          Stay updated with the latest releases and design system insights.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Input type="email" placeholder="you@company.com" className="input-lg glass glass-soft" />
        <Button className="glass btn-lg whitespace-nowrap">Subscribe Now</Button>
      </div>
    </Card>
  )
}
