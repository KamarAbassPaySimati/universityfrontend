import React from 'react';
import { useLocation } from 'react-router-dom';
import Users from './Users';
import Settings from './Settings';
import Reports from './Reports';

const Administration = () => {
    const location = useLocation();
    
    // Check if we're on a specific sub-route
    if (location.pathname.includes('/reports')) {
        return <Reports />;
    }
    if (location.pathname.includes('/settings')) {
        return <Settings />;
    }
    if (location.pathname.includes('/users') || location.pathname === '/administration') {
        return <Users />;
    }
    
    // Default view
    return <Users />;
};

export default Administration;