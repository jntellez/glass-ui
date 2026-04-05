import { Textarea } from "@glass-ui-kit/glass"

export default function TextareaDefault() {
  return (
    <div className="w-full max-w-md mx-auto">
      <Textarea placeholder="Write a note" rows={5} />
    </div>
  )
}
