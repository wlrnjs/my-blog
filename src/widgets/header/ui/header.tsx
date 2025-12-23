"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib";
import { NAV_ITEMS } from "../model/navigation";
import { ModeToggle } from "@/features/mode-toggle";

const HeaderNav = () => {
  const pathname = usePathname();

  return (
    <nav className="ml-auto space-x-6 text-sm font-medium">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "inline-flex items-center text-sm font-medium",
              "transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90",
              isActive && "translate-y-0.5 font-bold"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

const Header = () => {
  return (
    <header>
      <div className="flex items-center justify-between">
        <ModeToggle />
        <HeaderNav />
      </div>
    </header>
  );
};

export default Header;
