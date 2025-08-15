import StatBox from "./StatBox";

export default function PlayerDetails({ player, teamClasses }) {
  if (!player) return <p>Loading player info...</p>;

  return (
    <div className="player-details-grid">
      <StatBox label="Height" value={player.height} className={teamClasses.statBoxBg} />
      <StatBox label="Weight" value={player.weight} className={teamClasses.statBoxBg} />
      <StatBox label="Draft Year" value={player.draft_year} className={teamClasses.statBoxBg} />
      <StatBox 
        label="Draft" 
        value={`Round: ${player.draft_round} | Pick: ${player.draft_number}`} 
        className={teamClasses.statBoxBg} 
      />
    </div>
  );
}
