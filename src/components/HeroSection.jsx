import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';


const HeroSection = () => {
    const [formModal, setFormModal] = useState(false);

    useEffect(() => {
        console.log("formModal state changed:", formModal);
    }, [formModal]);


    return (
        <>
            <div className="text-center text-white w-full p-12 h-screen bg-gradient-to-r from-black via-gray-950 to-black flex flex-col">
                {/* {Idea 5} */}
                <h2 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                    Apni Mitti, Apni Yatra!
                </h2>

                {/* Subtitle with Subtle Glow */}
                <p className="mt-4 text-lg md:text-xl text-gray-300 opacity-80">
                    <i>Let AI create the best itinerary tailored just for you.</i>
                </p>
                <div>
                    <button className="mt-6 px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 rounded-lg shadow-lg hover:shadow-orange-500/50 transition duration-300">
                        Get Itinerary
                    </button>
                </div>
            </div>
        </>
        // <div className="w-full p-12 h-screen bg-gradient-to-r from-black via-gray-950 to-black flex flex-col">
        //     <h1 className="text-white font-extrabold text-4xl md:text-5xl">Apni Mitti, Apni Yatra!</h1>
        //     <p className='text-blue-400 text-lg md:text-xl opacity-80'><i>Plan. Explore. Experience. Let AI design your ultimate journey in seconds!</i></p>
        //     <div>
        //         <button className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md hover:shadow-blue-500/50 transition duration-300">
        //             Get Itinerary
        //         </button>
        //     </div>
                        
        // </div>


    )
}
export default HeroSection;