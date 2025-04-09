import { useEffect, useState } from "react";
import { auth } from "../config/Firebase/firebase"; 
import { onAuthStateChanged } from "firebase/auth";

const useAuth = () => {
  const [user, setUser] = useState(null);      // Current user object
  const [loading, setLoading] = useState(true); // Whether auth is still checking
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Logged-in user:", currentUser);
      setUser(currentUser || null);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup
  }, []);

  // Return user details and user auth loading state
  return { user, loading };
};

export default useAuth;
