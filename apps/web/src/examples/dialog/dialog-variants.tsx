import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@glass-ui-kit/glass"

const variants = [
  { label: "Default", value: "default" as const },
  { label: "Soft", value: "soft" as const },
  { label: "Strong", value: "strong" as const },
]

export default function DialogVariants() {
  return (
    <div className="mx-auto grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-3">
      {variants.map((variant) => (
        <div key={variant.value} className="flex justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="transparent" size="sm">
                {variant.label}
              </Button>
            </DialogTrigger>
            <DialogContent variant={variant.value} className="max-w-sm">
              <DialogHeader>
                <DialogTitle>{variant.label} surface</DialogTitle>
                <DialogDescription>
                  Tune the modal depth without changing the structure of the overlay or content.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </div>
  )
}
