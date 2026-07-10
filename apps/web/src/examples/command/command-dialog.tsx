import { useState } from "react"
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@glass-ui-kit/glass"

const pages = [
  { label: "Accordion", href: "/docs/components/accordion" },
  { label: "Command", href: "/docs/components/command" },
  { label: "Dialog", href: "/docs/components/dialog" },
] as const

export default function CommandDialogExample() {
  const [open, setOpen] = useState(false)

  return (
    <div className="mx-auto flex w-full max-w-xl justify-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <Button variant="strong" onClick={() => setOpen(true)}>
          Open command palette
        </Button>
        <DialogContent className="max-w-2xl overflow-hidden p-0">
          <DialogTitle className="sr-only">Search documentation</DialogTitle>
          <Command>
            <CommandInput autoFocus placeholder="Search documentation..." />
            <CommandList>
              <CommandEmpty>No page found.</CommandEmpty>
              <CommandGroup heading="Documentation">
                {pages.map((page) => (
                  <CommandItem key={page.href} onSelect={() => setOpen(false)}>
                    {page.label}
                    <CommandShortcut>{page.href}</CommandShortcut>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  )
}
