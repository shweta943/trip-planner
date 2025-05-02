import { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import CardsSlider from '../components/CardsSlider';
import Testimonials from '../components/Testimonials';
import getCardDestinations from '../config/Firebase/getCardDestinations';
import { useDispatch } from 'react-redux';
import { setCardDestinationsFromFb } from "../redux/destinationSlice";
import ImageGallery from '../components/ImageGallery';
import PropTypes from 'prop-types';
// import useAuth from '../hooks/useAuth';

const Home = ({ showSnackbar }) => {

    Home.propTypes = {
        showSnackbar: PropTypes.func.isRequired
    };

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCardData = async () => {
            const cardDestinations = await getCardDestinations();
            dispatch(setCardDestinationsFromFb(cardDestinations));   
        };
        fetchCardData();
    }, [dispatch]);

    return (
        <div>
            <HeroSection showSnackbar={showSnackbar} />
            <CardsSlider showSnackbar={showSnackbar} />
            <ImageGallery />
            <Testimonials />
        </div>

    )
}

export default Home;