import { useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

export default function WeaknessChart({ sessions }) {
  const data = useMemo(() => {
    const topicScores = {};
    sessions.forEach((session) => {
      session.questions?.forEach((q, i) => {
        const topic = q.topic || "General";
        const score = session.feedbacks?.[i]?.score ?? 0;
        if (!topicScores[topic]) topicScores[topic] = { total: 0, count: 0 };
        topicScores[topic].total += score;
        topicScores[topic].count += 1;
      });
    });

    return Object.entries(topicScores)
      .map(([topic, { total, count }]) => ({
        topic,
        avg: Math.round(total / count),
      }))
      .sort((a, b) => a.avg - b.avg)
      .slice(0, 6);
  }, [sessions]);

  if (data.length === 0) return null;

  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "1.25rem" }}>
      <p style={{ fontWeight: 600, fontSize: "15px", marginBottom: "1rem", color: "#111" }}>
        Topics to improve
      </p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" domain={[0, 10]} tick={{ fontSize: 12 }} />
          <YAxis dataKey="topic" type="category" width={110} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="avg" radius={[0, 4, 4, 0]}>
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.avg >= 8 ? "#16a34a" : entry.avg >= 5 ? "#d97706" : "#dc2626"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}