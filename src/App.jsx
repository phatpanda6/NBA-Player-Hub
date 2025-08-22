import { useEffect, useState } from "react";
import { BalldontlieAPI } from "@balldontlie/sdk";
import { playerIdMap } from "./playerIdMap.js";
import { teamColorMap } from "./teamMapColor.js";

// Components
import Navbar from "./components/Navbar.jsx";
import SearchBar from "./components/SearchBar.jsx";
import PlayerTitle from "./components/PlayerTitle.jsx";
import PlayerDetails from "./components/PlayerDetails.jsx";

const api = new BalldontlieAPI({
  apiKey: "43d43dd6-340c-4778-a0be-b4429e2cef26",
});

export default function NbaPlayerSummary() {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlayer() {
      try {
        setLoading(true);
        setError(null);
        const response = await api.nba.getPlayer(115);
        setPlayer(response.data);
      } catch (err) {
        console.error("Failed to fetch player:", err);
        setError("Could not load player. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchPlayer();
  }, []);

  const nbaPlayerId = player ? playerIdMap[player.id] : null;
  const teamName = player?.team?.name;
  const teamClasses = teamColorMap[teamName] || {};

  const headshotUrl = nbaPlayerId
    ? `https://cdn.nba.com/headshots/nba/latest/1040x760/${nbaPlayerId}.png`
    : null;

  async function searchPlayerByName(name) {
    try {
      setLoading(true);
      setError(null);

      const trimmed = name.trim();
      if (!trimmed) return;

      const parts = trimmed.split(/\s+/);
      let response;

      if (parts.length === 2) {
        const [first, last] = parts;
        response = await api.nba.getPlayers({
          first_name: first,
          last_name: last,
          per_page: 1,
        });
      } else {
        response = await api.nba.getPlayers({
          search: trimmed,
          per_page: 10,
        });
      }

      if (response.data && response.data.length > 0) {
        const foundPlayer = response.data[0];
        const playerDetails = await api.nba.getPlayer(foundPlayer.id);
        setPlayer(playerDetails.data);
      } else {
        setPlayer(null);
        setError("No player found with that name.");
      }
    } catch (err) {
      console.error("Failed to search player:", err);
      if (err.response?.status === 429) {
        setError("Too many requests to the API. Please wait and try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
      setPlayer(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <main>
        {/* FIX: The 'container' class was removed from this section */}
        <section className="search-section">
          <SearchBar onSearch={searchPlayerByName} isLoading={loading} />
        </section>

        {loading && (
          <div className="spinner-container">
            <div className="spinner"></div>
            <p className="spinner-text">Searching...</p>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        {!loading && player && (
          <>
            <div className="player-title-bg-wrapper">
              <section className="player-title-bg container">
                <PlayerTitle player={player} headshotUrl={headshotUrl} />
              </section>
            </div>

            <div
              className={`player-details-bg-wrapper ${teamClasses.detailsBg}`}
            >
              <section className="player-details-bg container">
                <PlayerDetails player={player} teamClasses={teamClasses} />
              </section>
            </div>
          </>
        )}
      </main>
    </>
  );
}
