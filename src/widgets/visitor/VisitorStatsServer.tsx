import { supabase } from "@/shared/supabase/supabase";
import VisitorStats from "./VisitorStats";

const getVisitorStats = async () => {
  try {
    const today = new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Seoul",
    });
    const year = Number(today.slice(0, 4));

    const [dailyRes, annualRes] = await Promise.all([
      supabase
        .from("blog_visit_daily_stats")
        .select("visit_count")
        .eq("visited_on", today)
        .maybeSingle(),
      supabase
        .from("blog_visit_yearly_stats")
        .select("visit_count")
        .eq("visit_year", year)
        .maybeSingle(),
    ]);

    if (dailyRes.error) console.error("일간 방문자 통계를 불러오는 중 오류가 발생했습니다:", dailyRes.error);
    if (annualRes.error) console.error("연간 방문자 통계를 불러오는 중 오류가 발생했습니다:", annualRes.error);

    return {
      daily: Number(dailyRes.data?.visit_count ?? 0),
      annual: Number(annualRes.data?.visit_count ?? 0),
    };
  } catch (err) {
    console.error("방문자 통계를 불러오는 중 오류가 발생했습니다:", err);
    return { daily: 0, annual: 0 };
  }
};

const VisitorStatsServer = async () => {
  const { daily, annual } = await getVisitorStats();
  return <VisitorStats initialDaily={daily} initialAnnual={annual} />;
};

export default VisitorStatsServer;
