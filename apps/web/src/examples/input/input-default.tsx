import { Input } from "@glass-ui-kit/glass"

export default function InputDefault() {
  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      <Input placeholder="Enter your full name" />
      <Input type="email" placeholder="you@example.com" />
    </div>
  )
}
