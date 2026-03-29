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
            "relative flex text-sm font-mono not-prose w-full",
            isDark ? "hidden dark:flex" : "flex dark:hidden"
          )}
          style={{ ...style, backgroundColor: "transparent" }}
        >
          {showLineNumbers && (
            <div className="absolute top-0 left-0 bottom-0 w-12 flex flex-col pt-4 pb-4 select-none pointer-events-none z-0">
              {tokens.map((_, i) => (
                <span key={`line-${i}`} className="h-6 block leading-6 text-right pr-4 text-muted-foreground opacity-60">
                  {i + 1}
                </span>
              ))}
            </div>
          )}

          <div
            className={cn(
              "flex-1 overflow-x-auto pt-4 pb-4 pr-4 editor-scrollbar no-scrollbar z-10",
              showLineNumbers ? "pl-12" : "pl-4"
            )}
            style={{
              maskImage: showLineNumbers ? 'linear-gradient(to right, transparent 48px, black 48px)' : 'none',
              WebkitMaskImage: showLineNumbers ? 'linear-gradient(to right, transparent 48px, black 48px)' : 'none'
            }}
          >
            <pre className="bg-transparent! p-0! m-0! min-w-max">
              <code className="block">
                {tokens.map((line, i) => {
                  const { key: lineKey, ...lineProps } = getLineProps({
                    line,
                    key: i,
                    className: "block h-6 leading-6",
                  });

                  return (
                    <div key={i} {...lineProps}>
                      {line.map((token, key) => {
                        const { key: tokenKey, ...tokenProps } = getTokenProps({
                          token,
                          key,
                        });

                        return <span key={key} {...tokenProps} />;
                      })}
                    </div>
                  );
                })}
              </code>
            </pre>
          </div>
        </div>
      )}
    </Highlight>
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