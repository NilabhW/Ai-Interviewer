import { useAuthContext } from "../context/AuthContext";
import { logIn, logOut, signUp, googleSignIn } from "../services/auth";

export function useAuth() {
  const { currentUser, loading } = useAuthContext();

  return {
    currentUser,
    loading,
    signUp,
    logIn,
    logOut,
    googleSignIn,
  };
}