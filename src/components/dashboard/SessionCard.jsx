import { useNavigate } from "react-router-dom";

export default function SessionCard({ session, onDelete }) {
  const navigate = useNavigate();

  const scoreColor =
    session.score >= 8 ? "#16a34a" :
    session.score >= 5 ? "#d97706" : "#dc2626";

  const date = session.createdAt?.toDate
    ? session.createdAt.toDate().toLocaleDateString()
    : "—";

  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      padding: "1.25rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <span style={{ fontWeight: 600, fontSize: "15px", color: "#111" }}>
            {session.role}
          </span>
          <span style={{
            fontSize: "11px",
            background: "#f0f0ff",
            color: "#6366f1",
            padding: "2px 8px",
            borderRadius: "99px",
          }}>
            {session.domain}
          </span>
          <span style={{
            fontSize: "11px",
            background: "#f9f9f9",
            color: "#888",
            padding: "2px 8px",
            borderRadius: "99px",
          }}>
            {session.difficulty}
          </span>
        </div>
        <p style={{ fontSize: "12px", color: "#aaa", margin: 0 }}>{date}</p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ fontSize: "22px", fontWeight: 700, color: scoreColor }}>
          {session.score}/10
        </span>
        <button
          onClick={() => navigate(`/session/${session.id}`)}
          style={{
            padding: "6px 14px",
            fontSize: "13px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          Review
        </button>
        <button
          onClick={() => onDelete(session.id)}
          style={{
            padding: "6px 14px",
            fontSize: "13px",
            border: "1px solid #fecaca",
            borderRadius: "8px",
            background: "transparent",
            color: "#dc2626",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}