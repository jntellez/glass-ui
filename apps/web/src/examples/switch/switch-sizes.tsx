import { Field, Label, Switch } from "@glass-ui-kit/glass"

const sizes = [
  { id: "switch-size-sm", label: "Small", size: "sm" as const },
  { id: "switch-size-md", label: "Default", size: "md" as const },
  { id: "switch-size-lg", label: "Large", size: "lg" as const },
]

export default function SwitchSizes() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-3">
      {sizes.map((item, index) => (
        <Field
          key={item.id}
          className="flex items-center justify-between gap-4 rounded-glass-md border border-glass-border/50 bg-white/5 p-3"
        >
          <Label htmlFor={item.id}>{item.label}</Label>
          <Switch id={item.id} size={item.size} defaultChecked={index > 0} />
        </Field>
      ))}
    </div>
  )
}
