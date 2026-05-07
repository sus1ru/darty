import ScoreSummary from "./ScoreSummary";

export default function MatchCompleteModal({
  canUndo,
  dark,
  dispatch,
  isDraw,
  players,
  runnerUp,
  state,
  theme,
  undoPayload,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div
        className={`animate-soft-rise w-full max-w-md rounded-lg border p-6 text-center shadow-2xl ${
          dark
            ? "border-emerald-300/30 bg-[#0b1714] shadow-black/50"
            : "border-emerald-900/10 bg-white shadow-emerald-950/20"
        }`}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-500">
          Match complete
        </p>
        <h2 className={`mt-3 text-4xl font-black ${theme.title}`}>
          {isDraw ? "Match drawn" : `${state.winner} wins`}
        </h2>
        <p className={`mt-3 ${theme.muted}`}>
          {isDraw
            ? "This x01 format does not normally end in a draw."
            : `${runnerUp?.name} finishes with ${runnerUp?.legs} legs. No draw in first-to-${state.legsToWin} double-out darts.`}
        </p>
        <ScoreSummary players={players} theme={theme} />
        <button
          onClick={() => dispatch({ type: "UNDO", payload: undoPayload })}
          disabled={!canUndo}
          className={`mt-6 w-full rounded-md border px-5 py-3 font-bold transition duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 ${theme.subtleButton}`}
        >
          Undo Winning Dart
        </button>
        <button
          onClick={() => dispatch({ type: "RESET" })}
          className="mt-3 w-full rounded-md bg-emerald-300 px-5 py-3 font-bold text-emerald-950 shadow-xl shadow-emerald-950/30 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200"
        >
          New Match
        </button>
      </div>
    </div>
  );
}
