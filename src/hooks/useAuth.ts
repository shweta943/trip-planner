import { useEffect, useState } from "react";
import { auth } from "../config/Firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { setUserDetails } from "../redux/userSlice";

interface SanitizedUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  acessToken?: string;
}

const useAuth = () => {
  const [user, setUser] = useState<SanitizedUser | string | null>(null);      // Current user object
  const [loading, setLoading] = useState<boolean>(true); // Whether auth is still checking
  const message = 'No user subscribed';
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

        const sanitizedUser = currentUser
          ? {
            id: currentUser.uid,
            uid: currentUser.uid,
            name: currentUser.displayName,
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            emailVerified: currentUser.emailVerified,
            acessToken: await currentUser.getIdToken(),
          }
          : null;

        setUser(sanitizedUser || message);
        dispatch(setUserDetails(sanitizedUser ? [sanitizedUser] : []));
        setLoading(false);
      });

      return () => unsubscribe(); // Cleanup
    } catch (error) {
      console.error('Error in user:', error);
    }

  }, []);

  // Return user details and user auth loading state
  return { user, loading };
};

export default useAuth;
