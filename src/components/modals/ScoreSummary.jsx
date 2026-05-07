export default function ScoreSummary({ players, theme }) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-3">
      {players.map((player, index) => (
        <div key={index} className={`rounded-md p-3 ${theme.row}`}>
          <p className={`text-sm font-semibold ${theme.title}`}>{player.name}</p>
          <p className={`mt-1 text-2xl font-black ${theme.accentText}`}>
            {player.legs}
          </p>
        </div>
      ))}
    </div>
  );
}
