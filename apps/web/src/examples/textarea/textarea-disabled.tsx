import { Textarea } from "@glass-ui-kit/glass"

export default function TextareaDisabled() {
  return (
    <div className="w-full max-w-md mx-auto">
      <Textarea disabled placeholder="Disabled textarea" rows={5} variant="soft" />
    </div>
  )
}
