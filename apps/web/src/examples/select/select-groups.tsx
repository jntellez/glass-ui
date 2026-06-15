import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemText,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@glass-ui-kit/glass"

export default function SelectGroups() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <Select defaultValue="frontend">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Engineering</SelectLabel>
            <SelectItem value="frontend">
              <SelectItemText>Frontend</SelectItemText>
            </SelectItem>
            <SelectItem value="backend">
              <SelectItemText>Backend</SelectItemText>
            </SelectItem>
            <SelectItem value="devops">
              <SelectItemText>DevOps</SelectItemText>
            </SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Product</SelectLabel>
            <SelectItem value="design">
              <SelectItemText>Design</SelectItemText>
            </SelectItem>
            <SelectItem value="pm">
              <SelectItemText>Product Manager</SelectItemText>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
