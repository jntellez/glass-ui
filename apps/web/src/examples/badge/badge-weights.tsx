import { Badge } from "@glass-ui-kit/glass"

export default function BadgeWeights() {
  return (
    <div className="flex items-center justify-center gap-4">
      <Badge variant="strong">Strong</Badge>
      <Badge variant="default">Default</Badge>
      <Badge variant="soft">Soft</Badge>
      <Badge variant="transparent">Transparent</Badge>
    </div>
  )
}
