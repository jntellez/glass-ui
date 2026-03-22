import { Highlight, themes } from "prism-react-renderer";
import CopyButton from "./CopyButton";
import { cn } from "../lib/utils";
import { Card } from "@glass-ui-kit/glass";

interface ReactCodeBlockProps {
  code: string;
  lang?: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export default function CodeBlock({
  code,
  lang = "tsx",
  filename,
  showLineNumbers = false,
  className
}: ReactCodeBlockProps) {

  const renderCode = (theme: any, isDark: boolean) => (
    <Highlight theme={theme} code={code.trim()} language={lang as any}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div
          className={cn(
            "flex text-sm font-mono not-prose w-full",
            isDark ? "hidden dark:flex" : "flex dark:hidden"
          )}
          style={{ ...style, backgroundColor: "transparent" }}
        >
          {showLineNumbers && (
            <div className="flex flex-col w-12 shrink-0 pt-4 pb-4 select-none">
              {tokens.map((_, i) => (
                <span key={`line-${i}`} className="h-6 flex items-center justify-end pr-4 text-muted-foreground opacity-60">
                  {i + 1}
                </span>
              ))}
            </div>
          )}

          <div className={`flex-1 overflow-x-auto pt-4 pb-4 pr-4 ${!showLineNumbers ? "pl-4" : ""} editor-scrollbar no-scrollbar`}>
            <pre className="bg-transparent! p-0! m-0! min-w-max px-4">
              <code className="flex flex-col">
                {tokens.map((line, i) => {
                  const { key: lineKey, ...lineProps } = getLineProps({
                    line,
                    key: i,
                    className: "flex items-center h-6",
                  });

                  return (
                    <div key={lineKey as string | number} {...lineProps}>
                      {line.map((token, key) => {
                        const { key: tokenKey, ...tokenProps } = getTokenProps({
                          token,
                          key,
                        });

                        return <span key={tokenKey as string | number} {...tokenProps} />;
                      })}
                    </div>
                  );
                })}
              </code>
            </pre>
          </div>
        </div>
      )
      }
    </Highlight >
  );

  return (
    <Card className={`relative p-0 flex flex-col my-6 overflow-hidden ${className}`}>
      <CopyButton code={code} />

      {filename && (
        <div className="border-b border-glass-border px-4 py-1.5 shrink-0 bg-transparent">
          <span className="font-mono text-sm text-foreground">{filename}</span>
        </div>
      )}

      <div className="flex-1 overflow-y-auto editor-scrollbar no-scrollbar">
        {renderCode(themes.github, false)}
        {renderCode(themes.vsDark, true)}
      </div>
    </Card>
  );
}