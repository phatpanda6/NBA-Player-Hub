import nbaLogo from "../assets/nba.png";

export default function Navbar() {
  return (
    <nav>
      <img className="nav-logo" src={nbaLogo} alt="NBA logo" />
      NBA Player Hub
    </nav>
  );
}
