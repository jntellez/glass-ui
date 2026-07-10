import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@glass-ui-kit/glass"

const sizes = [
  { label: "Compact", className: "max-w-sm" },
  { label: "Default", className: "max-w-lg" },
  { label: "Expanded", className: "max-w-2xl" },
]

export default function DialogSizes() {
  return (
    <div className="mx-auto grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-3">
      {sizes.map((size) => (
        <div key={size.label} className="flex justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                {size.label}
              </Button>
            </DialogTrigger>
            <DialogContent className={size.className}>
              <DialogHeader>
                <DialogTitle>{size.label} layout</DialogTitle>
                <DialogDescription>
                  Use className as the escape hatch when the modal needs more or less horizontal
                  space.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </div>
  )
}
