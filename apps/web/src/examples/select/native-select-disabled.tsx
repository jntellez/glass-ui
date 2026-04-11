import { NativeOption, NativeSelect } from "@glass-ui-kit/glass"

export default function SelectDisabled() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <NativeSelect disabled defaultValue="pending">
        <NativeOption value="pending">Pending approval</NativeOption>
        <NativeOption value="approved">Approved</NativeOption>
      </NativeSelect>
    </div>
  )
}
