import { NativeOption, NativeSelect } from "@glass-ui-kit/glass"

export default function SelectDemo() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <NativeSelect id="country" defaultValue="mx" className="glass glass-soft">
        <NativeOption value="mx">Mexico</NativeOption>
        <NativeOption value="co">Colombia</NativeOption>
        <NativeOption value="ar">Argentina</NativeOption>
      </NativeSelect>
    </div>
  )
}
