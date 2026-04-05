import { Textarea } from "@glass-ui-kit/glass"

export default function TextareaGlass() {
  return (
    <div className="w-full max-w-md mx-auto">
      <Textarea className="glass glass-strong" placeholder="Add a detailed description" rows={5} />
    </div>
  )
}
