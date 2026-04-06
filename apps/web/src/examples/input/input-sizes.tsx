import { Input } from "@glass-ui-kit/glass"

export default function InputSizes() {
  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      <Input placeholder="Small input" className="input-sm" />
      <Input placeholder="Medium input" className="input-md" />
      <Input placeholder="Large input" className="input-lg" />
    </div>
  )
}
