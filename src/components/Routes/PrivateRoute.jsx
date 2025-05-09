import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import SnackBar from "../UI/SnackBar";

const PrivateRoute = () => {
    const { userDetails } = useSelector(state => state.user);

    return userDetails ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;