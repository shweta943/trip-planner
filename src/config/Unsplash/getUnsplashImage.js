import { createApi } from 'unsplash-js';
// import nodeFetch from 'node-fetch';

const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY
});

const getUnspashImages = async (query, perPage) => {
    try {
        const images = await unsplash.search.getPhotos({
            query,
            page: 1,
            perPage,
            orientation: 'landscape'
        })
  
    
        if (images.errors) {
            console.error("Unsplash API Error:", images.errors);
            return [];
          }
          return images?.response?.results;
    } catch (error) {
        console.error('Error fetching Images', error);
    }
}
// return images
export default getUnspashImages;