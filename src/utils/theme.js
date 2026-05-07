export function getTheme(dark) {
  return {
    header: dark
      ? "border-white/10 bg-white/[0.04] shadow-black/20"
      : "border-emerald-950/10 bg-white/70 shadow-emerald-950/10",
    panel: dark
      ? "border-white/10 bg-[#0b1714]/85 shadow-black/30"
      : "border-emerald-950/10 bg-white/85 shadow-emerald-950/10",
    card: dark
      ? "border-white/10 bg-white/[0.035] shadow-black/20"
      : "border-emerald-950/10 bg-white/75 shadow-emerald-950/10",
    activeCard: dark
      ? "border-emerald-300/70 bg-emerald-300/10 shadow-emerald-950/40"
      : "border-emerald-700/50 bg-emerald-100 shadow-emerald-950/10",
    title: dark ? "text-white" : "text-slate-950",
    muted: dark ? "text-slate-400" : "text-slate-600",
    accentText: dark ? "text-emerald-100" : "text-emerald-800",
    chip: dark
      ? "border-white/10 bg-black/20 text-emerald-200"
      : "border-emerald-900/10 bg-emerald-50 text-emerald-800",
    field: dark
      ? "border-white/10 bg-black/20 text-slate-100 placeholder:text-slate-500"
      : "border-emerald-950/15 bg-white text-slate-950 placeholder:text-slate-400",
    row: dark ? "bg-black/20" : "bg-emerald-950/[0.04]",
    subtleButton: dark
      ? "border-white/15 bg-white/10 text-slate-100 hover:border-emerald-300/50 hover:bg-emerald-300/15 hover:text-emerald-100"
      : "border-emerald-950/15 bg-white text-slate-800 hover:border-emerald-700/40 hover:bg-emerald-50 hover:text-emerald-800",
    dangerButton: dark
      ? "border-rose-200/25 bg-rose-200/10 text-rose-100 hover:border-rose-200/60 hover:bg-rose-200/20"
      : "border-rose-900/15 bg-rose-50 text-rose-800 hover:border-rose-700/40 hover:bg-rose-100",
  };
}
