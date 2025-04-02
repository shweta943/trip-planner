import { useState, useEffect } from 'react';
import SignUpModal from '../components/SignUpModal';
import HeroSection from '../components/HeroSection';
import CardsSlider from '../components/CardsSlider';
// import useAuthStatus from "../hooks/useAuthStatus";
// import geminiAi from '../config/GeminiAI/geminiAi';
// import getImages from '../config/getImageUrl';
// import getCollectionData from '../config/';

const Home = () => {
    // const test = useAuthStatus();
    // console.log('test: ', test);
    // const data = geminiAi();
    // console.log('data: ', data);
    // const images = getImages();
    // console.log('imagesInComponent: ', images);
    // const destinations = getCollectionData();
    // console.log('destinations: ', destinations);
    

    return (
        <div>
            <HeroSection />
            <CardsSlider />
            {/* {formModal && <SignUpModal open={formModal} onFormClose={() => setFormModal(false)} />} */}
        </div>

    )
}

export default Home;