import * as React from "react"
import CopyButton from "./CopyButton"
import { InlineCode } from "./Typography"
import { Button, Card } from "@glass-ui-kit/glass"

interface CommandTabsProps {
  npm: string
  pnpm?: string
  yarn?: string
  bun?: string
}

type PackageManager = "npm" | "pnpm" | "yarn" | "bun"

const STORAGE_KEY = "glass-ui-settings"

export default function CommandTabs({ npm, pnpm, yarn, bun }: CommandTabsProps) {
  const commands = React.useMemo<Record<PackageManager, string | undefined>>(
    () => ({
      npm,
      pnpm,
      yarn,
      bun,
    }),
    [npm, pnpm, yarn, bun],
  )

  const availableTabs = React.useMemo(() => {
    return (Object.keys(commands) as PackageManager[]).filter((key) => commands[key] !== undefined)
  }, [commands])

  const [activeTab, setActiveTab] = React.useState<PackageManager>("npm")

  React.useEffect(() => {
    try {
      const storedSettings = localStorage.getItem(STORAGE_KEY)
      if (storedSettings) {
        const parsedSettings = JSON.parse(storedSettings)
        const savedTab = parsedSettings.packageManager

        if (savedTab && availableTabs.includes(savedTab)) {
          setActiveTab(savedTab)
        }
      }
    } catch (error) {
      console.error("Error to read config:", error)
    }

    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<PackageManager>
      const newTab = customEvent.detail

      if (availableTabs.includes(newTab)) {
        setActiveTab(newTab)
      }
    }

    window.addEventListener("pm-change", handleCustomEvent)
    return () => window.removeEventListener("pm-change", handleCustomEvent)
  }, [availableTabs])

  const handleTabChange = (tab: PackageManager) => {
    setActiveTab(tab)

    try {
      const storedSettings = localStorage.getItem(STORAGE_KEY)
      const parsedSettings = storedSettings ? JSON.parse(storedSettings) : {}

      parsedSettings.packageManager = tab

      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedSettings))
    } catch (error) {
      console.error("Error to save config:", error)
    }

    window.dispatchEvent(new CustomEvent("pm-change", { detail: tab }))
  }

  const activeCommand = commands[activeTab] || npm

  return (
    <Card className="p-0 my-6 overflow-hidden">
      <div className="relative flex gap-1.5 p-1.5 pb-2.5 items-center overflow-x-auto">
        {availableTabs.map((tab) => (
          <Button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`relative h-7 px-3 font-mono text-sm transition-colors ${
              activeTab === tab
                ? "glass glass-strong text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </Button>
        ))}
        <CopyButton code={activeCommand} />
      </div>

      <div className="not-prose px-4 pb-3 pt-0.5">
        <div className="flex items-center overflow-x-auto">
          <InlineCode className="bg-transparent font-normal px-0">{activeCommand}</InlineCode>
        </div>
      </div>
    </Card>
  )
}
