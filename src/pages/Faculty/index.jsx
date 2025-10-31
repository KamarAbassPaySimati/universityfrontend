import React from 'react';
import { useLocation } from 'react-router-dom';
import AllFaculty from './AllFaculty';
import Departments from './Departments';
import Assignments from './Assignments';

const Faculty = () => {
    const location = useLocation();
    
    // Check if we're on a specific sub-route
    if (location.pathname.includes('/assignments')) {
        return <Assignments />;
    }
    if (location.pathname.includes('/departments')) {
        return <Departments />;
    }
    if (location.pathname.includes('/all-faculty') || location.pathname === '/faculty') {
        return <AllFaculty />;
    }
    
    // Default view
    return <AllFaculty />;
};

export default Faculty;