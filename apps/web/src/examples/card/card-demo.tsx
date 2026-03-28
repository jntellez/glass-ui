import { Card, Button, Input } from "@glass-ui-kit/glass"

export default function CardDemo() {
  return (
    <Card className="w-full max-w-sm mx-auto flex flex-col gap-6">
      <div className="space-y-1.5">
        <h3 className="text-xl font-semibold tracking-tight">Welcome back</h3>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your account.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Email
          </label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium leading-none">
              Password
            </label>
            <a href="#" className="text-xs font-medium text-muted-foreground hover:text-foreground">
              Forgot password?
            </a>
          </div>
          <Input id="password" type="password" />
        </div>

        <Button className="glass glass-soft w-full mt-2">Sign In</Button>
      </div>
    </Card>
  )
}