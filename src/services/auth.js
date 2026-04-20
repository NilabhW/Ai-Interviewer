import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

const googleProvider = new GoogleAuthProvider();

export async function signUp(email, password, displayName) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName });
  await setDoc(doc(db, "users", cred.user.uid), {
    uid: cred.user.uid,
    displayName,
    email,
    createdAt: serverTimestamp(),
  });
  return cred.user;
}

export async function logIn(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function googleSignIn() {
  const cred = await signInWithPopup(auth, googleProvider);
  const user = cred.user;
  await setDoc(
    doc(db, "users", user.uid),
    { uid: user.uid, displayName: user.displayName, email: user.email },
    { merge: true }
  );
  return user;
}

export async function logOut() {
  await signOut(auth);
}