import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInterviewContext } from "../context/InterviewContext";

const ROLES = ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Product Manager", "Data Analyst", "Data Scientist", "DevOps Engineer", "UI/UX Designer"];
const DOMAINS = ["Technical", "HR & Behavioural", "System Design", "Problem Solving"];
const DIFFICULTIES = ["Junior", "Mid-level", "Senior"];
const COUNTS = [3, 5, 7, 10];

export default function Setup() {
  const { setupSession } = useInterviewContext();
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [domain, setDomain] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [count, setCount] = useState(5);

  const canStart = role && domain && difficulty;

  function handleStart() {
    if (!canStart) return;
    setupSession(role, domain, difficulty, count);
    navigate("/interview");
  }

  const selectStyle = {
    width: "100%",
    padding: "12px 14px",
    fontSize: "14px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    background: "#fff",
    color: "#111",
    outline: "none",
    fontFamily: "inherit",
    cursor: "pointer",
  };

  return (
    <div style={{ minHeight: "calc(100vh - 60px)", display: "flex", alignItems: "center", justifyContent: "center", background: "#fafafa", padding: "2rem" }}>
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "2.5rem", width: "100%", maxWidth: "480px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#111", marginBottom: "0.25rem" }}>Configure your interview</h2>
        <p style={{ color: "#888", fontSize: "14px", marginBottom: "2rem" }}>Pick your role and we'll generate real questions</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ fontSize: "13px", fontWeight: 600, color: "#555", display: "block", marginBottom: "6px" }}>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} style={selectStyle}>
              <option value="">Select a role...</option>
              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div>
            <label style={{ fontSize: "13px", fontWeight: 600, color: "#555", display: "block", marginBottom: "6px" }}>Domain</label>
            <select value={domain} onChange={(e) => setDomain(e.target.value)} style={selectStyle}>
              <option value="">Select a domain...</option>
              {DOMAINS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div>
            <label style={{ fontSize: "13px", fontWeight: 600, color: "#555", display: "block", marginBottom: "6px" }}>Difficulty</label>
            <div style={{ display: "flex", gap: "8px" }}>
              {DIFFICULTIES.map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  style={{
                    flex: 1,
                    padding: "10px",
                    fontSize: "13px",
                    fontWeight: 500,
                    border: difficulty === d ? "2px solid #6366f1" : "1px solid #e5e7eb",
                    borderRadius: "8px",
                    background: difficulty === d ? "#f0f0ff" : "#fff",
                    color: difficulty === d ? "#6366f1" : "#555",
                    cursor: "pointer",
                  }}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: "13px", fontWeight: 600, color: "#555", display: "block", marginBottom: "6px" }}>
              Number of questions
            </label>
            <div style={{ display: "flex", gap: "8px" }}>
              {COUNTS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCount(c)}
                  style={{
                    flex: 1,
                    padding: "10px",
                    fontSize: "13px",
                    fontWeight: 500,
                    border: count === c ? "2px solid #6366f1" : "1px solid #e5e7eb",
                    borderRadius: "8px",
                    background: count === c ? "#f0f0ff" : "#fff",
                    color: count === c ? "#6366f1" : "#555",
                    cursor: "pointer",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleStart}
            disabled={!canStart}
            style={{
              marginTop: "8px",
              padding: "14px",
              fontSize: "15px",
              fontWeight: 600,
              background: canStart ? "#6366f1" : "#e5e7eb",
              color: canStart ? "#fff" : "#aaa",
              border: "none",
              borderRadius: "10px",
              cursor: canStart ? "pointer" : "not-allowed",
              transition: "background 0.2s",
            }}
          >
            Generate Questions →
          </button>
        </div>
      </div>
    </div>
  );
}