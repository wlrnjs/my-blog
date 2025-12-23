import Image from "next/image";
import { EXTERNAL_LINKS } from "../model/EXTERNAL_LINKS";

interface ExternalLinkItemProps {
  href: string;
  label: string;
  iconSrc: string;
  external: boolean;
}

const ExternalLinkItem = ({ href, label, iconSrc, external }: ExternalLinkItemProps) => {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={label}
    >
      <Image src={iconSrc} alt="" width={24} height={24} />
    </a>
  );
};

const ExternalLinks = () => {
  return (
    <section className="mt-8 flex justify-end">
      <div className="flex items-center gap-2">
        {EXTERNAL_LINKS.map((item) => (
          <ExternalLinkItem key={item.label} {...item} />
        ))}
      </div>
    </section>
  );
};

export default ExternalLinks;
