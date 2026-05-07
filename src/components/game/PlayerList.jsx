import PlayerCard from "./PlayerCard";

export default function PlayerList({ dark, hitHistory, players, currentPlayer, theme }) {
  return (
    <div className="space-y-4 lg:sticky lg:top-5">
      {players.map((player, index) => (
        <PlayerCard
          key={index}
          dark={dark}
          isActive={currentPlayer === index}
          player={player}
          playerIndex={index}
          recentHits={(hitHistory[index] || []).slice(0, 3)}
          theme={theme}
        />
      ))}
    </div>
  );
}
