import { Badge } from "@glass-ui-kit/glass";
import { LoaderCircle } from "lucide-react";

export default function BadgeSpinner() {
  return (
    <div className="flex items-center justify-center gap-4">
      <Badge className="glass">
        <LoaderCircle className="mr-1 h-3 w-3 animate-spin" />
        Sending
      </Badge>
    </div>
  );
}