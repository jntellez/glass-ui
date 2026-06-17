import { Button, Popover, PopoverContent, PopoverTrigger } from "@glass-ui-kit/glass"

const sides = [
  { label: "Top", value: "top" as const },
  { label: "Right", value: "right" as const },
  { label: "Bottom", value: "bottom" as const },
  { label: "Left", value: "left" as const },
]

export default function PopoverSides() {
  return (
    <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-3">
      {sides.map((side) => (
        <div key={side.value} className="flex justify-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button size="sm">{side.label}</Button>
            </PopoverTrigger>
            <PopoverContent side={side.value} className="w-52 space-y-1.5">
              <p className="text-sm font-medium text-foreground">{side.label} placement</p>
              <p className="text-xs leading-5 text-muted-foreground">
                Keep small actions close to the trigger with directional placement.
              </p>
            </PopoverContent>
          </Popover>
        </div>
      ))}
    </div>
  )
}
