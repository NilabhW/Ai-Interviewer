export default function QuestionCard({ question, index }) {
  return (
    <div style={{
      background: "#f8f7ff",
      border: "1px solid #e0e0ff",
      borderRadius: "12px",
      padding: "1.5rem",
      marginBottom: "1.5rem",
    }}>
      <div style={{
        fontSize: "11px",
        fontWeight: 600,
        color: "#6366f1",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        marginBottom: "10px",
      }}>
        {question.topic}
      </div>
      <p style={{ fontSize: "16px", fontWeight: 500, color: "#111", lineHeight: 1.6, margin: 0 }}>
        {question.question}
      </p>
      {question.hint && (
        <p style={{
          marginTop: "12px",
          fontSize: "13px",
          color: "#888",
          borderTop: "1px solid #e0e0ff",
          paddingTop: "10px",
        }}>
          Hint: {question.hint}
        </p>
      )}
    </div>
  );
}