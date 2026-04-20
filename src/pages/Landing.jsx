import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Landing() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center", background: "#fafafa" }}>
      <div style={{ maxWidth: "600px" }}>
        <div style={{ fontSize: "13px", fontWeight: 600, color: "#6366f1", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>
          AI-Powered Interview Prep
        </div>
        <h1 style={{ fontSize: "48px", fontWeight: 700, color: "#111", lineHeight: 1.15, marginBottom: "1.25rem" }}>
          Ace your next interview with AI coaching
        </h1>
        <p style={{ fontSize: "18px", color: "#666", lineHeight: 1.7, marginBottom: "2.5rem" }}>
          Get role-specific questions, instant feedback on your answers, and track your weak spots — all powered by Claude AI.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => navigate(currentUser ? "/dashboard" : "/signup")}
            style={{ padding: "14px 32px", fontSize: "15px", fontWeight: 600, background: "#6366f1", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer" }}
          >
            {currentUser ? "Go to Dashboard" : "Get Started Free"}
          </button>
          {!currentUser && (
            <button
              onClick={() => navigate("/login")}
              style={{ padding: "14px 32px", fontSize: "15px", fontWeight: 500, background: "transparent", color: "#6366f1", border: "1px solid #6366f1", borderRadius: "10px", cursor: "pointer" }}
            >
              Log In
            </button>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginTop: "4rem" }}>
          {[
            { title: "Role-specific", desc: "Questions tailored to your exact job and level" },
            { title: "Instant feedback", desc: "AI scores each answer with strengths and improvements" },
            { title: "Track progress", desc: "Dashboard shows your weak topics over time" },
          ].map((f) => (
            <div key={f.title} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "1.25rem", textAlign: "left" }}>
              <p style={{ fontWeight: 600, fontSize: "14px", color: "#111", marginBottom: "6px" }}>{f.title}</p>
              <p style={{ fontSize: "13px", color: "#888", margin: 0, lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}