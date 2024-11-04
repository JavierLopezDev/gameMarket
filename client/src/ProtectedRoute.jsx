import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {

    const { loading, user, isAuthenticated } = useAuth();
    console.log(loading, isAuthenticated);

    if (!isAuthenticated) return <Navigate to="/login" replace/>

    return (
        <Outlet />
    );
}

export default ProtectedRoute;