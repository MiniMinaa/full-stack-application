import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();

  return (
    <label className={`ui-switch ${className ?? ""}`} aria-label="Toggle theme">
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={toggle}
        aria-hidden
      />
      <div className="slider">
        <div className="circle" />
      </div>
    </label>
  );
}
