import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import ComponentPreview from "./ComponentPreview"

vi.mock("@/examples/index", () => ({
  examples: {
    "button-default": {
      component: () => <div>Mock preview</div>,
      code: "const demo = true",
    },
  },
}))

vi.mock("./CodeBlock", () => ({
  default: ({ code }: { code: string }) => <div data-testid="code-block">{code}</div>,
}))

describe("ComponentPreview", () => {
  it("switches between preview and code while preserving the expected heights", async () => {
    const user = userEvent.setup()

    render(<ComponentPreview name={"button-default" as never} height={320} />)

    const previewContent = screen.getByText("Mock preview")

    expect(previewContent).toBeInTheDocument()
    expect(previewContent.parentElement).toHaveStyle({ height: "320px" })
    expect(screen.queryByTestId("code-block")).not.toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Code" }))

    const codeBlock = screen.getByTestId("code-block")

    expect(screen.queryByText("Mock preview")).not.toBeInTheDocument()
    expect(codeBlock).toHaveTextContent("const demo = true")
    expect(codeBlock.parentElement).toHaveStyle({ height: "322px" })

    await user.click(screen.getByRole("button", { name: "Preview" }))

    expect(screen.getByText("Mock preview")).toBeInTheDocument()
    expect(screen.queryByTestId("code-block")).not.toBeInTheDocument()
  })

  it("shows a clear error when the example is missing from the registry", () => {
    render(<ComponentPreview name={"missing-example" as never} height="50vh" />)

    expect(
      screen.getByText('Error: Example "missing-example" not found in registry.'),
    ).toBeInTheDocument()
  })
})
