import { useReducer, useState } from "react";
import Dartboard from "./components/Dartboard";
import { reducer, initialState } from "./gameReducer";
import "./App.css";

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [dark, setDark] = useState(true);
  const currentPlayer = state.players[state.currentPlayer];
  const canEditStartingScore = state.status !== "playing";
  const theme = {
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
    text: dark ? "text-slate-100" : "text-slate-950",
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

  return (
    <div
      className={
        dark
          ? "min-h-screen bg-[#07110f] text-slate-100"
          : "min-h-screen bg-[#eef3ef] text-slate-950"
      }
    >
      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8">
        <header
          className={`flex flex-col gap-4 rounded-lg border p-4 shadow-2xl backdrop-blur sm:flex-row sm:items-center sm:justify-between ${theme.header}`}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-500">
              {state.startingScore} double out
            </p>
            <h1 className={`mt-1 text-3xl font-bold tracking-normal ${theme.title}`}>
              Dart Tournament
            </h1>
          </div>
          <button
            onClick={() => setDark(!dark)}
            className={`rounded-md border px-4 py-2 text-sm font-semibold shadow-lg transition duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 ${theme.subtleButton}`}
          >
            Toggle {dark ? "Light" : "Dark"}
          </button>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {state.players.map((p, i) => (
            <div
              key={i}
              className={`rounded-lg border p-5 shadow-xl transition duration-500 ${
                state.currentPlayer === i
                  ? `scale-[1.01] ${theme.activeCard}`
                  : theme.card
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className={`text-lg font-semibold ${theme.title}`}>
                    {p.name}
                  </h2>
                  <p className={`mt-1 text-sm ${theme.muted}`}>
                    Legs won: {p.legs}
                  </p>
                </div>
                <p className={`rounded-md border px-3 py-1 text-sm font-semibold ${theme.chip}`}>
                  Player {i + 1}
                </p>
              </div>
              <p className={`mt-5 text-6xl font-black leading-none tracking-normal drop-shadow-lg ${theme.title}`}>
                {p.score}
              </p>
            </div>
          ))}
        </section>

        <section className="grid flex-1 gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
          <div
            className={`rounded-lg border p-4 shadow-2xl backdrop-blur sm:p-6 ${theme.panel}`}
          >
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

          <aside className={`rounded-lg border p-5 shadow-xl ${theme.header}`}>
            <p className={`text-sm font-semibold uppercase tracking-[0.2em] ${theme.muted}`}>
              Setup
            </p>
            <div className="mt-4 space-y-3">
              {state.players.map((player, index) => (
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
                <span className={`font-bold ${theme.title}`}>
                  {state.startingScore}
                </span>
              </div>
              <div className={`flex justify-between rounded-md px-4 py-3 ${theme.row}`}>
                <span className={theme.muted}>Throws left</span>
                <span className={`font-bold ${theme.accentText}`}>
                  {state.throwsLeft}
                </span>
              </div>
            </div>
            <button
              onClick={() => dispatch({ type: "RESET" })}
              className={`mt-5 w-full rounded-md border px-4 py-2.5 font-semibold transition duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-200 ${theme.dangerButton}`}
            >
              Reset Match
            </button>
          </aside>
        </section>
      </main>
    </div>
  );
}
