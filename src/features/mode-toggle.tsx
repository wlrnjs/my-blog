"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { cn } from "@/shared/lib";

const iconClassName =
  "relative z-10 h-4 w-4 text-slate-900 transition-colors duration-200 group-hover:text-white dark:text-slate-100 dark:group-hover:text-slate-900";

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
      aria-label="Toggle theme"
      className="flex-center group relative h-6 w-6 overflow-visible rounded-md border p-0.5"
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-3 scale-75 rounded-full bg-slate-950 dark:bg-white",
          "opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100"
        )}
      />

      <span className="sr-only">Toggle mode</span>

      {!mounted ? null : !isDark ? (
        <SunIcon className={iconClassName} />
      ) : (
        <MoonIcon className={iconClassName} />
      )}
    </button>
  );
}
