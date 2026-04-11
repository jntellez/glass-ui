import { Button } from "@glass-ui-kit/glass"

export default function ButtonCombinations() {
  return (
    <div className="flex gap-3">
      <Button variant="strong">Primary</Button>
      <Button variant="default">Secondary</Button>
      <Button variant="soft">Tertiary</Button>
      <Button variant="transparent">Transparent</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  )
}
