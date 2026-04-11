import { NativeOption, NativeSelect } from "@glass-ui-kit/glass"

export default function NativeSelectError() {
  return (
    <div className="w-full max-w-sm mx-auto space-y-1.5">
      <label htmlFor="department_error" className="text-sm font-medium">
        Department
      </label>
      <NativeSelect
        id="department_error"
        aria-invalid="true"
        defaultValue=""
        className="glass border-destructive/50 dark:border-destructive/80 focus-visible:ring-destructive/50"
      >
        <NativeOption value="" disabled>
          Select department
        </NativeOption>
        <NativeOption value="design">Design</NativeOption>
        <NativeOption value="engineering">Engineering</NativeOption>
        <NativeOption value="product">Product</NativeOption>
      </NativeSelect>
      <p className="text-[11px] font-medium text-destructive">Please choose a department.</p>
    </div>
  )
}
