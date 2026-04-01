import { useState, useEffect } from "react";
import { Sun, Monitor, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "light" | "system" | "dark";

const LENS_POSITIONS: Record<Theme, string> = {
  light: "translate-x-0",
  system: "translate-x-full",
  dark: "translate-x-[200%]",
};

const THEME_OPTIONS = [
  { value: "light", icon: Sun, label: "Light theme" },
  { value: "system", icon: Monitor, label: "System theme" },
  { value: "dark", icon: Moon, label: "Dark theme" },
] as const;

export default function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as Theme;
    if (stored === "light" || stored === "dark" || stored === "system") {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    localStorage.setItem("theme", theme);

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme, mounted]);

  return (
    <div
      className={cn(
        "relative border border-glass-border shadow-glass-sm w-[97px] h-8 flex items-center rounded-glass-sm",
        className
      )}
      role="radiogroup"
      aria-label="Theme toggle"
    >
      <div
        className={cn(
          "absolute w-8 h-8 rounded-glass-sm z-0 glass",
          mounted ? "transition-transform duration-300 cubic-bezier(0.4, 0.0, 0.2, 1)" : "",
          LENS_POSITIONS[theme]
        )}
      />

      {THEME_OPTIONS.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={cn(
            "flex z-10 h-8 w-8 rounded-glass-sm transition-colors duration-200 justify-center items-center",
            theme === value ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          )}
          aria-label={label}
          role="radio"
          aria-checked={theme === value}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
}