import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@glass-ui-kit/glass"

export default function CommandGroups() {
  return (
    <div className="mx-auto w-full max-w-xl">
      <Command>
        <CommandInput placeholder="Jump to a component..." />
        <CommandList>
          <CommandEmpty>No component found.</CommandEmpty>
          <CommandGroup heading="Foundations">
            <CommandItem>
              Button
              <CommandShortcut>UI</CommandShortcut>
            </CommandItem>
            <CommandItem>
              Input
              <CommandShortcut>UI</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Overlays">
            <CommandItem>
              Dialog
              <CommandShortcut>Overlay</CommandShortcut>
            </CommandItem>
            <CommandItem>
              Tooltip
              <CommandShortcut>Overlay</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}
