import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Table, Progress, Row, Col, Statistic, Calendar, Badge } from 'antd';
import { BookOutlined, TrophyOutlined, DollarOutlined, CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';

const StudentDashboard = () => {
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
        { key: '1', code: 'CS301', name: 'Data Structures', credits: 3, grade: 'Distinction', status: 'Completed' },
        { key: '2', code: 'CS302', name: 'Algorithms', credits: 3, grade: 'Credit', status: 'In Progress' },
        { key: '3', code: 'CS303', name: 'Database Systems', credits: 4, grade: '-', status: 'Enrolled' }
    ];

    const feeData = {
        totalFees: 8000,
        paidAmount: 6000,
        paymentPercentage: 75,
        outstandingAmount: 2000
    };

    const upcomingAssignments = [
        { key: '1', course: 'Algorithms', assignment: 'Assignment 2', dueDate: '2024-02-15', status: 'pending' },
        { key: '2', course: 'Database Systems', assignment: 'Project Phase 1', dueDate: '2024-02-20', status: 'pending' }
    ];

    const recentGrades = [
        { key: '1', course: 'Data Structures', assignment: 'Final Exam', grade: 'Distinction', date: '2024-01-25' },
        { key: '2', course: 'Algorithms', assignment: 'Assignment 1', grade: 'Credit', date: '2024-01-20' }
    ];

    return (
        <div className="flex-1 p-6 bg-gray-50">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Welcome back, {studentData.name}!</h1>
                <p className="text-gray-600">{studentData.program} - Year {studentData.year} - {studentData.semester}</p>
            </div>
            
            {/* Key Metrics */}
            <Row gutter={16} className="mb-6">
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Current GPA"
                            value={studentData.gpa}
                            precision={2}
                            prefix={<TrophyOutlined style={{ color: '#faad14' }} />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Enrolled Courses"
                            value={mockCourses.length}
                            prefix={<BookOutlined style={{ color: '#1890ff' }} />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Fee Payment"
                            value={feeData.paymentPercentage}
                            suffix="%"
                            prefix={<DollarOutlined style={{ color: '#52c41a' }} />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Academic Year"
                            value={studentData.year}
                            prefix={<CalendarOutlined style={{ color: '#722ed1' }} />}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={16} className="mb-6">
                {/* Current Courses */}
                <Col span={12}>
                    <Card title="Current Courses" extra={<Link to="/my-courses?role=student" className="text-blue-600 hover:text-blue-800">View All</Link>}>
                        <Table 
                            columns={[
                                { title: 'Course', dataIndex: 'name', key: 'name' },
                                { title: 'Code', dataIndex: 'code', key: 'code' },
                                { 
                                    title: 'Status', 
                                    dataIndex: 'status', 
                                    key: 'status',
                                    render: (status) => (
                                        <Badge 
                                            status={status === 'Completed' ? 'success' : status === 'In Progress' ? 'processing' : 'default'} 
                                            text={status} 
                                        />
                                    )
                                }
                            ]} 
                            dataSource={mockCourses} 
                            pagination={false}
                            size="small"
                        />
                    </Card>
                </Col>

                {/* Fee Status */}
                <Col span={12}>
                    <Card title="Fee Status" extra={<Link to="/fees?role=student" className="text-blue-600 hover:text-blue-800">View Details</Link>}>
                        <div className="text-center">
                            <Progress 
                                type="circle" 
                                percent={feeData.paymentPercentage} 
                                size={120}
                                strokeColor={{
                                    '0%': '#108ee9',
                                    '100%': '#87d068',
                                }}
                            />
                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between">
                                    <span>Total Fees:</span>
                                    <span className="font-semibold">${feeData.totalFees.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Paid:</span>
                                    <span className="font-semibold text-green-600">${feeData.paidAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Outstanding:</span>
                                    <span className="font-semibold text-red-600">${feeData.outstandingAmount.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Row gutter={16}>
                {/* Upcoming Assignments */}
                <Col span={12}>
                    <Card title={<><ClockCircleOutlined /> Upcoming Assignments</>}>
                        <div className="space-y-3">
                            {upcomingAssignments.map(assignment => (
                                <div key={assignment.key} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                    <div>
                                        <div className="font-medium">{assignment.assignment}</div>
                                        <div className="text-sm text-gray-600">{assignment.course}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-medium">Due: {assignment.dueDate}</div>
                                        <Badge status="warning" text="Pending" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>

                {/* Recent Grades */}
                <Col span={12}>
                    <Card title="Recent Grades" extra={<Link to="/grades?role=student" className="text-blue-600 hover:text-blue-800">View All</Link>}>
                        <div className="space-y-3">
                            {recentGrades.map(grade => (
                                <div key={grade.key} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                    <div>
                                        <div className="font-medium">{grade.assignment}</div>
                                        <div className="text-sm text-gray-600">{grade.course}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-bold text-blue-600">{grade.grade}</div>
                                        <div className="text-xs text-gray-500">{grade.date}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default StudentDashboard;