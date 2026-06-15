import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectTrigger,
  SelectValue,
} from "@glass-ui-kit/glass"

const variants = ["default", "soft", "strong", "transparent"] as const

export default function SelectVariants() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
      {variants.map((variant) => (
        <Select key={variant} defaultValue="option-1">
          <SelectTrigger variant={variant} className="w-full">
            <SelectValue placeholder={variant} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option-1">
              <SelectItemText>Option One</SelectItemText>
            </SelectItem>
            <SelectItem value="option-2">
              <SelectItemText>Option Two</SelectItemText>
            </SelectItem>
            <SelectItem value="option-3">
              <SelectItemText>Option Three</SelectItemText>
            </SelectItem>
          </SelectContent>
        </Select>
      ))}
    </div>
  )
}
