export default function StatBadge({ label, value }) {
  return (
    <div style={{
      background: "#f9f9f9",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      padding: "1rem 1.25rem",
      textAlign: "center",
    }}>
      <p style={{ fontSize: "13px", color: "#888", margin: "0 0 6px" }}>{label}</p>
      <p style={{ fontSize: "28px", fontWeight: 600, color: "#111", margin: 0 }}>{value}</p>
    </div>
  );
}