import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {

    const {user} = useAuth();
    const location = useLocation(); // Storing the path where the user wanted to go

    if(!user){
        return <Navigate to='/login' state={{from: location}} replace></Navigate> // redirects to /login and saves where they wanted to go.
    }
    return children;
};

export default PrivateRoute;