import React from 'react';
import { useLocation } from 'react-router-dom';
import AllFaculty from './AllFaculty';

const Faculty = () => {
    const location = useLocation();
    
    // Check if we're on a specific sub-route
    if (location.pathname.includes('/assignments')) {
        return <div className="p-6"><h2>Faculty Assignments</h2><p>Assignments component will be implemented here</p></div>;
    }
    if (location.pathname.includes('/departments')) {
        return <div className="p-6"><h2>Departments Management</h2><p>Departments component will be implemented here</p></div>;
    }
    
    // Default view - All Faculty
    return <AllFaculty />;
};

export default Faculty;