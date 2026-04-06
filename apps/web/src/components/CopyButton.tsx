import { Button } from "@glass-ui-kit/glass"
import { Check, Copy } from "lucide-react"
import * as React from "react"

interface CopyButtonProps {
  code: string
}

export default function CopyButton({ code }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    if (hasCopied) {
      const timeout = setTimeout(() => setHasCopied(false), 2000)
      return () => clearTimeout(timeout)
    }
  }, [hasCopied])

  const copyToClipboard = React.useCallback(() => {
    navigator.clipboard.writeText(code)
    setHasCopied(true)
  }, [code])

  return (
    <Button
      onClick={copyToClipboard}
      className="glass absolute top-1.5 right-1.5 z-40 h-7 w-7 p-1 hover:glass-strong"
      aria-label="Copy to clipboard"
    >
      {hasCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      <span className="sr-only">Copy code</span>
    </Button>
  )
}
