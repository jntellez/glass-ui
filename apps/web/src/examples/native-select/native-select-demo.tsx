import { Field, FieldDescription, Label, NativeOption, NativeSelect } from "@glass-ui-kit/glass"

export default function NativeSelectDemo() {
  return (
    <Field className="w-full max-w-sm mx-auto space-y-1.5">
      <Label>Country</Label>
      <NativeSelect defaultValue="mx" variant="soft">
        <NativeOption value="mx">Mexico</NativeOption>
        <NativeOption value="co">Colombia</NativeOption>
        <NativeOption value="ar">Argentina</NativeOption>
      </NativeSelect>
      <FieldDescription>Used to localize billing and tax settings.</FieldDescription>
    </Field>
  )
}
