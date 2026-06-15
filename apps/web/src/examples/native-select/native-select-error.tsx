import { Field, Label, NativeOption, NativeSelect } from "@glass-ui-kit/glass"

export default function NativeSelectError() {
  return (
    <Field invalid className="w-full max-w-sm mx-auto space-y-1.5">
      <Label>Department</Label>
      <NativeSelect defaultValue="" variant="soft" aria-invalid="true">
        <NativeOption value="" disabled>
          Select a department
        </NativeOption>
        <NativeOption value="engineering">Engineering</NativeOption>
        <NativeOption value="design">Design</NativeOption>
      </NativeSelect>
    </Field>
  )
}
