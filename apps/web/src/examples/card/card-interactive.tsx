import { Badge, Card } from "@glass-ui-kit/glass"
import { FolderGit2 } from "lucide-react"

export default function CardInteractive() {
  return (
    <Card className="max-w-sm w-full mx-auto transition-all duration-300 hover:glass-strong hover:shadow-glass-md cursor-pointer group p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="glass glass-soft rounded-md p-2">
          <FolderGit2 className="w-5 h-5 text-foreground" />
        </div>
        <h3 className="text-base font-medium">glass-ui</h3>
      </div>

      <p className="text-sm text-muted-foreground">
        Main design system monorepo. Contains CLI, React components, and Astro documentation.
      </p>

      <div className="mt-5 flex items-center gap-2">
        <Badge className="glass bg-blue-50/50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
          TypeScript
        </Badge>
        <Badge>
          Updated 2h ago
        </Badge>
      </div>
    </Card >
  )
}