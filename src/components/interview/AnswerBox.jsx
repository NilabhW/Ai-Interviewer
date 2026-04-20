import { useState, useRef, useEffect } from "react";

export default function AnswerBox({ onSubmit, loading }) {
  const [answer, setAnswer] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  function handleSubmit() {
    if (!answer.trim() || loading) return;
    onSubmit(answer.trim());
    setAnswer("");
  }

  const wordCount = answer.trim() === "" ? 0 : answer.trim().split(/\s+/).length;

  return (
    <div>
      <textarea
        ref={textareaRef}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer here..."
        rows={6}
        style={{
          width: "100%",
          padding: "14px",
          fontSize: "15px",
          border: "1px solid #e5e7eb",
          borderRadius: "10px",
          resize: "vertical",
          fontFamily: "inherit",
          lineHeight: 1.6,
          outline: "none",
          boxSizing: "border-box",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => e.target.style.borderColor = "#6366f1"}
        onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
        disabled={loading}
      />
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "10px",
      }}>
        <span style={{ fontSize: "12px", color: "#aaa" }}>{wordCount} words</span>
        <button
          onClick={handleSubmit}
          disabled={!answer.trim() || loading}
          style={{
            padding: "10px 24px",
            fontSize: "14px",
            fontWeight: 500,
            background: !answer.trim() || loading ? "#e5e7eb" : "#6366f1",
            color: !answer.trim() || loading ? "#aaa" : "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: !answer.trim() || loading ? "not-allowed" : "pointer",
            transition: "background 0.2s",
          }}
        >
          {loading ? "Getting feedback..." : "Submit Answer"}
        </button>
      </div>
    </div>
  );
}