import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles, currentRole }) => {
    if (!allowedRoles.includes(currentRole)) {
        // Redirect to appropriate dashboard based on role
        const redirectPath = currentRole === 'student' ? '/dashboard?role=student' : '/dashboard';
        return <Navigate to={redirectPath} replace />;
    }
    
    return children;
};

export default ProtectedRoute;