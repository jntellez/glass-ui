import { createRef, useState } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { Button } from "../button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  dialogVariants,
} from "./index"

describe("Dialog", () => {
  it("renders closed by default and opens on click", async () => {
    const user = userEvent.setup()

    render(
      <Dialog>
        <DialogTrigger>Open dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Project settings</DialogTitle>
        </DialogContent>
      </Dialog>,
    )

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Open dialog" }))

    expect(screen.getByRole("dialog")).toBeVisible()
    expect(screen.getByText("Project settings")).toBeVisible()
  })

  it("supports keyboard interaction, description semantics, and escape to close", async () => {
    const user = userEvent.setup()

    render(
      <Dialog>
        <DialogTrigger>Open dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete project</DialogTitle>
            <DialogDescription>Permanently remove the current workspace.</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    )

    await user.tab()
    await user.keyboard("{Enter}")

    const dialog = screen.getByRole("dialog", { name: "Delete project" })
    expect(dialog).toBeVisible()
    expect(dialog).toHaveAccessibleDescription("Permanently remove the current workspace.")

    await user.keyboard("{Escape}")

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("supports controlled mode", async () => {
    const user = userEvent.setup()

    function ControlledDialog() {
      const [open, setOpen] = useState(false)

      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>Open dialog</DialogTrigger>
          <DialogContent>
            <DialogTitle>Controlled dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      )
    }

    render(<ControlledDialog />)

    await user.click(screen.getByRole("button", { name: "Open dialog" }))

    expect(screen.getByRole("dialog", { name: "Controlled dialog" })).toBeVisible()
  })

  it("supports trigger and close asChild composition", async () => {
    const user = userEvent.setup()

    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="strong">Launch dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite teammate</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Done</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    )

    const trigger = screen.getByRole("button", { name: "Launch dialog" })
    expect(trigger).toHaveClass("glass", "glass-strong")

    await user.click(trigger)
    await user.click(screen.getByRole("button", { name: "Done" }))

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("applies variants, forwards refs, and exports layout helpers", async () => {
    const user = userEvent.setup()
    const ref = createRef<HTMLDivElement>()

    expect(dialogVariants({ variant: "default" })).toContain("glass")
    expect(dialogVariants({ variant: "soft" })).toContain("glass-soft")
    expect(dialogVariants({ variant: "strong" })).toContain("glass-strong")

    render(
      <Dialog>
        <DialogTrigger>Preview dialog</DialogTrigger>
        <DialogContent ref={ref} variant="strong" className="max-w-sm" data-testid="dialog-content">
          <DialogHeader>
            <DialogTitle>Surface preview</DialogTitle>
            <DialogDescription>Check variant styling and helper exports.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    )

    await user.click(screen.getByRole("button", { name: "Preview dialog" }))

    expect(ref.current).toBe(screen.getByTestId("dialog-content"))
    expect(screen.getByTestId("dialog-content")).toHaveClass("glass", "glass-strong", "max-w-sm")
    expect(DialogHeader).toBeDefined()
    expect(DialogFooter).toBeDefined()
    expect(DialogTitle).toBeDefined()
    expect(DialogDescription).toBeDefined()
    expect(DialogClose).toBeDefined()
    expect(dialogVariants).toBeDefined()
  })

  it("lets consumers customize the overlay classes without losing defaults", async () => {
    const user = userEvent.setup()

    render(
      <Dialog>
        <DialogTrigger>Open dialog</DialogTrigger>
        <DialogContent overlayClassName="backdrop-blur-none" data-testid="dialog-content">
          <DialogTitle>Overlay override</DialogTitle>
        </DialogContent>
      </Dialog>,
    )

    await user.click(screen.getByRole("button", { name: "Open dialog" }))

    const overlay = screen.getByTestId("dialog-content").previousElementSibling
    expect(overlay).toHaveClass("bg-black/45", "backdrop-blur-none")
  })
})
