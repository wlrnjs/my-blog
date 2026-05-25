import { NextResponse } from "next/server";
import { supabase } from "@/shared/supabase/supabase";

export async function POST() {
  const { error } = await supabase.rpc("increment_blog_visit");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  const today = new Date()
    .toLocaleDateString("en-CA", { timeZone: "Asia/Seoul" });
  const year = new Date()
    .toLocaleDateString("en-CA", { timeZone: "Asia/Seoul" })
    .slice(0, 4);

  const [dailyRes, annualRes] = await Promise.all([
    supabase
      .from("blog_visit_daily_stats")
      .select("visit_count")
      .eq("visited_on", today)
      .maybeSingle(),
    supabase
      .from("blog_visit_yearly_stats")
      .select("visit_count")
      .eq("visit_year", Number(year))
      .maybeSingle(),
  ]);

  return NextResponse.json({
    daily: dailyRes.data?.visit_count ?? 0,
    annual: annualRes.data?.visit_count ?? 0,
  });
}
