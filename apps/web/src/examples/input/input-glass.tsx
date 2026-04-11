import { Input } from "@glass-ui-kit/glass"

export default function InputGlass() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <Input variant="strong" placeholder="Glass strong" />
      <Input placeholder="Default glass" />
      <Input variant="soft" placeholder="Glass soft" />
      <Input variant="transparent" placeholder="Transparent" />
    </div>
  )
}
