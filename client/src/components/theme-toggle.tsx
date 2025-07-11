import { Button } from "@/components/ui/button";
import { Sun, Moon, Zap } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const getNextTheme = () => {
    switch (theme) {
      case "light":
        return "dark";
      case "dark":
        return "cyber";
      case "cyber":
      default:
        return "light";
    }
  };

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun size={18} />;
      case "dark":
        return <Moon size={18} />;
      case "cyber":
      default:
        return <Zap size={18} />;
    }
  };

  const getThemeColor = () => {
    switch (theme) {
      case "light":
        return "#f59e0b";
      case "dark":
        return "#6366f1";
      case "cyber":
      default:
        return "var(--cyber-accent)";
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(getNextTheme())}
      className="w-10 h-10 rounded-full transition-all hover:scale-110"
      style={{ color: getThemeColor() }}
      title={`Switch to ${getNextTheme()} theme`}
    >
      {getIcon()}
    </Button>
  );
}