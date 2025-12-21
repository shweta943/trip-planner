import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const PrivateRoute = () => {
    const { userDetails } = useSelector((state: RootState) => state.user);
    return userDetails ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;