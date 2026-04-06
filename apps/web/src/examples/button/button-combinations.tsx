import { Button } from "@glass-ui-kit/glass"

export default function ButtonCombinations() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      <Button className="glass glass-strong">Primary</Button>
      <Button className="glass">Secondary</Button>
      <Button className="glass glass-soft">Tertiary</Button>
      <Button>Default</Button>
    </div>
  )
}
