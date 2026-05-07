import ScoreSummary from "./ScoreSummary";

export default function LegResultModal({
  canUndo,
  dark,
  dispatch,
  legResult,
  players,
  theme,
  undoPayload,
}) {
  if (!legResult) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div
        className={`animate-soft-rise w-full max-w-md rounded-lg border p-6 text-center shadow-2xl ${
          dark
            ? "border-emerald-300/30 bg-[#0b1714] shadow-black/50"
            : "border-emerald-900/10 bg-white shadow-emerald-950/20"
        }`}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-500">
          Leg {legResult.leg} complete
        </p>
        <h2 className={`mt-3 text-4xl font-black ${theme.title}`}>
          {legResult.type === "draw"
            ? "Leg drawn"
            : `${legResult.playerName} wins the leg`}
        </h2>
        <p className={`mt-3 ${theme.muted}`}>
          {legResult.type === "draw"
            ? "A normal x01 leg cannot draw because one player must checkout first."
            : `${legResult.playerName} checked out ${legResult.checkout} and now has ${players[legResult.playerIndex].legs} legs.`}
        </p>
        <ScoreSummary players={players} theme={theme} />
        <button
          onClick={() => dispatch({ type: "START" })}
          className="mt-6 w-full rounded-md bg-emerald-300 px-5 py-3 font-bold text-emerald-950 shadow-xl shadow-emerald-950/30 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200"
        >
          Start Next Leg
        </button>
        <button
          onClick={() => dispatch({ type: "UNDO", payload: undoPayload })}
          disabled={!canUndo}
          className={`mt-3 w-full rounded-md border px-5 py-3 font-bold transition duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 ${theme.subtleButton}`}
        >
          Undo Checkout
        </button>
      </div>
    </div>
  );
}
