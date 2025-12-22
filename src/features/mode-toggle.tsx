"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex-center h-6 w-6 rounded-md border p-0.5"
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle mode</span>

      {!mounted ? null : !isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
