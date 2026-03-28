import { Badge } from "@glass-ui-kit/glass";

export default function BadgeDemo() {
  return (
    <div className="flex items-center justify-center gap-4">
      <Badge className="glass glass-strong">Strong</Badge>
      <Badge className="glass">Glass</Badge>
      <Badge className="glass glass-soft">Soft</Badge>
    </div>
  );
}