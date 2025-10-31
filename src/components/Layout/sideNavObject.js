export const sideNavObject = {
    'super-admin': {
        Dashboard: {
            path: 'dashboard',
            icon: 'DashboardOutlined'
        },
        Students: {
            path: 'students',
            icon: 'UserOutlined',
            dropdown: ['All Students', 'Admissions', 'Enrollments', 'Clearance']
        },
        Faculty: {
            path: 'faculty',
            icon: 'TeamOutlined',
            dropdown: ['All Faculty', 'Departments', 'Assignments']
        },
        Academics: {
            path: 'academics',
            icon: 'BookOutlined',
            dropdown: ['Courses', 'Programs', 'Schedules', 'Grades', 'Analytics', 'Transcripts', 'Appeals', 'Attendance']
        },
        Administration: {
            path: 'administration',
            icon: 'SettingOutlined',
            dropdown: ['Users', 'Settings', 'Reports']
        }
    },
    admin: {
        Dashboard: {
            path: 'dashboard',
            icon: 'DashboardOutlined'
        },
        Students: {
            path: 'students',
            icon: 'UserOutlined',
            dropdown: ['All Students', 'Admissions']
        },
        Faculty: {
            path: 'faculty',
            icon: 'TeamOutlined',
            dropdown: ['All Faculty', 'Departments']
        },
        Academics: {
            path: 'academics',
            icon: 'BookOutlined',
            dropdown: ['Courses', 'Programs']
        }
    },
    faculty: {
        Dashboard: {
            path: 'dashboard',
            icon: 'DashboardOutlined'
        },
        'My Courses': {
            path: 'my-courses',
            icon: 'BookOutlined'
        },
        Students: {
            path: 'students',
            icon: 'UserOutlined',
            dropdown: ['My Students', 'Grades']
        }
    },
    student: {
        Dashboard: {
            path: 'dashboard',
            icon: 'DashboardOutlined'
        },
        'My Courses': {
            path: 'my-courses',
            icon: 'BookOutlined'
        },
        Grades: {
            path: 'grades',
            icon: 'TrophyOutlined'
        },
        Profile: {
            path: 'profile',
            icon: 'UserOutlined'
        }
    }
};
