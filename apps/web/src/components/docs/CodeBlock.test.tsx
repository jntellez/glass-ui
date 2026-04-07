import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import CodeBlock from "./CodeBlock"

vi.mock("@glass-ui-kit/glass", () => ({
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  ),
  Button: ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button className={className} {...props}>
      {children}
    </button>
  ),
}))

vi.mock("./CopyButton", () => ({
  default: ({ code }: { code: string }) => <button type="button">Copy {code}</button>,
}))

vi.mock("@/lib/prism-setup", () => ({}))

vi.mock("prism-react-renderer", () => {
  const Highlight = ({
    code,
    children,
  }: {
    code: string
    children: (props: any) => React.ReactNode
  }) => {
    const tokens = code.split("\n").map((line) => [{ content: line }])

    return children({
      className: "mock-highlight",
      style: {},
      tokens,
      getLineProps: ({ key, className }: { key: number; className?: string }) => ({
        key,
        className,
      }),
      getTokenProps: ({ token, key }: { token: { content: string }; key: number }) => ({
        key,
        children: token.content,
      }),
    })
  }

  return {
    Highlight,
    Prism: {},
    themes: {
      github: {},
      vsDark: {},
    },
  }
})

describe("CodeBlock", () => {
  it("toggles both expand controls from the same expanded state", async () => {
    const user = userEvent.setup()

    render(<CodeBlock code={`const one = 1\nconst two = 2`} expandable />)

    expect(screen.getByRole("button", { name: /expand code/i })).toBeInTheDocument()
    expect(screen.getAllByRole("button", { name: "Expand" })).toHaveLength(1)

    await user.click(screen.getByRole("button", { name: "Expand" }))

    expect(screen.getByRole("button", { name: /collapse code/i })).toBeInTheDocument()
    expect(screen.getAllByRole("button", { name: "Collapse" })).toHaveLength(1)
  })

  it("highlights the requested line ranges when line numbers are shown", () => {
    render(<CodeBlock code={`alpha\nbeta\ngamma\ndelta`} showLineNumbers highlightLines="{2-3}" />)

    const lineOneNumber = screen.getAllByText("1")[0]
    const lineTwoNumber = screen.getAllByText("2")[0]
    const betaLine = screen.getAllByText("beta")[0].closest("div")

    expect(lineOneNumber).not.toHaveClass("font-bold")
    expect(lineTwoNumber).toHaveClass("font-bold")
    expect(betaLine).toHaveClass("bg-muted-foreground/7")
  })
})
