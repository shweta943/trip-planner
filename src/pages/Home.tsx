import { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import CardsSlider from '../components/CardsSlider';
import Testimonials from '../components/Testimonials';
// import getCardDestinations from '../config/Firebase/getCardDestinations';
import { useDispatch } from 'react-redux';
import { setCardDestinationsFromFb } from "../redux/destinationSlice";
// import ImageGallery from '../components/ImageGallery';
import PropTypes from 'prop-types';
// import useAuth from '../hooks/useAuth';

interface HomeProps {
    showSnackbar: (message: string, severity?: string) => void;
}

const Home = ({ showSnackbar }: HomeProps) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCardData = async () => {
            // const cardDestinations = await getCardDestinations();
            // const mappedDestinations = cardDestinations.map(dest => ({
            //     ...dest,
            //     details: dest.details || '',
            //     bestTimeToVisit: dest.bestTimeToVisit || ''
            // }));
            // dispatch(setCardDestinationsFromFb(mappedDestinations));   
        };
        fetchCardData();
    }, [dispatch]);

    return (
        <div>
            <HeroSection showSnackbar={showSnackbar} />
            <CardsSlider showSnackbar={showSnackbar} />
            {/* <ImageGallery /> */}
            <Testimonials />
        </div>

    )
}

export default Home;