import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@glass-ui-kit/glass"

const variants = [
  { label: "Default", value: "default" as const },
  { label: "Soft", value: "soft" as const },
  { label: "Strong", value: "strong" as const },
]

export default function DropdownMenuVariants() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-wrap items-center justify-center gap-4">
      {variants.map((variant) => (
        <DropdownMenu key={variant.value}>
          <DropdownMenuTrigger asChild>
            <Button variant={variant.value === "strong" ? "strong" : "default"}>
              {variant.label}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent variant={variant.value} className="w-48">
            <DropdownMenuItem>{variant.label} surface</DropdownMenuItem>
            <DropdownMenuItem>Secondary action</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </div>
  )
}
