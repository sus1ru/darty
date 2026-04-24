export const numbers = [
  20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5,
];

export const initialState = {
  players: [
    { name: "Player 1", score: 501, legs: 0 },
    { name: "Player 2", score: 501, legs: 0 },
  ],
  startingScore: 501,
  currentPlayer: 0,
  legStarter: 0,
  throwsLeft: 3,
  turnStartScore: 501,
  status: "setup",
  winner: null,
  legsToWin: 3,
};

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
        })),
        throwsLeft: 3,
        turnStartScore: action.payload.score,
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

    case "THROW": {
      if (state.status !== "playing") return state;

      const player = state.players[state.currentPlayer];
      const newScore = player.score - action.payload.score;
      const isDouble = action.payload.type === "D";

      if (newScore < 0 || newScore === 1 || (newScore === 0 && !isDouble)) {
        return {
          ...state,
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
          status: winner ? "finished" : "setup",
          winner: winner ? winner.name : null,
          legStarter: winner ? state.legStarter : 1 - state.legStarter,
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
          currentPlayer: 1 - state.currentPlayer,
          throwsLeft: 3,
          turnStartScore: updatedPlayers[1 - state.currentPlayer].score,
        };
      }

      return {
        ...state,
        players: updatedPlayers,
        throwsLeft: nextThrows,
      };
    }

    case "RESET":
      return initialState;

    default:
      return state;
  }
}
