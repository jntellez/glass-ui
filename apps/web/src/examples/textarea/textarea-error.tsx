import { Textarea } from "@glass-ui-kit/glass"

export default function TextareaError() {
  return (
    <div className="w-full max-w-md mx-auto space-y-2">
      <Textarea aria-invalid="true" placeholder="Tell us what went wrong" rows={5} />
      <p className="text-xs text-destructive">
        Please include enough detail for us to reproduce the issue.
      </p>
    </div>
  )
}
