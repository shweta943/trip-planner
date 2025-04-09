import { useEffect } from 'react';
// import SignUpModal from '../components/SignUpModal';
import HeroSection from '../components/HeroSection';
import CardsSlider from '../components/CardsSlider';
import Testimonials from '../components/Testimonials';
import getCardDestinations from '../config/Firebase/getCardDestinations';
import { useDispatch } from 'react-redux';
import { setCardDestinationsFromFb } from "../redux/destinationSlice";
import ImageGallery from '../components/ImageGallery';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCardData = async () => {
            const cardDestinations = await getCardDestinations();
            dispatch(setCardDestinationsFromFb(cardDestinations)); // store it in Red    
        };
        fetchCardData();
    }, [dispatch]);

    return (
        <div>
            <HeroSection />
            <CardsSlider />
            <ImageGallery />
            <Testimonials />
            {/* {formModal && <SignUpModal open={formModal} onFormClose={() => setFormModal(false)} />} */}
        </div>

    )
}

export default Home;