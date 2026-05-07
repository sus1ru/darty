import { getHitLabel } from "../../utils/darts";

export default function PlayerCard({
  dark,
  isActive,
  player,
  playerIndex,
  recentHits,
  theme,
}) {
  return (
    <div
      className={`rounded-lg border p-5 shadow-xl transition duration-500 ${
        isActive ? `scale-[1.01] ${theme.activeCard}` : theme.card
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className={`text-lg font-semibold ${theme.title}`}>
            {player.name}
          </h2>
          <p className={`mt-1 text-sm ${theme.muted}`}>Legs won: {player.legs}</p>
        </div>
        <p className={`rounded-md border px-3 py-1 text-sm font-semibold ${theme.chip}`}>
          P{playerIndex + 1}
        </p>
      </div>
      <p className={`mt-5 text-6xl font-black leading-none tracking-normal drop-shadow-lg ${theme.title}`}>
        {player.score}
      </p>
      <div className="mt-4">
        <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${theme.muted}`}>
          Last 3 darts
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {recentHits.length === 0 ? (
            <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${theme.muted}`}>
              No darts yet
            </span>
          ) : (
            recentHits.map((hit) => (
              <span
                key={hit.id}
                className={`rounded-md px-2.5 py-1 text-xs font-bold ${
                  hit.result === "Bust"
                    ? dark
                      ? "bg-rose-300/15 text-rose-100"
                      : "bg-rose-100 text-rose-800"
                    : hit.result === "Checkout"
                      ? dark
                        ? "bg-emerald-300/20 text-emerald-100"
                        : "bg-emerald-100 text-emerald-800"
                      : theme.row
                }`}
              >
                {getHitLabel(hit)} - {hit.score}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
