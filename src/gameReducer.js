export const numbers = [
  20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5,
];

export const initialState = {
  players: [
    { name: "Player 1", score: 501, legs: 0 },
    { name: "Player 2", score: 501, legs: 0 },
  ],
  hitHistory: [[], []],
  undoStack: [],
  startingScore: 501,
  currentPlayer: 0,
  legStarter: 0,
  currentLeg: 1,
  throwId: 1,
  throwsLeft: 3,
  turnStartScore: 501,
  status: "setup",
  winner: null,
  legsToWin: 3,
};

function createUndoSnapshot(state) {
  return {
    players: state.players,
    hitHistory: state.hitHistory,
    startingScore: state.startingScore,
    currentPlayer: state.currentPlayer,
    legStarter: state.legStarter,
    currentLeg: state.currentLeg,
    throwId: state.throwId,
    throwsLeft: state.throwsLeft,
    turnStartScore: state.turnStartScore,
    status: state.status,
    winner: state.winner,
    legsToWin: state.legsToWin,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case "SET_PLAYER_NAME":
      return {
        ...state,
        players: state.players.map((p, i) =>
          i === action.payload.playerIndex
            ? { ...p, name: action.payload.name }
            : p
        ),
      };

    case "SET_STARTING_SCORE": {
      if (state.status === "playing") return state;

      return {
        ...state,
        startingScore: action.payload.score,
        players: state.players.map((p) => ({
          ...p,
          score: action.payload.score,
          legs: 0,
        })),
        hitHistory: [[], []],
        undoStack: [],
        currentPlayer: 0,
        legStarter: 0,
        currentLeg: 1,
        throwId: 1,
        throwsLeft: 3,
        turnStartScore: action.payload.score,
        status: "setup",
        winner: null,
      };
    }

    case "START":
      return {
        ...state,
        players: state.players.map((p) => ({
          ...p,
          score: state.startingScore,
        })),
        currentPlayer: state.legStarter,
        throwsLeft: 3,
        turnStartScore: state.startingScore,
        status: "playing",
        winner: null,
      };

    case "UNDO": {
      if (state.undoStack.length === 0) return state;

      const [previousState, ...undoStack] = state.undoStack;

      return {
        ...previousState,
        players: previousState.players.map((player, i) => ({
          ...player,
          name: state.players[i].name,
        })),
        undoStack,
      };
    }

    case "THROW": {
      if (state.status !== "playing") return state;

      const undoStack = [createUndoSnapshot(state), ...state.undoStack];
      const player = state.players[state.currentPlayer];
      const newScore = player.score - action.payload.score;
      const isDouble = action.payload.type === "D";
      const isBust =
        newScore < 0 || newScore === 1 || (newScore === 0 && !isDouble);
      const hit = {
        id: state.throwId,
        leg: state.currentLeg,
        score: action.payload.score,
        type: action.payload.type,
        from: player.score,
        remaining: isBust ? state.turnStartScore : newScore,
        result: isBust ? "Bust" : newScore === 0 ? "Checkout" : "Hit",
      };
      const hitHistory = state.hitHistory.map((history, i) =>
        i === state.currentPlayer ? [hit, ...history] : history
      );

      if (isBust) {
        return {
          ...state,
          hitHistory,
          undoStack,
          throwId: state.throwId + 1,
          players: state.players.map((p, i) =>
            i === state.currentPlayer
              ? { ...p, score: state.turnStartScore }
              : p
          ),
          currentPlayer: 1 - state.currentPlayer,
          throwsLeft: 3,
          turnStartScore: state.players[1 - state.currentPlayer].score,
        };
      }

      if (newScore === 0 && isDouble) {
        const updatedPlayers = state.players.map((p, i) =>
          i === state.currentPlayer ? { ...p, score: 0, legs: p.legs + 1 } : p
        );

        const winner = updatedPlayers.find((p) => p.legs >= state.legsToWin);

        return {
          ...state,
          players: updatedPlayers,
          hitHistory,
          undoStack,
          throwId: state.throwId + 1,
          status: winner ? "finished" : "setup",
          winner: winner ? winner.name : null,
          legStarter: winner ? state.legStarter : 1 - state.legStarter,
          currentLeg: winner ? state.currentLeg : state.currentLeg + 1,
          throwsLeft: 3,
          turnStartScore: state.startingScore,
        };
      }

      const updatedPlayers = state.players.map((p, i) =>
        i === state.currentPlayer ? { ...p, score: newScore } : p
      );

      const nextThrows = state.throwsLeft - 1;

      if (nextThrows === 0) {
        return {
          ...state,
          players: updatedPlayers,
          hitHistory,
          undoStack,
          throwId: state.throwId + 1,
          currentPlayer: 1 - state.currentPlayer,
          throwsLeft: 3,
          turnStartScore: updatedPlayers[1 - state.currentPlayer].score,
        };
      }

      return {
        ...state,
        players: updatedPlayers,
        hitHistory,
        undoStack,
        throwId: state.throwId + 1,
        throwsLeft: nextThrows,
      };
    }

    case "RESET":
      return initialState;

    default:
      return state;
  }
}
