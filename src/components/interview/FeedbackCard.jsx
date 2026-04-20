export default function FeedbackCard({ feedback, onNext, isLast }) {
  const scoreColor =
    feedback.score >= 8 ? "#16a34a" :
    feedback.score >= 5 ? "#d97706" : "#dc2626";

  return (
    <div style={{
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      padding: "1.5rem",
      marginTop: "1.5rem",
      background: "#fff",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1rem" }}>
        <div style={{
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          background: `${scoreColor}18`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          fontWeight: 700,
          color: scoreColor,
        }}>
          {feedback.score}
        </div>
        <p style={{ fontSize: "15px", color: "#444", margin: 0 }}>{feedback.summary}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
        <div>
          <p style={{ fontSize: "12px", fontWeight: 600, color: "#16a34a", marginBottom: "6px" }}>
            Strengths
          </p>
          <ul style={{ margin: 0, paddingLeft: "18px" }}>
            {feedback.strengths.map((s, i) => (
              <li key={i} style={{ fontSize: "13px", color: "#444", marginBottom: "4px" }}>{s}</li>
            ))}
          </ul>
        </div>
        <div>
          <p style={{ fontSize: "12px", fontWeight: 600, color: "#d97706", marginBottom: "6px" }}>
            Improve
          </p>
          <ul style={{ margin: 0, paddingLeft: "18px" }}>
            {feedback.improvements.map((s, i) => (
              <li key={i} style={{ fontSize: "13px", color: "#444", marginBottom: "4px" }}>{s}</li>
            ))}
          </ul>
        </div>
      </div>

      {feedback.idealAnswer && (
        <div style={{
          background: "#f8f7ff",
          borderRadius: "8px",
          padding: "12px",
          marginBottom: "1rem",
          fontSize: "13px",
          color: "#555",
          lineHeight: 1.6,
        }}>
          <span style={{ fontWeight: 600, color: "#6366f1" }}>Strong answer: </span>
          {feedback.idealAnswer}
        </div>
      )}

      <button
        onClick={onNext}
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "14px",
          fontWeight: 500,
          background: "#6366f1",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {isLast ? "Finish Interview" : "Next Question →"}
      </button>
    </div>
  );
}