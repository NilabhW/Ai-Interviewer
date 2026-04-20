import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { logIn, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await logIn(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError("");
    try {
      await googleSignIn();
      navigate("/dashboard");
    } catch (err) {
      setError("Google sign-in failed.");
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fafafa", padding: "2rem" }}>
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "2.5rem", width: "100%", maxWidth: "400px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111", marginBottom: "0.25rem" }}>Welcome back</h2>
        <p style={{ color: "#888", fontSize: "14px", marginBottom: "1.5rem" }}>Log in to continue practising</p>

        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "10px 14px", fontSize: "13px", color: "#dc2626", marginBottom: "1rem" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: "12px 14px", fontSize: "14px", border: "1px solid #e5e7eb", borderRadius: "8px", outline: "none", fontFamily: "inherit" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: "12px 14px", fontSize: "14px", border: "1px solid #e5e7eb", borderRadius: "8px", outline: "none", fontFamily: "inherit" }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ padding: "12px", fontSize: "14px", fontWeight: 600, background: "#6366f1", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <button
          onClick={handleGoogle}
          style={{ width: "100%", marginTop: "12px", padding: "12px", fontSize: "14px", fontWeight: 500, background: "#fff", color: "#444", border: "1px solid #e5e7eb", borderRadius: "8px", cursor: "pointer" }}
        >
          Continue with Google
        </button>

        <p style={{ textAlign: "center", fontSize: "13px", color: "#888", marginTop: "1.5rem" }}>
          No account? <Link to="/signup" style={{ color: "#6366f1" }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}