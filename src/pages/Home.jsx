import { useState, useEffect } from 'react';
import SignUpModal from '../components/SignUpModal';
import HeroSection from '../components/HeroSection';
import useAuthStatus from "../hooks/useAuthStatus";
import geminiAi from '../config/geminiAi';

const Home = () => {
    const test = useAuthStatus();
    console.log('test: ', test);
    // const data = geminiAi();
    // console.log('data: ', data);

    return (
        <>
            <HeroSection />

            {/* {formModal && <SignUpModal open={formModal} onFormClose={() => setFormModal(false)} />} */}
            
        </>
    )
}

export default Home;