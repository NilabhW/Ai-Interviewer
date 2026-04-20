import { useState, useEffect } from "react";
import { getSessions, saveSession, deleteSession, getSession } from "../services/firestore";
import { useAuth } from "./useAuth";

export function useSessions() {
  const { currentUser } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) return;
    fetchSessions();
  }, [currentUser]);

  async function fetchSessions() {
    setLoading(true);
    try {
      const data = await getSessions(currentUser.uid);
      setSessions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function save(sessionData) {
    const id = await saveSession(currentUser.uid, sessionData);
    await fetchSessions();
    return id;
  }

  async function remove(sessionId) {
    await deleteSession(currentUser.uid, sessionId);
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
  }

  async function fetchOne(sessionId) {
    return await getSession(currentUser.uid, sessionId);
  }

  return { sessions, loading, error, save, remove, fetchOne };
}