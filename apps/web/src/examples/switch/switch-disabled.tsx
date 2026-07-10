import { Field, FieldDescription, Label, Switch } from "@glass-ui-kit/glass"

export default function SwitchDisabled() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-3">
      <Field className="flex items-start justify-between gap-4 rounded-glass-md border border-glass-border/50 bg-white/5 p-4 opacity-80">
        <div className="space-y-1">
          <Label htmlFor="switch-disabled-off">Billing emails</Label>
          <FieldDescription>This preference is managed by your workspace admin.</FieldDescription>
        </div>
        <Switch id="switch-disabled-off" disabled />
      </Field>

      <Field className="flex items-start justify-between gap-4 rounded-glass-md border border-glass-border/50 bg-white/5 p-4 opacity-80">
        <div className="space-y-1">
          <Label htmlFor="switch-disabled-on">Security alerts</Label>
          <FieldDescription>
            Critical alerts stay enabled even when the control is locked.
          </FieldDescription>
        </div>
        <Switch id="switch-disabled-on" defaultChecked disabled />
      </Field>
    </div>
  )
}
