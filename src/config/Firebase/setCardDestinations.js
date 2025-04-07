import { db } from './firebase';
import { setDoc, collection, doc } from 'firebase/firestore';
// import { useSelector } from 'react-redux';
// import { getAuth } from "firebase/auth";

// const { destinationsFromFb, destinationsFromGemini, loading, error } = useSelector(state => state.destinations);
const setCardDestinations = async (newDestination) => {
    try {

        const docRef = doc(db, "destinationsForCards");
        await setDoc(docRef, { newDestination }, { merge: true }); // Firestore auto-generates document ID
        console.log("Destination added successfully!");

    } catch (err) {
        console.error("Destination not added", err.message);
    }
}
export default setCardDestinations;