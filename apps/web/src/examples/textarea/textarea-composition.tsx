import { Textarea } from "@glass-ui-kit/glass"

export default function TextareaComposition() {
  return (
    <div className="w-full max-w-md mx-auto space-y-2">
      <label htmlFor="bio" className="text-sm font-medium leading-none">
        Bio
      </label>

      <Textarea id="bio" placeholder="A short description about you" rows={6} />

      <p className="text-xs text-muted-foreground">
        Keep it brief. You can always edit this later.
      </p>
    </div>
  )
}
