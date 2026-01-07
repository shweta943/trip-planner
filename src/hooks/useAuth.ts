/**
 * Custom hook to manage user authentication state using Firebase.
 * It listens for authentication state changes and provides sanitized user details.
 * It also updates the Redux store with the current user details.
 */

import { useEffect, useState } from "react";
import { auth } from "../config/Firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { setUserDetails } from "../redux/userSlice";

interface SanitizedUser {
  uid: string;
  name?: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

const useAuth = () => {
  const [user, setUser] = useState<SanitizedUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        dispatch(setUserDetails([]));
        setLoading(false);
        return;
      }
      const sanitizedUser = {
        uid: currentUser.uid,
        name: currentUser.displayName,
        email: currentUser.email,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        emailVerified: currentUser.emailVerified,
      }
      setUser(sanitizedUser);
      dispatch(setUserDetails([sanitizedUser]));
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup
  }, [dispatch]);

  // Return user details and user auth loading state
  return { user, loading };
};

export default useAuth;
