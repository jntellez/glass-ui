import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectTrigger,
  SelectValue,
} from "@glass-ui-kit/glass"

export default function SelectDisabled() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
      <Select disabled defaultValue="admin">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">
            <SelectItemText>Admin</SelectItemText>
          </SelectItem>
          <SelectItem value="editor">
            <SelectItemText>Editor</SelectItemText>
          </SelectItem>
          <SelectItem value="viewer">
            <SelectItemText>Viewer</SelectItemText>
          </SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="editor">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">
            <SelectItemText>Admin</SelectItemText>
          </SelectItem>
          <SelectItem value="editor" disabled>
            <SelectItemText>Editor (disabled)</SelectItemText>
          </SelectItem>
          <SelectItem value="viewer">
            <SelectItemText>Viewer</SelectItemText>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
