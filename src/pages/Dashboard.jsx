import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useSessions } from "../hooks/useSessions";
import StatBadge from "../components/dashboard/StatBadge";
import SessionCard from "../components/dashboard/SessionCard";
import WeaknessChart from "../components/dashboard/WeaknessChart";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { sessions, loading, remove } = useSessions();
  const navigate = useNavigate();

  const stats = useMemo(() => {
    if (sessions.length === 0) return { total: 0, avg: 0, best: 0 };
    const scores = sessions.map((s) => s.score ?? 0);
    return {
      total: sessions.length,
      avg: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      best: Math.max(...scores),
    };
  }, [sessions]);

  if (loading) return <div style={{ padding: "3rem", textAlign: "center", color: "#888" }}>Loading your sessions...</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111", margin: 0 }}>
            Hey, {currentUser?.displayName?.split(" ")[0]} 👋
          </h1>
          <p style={{ color: "#888", fontSize: "14px", marginTop: "4px" }}>Here's your interview progress</p>
        </div>
        <button
          onClick={() => navigate("/setup")}
          style={{ padding: "10px 22px", fontSize: "14px", fontWeight: 600, background: "#6366f1", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer" }}
        >
          + New Interview
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "2rem" }}>
        <StatBadge label="Sessions done" value={stats.total} />
        <StatBadge label="Average score" value={`${stats.avg}/10`} />
        <StatBadge label="Best score" value={`${stats.best}/10`} />
      </div>

      {sessions.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <WeaknessChart sessions={sessions} />
        </div>
      )}

      <div>
        <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#111", marginBottom: "1rem" }}>Recent sessions</h2>
        {sessions.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem", background: "#f9f9f9", borderRadius: "12px", color: "#888" }}>
            <p style={{ fontSize: "15px", marginBottom: "12px" }}>No sessions yet</p>
            <button
              onClick={() => navigate("/setup")}
              style={{ padding: "10px 22px", fontSize: "14px", background: "#6366f1", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}
            >
              Start your first interview
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {sessions.map((s) => (
              <SessionCard key={s.id} session={s} onDelete={remove} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}