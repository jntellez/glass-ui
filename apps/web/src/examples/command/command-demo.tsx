import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@glass-ui-kit/glass"

export default function CommandDemo() {
  return (
    <div className="mx-auto w-full max-w-xl">
      <Command>
        <CommandInput placeholder="Search commands and pages..." />
        <CommandList>
          <CommandEmpty>No matching results.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem>
              Components
              <CommandShortcut>/docs/components</CommandShortcut>
            </CommandItem>
            <CommandItem>
              Customization
              <CommandShortcut>/customization</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Actions">
            <CommandItem>
              Copy install command
              <CommandShortcut>Enter</CommandShortcut>
            </CommandItem>
            <CommandItem>
              Open GitHub
              <CommandShortcut>⌘G</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}
