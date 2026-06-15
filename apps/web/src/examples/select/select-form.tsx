import {
  Field,
  FieldDescription,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectTrigger,
  SelectValue,
} from "@glass-ui-kit/glass"

export default function SelectForm() {
  return (
    <Field className="w-full max-w-sm mx-auto space-y-1.5">
      <Label>Department</Label>
      <Select defaultValue="engineering">
        <SelectTrigger variant="soft" className="w-full">
          <SelectValue placeholder="Select a department" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="engineering">
            <SelectItemText>Engineering</SelectItemText>
          </SelectItem>
          <SelectItem value="design">
            <SelectItemText>Design</SelectItemText>
          </SelectItem>
          <SelectItem value="product">
            <SelectItemText>Product</SelectItemText>
          </SelectItem>
          <SelectItem value="marketing">
            <SelectItemText>Marketing</SelectItemText>
          </SelectItem>
        </SelectContent>
      </Select>
      <FieldDescription>Choose the department for this project.</FieldDescription>
    </Field>
  )
}
