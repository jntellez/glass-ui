import { Field, FieldError, Label, NativeOption, NativeSelect } from "@glass-ui-kit/glass"

export default function NativeSelectError() {
  return (
    <Field invalid className="w-full max-w-sm mx-auto space-y-1.5">
      <Label>Department</Label>
      <NativeSelect defaultValue="">
        <NativeOption value="" disabled>
          Select department
        </NativeOption>
        <NativeOption value="design">Design</NativeOption>
        <NativeOption value="engineering">Engineering</NativeOption>
        <NativeOption value="product">Product</NativeOption>
      </NativeSelect>
      <FieldError>Please choose a department.</FieldError>
    </Field>
  )
}
