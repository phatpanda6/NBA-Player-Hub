export default function PlayerTitle({ player, headshotUrl }) {
  if (!player) return null;

  return (
    <div className="player_title">
      {headshotUrl && (
        <img
          src={headshotUrl}
          alt={`${player.first_name} ${player.last_name}`}
          className="player-headshot"
        />
      )}
      <div className="player-title-info-wrapper">
        <div className="player_title-info">
          <h3>
            {player?.team?.full_name || "N/A"} | #
            {player?.jersey_number || "N/A"} | {player?.position || "N/A"}
          </h3>
          <h2>
            {player.first_name} {player.last_name}
          </h2>
        </div>
      </div>
    </div>
  );
}
