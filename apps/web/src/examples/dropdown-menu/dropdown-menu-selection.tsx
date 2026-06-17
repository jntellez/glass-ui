import { useState } from "react"
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@glass-ui-kit/glass"

export default function DropdownMenuSelection() {
  const [showMembers, setShowMembers] = useState(true)
  const [showActivity, setShowActivity] = useState(false)
  const [density, setDensity] = useState("comfortable")

  return (
    <div className="mx-auto flex w-full max-w-sm items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>View options</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60">
          <DropdownMenuLabel>Visible sections</DropdownMenuLabel>
          <DropdownMenuCheckboxItem checked={showMembers} onCheckedChange={setShowMembers}>
            Members
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={showActivity} onCheckedChange={setShowActivity}>
            Activity
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Density</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={density} onValueChange={setDensity}>
            <DropdownMenuRadioItem value="comfortable">Comfortable</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
