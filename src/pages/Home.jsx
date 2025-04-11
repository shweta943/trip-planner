import { useEffect } from 'react';
// import SignUpModal from '../components/SignUpModal';
import HeroSection from '../components/HeroSection';
import CardsSlider from '../components/CardsSlider';
import Testimonials from '../components/Testimonials';
import Navbar from '../components/Navbar/Navbar';
import getCardDestinations from '../config/Firebase/getCardDestinations';
import { useDispatch } from 'react-redux';
import { setCardDestinationsFromFb } from "../redux/destinationSlice";
import ImageGallery from '../components/ImageGallery';
import useAuth from '../hooks/useAuth';

const Home = () => {
    const dispatch = useDispatch();
    const auth = useAuth();
    const { user } = auth;
    console.log('user: ', user);

    useEffect(() => {
        const fetchCardData = async () => {
            const cardDestinations = await getCardDestinations();
            dispatch(setCardDestinationsFromFb(cardDestinations)); // store it in Red    
        };
        fetchCardData();
    }, [dispatch]);

    return (
        <div>
            <Navbar />
            <HeroSection />
            <CardsSlider />
            <ImageGallery />
            <Testimonials />
            {/* {formModal && <SignUpModal open={formModal} onFormClose={() => setFormModal(false)} />} */}
        </div>

    )
}

export default Home;