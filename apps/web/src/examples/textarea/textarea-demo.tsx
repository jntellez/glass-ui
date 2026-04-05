import { Button, Card, Textarea } from "@glass-ui-kit/glass"

export default function TextareaDemo() {
  return (
    <Card className="w-full max-w-md mx-auto p-4">
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium leading-none">
          Message
        </label>

        <Textarea
          id="message"
          placeholder="Tell us what you are building..."
          className="glass glass-soft min-h-32"
        />
      </div>

      <div className="mt-4 flex items-center justify-end gap-3">
        <Button>Cancel</Button>
        <Button className="glass">Send message</Button>
      </div>
    </Card>
  )
}
