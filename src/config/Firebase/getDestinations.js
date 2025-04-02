import { db } from './firebase';
import { getDocs, collection } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

// const user = auth;
const auth = getAuth();

function getCollectionData() {
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            try {
                const querySnapshot = await getDocs(collection(db, "destinations"));
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                });
    
            } catch (error) {
                console,error('Error fetching collection from Firebase', error);
            }
        } else {
            console.error("User not authenticated!");
        }
    });
}

// console.log('destination in collection', getCollectionData())
export default getCollectionData;