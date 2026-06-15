import {
  Field,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectTrigger,
  SelectValue,
} from "@glass-ui-kit/glass"

export default function SelectDemo() {
  return (
    <Field className="w-full max-w-sm mx-auto space-y-1.5">
      <Label>Country</Label>
      <Select defaultValue="mx">
        <SelectTrigger variant="soft" className="w-full">
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="mx">
            <SelectItemText>Mexico</SelectItemText>
          </SelectItem>
          <SelectItem value="co">
            <SelectItemText>Colombia</SelectItemText>
          </SelectItem>
          <SelectItem value="ar">
            <SelectItemText>Argentina</SelectItemText>
          </SelectItem>
        </SelectContent>
      </Select>
    </Field>
  )
}
