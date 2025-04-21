import { useEffect, useState } from "react";
import { auth } from "../config/Firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { setUserDetails } from "../redux/userSlice";

const useAuth = () => {
  const [user, setUser] = useState(null);      // Current user object
  const [loading, setLoading] = useState(true); // Whether auth is still checking
  const message = 'No user subscribed';
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

        const sanitizedUser = currentUser
          ? {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            emailVerified: currentUser.emailVerified,
            acessToken: currentUser.accessToken,
          }
          : null;

        setUser(sanitizedUser || message);
        dispatch(setUserDetails(sanitizedUser));
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
