import { useEffect, useMemo, useState } from "react"
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
import { docsCommandGroups, type SidebarSection } from "@/config/docs"

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  )
}

function isApplePlatform() {
  if (typeof navigator === "undefined") {
    return true
  }

  return /Mac|iPhone|iPad|iPod/.test(navigator.platform)
}

interface DocsCommandProps {
  groups?: SidebarSection[]
  onNavigate?: (href: string) => void
}

export default function DocsCommand({
  groups = docsCommandGroups,
  onNavigate = (href) => window.location.assign(href),
}: DocsCommandProps) {
  const [open, setOpen] = useState(false)
  const shortcutLabel = useMemo(() => (isApplePlatform() ? "⌘K" : "Ctrl K"), [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) {
        return
      }

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen((current) => !current)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        type="button"
        variant="transparent"
        className="hidden md:inline-flex items-center justify-between gap-4 font-normal hover:scale-none pr-3 pl-3 min-w-56 lg:min-w-72"
        onClick={() => setOpen(true)}
        aria-label="Open documentation search"
      >
        <span className="text-muted-foreground lg:hidden">Search...</span>
        <span className="hidden text-muted-foreground lg:inline">Search documentation...</span>
        <span className="rounded-glass-sm border border-glass-border/80 px-2 py-0.5 text-xs text-muted-foreground">
          {shortcutLabel}
        </span>
      </Button>

      <DialogContent className="max-w-2xl overflow-hidden p-0">
        <DialogTitle className="sr-only">Documentation search</DialogTitle>
        <Command>
          <CommandInput autoFocus placeholder="Search docs and components..." />
          <CommandList>
            <CommandEmpty>No matching page found.</CommandEmpty>
            {groups.map((group) => (
              <CommandGroup key={group.title} heading={group.title}>
                {group.items.map((item) => (
                  <CommandItem
                    key={item.href}
                    value={`${group.title} ${item.title} ${item.href}`}
                    keywords={[group.title, item.title, item.href]}
                    onSelect={() => {
                      setOpen(false)
                      onNavigate(item.href)
                    }}
                  >
                    <span className="min-w-0 flex-1 truncate">{item.title}</span>
                    <CommandShortcut>{item.href}</CommandShortcut>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}

export { isEditableTarget }
