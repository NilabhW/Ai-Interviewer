export default function ProgressBar({ current, total }) {
  const percent = Math.round(((current + 1) / total) * 100);

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: "13px",
        color: "#888",
        marginBottom: "6px",
      }}>
        <span>Question {current + 1} of {total}</span>
        <span>{percent}%</span>
      </div>
      <div style={{
        height: "6px",
        background: "#f0f0f0",
        borderRadius: "99px",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          width: `${percent}%`,
          background: "#6366f1",
          borderRadius: "99px",
          transition: "width 0.4s ease",
        }} />
      </div>
    </div>
  );
}