import * as React from "react";
import CopyButton from "./CopyButton";
import { InlineCode } from "./Typography";
import { Button, Card } from "@glass-ui-kit/glass";

interface CommandTabsProps {
  npm: string;
  pnpm?: string;
  yarn?: string;
  bun?: string;
}

type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

export default function CommandTabs({ npm, pnpm, yarn, bun }: CommandTabsProps) {
  const [activeTab, setActiveTab] = React.useState<PackageManager>(pnpm ? "pnpm" : "npm");

  const commands: Record<PackageManager, string | undefined> = {
    npm,
    pnpm,
    yarn,
    bun,
  };

  const availableTabs = (Object.keys(commands) as PackageManager[]).filter(
    (key) => commands[key] !== undefined
  );

  const activeCommand = commands[activeTab] || npm;

  return (
    <Card className="p-0 my-6 shadow-glass-m overflow-hidden">

      <div className="relative flex gap-1.5 p-1.5 pb-2.5 items-center overflow-x-auto">
        {availableTabs.map((tab) => (
          <Button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative h-7 px-3 text-sm font-medium transition-colors ${activeTab === tab
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
          <InlineCode className="bg-transparent px-0">{activeCommand}</InlineCode>
        </div>
      </div>

    </Card>
  );
}