import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user} = useContext(AuthContext)
    if (user) {
        children
    } 
    return <Navigate to = "/signin"></Navigate>
   

};

export default PrivateRoute;