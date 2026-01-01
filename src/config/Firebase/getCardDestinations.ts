// import { db } from "./firebase";
import { getDocs, collection } from "firebase/firestore"; // use this instead of node_modules path
// import getUnsplashImages from "../Unsplash/getUnsplashImage";

interface Destination {
  id: string;
  title: string;
  description: string;
  image: {
    url: string;
    alt: string;
  }[];
  [key: string]: any; // for any additional fields
}

async function getCollectionData(): Promise<Destination[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'destinationsForCards'));

    const destinationsArray = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const data = doc.data() as Destination;
        const imageUrl = await getUnsplashImages(data.title, 1);

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

    return destinationsArray;

  } catch (error) {
    console.error('Error fetching collection from Firebase:', error);
    throw error; // allow caller (like redux thunk or useQuery) to catch this
  }
}

export default getCollectionData;
