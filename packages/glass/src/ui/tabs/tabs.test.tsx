import { createRef, useState } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { Tabs, TabsContent, TabsList, TabsTrigger, tabsVariants } from "./index"

describe("Tabs", () => {
  it("renders the selected trigger and panel by default", () => {
    render(
      <Tabs defaultValue="account">
        <TabsList aria-label="Settings tabs">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Account content</TabsContent>
        <TabsContent value="security">Security content</TabsContent>
      </Tabs>,
    )

    expect(screen.getByRole("tab", { name: "Account" })).toHaveAttribute("aria-selected", "true")
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Account content")
    expect(screen.queryByText("Security content")).not.toBeInTheDocument()
  })

  it("changes tabs on click", async () => {
    const user = userEvent.setup()

    render(
      <Tabs defaultValue="account">
        <TabsList aria-label="Settings tabs">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Account content</TabsContent>
        <TabsContent value="security">Security content</TabsContent>
      </Tabs>,
    )

    await user.click(screen.getByRole("tab", { name: "Security" }))

    expect(screen.getByRole("tab", { name: "Security" })).toHaveAttribute("aria-selected", "true")
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Security content")
  })

  it("supports keyboard navigation", async () => {
    const user = userEvent.setup()

    render(
      <Tabs defaultValue="account">
        <TabsList aria-label="Settings tabs">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Account content</TabsContent>
        <TabsContent value="security">Security content</TabsContent>
      </Tabs>,
    )

    await user.tab()
    await user.keyboard("{ArrowRight}")

    expect(screen.getByRole("tab", { name: "Security" })).toHaveAttribute("aria-selected", "true")
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Security content")
  })

  it("prevents interaction when a trigger is disabled", async () => {
    const user = userEvent.setup()

    render(
      <Tabs defaultValue="account">
        <TabsList aria-label="Settings tabs">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security" disabled>
            Security
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">Account content</TabsContent>
        <TabsContent value="security">Security content</TabsContent>
      </Tabs>,
    )

    const disabledTrigger = screen.getByRole("tab", { name: "Security" })

    expect(disabledTrigger).toHaveAttribute("data-disabled")
    expect(disabledTrigger).toHaveClass("disabled:opacity-50")

    await user.click(disabledTrigger)

    expect(screen.getByRole("tab", { name: "Account" })).toHaveAttribute("aria-selected", "true")
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Account content")
  })

  it("applies list variants and trigger sizes", () => {
    render(
      <>
        <Tabs defaultValue="account">
          <TabsList variant="soft" aria-label="Soft tabs" data-testid="soft-list">
            <TabsTrigger value="account" size="sm">
              Account
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">Account content</TabsContent>
        </Tabs>

        <Tabs defaultValue="security">
          <TabsList variant="strong" aria-label="Strong tabs" data-testid="strong-list">
            <TabsTrigger value="security" size="lg">
              Security
            </TabsTrigger>
          </TabsList>
          <TabsContent value="security">Security content</TabsContent>
        </Tabs>
      </>,
    )

    expect(screen.getByTestId("soft-list")).toHaveClass("glass", "glass-soft")
    expect(screen.getByTestId("strong-list")).toHaveClass("glass", "glass-strong")
    expect(screen.getByRole("tab", { name: "Account" })).toHaveClass("h-5", "text-xs")
    expect(screen.getByRole("tab", { name: "Security" })).toHaveClass("h-8", "text-base")
  })

  it("keeps className as an escape hatch", () => {
    render(
      <Tabs defaultValue="account">
        <TabsList className="max-w-md" aria-label="Settings tabs">
          <TabsTrigger value="account" className="tracking-wide">
            Account
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="border-dashed">
          Account content
        </TabsContent>
      </Tabs>,
    )

    expect(screen.getByRole("tablist")).toHaveClass("glass", "max-w-md")
    expect(screen.getByRole("tab", { name: "Account" })).toHaveClass("tracking-wide")
    expect(screen.getByRole("tabpanel")).toHaveClass("border-dashed")
  })

  it("supports controlled usage", async () => {
    const user = userEvent.setup()

    function ControlledTabs() {
      const [value, setValue] = useState("account")

      return (
        <Tabs value={value} onValueChange={setValue}>
          <TabsList aria-label="Settings tabs">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Account content</TabsContent>
          <TabsContent value="security">Security content</TabsContent>
        </Tabs>
      )
    }

    render(<ControlledTabs />)

    await user.click(screen.getByRole("tab", { name: "Security" }))

    expect(screen.getByRole("tab", { name: "Security" })).toHaveAttribute("aria-selected", "true")
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Security content")
  })

  it("forwards refs and native props", () => {
    const ref = createRef<HTMLButtonElement>()

    render(
      <Tabs defaultValue="account">
        <TabsList aria-label="Settings tabs">
          <TabsTrigger ref={ref} value="account" data-testid="account-tab">
            Account
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">Account content</TabsContent>
      </Tabs>,
    )

    expect(ref.current).toBe(screen.getByTestId("account-tab"))
  })

  it("exports all sub-components and variant objects", () => {
    expect(Tabs).toBeDefined()
    expect(TabsList).toBeDefined()
    expect(TabsTrigger).toBeDefined()
    expect(TabsContent).toBeDefined()
    expect(tabsVariants).toBeDefined()
  })
})
