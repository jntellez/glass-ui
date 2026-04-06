import { useState } from "react"
import { Input, Button } from "@glass-ui-kit/glass"
import { Eye, EyeOff } from "lucide-react"

export default function InputPassword() {
  const [show, setShow] = useState(false)

  return (
    <div className="relative w-full max-w-sm mx-auto space-y-1.5">
      <label htmlFor="password" className="text-sm font-medium">
        Password
      </label>
      <div className="relative">
        <Input
          id="password"
          type={show ? "text" : "password"}
          defaultValue="hI9$2@1n"
          placeholder="Enter your password"
          className="glass pr-10"
        />
        <Button
          type="button"
          className="btn-icon absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 bg-transparent border-0 hover:shadow-none text-muted-foreground hover:text-foreground"
          onClick={() => setShow(!show)}
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  )
}
