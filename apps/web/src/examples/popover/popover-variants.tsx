import { Button, Popover, PopoverContent, PopoverTrigger } from "@glass-ui-kit/glass"

const variants = [
  { label: "Default", value: "default" as const },
  { label: "Soft", value: "soft" as const },
  { label: "Strong", value: "strong" as const },
]

export default function PopoverVariants() {
  return (
    <div className="mx-auto grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-3">
      {variants.map((variant) => (
        <div key={variant.value} className="flex justify-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="transparent" size="sm">
                {variant.label}
              </Button>
            </PopoverTrigger>
            <PopoverContent variant={variant.value} className="w-56 space-y-2">
              <p className="text-sm font-medium text-foreground">{variant.label} surface</p>
              <p className="text-xs leading-5 text-muted-foreground">
                Tune the floating surface depth without changing the trigger structure.
              </p>
            </PopoverContent>
          </Popover>
        </div>
      ))}
    </div>
  )
}
