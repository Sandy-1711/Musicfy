import { useContext, useEffect } from 'react';
import Login from '../components/Login'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(function () {
        
    }, [user])

    const isLoggedIn = user;

    return isLoggedIn ? children : <Login />;
};

export default PrivateRoute;