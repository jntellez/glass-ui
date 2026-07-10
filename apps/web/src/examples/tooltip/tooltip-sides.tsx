import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@glass-ui-kit/glass"

const sides = [
  { label: "Top", value: "top" as const },
  { label: "Right", value: "right" as const },
  { label: "Bottom", value: "bottom" as const },
  { label: "Left", value: "left" as const },
] as const

export default function TooltipSides() {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-3">
        {sides.map((side) => (
          <div key={side.value} className="flex justify-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm">{side.label}</Button>
              </TooltipTrigger>
              <TooltipContent side={side.value} className="max-w-44 text-center">
                Keep small hints near the control without covering nearby actions.
              </TooltipContent>
            </Tooltip>
          </div>
        ))}
      </div>
    </TooltipProvider>
  )
}
