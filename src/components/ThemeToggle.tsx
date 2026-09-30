import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
  showLabel?: boolean;
}

export function ThemeToggle({ showLabel = false }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={`relative h-9 transition-colors hover:bg-muted ${showLabel ? "gap-2 rounded-full border border-border/40 px-3" : "w-9"}`}
      aria-label="Toggle theme"
    >
      <span className="relative flex h-4 w-4 items-center justify-center">
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </span>
      {showLabel && <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">Dark Mode</span>}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
