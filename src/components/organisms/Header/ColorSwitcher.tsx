"use client";
import React, { useEffect, useState } from "react";

interface ColorSwitcherProps {
  variant?: "default" | "bottomNav";
  className?: string;
}

export default function ColorSwitcher({
  variant = "default",
  className = ""
}: ColorSwitcherProps) {
  const [showSwitcher, setShowSwitcher] = useState(false);
  const [colorScheme, setColorScheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("color-scheme") as "light" | "dark") || "light";
    }
    return "light";
  });

  useEffect(() => {
    setShowSwitcher(true);
  }, []);

  useEffect(() => {
    const currentScheme = document.documentElement.getAttribute("color-scheme");
    if (currentScheme !== colorScheme) {
      document.documentElement.setAttribute("color-scheme", colorScheme);
    }
    if (localStorage.getItem("color-scheme") !== colorScheme) {
      localStorage.setItem("color-scheme", colorScheme);
    }
  }, [colorScheme]);

  const handleColorSwitch = () => {
    setColorScheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  if (!showSwitcher) return null;

  const iconClass = colorScheme === "dark" ? "ph-bold ph-sun-horizon" : "ph-bold ph-moon-stars";

  return variant === "bottomNav" ? (
    <button
      type="button"
      onClick={handleColorSwitch}
      className={`flex flex-col items-center gap-1 flex-1 min-w-10 ${className}`}
      role="switch"
    >
      <i className={`text-5xl ${iconClass}`} aria-hidden="true" />
    </button>
  ) : (
    <button
      id="color-switcher"
      className={`mxd-color-switcher max-sm:hidden ${className}`}
      type="button"
      role="switch"
      aria-label="light/dark mode"
      aria-checked={colorScheme === "dark"}
      onClick={handleColorSwitch}
      data-magnetic
      data-tooltip={colorScheme === "dark" ? "Light Mode" : "Dark Mode"}
    >
      <i className={iconClass} />
    </button>
  );
}