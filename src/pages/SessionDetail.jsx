import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSessions } from "../hooks/useSessions";

export default function SessionDetail() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { fetchOne, remove } = useSessions();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOne(sessionId).then(setSession).finally(() => setLoading(false));
  }, [sessionId]);

  async function handleDelete() {
    if (!confirm("Delete this session?")) return;
    await remove(sessionId);
    navigate("/dashboard");
  }

  if (loading) return <div style={{ padding: "3rem", textAlign: "center", color: "#888" }}>Loading session...</div>;
  if (!session) return <div style={{ padding: "3rem", textAlign: "center", color: "#dc2626" }}>Session not found.</div>;

  const scoreColor = (score) =>
    score >= 8 ? "#16a34a" : score >= 5 ? "#d97706" : "#dc2626";

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "2rem 1.5rem" }}>
      <button onClick={() => navigate("/dashboard")} style={{ fontSize: "13px", color: "#6366f1", background: "none", border: "none", cursor: "pointer", marginBottom: "1.5rem", padding: 0 }}>
        ← Back to Dashboard
      </button>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#111", margin: 0 }}>{session.role}</h1>
          <p style={{ color: "#888", fontSize: "14px", marginTop: "4px" }}>
            {session.domain} · {session.difficulty}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "28px", fontWeight: 700, color: scoreColor(session.score) }}>
            {session.score}/10
          </span>
          <button
            onClick={handleDelete}
            style={{ padding: "8px 16px", fontSize: "13px", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "8px", background: "transparent", cursor: "pointer" }}
          >
            Delete
          </button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {session.questions?.map((q, i) => {
          const feedback = session.feedbacks?.[i];
          const answer = session.answers?.[i];
          return (
            <div key={i} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ background: "#f8f7ff", padding: "1rem 1.25rem", borderBottom: "1px solid #e0e0ff" }}>
                <span style={{ fontSize: "11px", fontWeight: 600, color: "#6366f1", textTransform: "uppercase" }}>{q.topic}</span>
                <p style={{ fontSize: "15px", fontWeight: 500, color: "#111", margin: "6px 0 0" }}>{q.question}</p>
              </div>
              <div style={{ padding: "1rem 1.25rem" }}>
                <p style={{ fontSize: "12px", fontWeight: 600, color: "#888", marginBottom: "6px" }}>Your answer</p>
                <p style={{ fontSize: "14px", color: "#444", lineHeight: 1.6, marginBottom: "1rem" }}>{answer || "No answer recorded."}</p>
                {feedback && (
                  <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "20px", fontWeight: 700, color: scoreColor(feedback.score), minWidth: "40px" }}>
                      {feedback.score}/10
                    </span>
                    <p style={{ fontSize: "13px", color: "#666", margin: 0, lineHeight: 1.6 }}>{feedback.summary}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}