import { useEffect, useState } from "react";
import { BalldontlieAPI } from "@balldontlie/sdk";
import nbaLogo from "./assets/nba.png";
import { playerIdMap } from "./playerIdMap.js";
import { teamColorMap } from "./teamMapColor.js";

const api = new BalldontlieAPI({
  apiKey: "43d43dd6-340c-4778-a0be-b4429e2cef26",
});

//manually align the ids
//if statement assign teams to a specific background color
//search function
//page of players

export default function NbaPlayerSummary() {
  const [player, setPlayer] = useState(null);

  // Used this code to manually match stats id to photo id
  // useEffect(() => {
  //   async function fetchPlayer() {
  //     try {
  //       const response = await api.nba.getPlayers({
  //         cursor: 0,  //change this to get the next 100 data
  //         per_page: 100,
  //       });
  //       // setPlayer(response.data);
  //       console.log(response);
  //     } catch (error) {
  //       console.error("Failed to fetch player:", error);
  //     }
  //   }
  //   fetchPlayer();
  // }, []);
  // Handles the actual API search logic

  

  useEffect(() => {
    async function fetchPlayer() {
      try {
        const response = await api.nba.getPlayer(115); // ✅ get a single player by ID
        setPlayer(response.data);
      } catch (error) {
        console.error("Failed to fetch player:", error);
      }
    }
    fetchPlayer();
  }, []);

  // get NBA official player id from mapping
  const nbaPlayerId = player ? playerIdMap[player.id] : null;

  //Get the dynamic styling for each player depending gon their team
  const teamName = player?.team?.name;
  const teamClasses = teamColorMap[teamName] || {};

  // construct image url only if nbaPlayerId exists
  const headshotUrl = nbaPlayerId
    ? `https://cdn.nba.com/headshots/nba/latest/1040x760/${nbaPlayerId}.png`
    : null;

  return (
    <>
      <nav>
        <img className="nav-logo" src={nbaLogo} alt="NBA logo" />
        NBA Player Hub
      </nav>
      <main>
        <header></header>
        <section className="search-section container">
          {/* SearchBar component or input */}
          
        </section>

        {/* Player Title full-width background wrapper */}
        <div className="player-title-bg-wrapper">
          <section className="player-title-bg container">
            {player && (
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
                      {player?.jersey_number || "N/A"} |{" "}
                      {player?.position || "N/A"}
                    </h3>
                    <h2>
                      {player.first_name} {player.last_name}
                    </h2>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Player Details full-width background wrapper */}
        <div className={`player-details-bg-wrapper ${teamClasses.detailsBg}`}>
          <section className="player-details-bg container">
            {player ? (
              <div className="player-details-grid">
                <div className={`stat-box ${teamClasses.statBoxBg || ""}`}>
                  Height: {player.height}
                </div>
                <div className={`stat-box ${teamClasses.statBoxBg || ""}`}>
                  Weight: {player.weight}
                </div>
                <div className={`stat-box ${teamClasses.statBoxBg || ""}`}>
                  Draft Year: {player.draft_year}
                </div>
                <div className={`stat-box ${teamClasses.statBoxBg || ""}`}>
                  Round: {player.draft_round} | Pick: {player.draft_number}
                </div>
              </div>
            ) : (
              <p>Loading player info...</p>
            )}
          </section>
        </div>

        <footer></footer>
      </main>
    </>
  );
}
