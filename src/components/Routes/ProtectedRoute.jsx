import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, showSnackbar }) => {
    ProtectedRoute.propTypes = {
        children: PropTypes.node.isRequired,
    };
    const { userDetails } = useSelector((state) => state.user);

    if (!userDetails) {
        showSnackbar("Please login to continue generating itinerary!", "error")
    }

    return children;
}


export default ProtectedRoute;
