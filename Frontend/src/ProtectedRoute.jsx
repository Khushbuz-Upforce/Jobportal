import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ role, children }) => {
    const { isAuthenticated, user } = useSelector(state => state.auth);

    if (!isAuthenticated) return <Navigate to="/login" />;
    if (role && user.role !== role) return <Navigate to="/" />;

    return children;
};

export default ProtectedRoute;
