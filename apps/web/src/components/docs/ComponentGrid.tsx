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
          as="a"
          href={item.href}
          className="w-full justify-start py-6 px-4 text-md font-normal text-foreground"
        >
          {item.title}
        </Button>
      ))}
    </div>
  )
}
