import { db } from './firebase';
import { getDocs, collection } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import getUnspashImages from '../Unsplash/getUnsplashImage';

// const user = auth;
const auth = getAuth();

async function getCollectionData() {

    // Return a promise because auth.onAuthStateChanged is an event and does not return a promise by default.
    // Redux needs to be handled all states (fulfilled/rejected/pending).
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const querySnapshot = await getDocs(collection(db, 'destinationsForCards'));

                    const destinationsArray = await Promise.all(
                        querySnapshot.docs.map(async (doc) => {
                            const data = doc.data();
                            const imageUrl = await getUnspashImages(data.title);

                            return {
                                ...data,
                                image: [
                                    {
                                        url: imageUrl[0]?.urls?.regular,
                                        alt: imageUrl[0]?.alt_description
                                    }
                                ]
                            };
                        })
                    );


                    console.log('destinationsArray: ', destinationsArray);
                    resolve(destinationsArray);

                } catch (error) {
                    console.error('Error fetching collection from Firebase', error);
                    reject(error);
                }
            } else {
                console.error("User not authenticated!");
                reject('User is not authenticated!!');
            }
        });
    })
}

// console.log('destination in collection', getCollectionData())
export default getCollectionData;