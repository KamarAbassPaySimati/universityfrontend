import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Table, Tag, Progress, Row, Col, Statistic, Button } from 'antd';
import { BookOutlined, TrophyOutlined, DollarOutlined, CalendarOutlined } from '@ant-design/icons';

const StudentPortal = () => {
    const location = useLocation();

    // Mock student data
    const studentData = {
        id: 'STU001',
        name: 'John Doe',
        program: 'Computer Science',
        year: 3,
        semester: 'Spring 2024',
        gpa: 3.75
    };

    const mockCourses = [
        { key: '1', code: 'CS301', name: 'Data Structures', credits: 3, grade: 'A', status: 'Completed' },
        { key: '2', code: 'CS302', name: 'Algorithms', credits: 3, grade: 'B+', status: 'In Progress' },
        { key: '3', code: 'CS303', name: 'Database Systems', credits: 4, grade: '-', status: 'Enrolled' }
    ];

    const mockGrades = [
        { key: '1', course: 'Data Structures', assignment1: 18, assignment2: 17, midSem: 19, endSem: 55, total: 109, grade: 'Distinction' },
        { key: '2', course: 'Algorithms', assignment1: 16, assignment2: 18, midSem: 17, endSem: 50, total: 101, grade: 'Credit' },
        { key: '3', course: 'Mathematics', assignment1: 14, assignment2: 15, midSem: 16, endSem: 45, total: 90, grade: 'Pass' },
        { key: '4', course: 'Physics', assignment1: 12, assignment2: 13, midSem: 14, endSem: 42, total: 81, grade: 'Marginal Pass' },
        { key: '5', course: 'Chemistry', assignment1: 8, assignment2: 9, midSem: 10, endSem: 25, total: 52, grade: 'Fail' }
    ];

    const feeData = {
        totalFees: 8000,
        paidAmount: 6000,
        paymentPercentage: 75,
        outstandingAmount: 2000
    };

    const getPageContent = () => {
        const path = location.pathname;
        
        if (path.includes('my-courses')) {
            const extendedCourses = [
                { 
                    key: '1', 
                    code: 'CS301', 
                    name: 'Data Structures', 
                    credits: 3, 
                    grade: 'Distinction', 
                    status: 'Completed',
                    instructor: 'Dr. Smith',
                    schedule: 'Mon/Wed 10:00-11:30',
                    attendance: '95%'
                },
                { 
                    key: '2', 
                    code: 'CS302', 
                    name: 'Algorithms', 
                    credits: 3, 
                    grade: 'Credit', 
                    status: 'In Progress',
                    instructor: 'Prof. Johnson',
                    schedule: 'Tue/Thu 14:00-15:30',
                    attendance: '88%'
                },
                { 
                    key: '3', 
                    code: 'CS303', 
                    name: 'Database Systems', 
                    credits: 4, 
                    grade: '-', 
                    status: 'Enrolled',
                    instructor: 'Dr. Williams',
                    schedule: 'Mon/Wed/Fri 09:00-10:00',
                    attendance: '92%'
                },
                { 
                    key: '4', 
                    code: 'CS304', 
                    name: 'Software Engineering', 
                    credits: 4, 
                    grade: '-', 
                    status: 'Enrolled',
                    instructor: 'Prof. Brown',
                    schedule: 'Tue/Thu 11:00-12:30',
                    attendance: '90%'
                }
            ];

            const courseColumns = [
                { title: 'Course Code', dataIndex: 'code', key: 'code', width: 100 },
                { title: 'Course Name', dataIndex: 'name', key: 'name', width: 200 },
                { title: 'Instructor', dataIndex: 'instructor', key: 'instructor', width: 150 },
                { title: 'Schedule', dataIndex: 'schedule', key: 'schedule', width: 150 },
                { title: 'Credits', dataIndex: 'credits', key: 'credits', width: 80 },
                { 
                    title: 'Attendance', 
                    dataIndex: 'attendance', 
                    key: 'attendance',
                    width: 100,
                    render: (attendance) => {
                        const percent = parseInt(attendance);
                        const color = percent >= 90 ? 'green' : percent >= 75 ? 'orange' : 'red';
                        return <Tag color={color}>{attendance}</Tag>;
                    }
                },
                { 
                    title: 'Grade', 
                    dataIndex: 'grade', 
                    key: 'grade',
                    width: 80,
                    render: (grade) => grade === '-' ? <span className="text-gray-400">Pending</span> : <strong>{grade}</strong>
                },
                { 
                    title: 'Status', 
                    dataIndex: 'status', 
                    key: 'status',
                    width: 120,
                    render: (status) => {
                        const colors = { 'Completed': 'green', 'In Progress': 'blue', 'Enrolled': 'orange' };
                        return <Tag color={colors[status]}>{status}</Tag>;
                    }
                },
                {
                    title: 'Actions',
                    key: 'actions',
                    width: 100,
                    render: (_, record) => (
                        <Button type="link" size="small">
                            View Details
                        </Button>
                    )
                }
            ];

            return (
                <div>
                    <h2 className="text-xl font-semibold mb-4">My Courses</h2>
                    <Row gutter={16} className="mb-6">
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="Total Courses"
                                    value={extendedCourses.length}
                                    prefix={<BookOutlined />}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="Completed"
                                    value={extendedCourses.filter(c => c.status === 'Completed').length}
                                    valueStyle={{ color: '#3f8600' }}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="In Progress"
                                    value={extendedCourses.filter(c => c.status === 'In Progress').length}
                                    valueStyle={{ color: '#1890ff' }}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="Total Credits"
                                    value={extendedCourses.reduce((sum, course) => sum + course.credits, 0)}
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Card>
                        <Table 
                            columns={courseColumns} 
                            dataSource={extendedCourses} 
                            pagination={{ pageSize: 10 }}
                            scroll={{ x: 1000 }}
                        />
                    </Card>
                </div>
            );
        }
        
        if (path.includes('grades')) {
            const gradeColumns = [
                { title: 'Course', dataIndex: 'course', key: 'course' },
                { title: 'Assignment 1 (20)', dataIndex: 'assignment1', key: 'assignment1' },
                { title: 'Assignment 2 (20)', dataIndex: 'assignment2', key: 'assignment2' },
                { title: 'Mid Semester (20)', dataIndex: 'midSem', key: 'midSem' },
                { title: 'End Semester (60)', dataIndex: 'endSem', key: 'endSem' },
                { title: 'Total (120)', dataIndex: 'total', key: 'total' },
                { title: 'Grade', dataIndex: 'grade', key: 'grade' }
            ];

            return (
                <div>
                    <h2 className="text-xl font-semibold mb-4">My Grades</h2>
                    <Card>
                        <div className="mb-4">
                            <h3 className="text-lg font-medium">Current GPA: {studentData.gpa}</h3>
                        </div>
                        <Table columns={gradeColumns} dataSource={mockGrades} pagination={false} />
                    </Card>
                </div>
            );
        }

        if (path.includes('fees')) {
            return (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Fee Status</h2>
                    <Row gutter={16} className="mb-6">
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="Total Fees"
                                    value={feeData.totalFees}
                                    prefix={<DollarOutlined />}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="Paid Amount"
                                    value={feeData.paidAmount}
                                    prefix={<DollarOutlined />}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="Outstanding"
                                    value={feeData.outstandingAmount}
                                    prefix={<DollarOutlined />}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <div className="text-center">
                                    <div className="text-sm text-gray-500 mb-2">Payment Progress</div>
                                    <Progress 
                                        type="circle" 
                                        percent={feeData.paymentPercentage} 
                                        size={80}
                                    />
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            );
        }

        if (path.includes('schedule')) {
            const scheduleData = [
                {
                    key: '1',
                    course: 'CS302 - Algorithms',
                    instructor: 'Prof. Johnson',
                    time: '14:00-15:30',
                    room: 'Room 201',
                    days: ['Tuesday', 'Thursday']
                },
                {
                    key: '2',
                    course: 'CS303 - Database Systems',
                    instructor: 'Dr. Williams',
                    time: '09:00-10:00',
                    room: 'Lab 105',
                    days: ['Monday', 'Wednesday', 'Friday']
                },
                {
                    key: '3',
                    course: 'CS304 - Software Engineering',
                    instructor: 'Prof. Brown',
                    time: '11:00-12:30',
                    room: 'Room 301',
                    days: ['Tuesday', 'Thursday']
                }
            ];

            const timeSlots = [
                '08:00', '09:00', '10:00', '11:00', '12:00', 
                '13:00', '14:00', '15:00', '16:00', '17:00'
            ];
            const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

            const getClassForTimeSlot = (day, time) => {
                return scheduleData.find(item => 
                    item.days.includes(day) && 
                    item.time.startsWith(time)
                );
            };

            return (
                <div>
                    <h2 className="text-xl font-semibold mb-4">My Schedule</h2>
                    
                    <Row gutter={16} className="mb-6">
                        <Col span={8}>
                            <Card>
                                <Statistic
                                    title="Total Classes"
                                    value={scheduleData.length}
                                    prefix={<CalendarOutlined />}
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card>
                                <Statistic
                                    title="Classes This Week"
                                    value={scheduleData.reduce((sum, item) => sum + item.days.length, 0)}
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card>
                                <Statistic
                                    title="Current Semester"
                                    value={studentData.semester}
                                    valueStyle={{ fontSize: '16px' }}
                                />
                            </Card>
                        </Col>
                    </Row>

                    <Card title="Weekly Schedule">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="border p-2 bg-gray-100 w-20">Time</th>
                                        {weekDays.map(day => (
                                            <th key={day} className="border p-2 bg-gray-100">{day}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {timeSlots.map(time => (
                                        <tr key={time}>
                                            <td className="border p-2 font-medium bg-gray-50">{time}</td>
                                            {weekDays.map(day => {
                                                const classItem = getClassForTimeSlot(day, time);
                                                return (
                                                    <td key={`${day}-${time}`} className="border p-2 h-16">
                                                        {classItem && (
                                                            <div className="bg-blue-100 p-2 rounded text-xs">
                                                                <div className="font-semibold">{classItem.course}</div>
                                                                <div className="text-gray-600">{classItem.instructor}</div>
                                                                <div className="text-gray-600">{classItem.room}</div>
                                                            </div>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>

                    <Card title="Class Details" className="mt-4">
                        <Table
                            columns={[
                                { title: 'Course', dataIndex: 'course', key: 'course' },
                                { title: 'Instructor', dataIndex: 'instructor', key: 'instructor' },
                                { title: 'Time', dataIndex: 'time', key: 'time' },
                                { title: 'Room', dataIndex: 'room', key: 'room' },
                                { 
                                    title: 'Days', 
                                    dataIndex: 'days', 
                                    key: 'days',
                                    render: (days) => days.join(', ')
                                }
                            ]}
                            dataSource={scheduleData}
                            pagination={false}
                            size="small"
                        />
                    </Card>
                </div>
            );
        }

        if (path.includes('profile')) {
            return (
                <div>
                    <h2 className="text-xl font-semibold mb-4">My Profile</h2>
                    <Card>
                        <Row gutter={16}>
                            <Col span={12}>
                                <div className="space-y-4">
                                    <div><strong>Student ID:</strong> {studentData.id}</div>
                                    <div><strong>Name:</strong> {studentData.name}</div>
                                    <div><strong>Program:</strong> {studentData.program}</div>
                                    <div><strong>Year:</strong> {studentData.year}</div>
                                    <div><strong>Current Semester:</strong> {studentData.semester}</div>
                                    <div><strong>GPA:</strong> {studentData.gpa}</div>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </div>
            );
        }

        // Default Student Dashboard
        return (
            <div>
                <h2 className="text-xl font-semibold mb-4">Student Dashboard</h2>
                <div className="mb-4">
                    <h3 className="text-lg">Welcome back, {studentData.name}!</h3>
                </div>
                
                <Row gutter={16} className="mb-6">
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Current GPA"
                                value={studentData.gpa}
                                prefix={<TrophyOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Enrolled Courses"
                                value={mockCourses.length}
                                prefix={<BookOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Fee Payment"
                                value={feeData.paymentPercentage}
                                suffix="%"
                                prefix={<DollarOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Current Year"
                                value={studentData.year}
                                prefix={<CalendarOutlined />}
                            />
                        </Card>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Card title="Recent Courses">
                            <Table 
                                columns={[
                                    { title: 'Course', dataIndex: 'name', key: 'name' },
                                    { title: 'Grade', dataIndex: 'grade', key: 'grade' }
                                ]} 
                                dataSource={mockCourses.slice(0, 3)} 
                                pagination={false}
                                size="small"
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="Fee Status">
                            <div className="text-center">
                                <Progress 
                                    type="circle" 
                                    percent={feeData.paymentPercentage} 
                                    size={120}
                                />
                                <div className="mt-4">
                                    <div>Paid: ${feeData.paidAmount.toLocaleString()}</div>
                                    <div>Outstanding: ${feeData.outstandingAmount.toLocaleString()}</div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    };

    return (
        <div className="flex-1 p-6 bg-gray-50">
            {getPageContent()}
        </div>
    );
};

export default StudentPortal;