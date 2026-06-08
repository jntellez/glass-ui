import { Textarea } from "@glass-ui-kit/glass"

export default function TextareaGlass() {
  return (
    <div className="w-full max-w-md mx-auto space-y-3">
      <Textarea variant="default" placeholder="Default surface" rows={4} />
      <Textarea variant="soft" placeholder="Soft surface" rows={4} />
      <Textarea variant="strong" placeholder="Strong surface" rows={4} />
      <Textarea variant="transparent" placeholder="Transparent surface" rows={4} />
    </div>
  )
}
