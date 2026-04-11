import { Input } from "@glass-ui-kit/glass"
import { Search } from "lucide-react"

export default function InputDemo() {
  return (
    <div className="w-full max-w-sm relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground z-10" />
      <Input type="search" variant="soft" placeholder="Search components" className="pl-9" />
    </div>
  )
}
