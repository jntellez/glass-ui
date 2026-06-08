import { sidebarNav } from "@/config/docs"
import { Button } from "@glass-ui-kit/glass"

export default function ComponentGrid() {
  const componentsSection = sidebarNav.find((section) => section.title === "Components")
  const components = componentsSection?.items || []

  return (
    <div className="not-prose grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {components.map((item) => (
        <Button
          key={item.href}
          asChild
          variant="transparent"
          className="justify-start text-foreground py-6 px-4"
        >
          <a href={item.href}>{item.title}</a>
        </Button>
      ))}
    </div>
  )
}
