import * as React from "react";
import { examples, type ExampleName } from "@/examples/index";
import CodeBlock from "./CodeBlock";
import { Button, Card } from "@glass-ui-kit/glass";

interface ComponentPreviewProps {
  name: ExampleName;
  height?: number | string;
}

export default function ComponentPreview({ name, height = 300 }: ComponentPreviewProps) {
  const [view, setView] = React.useState<"preview" | "code">("preview");
  const example = examples[name];
  const heightStyle = typeof height === "number" ? `${height}px` : height;
  const codeHeightStyle = typeof height === "number" ? `${height + 2}px` : `calc(${height} + 2px)`;

  if (!example) {
    return (
      <div className="p-4 border border-red-500/50 bg-red-500/10 text-red-500 rounded-[var(--glass-radius-md)] text-sm">
        Error: Example "{name}" not found in registry.
      </div>
    );
  }

  const { component: Preview, code } = example;

  return (
    <div className="not-prose p-0 my-8 flex flex-col">

      <div className="relative w-full border-b border-glass-border">
        {view === "preview" ? (
          <Card className="p-0 rounded-bl-none rounded-br-none overflow-hidden">
            <div className="relative flex items-center justify-center bg-gradient-to-br from-purple-400/20 to-pink-400/20 dark:from-purple-900/40 dark:to-blue-900/40" style={{ height: heightStyle }}>
              <Preview />
            </div>
          </Card>
        ) : (
          <div className="relative w-full bg-transparent overflow-hidden" style={{ height: codeHeightStyle }}>
            <CodeBlock code={code} lang="tsx" showLineNumbers className="m-0 w-full h-full rounded-bl-none rounded-br-none" />
          </div>
        )}
      </div>

      <Card className="glass flex border-t-0 rounded-tl-none rounded-tr-none p-3">
        <div className="flex gap-2">
          <Button
            onClick={() => setView("preview")}
            className={`transition-all duration-200 ${view === "preview"
              ? "glass glass-strong"
              : "text-muted-foreground hover:text-foreground"
              }`}
          >
            Preview
          </Button>

          <Button
            onClick={() => setView("code")}
            className={`transition-all duration-200 ${view === "code"
              ? "glass glass-strong"
              : "text-muted-foreground hover:text-foreground"
              }`}
          >
            Code
          </Button>
        </div>
      </Card>

    </div>
  );
}