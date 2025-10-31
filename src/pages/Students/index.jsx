import React from 'react';
import { useLocation } from 'react-router-dom';
import AllStudents from './AllStudents';
import Admissions from './Admissions';
import Enrollments from './Enrollments';
import Clearance from './Clearance';

const Students = () => {
    const location = useLocation();
    
    // Check if we're on a specific sub-route
    if (location.pathname.includes('/clearance')) {
        return <Clearance />;
    }
    if (location.pathname.includes('/enrollments')) {
        return <Enrollments />;
    }
    if (location.pathname.includes('/admissions')) {
        return <Admissions />;
    }
    if (location.pathname.includes('/all-students') || location.pathname === '/students') {
        return <AllStudents />;
    }
    
    // Default view
    return <AllStudents />;
};

export default Students;