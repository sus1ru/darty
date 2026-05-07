export function getHitLabel(hit) {
  if (hit.type === "MISS") return "Miss";
  if (hit.type === "OB") return "Outer bull";
  if (hit.type === "D" && hit.score === 50) return "Bull";
  if (hit.type === "D") return `D${hit.score / 2}`;
  if (hit.type === "T") return `T${hit.score / 3}`;
  return `S${hit.score}`;
}
