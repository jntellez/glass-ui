import { Badge } from "@glass-ui-kit/glass";

export default function BadgeCustomColors() {
  return (
    <div className="flex items-center justify-center gap-4">
      <Badge className="glass bg-blue-50/50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
        Blue
      </Badge>
      <Badge className="glass bg-green-50/50 text-green-700 dark:bg-green-950/50 dark:text-green-300">
        Green
      </Badge>
      <Badge className="glass bg-yellow-50/50 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-300">
        Yellow
      </Badge>
      <Badge className="glass bg-red-50/50 text-red-700 dark:bg-red-950/50 dark:text-red-300">
        Red
      </Badge>
      <Badge className="glass bg-purple-50/50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300">
        Purple
      </Badge>
    </div>
  );
}