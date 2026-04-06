import { Input } from "@glass-ui-kit/glass"
import { Search } from "lucide-react"

export default function InputDemo() {
  return (
    <div className="w-full max-w-sm mx-auto relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
      <Input type="search" placeholder="Search components" className="glass pl-9" />
    </div>
  )
}
