import { Input } from "@glass-ui-kit/glass"

export default function InputSizes() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input" />
      <Input size="lg" placeholder="Large input" />
    </div>
  )
}
