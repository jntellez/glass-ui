import { Input } from "@glass-ui-kit/glass"

export default function InputDisabled() {
  return (
    <div className="w-full max-w-sm mx-auto space-y-1.5">
      <label htmlFor="email_disabled" className="text-sm font-medium">
        Disabled Input
      </label>
      <Input
        id="email_disabled"
        type="email"
        placeholder="you@example.com"
        disabled
        className="glass"
      />
    </div>
  )
}
