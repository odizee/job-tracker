export function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function fmtDate(d) {
  const dt = new Date(d + "T00:00:00");
  return dt.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function computeStreak(apps) {
  const days = new Set(apps.map((a) => a.date));
  let streak = 0;
  const cursor = new Date();
  const today = todayStr();
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const key = cursor.toISOString().slice(0, 10);
    if (days.has(key)) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else if (key === today) {
      // today not logged yet — don't break the streak, just don't count it
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

export function weekCount(apps) {
  const now = new Date();
  const weekAgo = new Date(now);
  weekAgo.setDate(now.getDate() - 6);
  const cutoff = new Date(weekAgo.toDateString());
  return apps.filter((a) => new Date(a.date + "T00:00:00") >= cutoff).length;
}

export function responseRate(apps) {
  const applied = apps.filter((a) => a.status !== "watching");
  if (!applied.length) return "—";
  const responded = applied.filter((a) =>
    ["interview", "offer", "rejected"].includes(a.status)
  );
  return Math.round((responded.length / applied.length) * 100) + "%";
}

export function activePipeline(apps) {
  return apps.filter((a) => a.status === "interview" || a.status === "offer").length;
}

export const STATUS_LABEL = {
  applied: "Applied",
  watching: "Watching",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
};
