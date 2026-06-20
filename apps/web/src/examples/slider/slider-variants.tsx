import { Slider } from "@glass-ui-kit/glass"

const variants = ["default", "soft", "strong", "transparent"] as const

export default function SliderVariants() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
      {variants.map((variant, index) => (
        <div key={variant} className="space-y-2">
          <div className="flex items-center justify-between text-sm capitalize">
            <span>{variant}</span>
            <span className="text-muted-foreground">{(index + 1) * 20}%</span>
          </div>
          <Slider aria-label={variant} variant={variant} defaultValue={[(index + 1) * 20]} />
        </div>
      ))}
    </div>
  )
}
