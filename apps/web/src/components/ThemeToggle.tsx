import { useEffect, useState } from "react";
import { Button } from "@glass-ui-kit/glass";
import { MoonIcon, SunIcon } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newThemeIsDark = !isDark;
    setIsDark(newThemeIsDark);

    localStorage.setItem("theme", newThemeIsDark ? "dark" : "light");

    if (newThemeIsDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <Button
      type="button"
      onClick={toggleTheme}
      className="glass glass-soft h-8 w-8 p-0"
      aria-label="Toggle theme"
    >
      <SunIcon size={18} className="hidden dark:block" />
      <MoonIcon size={18} className="dark:hidden" />
    </Button>
  );
}