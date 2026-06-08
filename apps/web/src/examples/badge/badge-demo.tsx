import { Badge } from "@glass-ui-kit/glass"

export default function BadgeDemo() {
  return (
    <div className="flex items-center justify-center gap-4">
      <Badge variant="strong">Strong</Badge>
      <Badge>Default</Badge>
      <Badge variant="soft">Soft</Badge>
    </div>
  )
}
