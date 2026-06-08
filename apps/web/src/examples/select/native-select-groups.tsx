import { NativeGroup, NativeOption, NativeSelect } from "@glass-ui-kit/glass"

export default function NativeSelectGroups() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <NativeSelect defaultValue="frontend" uiSize="lg">
        <NativeGroup label="Engineering">
          <NativeOption value="frontend">Frontend</NativeOption>
          <NativeOption value="backend">Backend</NativeOption>
          <NativeOption value="devops">DevOps</NativeOption>
        </NativeGroup>

        <NativeGroup label="Product">
          <NativeOption value="design">Design</NativeOption>
          <NativeOption value="pm">Product Manager</NativeOption>
        </NativeGroup>
      </NativeSelect>
    </div>
  )
}
