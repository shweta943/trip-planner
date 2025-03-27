import { useState, useEffect } from 'react';
import SignUpModal from '../components/SignUpModal';
import HeroSection from '../components/HeroSection';
import CardsSlider from '../components/CardsSlider';
import useAuthStatus from "../hooks/useAuthStatus";
import geminiAi from '../config/geminiAi';

const Home = () => {
    const test = useAuthStatus();
    console.log('test: ', test);
    const data = geminiAi();
    console.log('data: ', data);

    return (
        <div className='bg-gradient-to-r from-black via-gray-950 to-black'>
            <HeroSection />
            <CardsSlider />
            {/* {formModal && <SignUpModal open={formModal} onFormClose={() => setFormModal(false)} />} */}
        </div>

    )
}

export default Home;