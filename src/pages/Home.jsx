import { useEffect } from 'react';
// import SignUpModal from '../components/SignUpModal';
import HeroSection from '../components/HeroSection';
import CardsSlider from '../components/CardsSlider';
import getCardDestinations from '../config/Firebase/getCardDestinations';
import { useDispatch, useSelector } from 'react-redux';
import { setCardDestinationsFromFb, setLoading, setError } from "../redux/destinationSlice";

const Home = () => {
    const dispatch = useDispatch();
    const { cardDestinationsFromFb, loading, error } = useSelector(state => state.destinations);

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
            {/* {formModal && <SignUpModal open={formModal} onFormClose={() => setFormModal(false)} />} */}
        </div>

    )
}

export default Home;