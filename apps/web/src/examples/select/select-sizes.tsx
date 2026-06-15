import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectTrigger,
  SelectValue,
} from "@glass-ui-kit/glass"

export default function SelectSizes() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
      <Select defaultValue="sm">
        <SelectTrigger size="sm" className="w-full">
          <SelectValue placeholder="Small" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sm">
            <SelectItemText>Small</SelectItemText>
          </SelectItem>
          <SelectItem value="md">
            <SelectItemText>Medium</SelectItemText>
          </SelectItem>
          <SelectItem value="lg">
            <SelectItemText>Large</SelectItemText>
          </SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="md">
        <SelectTrigger size="md" className="w-full">
          <SelectValue placeholder="Medium" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sm">
            <SelectItemText>Small</SelectItemText>
          </SelectItem>
          <SelectItem value="md">
            <SelectItemText>Medium</SelectItemText>
          </SelectItem>
          <SelectItem value="lg">
            <SelectItemText>Large</SelectItemText>
          </SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="lg">
        <SelectTrigger size="lg" className="w-full">
          <SelectValue placeholder="Large" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sm">
            <SelectItemText>Small</SelectItemText>
          </SelectItem>
          <SelectItem value="md">
            <SelectItemText>Medium</SelectItemText>
          </SelectItem>
          <SelectItem value="lg">
            <SelectItemText>Large</SelectItemText>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
