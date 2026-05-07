import Dartboard from "../Dartboard";

export default function GamePanel({
  canUndo,
  currentPlayer,
  dark,
  dispatch,
  state,
  theme,
  undoPayload,
}) {
  return (
    <div className={`rounded-lg border p-4 shadow-2xl backdrop-blur sm:p-6 ${theme.panel}`}>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className={`text-sm font-medium ${theme.muted}`}>Turn</p>
          <p className={`text-2xl font-bold ${theme.accentText}`}>
            {currentPlayer.name}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((dart) => (
            <span
              key={dart}
              className={`h-3 w-10 rounded-full transition duration-300 ${
                dart < state.throwsLeft
                  ? "bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.45)]"
                  : "bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>

      {state.status === "setup" && (
        <div
          className={`flex min-h-[520px] items-center justify-center rounded-lg border border-dashed border-emerald-400/30 ${
            dark ? "bg-black/10" : "bg-emerald-950/[0.03]"
          }`}
        >
          <button
            onClick={() => dispatch({ type: "START" })}
            className="rounded-md bg-emerald-300 px-6 py-3 font-bold text-emerald-950 shadow-xl shadow-emerald-950/30 transition duration-300 hover:-translate-y-1 hover:bg-emerald-200 hover:shadow-emerald-300/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200"
          >
            Start Leg
          </button>
        </div>
      )}

      {state.status === "playing" && (
        <div className="animate-soft-rise flex flex-col items-center gap-5">
          <Dartboard
            onThrow={(score, type) =>
              dispatch({ type: "THROW", payload: { score, type } })
            }
          />
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() =>
                dispatch({
                  type: "THROW",
                  payload: { score: 0, type: "MISS" },
                })
              }
              className={`rounded-md border px-5 py-2.5 font-semibold transition duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200 ${
                dark
                  ? "border-amber-200/30 bg-amber-200/10 text-amber-100 hover:border-amber-200/70 hover:bg-amber-200/20"
                  : "border-amber-800/20 bg-amber-50 text-amber-800 hover:border-amber-700/40 hover:bg-amber-100"
              }`}
            >
              Miss / No score
            </button>
            <button
              onClick={() => dispatch({ type: "UNDO", payload: undoPayload })}
              disabled={!canUndo}
              className={`rounded-md border px-5 py-2.5 font-semibold transition duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 ${theme.subtleButton}`}
            >
              Undo last dart
            </button>
          </div>
        </div>
      )}

      {state.status === "finished" && (
        <div className="flex min-h-[520px] items-center justify-center rounded-lg border border-emerald-300/30 bg-emerald-300/10 text-center">
          <div>
            <p className={`text-sm font-semibold uppercase tracking-[0.24em] ${theme.accentText}`}>
              Match winner
            </p>
            <p className={`mt-3 text-4xl font-black ${theme.title}`}>
              {state.winner}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
