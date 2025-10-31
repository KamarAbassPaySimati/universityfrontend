import React from 'react';
import { useLocation } from 'react-router-dom';
import Courses from './Courses';
import Programs from './Programs';
import Schedules from './Schedules';
import Grades from './Grades';
import GradeAnalytics from './GradeAnalytics';
import Transcripts from './Transcripts';
import GradeAppeals from './GradeAppeals';
import Attendance from './Attendance';

const Academics = () => {
    const location = useLocation();
    
    // Check if we're on a specific sub-route
    if (location.pathname.includes('/attendance')) {
        return <Attendance />;
    }
    if (location.pathname.includes('/appeals')) {
        return <GradeAppeals />;
    }
    if (location.pathname.includes('/transcripts')) {
        return <Transcripts />;
    }
    if (location.pathname.includes('/analytics')) {
        return <GradeAnalytics />;
    }
    if (location.pathname.includes('/grades')) {
        return <Grades />;
    }
    if (location.pathname.includes('/schedules')) {
        return <Schedules />;
    }
    if (location.pathname.includes('/programs')) {
        return <Programs />;
    }
    if (location.pathname.includes('/courses')) {
        return <Courses />;
    }
    
    // Default view
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Academic Management</h1>
            <p className="text-gray-600">Manage courses, programs, schedules, and grades.</p>
        </div>
    );
};

export default Academics;