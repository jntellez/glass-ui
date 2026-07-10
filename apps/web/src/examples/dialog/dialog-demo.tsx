import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from "@glass-ui-kit/glass"

export default function DialogDemo() {
  return (
    <div className="mx-auto flex w-full max-w-sm items-center justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="strong">Edit profile</Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Update the details your teammates see when they open the workspace.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="dialog-name">Name</Label>
              <Input id="dialog-name" defaultValue="Alex Morgan" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dialog-role">Role</Label>
              <Input id="dialog-role" defaultValue="Product Designer" />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="strong">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
