import React, { useState } from 'react';
import { Card, Table, Progress, Tabs, Row, Col, Statistic, Tag } from 'antd';
// Chart library removed
import { TrophyOutlined, BookOutlined, CalendarOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const StudentPortal = () => {
    const studentData = {
        studentId: 'STU001',
        name: 'John Smith',
        program: 'Computer Science',
        year: 4,
        semester: 1,
        cumulativeGPA: 3.8,
        currentSemesterGPA: 3.9,
        totalCredits: 120,
        completedCredits: 95
    };

    const currentGrades = [
        { key: '1', course: 'CS401', name: 'Software Engineering', credits: 3, assignment1: 18, assignment2: 16, midSem: 17, endSem: 45, total: 96, grade: 'A+', gpa: 4.0 },
        { key: '2', course: 'CS402', name: 'Database Systems', credits: 3, assignment1: 15, assignment2: 17, midSem: 16, endSem: 42, total: 90, grade: 'A+', gpa: 4.0 },
        { key: '3', course: 'CS403', name: 'Computer Networks', credits: 3, assignment1: 16, assignment2: 15, midSem: 18, endSem: 40, total: 89, grade: 'A', gpa: 4.0 }
    ];

    const gpaHistory = [
        { semester: '2021-1', gpa: 3.2 },
        { semester: '2021-2', gpa: 3.4 },
        { semester: '2022-1', gpa: 3.6 },
        { semester: '2022-2', gpa: 3.7 },
        { semester: '2023-1', gpa: 3.8 },
        { semester: '2023-2', gpa: 3.9 }
    ];

    const attendance = [
        { course: 'CS401', totalClasses: 40, attended: 38, percentage: 95 },
        { course: 'CS402', totalClasses: 35, attended: 33, percentage: 94 },
        { course: 'CS403', totalClasses: 42, attended: 40, percentage: 95 }
    ];

    // Simple GPA display

    const gradeColumns = [
        { title: 'Course', dataIndex: 'course', key: 'course' },
        { title: 'Course Name', dataIndex: 'name', key: 'name' },
        { title: 'Credits', dataIndex: 'credits', key: 'credits' },
        { title: 'Assignment 1', dataIndex: 'assignment1', key: 'assignment1', render: (val) => `${val}/20` },
        { title: 'Assignment 2', dataIndex: 'assignment2', key: 'assignment2', render: (val) => `${val}/20` },
        { title: 'Mid Sem', dataIndex: 'midSem', key: 'midSem', render: (val) => `${val}/20` },
        { title: 'End Sem', dataIndex: 'endSem', key: 'endSem', render: (val) => `${val}/60` },
        { title: 'Total', dataIndex: 'total', key: 'total', render: (val) => `${val}/100` },
        { title: 'Grade', dataIndex: 'grade', key: 'grade', render: (grade) => <Tag color="green">{grade}</Tag> }
    ];

    const attendanceColumns = [
        { title: 'Course', dataIndex: 'course', key: 'course' },
        { title: 'Total Classes', dataIndex: 'totalClasses', key: 'totalClasses' },
        { title: 'Attended', dataIndex: 'attended', key: 'attended' },
        {
            title: 'Percentage',
            dataIndex: 'percentage',
            key: 'percentage',
            render: (percentage) => (
                <Progress
                    percent={percentage}
                    size="small"
                    strokeColor={percentage >= 75 ? '#52c41a' : '#f5222d'}
                />
            )
        }
    ];

    return (
        <div className="p-0 bg-gray-50 min-h-screen w-full">
            <div className="p-6 pb-4">
                <h1 className="text-2xl font-bold text-gray-800">Student Portal</h1>
                <p className="text-gray-600">Welcome back, {studentData.name}</p>
            </div>

            <div className="px-6">
                <Row gutter={[16, 16]} className="mb-6">
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic
                                title="Cumulative GPA"
                                value={studentData.cumulativeGPA}
                                precision={2}
                                valueStyle={{ color: '#52c41a' }}
                                prefix={<TrophyOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic
                                title="Current Semester GPA"
                                value={studentData.currentSemesterGPA}
                                precision={2}
                                valueStyle={{ color: '#1890ff' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic
                                title="Credits Completed"
                                value={studentData.completedCredits}
                                suffix={`/ ${studentData.totalCredits}`}
                                prefix={<BookOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic
                                title="Current Year"
                                value={studentData.year}
                                prefix={<CalendarOutlined />}
                            />
                        </Card>
                    </Col>
                </Row>

                <Tabs defaultActiveKey="1">
                    <TabPane tab="Current Grades" key="1">
                        <Card>
                            <Table
                                columns={gradeColumns}
                                dataSource={currentGrades}
                                pagination={false}
                                scroll={{ x: 800 }}
                            />
                        </Card>
                    </TabPane>

                    <TabPane tab="GPA Progression" key="2">
                        <Card title="GPA Trend Over Time">
                            <div className="space-y-3">
                                {gpaHistory.map(item => (
                                    <div key={item.semester} className="flex justify-between items-center p-2 border rounded">
                                        <span className="font-medium">{item.semester}</span>
                                        <span className="text-lg font-bold text-blue-600">{item.gpa}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </TabPane>

                    <TabPane tab="Attendance" key="3">
                        <Card>
                            <Table
                                columns={attendanceColumns}
                                dataSource={attendance}
                                pagination={false}
                            />
                        </Card>
                    </TabPane>

                    <TabPane tab="Academic Summary" key="4">
                        <Row gutter={[16, 16]}>
                            <Col xs={24} md={12}>
                                <Card title="Program Information">
                                    <p><strong>Student ID:</strong> {studentData.studentId}</p>
                                    <p><strong>Program:</strong> {studentData.program}</p>
                                    <p><strong>Current Year:</strong> {studentData.year}</p>
                                    <p><strong>Current Semester:</strong> {studentData.semester}</p>
                                </Card>
                            </Col>
                            <Col xs={24} md={12}>
                                <Card title="Academic Standing">
                                    <p><strong>Cumulative GPA:</strong> {studentData.cumulativeGPA}</p>
                                    <p><strong>Total Credits:</strong> {studentData.completedCredits}/{studentData.totalCredits}</p>
                                    <p><strong>Progress:</strong> 
                                        <Progress 
                                            percent={Math.round((studentData.completedCredits / studentData.totalCredits) * 100)} 
                                            size="small" 
                                            className="ml-2"
                                        />
                                    </p>
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
};

export default StudentPortal;