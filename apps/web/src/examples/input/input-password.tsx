import { useState } from "react"
import { Button, Field, Input, Label } from "@glass-ui-kit/glass"
import { Eye, EyeOff } from "lucide-react"

export default function InputPassword() {
  const [show, setShow] = useState(false)

  return (
    <Field className="relative w-full max-w-sm space-y-1.5">
      <Label>Password</Label>
      <div className="relative">
        <Input
          type={show ? "text" : "password"}
          variant="soft"
          defaultValue="hI9$2@1n"
          placeholder="Enter your password"
          className="pr-10"
        />
        <Button
          type="button"
          size="icon"
          variant="ghost"
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          onClick={() => setShow(!show)}
        >
          {show ? <EyeOff /> : <Eye />}
        </Button>
      </div>
    </Field>
  )
}
