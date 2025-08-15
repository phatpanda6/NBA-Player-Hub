export default function StatBox({ label, value, className = "" }) {
  return (
    <div className={`stat-box ${className}`}>
      {label}: {value || "N/A"}
    </div>
  );
}
