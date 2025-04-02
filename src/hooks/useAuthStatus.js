import { useEffect } from "react";
import { auth } from "../config/Firebase/firebase"; 
import { onAuthStateChanged } from "firebase/auth";

const useAuthStatus = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Logged-in user:", currentUser);
    });

    return () => unsubscribe(); // Cleanup
  }, []);
};

export default useAuthStatus;
