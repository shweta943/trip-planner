// import { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = ({ showSnackbar }) => {
    const { userDetails } = useSelector(state => state.user);
    HeroSection.propTypes = {
        showSnackbar: PropTypes.func.isRequired,
    };
    const navigate = useNavigate();

    const handleButtonClick = () => {
        !userDetails ?
            showSnackbar("Please login to continue generating itinerary!", "error") : navigate('/generate-trip');
    };


    return (
        <>
            <div className="text-center text-white w-full min-h-[80vh] p-12 flex flex-col items-center justify-center bg-gradient-to-r from-black via-gray-950 to-black">
                <motion.h2 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                    Where Every Journey Tells a Tale of Heritage
                </motion.h2>

                <p className="mt-4 text-lg md:text-xl text-gray-300 opacity-80">
                    <i>Let AI create the best itinerary tailored just for you.</i>
                </p>
                <div>
                    <button
                        className="mt-6 px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 rounded-lg shadow-lg hover:shadow-orange-500/50 transition duration-300"
                        onClick={handleButtonClick}
                    >
                        Get Itinerary
                    </button>
                </div>
            </div>
        </>
    )
}
export default HeroSection;