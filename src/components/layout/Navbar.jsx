import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logOut();
    navigate("/");
  }

  return (
    <nav style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 2rem",
      height: "60px",
      borderBottom: "1px solid #e5e7eb",
      backgroundColor: "#fff",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      <Link to="/dashboard" style={{ fontWeight: 600, fontSize: "18px", textDecoration: "none", color: "#111" }}>
        AiInterviewer
      </Link>

      {currentUser && (
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <Link to="/dashboard" style={{ textDecoration: "none", color: "#555", fontSize: "14px" }}>
            Dashboard
          </Link>
          <Link to="/setup" style={{ textDecoration: "none", color: "#555", fontSize: "14px" }}>
            New Interview
          </Link>
          <span style={{ fontSize: "14px", color: "#888" }}>
            {currentUser.displayName || currentUser.email}
          </span>
          <button
            onClick={handleLogout}
            style={{
              padding: "6px 14px",
              fontSize: "13px",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              background: "transparent",
              cursor: "pointer",
              color: "#555",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}