import { useState, useMemo } from "react";
import { Highlight, themes } from "prism-react-renderer";
import CopyButton from "./CopyButton";
import { cn } from "../lib/utils";
import { Card, Button } from "@glass-ui-kit/glass";
import "@/lib/prism-setup";

interface ReactCodeBlockProps {
  code: string;
  lang?: string;
  filename?: string;
  showLineNumbers?: boolean;
  highlightLines?: string;
  expandable?: boolean;
  className?: string;
}

const parseHighlightLines = (rawStr: string) => {
  if (!rawStr) return new Set<number>();
  const cleanStr = rawStr.replace(/[{}]/g, "");
  const lines = cleanStr.split(",").flatMap((part) => {
    const trimmed = part.trim();
    if (trimmed.includes("-")) {
      const [start, end] = trimmed.split("-").map(Number);
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }
    return Number(trimmed);
  });
  return new Set(lines.filter((n) => !isNaN(n) && n > 0));
};

export default function CodeBlock({
  code,
  lang = "tsx",
  filename,
  showLineNumbers = false,
  highlightLines = "",
  expandable = false,
  className
}: ReactCodeBlockProps) {

  const highlightedSet = useMemo(() => parseHighlightLines(highlightLines), [highlightLines]);
  const [isExpanded, setIsExpanded] = useState(false);

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
              {tokens.map((_, i) => {
                const isHighlighted = highlightedSet.has(i + 1);
                return (
                  <span
                    key={`line-${i}`}
                    className={cn(
                      "block h-[25px] leading-[25px] text-right pr-4 transition-colors duration-200",
                      isHighlighted
                        ? "bg-muted-foreground/7 border-l-2 border-muted-foreground/40 text-foreground opacity-100 font-bold"
                        : "text-muted-foreground border-l-2 border-transparent"
                    )}
                  >
                    {i + 1}
                  </span>
                )
              })}
            </div>
          )}

          <div
            className={cn(
              "flex-1 overflow-x-auto pt-4 pb-4 editor-scrollbar no-scrollbar z-10",
              showLineNumbers ? "pl-12" : "pl-0"
            )}
            style={{
              maskImage: showLineNumbers ? 'linear-gradient(to right, transparent 48px, black 48px)' : 'none',
              WebkitMaskImage: showLineNumbers ? 'linear-gradient(to right, transparent 48px, black 48px)' : 'none'
            }}
          >
            <pre className="bg-transparent! p-0! m-0! min-w-full w-fit">
              <code className="block">
                {tokens.map((line, i) => {
                  const isHighlighted = highlightedSet.has(i + 1);
                  const { key: lineKey, ...lineProps } = getLineProps({
                    line,
                    key: i,
                    className: cn(
                      "block h-[25px] leading-[25px] pr-4 transition-colors duration-200",
                      !showLineNumbers && "pl-4",
                      isHighlighted && "bg-muted-foreground/7",
                      isHighlighted && !showLineNumbers && "border-l-2 border-muted-foreground/40"
                    ),
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
    <Card className={cn("relative p-0 flex flex-col my-6 overflow-hidden", className)}>

      {expandable && (
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="glass absolute top-1.5 right-10 z-40 h-7 hover:glass-strong"
          aria-label={isExpanded ? "Collapse code" : "Expand code"}
        >
          {isExpanded ? "Collapse" : "Expand"}
        </Button>
      )}

      <CopyButton code={code} />

      {filename && (
        <div className="border-b border-glass-border flex items-center h-[41px] px-4 py-1.5 shrink-0 bg-transparent z-20">
          <span className="font-mono text-sm text-foreground pr-20 block truncate">{filename}</span>
        </div>
      )}

      <div
        className={cn(
          "flex-1 w-full editor-scrollbar no-scrollbar",
          expandable && !isExpanded ? "max-h-[320px] overflow-hidden" : "overflow-y-auto min-h-0"
        )}
        style={{
          maskImage: expandable && !isExpanded ? 'linear-gradient(to bottom, black calc(100% - 150px), transparent 100%)' : 'none',
          WebkitMaskImage: expandable && !isExpanded ? 'linear-gradient(to bottom, black calc(100% - 150px), transparent 100%)' : 'none'
        }}
      >
        {renderCode(themes.github, false)}
        {renderCode(themes.vsDark, true)}
      </div>

      {expandable && (
        <div
          className={cn(
            "flex justify-center w-full z-20 shrink-0",
            !isExpanded
              ? "absolute bottom-4 left-0 pointer-events-none"
              : "py-3 border-t border-glass-border bg-transparent"
          )}
        >
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            className="glass glass-strong pointer-events-auto"
          >
            {isExpanded ? "Collapse" : "Expand"}
          </Button>
        </div>
      )}
    </Card>
  );
}