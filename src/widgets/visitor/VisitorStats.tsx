"use client";

import { useEffect, useState } from "react";

interface VisitorStatsProps {
  initialDaily: number;
  initialAnnual: number;
}

const fetchStats = async (): Promise<{ daily: number; annual: number } | null> => {
  try {
    const res = await fetch("/api/visit");
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error("방문자 통계를 불러오는 중 오류가 발생했습니다:", err);
    return null;
  }
};

const VisitorStats = ({ initialDaily, initialAnnual }: VisitorStatsProps) => {
  const [daily, setDaily] = useState(initialDaily);
  const [annual, setAnnual] = useState(initialAnnual);

  useEffect(() => {
    const onVisitTracked = () => {
      fetchStats().then((stats) => {
        if (!stats) return;
        setDaily(stats.daily);
        setAnnual(stats.annual);
      });
    };

    window.addEventListener("visit-tracked", onVisitTracked);
    return () => window.removeEventListener("visit-tracked", onVisitTracked);
  }, []);

  return (
    <div className="mb-4 rounded-xl border border-neutral-200 p-4 text-sm transition-colors dark:border-neutral-800">
      <p className="mb-2.5 font-medium text-neutral-500 dark:text-neutral-400">방문자</p>
      <ul className="space-y-1.5">
        <li className="flex items-center justify-between">
          <span className="shrink-0 text-neutral-800 dark:text-neutral-200">연간</span>
          <span className="font-medium tabular-nums text-neutral-800 dark:text-neutral-200">
            {annual.toLocaleString()}
          </span>
        </li>
        <li className="flex items-center justify-between">
          <span className="shrink-0 text-neutral-800 dark:text-neutral-200">일간</span>
          <span className="font-medium tabular-nums text-neutral-800 dark:text-neutral-200">
            {daily.toLocaleString()}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default VisitorStats;
