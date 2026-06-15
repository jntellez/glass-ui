import { Field, Label, NativeOption, NativeSelect } from "@glass-ui-kit/glass"

export default function NativeSelectDisabled() {
  return (
    <Field className="w-full max-w-sm mx-auto space-y-1.5">
      <Label>Role</Label>
      <NativeSelect disabled defaultValue="admin" variant="soft">
        <NativeOption value="admin">Admin</NativeOption>
        <NativeOption value="editor">Editor</NativeOption>
        <NativeOption value="viewer">Viewer</NativeOption>
      </NativeSelect>
    </Field>
  )
}
