import { Button, Card, Field, FieldDescription, Input, Label } from "@glass-ui-kit/glass"

export default function InputComposition() {
  return (
    <Card>
      <div className="flex flex-col gap-1.5 mb-4">
        <h3 className="text-lg font-semibold">Join Our Newsletter</h3>
        <p className="text-sm text-muted-foreground">
          Stay updated with the latest releases and design system insights.
        </p>
      </div>

      <Field className="space-y-1.5">
        <Label>Email address</Label>
        <div className="flex gap-3">
          <Input type="email" variant="soft" placeholder="you@company.com" />
          <Button className="whitespace-nowrap">Subscribe Now</Button>
        </div>
        <FieldDescription>
          Product updates, release notes, and new component drops.
        </FieldDescription>
      </Field>
    </Card>
  )
}
