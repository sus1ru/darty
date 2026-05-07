import { useReducer, useState } from "react";
import AppFooter from "./components/layout/AppFooter";
import AppHeader from "./components/layout/AppHeader";
import SeoHead from "./components/layout/SeoHead";
import GamePanel from "./components/game/GamePanel";
import PlayerList from "./components/game/PlayerList";
import SetupPanel from "./components/game/SetupPanel";
import LegResultModal from "./components/modals/LegResultModal";
import MatchCompleteModal from "./components/modals/MatchCompleteModal";
import { reducer, initialState } from "./gameReducer";
import { getTheme } from "./utils/theme";
import "./App.css";

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [dark, setDark] = useState(true);
  const currentPlayer = state.players[state.currentPlayer];
  const canEditStartingScore = state.status !== "playing";
  const canUndo = state.undoStack.length > 0;
  const undoPayload = { expectedThrowId: state.undoStack[0]?.throwId };
  const winnerIndex = state.players.findIndex((p) => p.legs >= state.legsToWin);
  const isDraw = false;
  const runnerUp =
    winnerIndex >= 0 ? state.players[1 - winnerIndex] : state.players[1];
  const theme = getTheme(dark);

  return (
    <div
      className={
        dark
          ? "min-h-screen bg-[#07110f] text-slate-100"
          : "min-h-screen bg-[#eef3ef] text-slate-950"
      }
    >
      <SeoHead dark={dark} state={state} currentPlayer={currentPlayer} />

      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8">
        <AppHeader
          dark={dark}
          onToggleDark={() => setDark(!dark)}
          startingScore={state.startingScore}
          theme={theme}
        />

        <section className="grid flex-1 gap-6 lg:grid-cols-[300px_minmax(0,1fr)_300px] lg:items-start">
          <PlayerList
            dark={dark}
            currentPlayer={state.currentPlayer}
            hitHistory={state.hitHistory}
            players={state.players}
            theme={theme}
          />

          <GamePanel
            canUndo={canUndo}
            currentPlayer={currentPlayer}
            dark={dark}
            dispatch={dispatch}
            state={state}
            theme={theme}
            undoPayload={undoPayload}
          />

          <SetupPanel
            canEditStartingScore={canEditStartingScore}
            canUndo={canUndo}
            dispatch={dispatch}
            players={state.players}
            state={state}
            theme={theme}
            undoPayload={undoPayload}
          />
        </section>

        <AppFooter dark={dark} />
      </main>

      {state.status === "setup" && (
        <LegResultModal
          canUndo={canUndo}
          dark={dark}
          dispatch={dispatch}
          legResult={state.legResult}
          players={state.players}
          theme={theme}
          undoPayload={undoPayload}
        />
      )}

      {state.status === "finished" && (
        <MatchCompleteModal
          canUndo={canUndo}
          dark={dark}
          dispatch={dispatch}
          isDraw={isDraw}
          players={state.players}
          runnerUp={runnerUp}
          state={state}
          theme={theme}
          undoPayload={undoPayload}
        />
      )}
    </div>
  );
}
