"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type ProjectLink = {
  label: string;
  href: string;
};

type ProjectDetail = {
  title: string;
  summary?: string;
  date?: string;
  role?: string;
  stack?: string[];
  links?: ProjectLink[];
  sections?: Array<{
    title: string;
    body: string;
    bullets?: string[];
  }>;
};

type ProjectDetailContentProps = {
  slug: string;
  project?: ProjectDetail | null;
};

type CarouselImage = {
  src: string;
  alt: string;
};

const OG_IMAGE_MAP: Record<string, string> = {
  about: "/metadata/og-about.png",
  projects: "/metadata/og-projects.png",
  tags: "/metadata/og-tags.png",
  default: "/metadata/og-default.png",
};

const getOgImagesBySlug = (slug: string, title: string): CarouselImage[] => {
  const primary = OG_IMAGE_MAP[slug] ?? OG_IMAGE_MAP.default;

  const candidates: CarouselImage[] = [
    { src: primary, alt: `${title} 미리보기 이미지` },
    { src: OG_IMAGE_MAP.projects, alt: "Projects Open Graph 이미지" },
    { src: OG_IMAGE_MAP.tags, alt: "Tags Open Graph 이미지" },
    { src: OG_IMAGE_MAP.about, alt: "About Open Graph 이미지" },
  ];

  const unique = Array.from(new Map(candidates.map((c) => [c.src, c])).values());

  return unique.length > 0
    ? unique
    : [{ src: OG_IMAGE_MAP.default, alt: `${title} 미리보기 이미지` }];
};

const clampIndex = (index: number, length: number) => {
  if (length <= 0) return 0;
  const mod = index % length;
  return mod < 0 ? mod + length : mod;
};

const ProjectDetailContent = ({ slug, project }: ProjectDetailContentProps) => {
  const title = project?.title ?? slug;
  const summary = project?.summary ?? "프로젝트 상세 내용을 정리 중입니다.";

  const meta = [
    { k: "Slug", v: slug },
    { k: "Role", v: project?.role ?? "Frontend" },
    { k: "Date", v: project?.date ?? "—" },
  ];

  const stack = project?.stack ?? ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"];
  const links = project?.links ?? [
    { label: "Repository", href: "https://github.com/wlrnjs" },
    { label: "Live", href: "https://example.com" },
  ];

  const sections = project?.sections ?? [
    {
      title: "Overview",
      body: "정적 데이터 기반으로 프로젝트를 정리하는 페이지입니다. 글처럼 읽히는 구조를 목표로 구성했습니다.",
    },
    {
      title: "What I Focused On",
      body: "UI는 과장된 카드형이 아니라, 블로그 본문 흐름에 맞춘 타이포 중심 레이아웃으로 정리했습니다.",
      bullets: ["타이포 스케일/여백 중심", "메타 정보는 얇게", "링크는 작고 명확하게"],
    },
    {
      title: "Notes",
      body: "추후 실제 스크린샷과 회고를 추가하면 이 페이지의 완성도가 크게 올라갑니다.",
    },
  ];

  const images = useMemo(() => getOgImagesBySlug(slug, title), [slug, title]);
  const [activeIndex, setActiveIndex] = useState(0);

  const goPrev = () => setActiveIndex((prev) => clampIndex(prev - 1, images.length));
  const goNext = () => setActiveIndex((prev) => clampIndex(prev + 1, images.length));
  const goTo = (index: number) => setActiveIndex(clampIndex(index, images.length));

  return (
    <article className="mx-auto w-full max-w-[720px] space-y-10">
      <header className="space-y-4">
        <div className="space-y-2">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">Project</p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
          <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-300">{summary}</p>
        </div>

        <dl className="flex flex-wrap gap-x-6 gap-y-2 border-y py-3 text-xs">
          {meta.map((m) => (
            <div key={m.k} className="flex items-center gap-2">
              <dt className="uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                {m.k}
              </dt>
              <dd className="text-neutral-700 dark:text-neutral-200">{m.v}</dd>
            </div>
          ))}
        </dl>

        <nav aria-label="Project links" className="flex flex-wrap gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-neutral-700 underline-offset-4 hover:underline dark:text-neutral-200"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </header>

      <section aria-label="Project preview" className="space-y-3">
        <figure className="group space-y-3">
          <div className="relative overflow-hidden rounded-xl border">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={images[activeIndex]?.src ?? "/metadata/og-default.png"}
                alt={images[activeIndex]?.alt ?? `${title} 미리보기 이미지`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 720px"
                className="object-cover"
              />
            </div>

            <figcaption className="sr-only">
              {images[activeIndex]?.alt ?? `${title} Open Graph 미리보기 이미지`}
            </figcaption>

            {/* Controls */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous image"
                className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white/80 text-sm text-neutral-800 backdrop-blur transition hover:bg-white dark:bg-black/40 dark:text-neutral-200 dark:hover:bg-black/60"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={goNext}
                aria-label="Next image"
                className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white/80 text-sm text-neutral-800 backdrop-blur transition hover:bg-white dark:bg-black/40 dark:text-neutral-200 dark:hover:bg-black/60"
              >
                ›
              </button>
            </div>

            {/* Counter */}
            <div className="absolute bottom-3 right-3 rounded-md border bg-white/80 px-2 py-1 text-xs text-neutral-700 backdrop-blur dark:bg-black/40 dark:text-neutral-200">
              {activeIndex + 1} / {images.length}
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2">
            {images.map((img, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => goTo(idx)}
                  aria-label={`Go to image ${idx + 1}`}
                  aria-current={isActive ? "true" : undefined}
                  className={[
                    "h-2 w-2 rounded-full border transition",
                    isActive
                      ? "bg-neutral-700 dark:bg-neutral-200"
                      : "bg-transparent hover:bg-neutral-200 dark:hover:bg-neutral-800",
                  ].join(" ")}
                />
              );
            })}
          </div>
        </figure>

        <div className="flex flex-wrap gap-2 text-xs text-neutral-600 dark:text-neutral-300">
          <span className="text-neutral-500 dark:text-neutral-400">Stack:</span>
          <ul className="flex flex-wrap">
            {stack.map((t) => (
              <li
                key={t}
                className="after:mx-2 after:text-neutral-300 after:content-['/'] last:after:content-none"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <main className="space-y-10">
        {sections.map((s) => (
          <section key={s.title} aria-labelledby={`section-${s.title}`} className="space-y-3">
            <h2 id={`section-${s.title}`} className="text-base font-semibold tracking-tight">
              {s.title}
            </h2>

            <p className="text-sm leading-7 text-neutral-700 dark:text-neutral-200">{s.body}</p>

            {s.bullets && s.bullets.length > 0 ? (
              <ul className="space-y-2 pl-4 text-sm text-neutral-700 dark:text-neutral-200">
                {s.bullets.map((b) => (
                  <li key={b} className="list-disc leading-7 marker:text-neutral-400">
                    {b}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </main>

      <footer className="border-t pt-6">
        <nav aria-label="Project navigation" className="flex items-center justify-between">
          <Link
            href="/projects"
            className="text-sm text-neutral-700 underline-offset-4 hover:underline dark:text-neutral-200"
          >
            ← Back to list
          </Link>

          <p className="text-xs text-neutral-500 dark:text-neutral-400">Last updated: —</p>
        </nav>
      </footer>
    </article>
  );
};

export default ProjectDetailContent;
