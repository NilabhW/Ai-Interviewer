import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export async function saveSession(uid, sessionData) {
  const ref = collection(db, "users", uid, "sessions");
  const docRef = await addDoc(ref, {
    ...sessionData,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getSessions(uid) {
  const ref = collection(db, "users", uid, "sessions");
  const q = query(ref, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getSession(uid, sessionId) {
  const ref = doc(db, "users", uid, "sessions", sessionId);
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error("Session not found");
  return { id: snap.id, ...snap.data() };
}

export async function deleteSession(uid, sessionId) {
  const ref = doc(db, "users", uid, "sessions", sessionId);
  await deleteDoc(ref);
}