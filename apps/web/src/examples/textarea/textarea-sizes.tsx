import { Textarea } from "@glass-ui-kit/glass"

export default function TextareaSizes() {
  return (
    <div className="w-full max-w-md mx-auto space-y-3">
      <Textarea size="sm" rows={3} placeholder="Small textarea" />
      <Textarea size="md" rows={4} placeholder="Medium textarea" />
      <Textarea size="lg" rows={5} placeholder="Large textarea" />
    </div>
  )
}
