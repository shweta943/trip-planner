import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PrivateRoute = () => {
    const { loading, user } = useAuth();
    return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;