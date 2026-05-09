"use client";

import { Sun, Moon, Palette } from "lucide-react";
import { useEffect, useState } from "react";

const themes = [
  { id: "dark", label: "Dark", icon: Moon },
  { id: "light", label: "Light", icon: Sun },
  { id: "sepia", label: "Sepia", icon: Palette },
];

export function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    setCurrentTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const changeTheme = (theme: string) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <div className="flex gap-1">
      {themes.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => changeTheme(id)}
          className={`p-2 rounded-lg transition-all ${
            currentTheme === id 
              ? "bg-gold text-bg-primary" 
              : "hover:bg-bg-hover text-text-muted"
          }`}
          title={label}
        >
          <Icon size={18} />
        </button>
      ))}
    </div>
  );
}