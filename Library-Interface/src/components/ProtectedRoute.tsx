import { Navigate } from "react-router-dom";
import { HasEnvBypass, isAuthenticated } from "../service/authService";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const isAuth = isAuthenticated();
    const hasBypass = HasEnvBypass();

    console.log("ProtectedRoute - isAuth:", isAuth, "hasBypass:", hasBypass);

    if (!isAuth && !hasBypass) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;