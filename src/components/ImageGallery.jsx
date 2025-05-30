// components/ImageGallery.jsx
import { useQueries } from '@tanstack/react-query';
import getUnspashImages from '../config/Unsplash/getUnsplashImage';
import { Container } from '@mui/material';

const fetchImageForDestination = async (destination) => {
    const response = await getUnspashImages(destination, 1);
    return response;
};

const destinationsInIndia = ['Jaisalmer', 'Manali', 'Hampi', 'Kerala', 'Kutch', 'Andaman and Nicobar Islands', 'Coorg', 'Ladakh', 'Ooty', 'Nainital', 'Rishikesh', 'Munnar'];

const ImageGallery = () => {
    const imageQueries = useQueries({
        queries: destinationsInIndia?.map((destination) => ({
            queryKey: ['destinationImage', destination],
            queryFn: () => fetchImageForDestination(destination),
        })),
    });
    const imagesData = imageQueries.filter(q => q.status === 'success').map(q => q.data[0]);
    const images = imagesData?.map((destImage, index) => ({
        title: destinationsInIndia[index],
        img: destImage?.urls?.regular,
        alt: destImage?.alt_description,
        description: destImage?.description
    }));
    // if (isLoading) return <p className="text-center">Loading gallery...</p>;
    // if (isError) return <p className="text-center text-red-500">Failed to load images.</p>;

    return (
        <div className="bg-[#f9f9f9] py-10 px-4">
            <Container maxWidth='xl'>

                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Discover India: A Visual Journey</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {images.map((image, index) => (
                        <div key={index} className="relative overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
                            <img
                                src={image.img}
                                alt={image.alt}
                                className="w-full h-64 object-cover"
                            />
                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                                <h3 className="text-white text-lg font-semibold">{image.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>


            </Container>
        </div>
    );
};

export default ImageGallery;
