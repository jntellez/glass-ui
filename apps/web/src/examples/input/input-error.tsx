import { Input } from "@glass-ui-kit/glass"

export default function InputError() {
  return (
    <div className="w-full max-w-sm mx-auto space-y-1.5">
      <label htmlFor="email_error" className="text-sm font-medium">
        Email
      </label>
      <Input
        id="email_error"
        type="email"
        defaultValue="invalid-email"
        placeholder="you@example.com"
        className="glass border-destructive/50 dark:border-destructive/80 focus-visible:ring-destructive/50"
      />
      <p className="text-[11px] font-medium text-destructive">
        Please enter a valid email address.
      </p>
    </div>
  )
}
