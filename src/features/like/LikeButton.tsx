"use client";

import { useCallback, useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { useLike } from "./useLike";

interface Particle {
  id: number;
  px: number;
  py: number;
  delay: number;
}

let particleId = 0;

const BASE_ANGLES = [-65, -42, -20, 0, 20, 42, 65];

function spawnParticles(): Particle[] {
  return BASE_ANGLES.map((base) => {
    const angle = (base + (Math.random() - 0.5) * 14) * (Math.PI / 180);
    const speed = 26 + Math.random() * 16;
    return {
      id: particleId++,
      px: Math.sin(angle) * speed,
      py: Math.cos(angle) * speed,
      delay: Math.random() * 60,
    };
  });
}

interface LikeButtonProps {
  postId: string;
}

export default function LikeButton({ postId }: LikeButtonProps) {
  const { liked, count, loading, toggle } = useLike(postId);
  const [particles, setParticles] = useState<Particle[]>([]);

  const handleClick = useCallback(() => {
    toggle();
    if (!liked) {
      setParticles((prev) => [...prev, ...spawnParticles()]);
    }
  }, [toggle, liked]);

  const removeParticle = useCallback((id: number) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      aria-label={liked ? "좋아요 취소" : "좋아요"}
      className="flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50 dark:text-neutral-400 dark:hover:text-red-400"
    >
      <span className="relative">
        {particles.map((p) => (
          <span
            key={p.id}
            aria-hidden
            className="heart-particle pointer-events-none absolute left-1/2 top-1/2 text-xs text-red-400"
            style={
              {
                "--px": `${p.px}px`,
                "--py": `${p.py}px`,
                animationDelay: `${p.delay}ms`,
              } as React.CSSProperties
            }
            onAnimationEnd={() => removeParticle(p.id)}
          >
            ♥
          </span>
        ))}
        {liked ? (
          <HeartSolidIcon className="h-5 w-5 text-red-500 dark:text-red-400" />
        ) : (
          <HeartIcon className="h-5 w-5" />
        )}
      </span>
      <span>{count > 999 ? "999+" : count || 0}</span>
    </button>
  );
}
