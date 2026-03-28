import { Input } from "@glass-ui-kit/glass"

export default function InputGlass() {
  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      <Input placeholder="Default" />
      <Input placeholder="Glass soft" className="glass glass-soft" />
      <Input placeholder="Glass" className="glass" />
      <Input placeholder="Glass strong" className="glass glass-strong" />
    </div>
  )
}