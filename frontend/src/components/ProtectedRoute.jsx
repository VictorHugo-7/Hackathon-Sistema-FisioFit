import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [navigate, token]);

    if (!token) 
        return null; 
    return children;
};

export default ProtectedRoute;