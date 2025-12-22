import Link from "next/link";
import { NAV_ITEMS } from "../model/navigation";
import { ModeToggle } from "@/features/mode-toggle";

const HeaderNav = () => {
  return (
    <nav className="ml-auto space-x-6 text-sm font-medium">
      {NAV_ITEMS.map((item) => (
        <Link key={item.href} href={item.href}>
          {item.label}
        </Link>
      ))}
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
