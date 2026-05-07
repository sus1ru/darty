export default function SetupPanel({
  canEditStartingScore,
  canUndo,
  dispatch,
  players,
  state,
  theme,
  undoPayload,
}) {
  return (
    <aside className={`rounded-lg border p-5 shadow-xl ${theme.header}`}>
      <p className={`text-sm font-semibold uppercase tracking-[0.2em] ${theme.muted}`}>
        Setup
      </p>
      <div className="mt-4 space-y-3">
        {players.map((player, index) => (
          <label key={index} className="block">
            <span className={`mb-1 block text-sm font-medium ${theme.muted}`}>
              Player {index + 1} name
            </span>
            <input
              value={player.name}
              onChange={(event) =>
                dispatch({
                  type: "SET_PLAYER_NAME",
                  payload: {
                    playerIndex: index,
                    name: event.target.value,
                  },
                })
              }
              className={`w-full rounded-md border px-3 py-2 font-semibold transition duration-300 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/30 ${theme.field}`}
              placeholder={`Player ${index + 1}`}
            />
          </label>
        ))}

        <label className="block">
          <span className={`mb-1 block text-sm font-medium ${theme.muted}`}>
            Starting score
          </span>
          <select
            value={state.startingScore}
            disabled={!canEditStartingScore}
            onChange={(event) =>
              dispatch({
                type: "SET_STARTING_SCORE",
                payload: { score: Number(event.target.value) },
              })
            }
            className={`w-full rounded-md border px-3 py-2 font-semibold transition duration-300 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/30 disabled:cursor-not-allowed disabled:opacity-50 ${theme.field}`}
          >
            <option value={301}>301</option>
            <option value={501}>501</option>
            <option value={701}>701</option>
            <option value={1001}>1001</option>
          </select>
        </label>
      </div>

      <p className={`mt-6 text-sm font-semibold uppercase tracking-[0.2em] ${theme.muted}`}>
        Match
      </p>
      <div className="mt-4 space-y-3">
        <div className={`flex justify-between rounded-md px-4 py-3 ${theme.row}`}>
          <span className={theme.muted}>Legs to win</span>
          <span className={`font-bold ${theme.title}`}>{state.legsToWin}</span>
        </div>
        <div className={`flex justify-between rounded-md px-4 py-3 ${theme.row}`}>
          <span className={theme.muted}>Starting score</span>
          <span className={`font-bold ${theme.title}`}>{state.startingScore}</span>
        </div>
        <div className={`flex justify-between rounded-md px-4 py-3 ${theme.row}`}>
          <span className={theme.muted}>Throws left</span>
          <span className={`font-bold ${theme.accentText}`}>{state.throwsLeft}</span>
        </div>
      </div>
      <button
        onClick={() => dispatch({ type: "UNDO", payload: undoPayload })}
        disabled={!canUndo}
        className={`mt-5 w-full rounded-md border px-4 py-2.5 font-semibold transition duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 ${theme.subtleButton}`}
      >
        Undo Last Dart
      </button>
      <button
        onClick={() => dispatch({ type: "RESET" })}
        className={`mt-5 w-full rounded-md border px-4 py-2.5 font-semibold transition duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-200 ${theme.dangerButton}`}
      >
        Reset Match
      </button>
    </aside>
  );
}
