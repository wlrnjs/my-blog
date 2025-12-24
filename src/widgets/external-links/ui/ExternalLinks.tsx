import { EXTERNAL_LINKS } from "../model/EXTERNAL_LINKS";
import { ICON_BY_KEY, IconKey } from "../model/ICON_MAP";

interface ExternalLinkItemProps {
  href: string;
  label: string;
  external: boolean;
  iconKey: IconKey;
}

const ExternalLinkItem = ({ href, label, external, iconKey }: ExternalLinkItemProps) => {
  const Icon = ICON_BY_KEY[iconKey];

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="inline-flex items-center text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
    >
      <Icon className="h-5 w-5" />
    </a>
  );
};

const ExternalLinks = () => {
  return (
    <>
      <hr className="mt-8" />
      <footer className="mt-8 flex justify-end">
        <nav aria-label="외부 링크" className="flex items-center gap-2">
          {EXTERNAL_LINKS.map((item) => (
            <ExternalLinkItem key={item.label} {...item} />
          ))}
        </nav>
      </footer>
    </>
  );
};

export default ExternalLinks;
