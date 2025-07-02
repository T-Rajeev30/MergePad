import { useState, useRef, useEffect } from "react";
import { PaletteIcon } from "lucide-react";
import { useThemeStore } from "../src/Store/useThemeStore";
import { THEMES } from "../src/constants";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Auto-close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button */}
      <button
        className="btn btn-ghost btn-circle"
        onClick={() => setOpen((prev) => !prev)}
      >
        <PaletteIcon className="size-5" />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 mt-2 p-1 z-50 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl
          w-56 border border-base-content/10 max-h-80 overflow-y-auto"
        >
          <div className="space-y-1">
            {THEMES.map((themeOption) => (
              <button
                key={themeOption.name}
                className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors
                  ${
                    theme === themeOption.name
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-base-content/5"
                  }`}
                onClick={() => {
                  setTheme(themeOption.name);
                  setOpen(false); // close after selecting
                }}
              >
                <PaletteIcon className="size-4" />
                <span className="text-sm font-medium">{themeOption.label}</span>
                <div className="ml-auto flex gap-1">
                  {themeOption.colors.map((color, i) => (
                    <span
                      key={i}
                      className="size-2 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
