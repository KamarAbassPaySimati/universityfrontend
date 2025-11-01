/* eslint-disable max-len */
import React from 'react';
import Dashboard from '../pages/Dashboard/Dashboard';
import Students from '../pages/Students';
import Faculty from '../pages/Faculty';
import Academics from '../pages/Academics';
import Administration from '../pages/Administration';
import Profile from '../pages/Profile';

export const ComponentsBasedOnRole = {
    'super-admin': [
        {
            name: 'Dashboard',
            element: <Dashboard />,
            path: '/dashboard'
        },
        {
            name: 'Profile',
            element: <Profile />,
            path: '/profile'
        },
        {
            name: 'Students',
            element: <Students />,
            path: '/students'
        },
        {
            name: 'All Students',
            element: <Students />,
            path: '/students/all-students'
        },
        {
            name: 'Admissions',
            element: <Students />,
            path: '/students/admissions'
        },
        {
            name: 'Enrollments',
            element: <Students />,
            path: '/students/enrollments'
        },
        {
            name: 'Clearance',
            element: <Students />,
            path: '/students/clearance'
        },
        {
            name: 'Faculty',
            element: <Faculty />,
            path: '/faculty'
        },
        {
            name: 'All Faculty',
            element: <Faculty />,
            path: '/faculty/all-faculty'
        },
        {
            name: 'Departments',
            element: <Faculty />,
            path: '/faculty/departments'
        },
        {
            name: 'Assignments',
            element: <Faculty />,
            path: '/faculty/assignments'
        },
        {
            name: 'Academics',
            element: <Academics />,
            path: '/academics'
        },
        {
            name: 'Courses',
            element: <Academics />,
            path: '/academics/courses'
        },
        {
            name: 'Programs',
            element: <Academics />,
            path: '/academics/programs'
        },
        {
            name: 'Schedules',
            element: <Academics />,
            path: '/academics/schedules'
        },
        {
            name: 'Grades',
            element: <Academics />,
            path: '/academics/grades'
        },
        {
            name: 'Analytics',
            element: <Academics />,
            path: '/academics/analytics'
        },
        {
            name: 'Transcripts',
            element: <Academics />,
            path: '/academics/transcripts'
        },
        {
            name: 'Appeals',
            element: <Academics />,
            path: '/academics/appeals'
        },
        {
            name: 'Attendance',
            element: <Academics />,
            path: '/academics/attendance'
        },
        {
            name: 'Administration',
            element: <Administration />,
            path: '/administration'
        },
        {
            name: 'Users',
            element: <Administration />,
            path: '/administration/users'
        },
        {
            name: 'Settings',
            element: <Administration />,
            path: '/administration/settings'
        },
        {
            name: 'Reports',
            element: <Administration />,
            path: '/administration/reports'
        }
    ],
    admin: [
        {
            name: 'Dashboard',
            element: <Dashboard />,
            path: '/dashboard'
        },
        {
            name: 'Profile',
            element: <Profile />,
            path: '/profile'
        },
        {
            name: 'Students',
            element: <Students />,
            path: '/students'
        },
        {
            name: 'Faculty',
            element: <Faculty />,
            path: '/faculty'
        },
        {
            name: 'Academics',
            element: <Academics />,
            path: '/academics'
        }
    ],
    faculty: [
        {
            name: 'Dashboard',
            element: <Dashboard />,
            path: '/dashboard'
        },
        {
            name: 'Profile',
            element: <Profile />,
            path: '/profile'
        },
        {
            name: 'My Courses',
            element: <Academics />,
            path: '/my-courses'
        },
        {
            name: 'Students',
            element: <Students />,
            path: '/students'
        }
    ],
    student: [
        {
            name: 'Dashboard',
            element: <Dashboard />,
            path: '/dashboard'
        },
        {
            name: 'Profile',
            element: <Profile />,
            path: '/profile'
        },
        {
            name: 'My Courses',
            element: <Academics />,
            path: '/my-courses'
        },
        {
            name: 'Grades',
            element: <div className="p-6"><h1 className="text-2xl font-bold">My Grades</h1></div>,
            path: '/grades'
        }
    ]
};