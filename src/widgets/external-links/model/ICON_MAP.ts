import type { ComponentType, SVGProps } from "react";
import { GitHubIcon, GmailIcon, InstagramIcon, LinkedInIcon } from "@/shared/ui";
import { EXTERNAL_LINKS } from "./EXTERNAL_LINKS";

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;
export type IconKey = (typeof EXTERNAL_LINKS)[number]["iconKey"];

export const ICON_BY_KEY: Record<IconKey, IconComponent> = {
  github: GitHubIcon,
  gmail: GmailIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
};
