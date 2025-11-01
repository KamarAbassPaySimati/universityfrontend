import React, { useState } from 'react';
import { Card, Avatar, Steps, Button, Badge, Divider, Row, Col, Typography } from 'antd';
import { UserOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;

const Profile = () => {
    const [user] = useState({
        name: 'Daud Kalisa Phiri',
        studentId: 'STU2024001',
        email: 'daud.kalisa@university.edu',
        program: 'Computer Science',
        year: 'Year 3',
        gpa: '3.85',
        status: 'ACTIVE'
    });



    return (
        <div className="p-0 bg-gray-50 min-h-screen w-full">
            {/* Header */}
            <div className="bg-white shadow-sm border-b p-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="bg-indigo-600 w-8 h-8 rounded flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                            </svg>
                        </div>
                        <Title level={4} className="mb-0">Student Transcript System</Title>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <Text className="text-sm">Welcome, {user.name}</Text>
                        <Badge status="success" text="Student" />
                        <Button type="link" danger size="small">Logout</Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-6 px-4">
                <Row gutter={[24, 24]}>
                    {/* Left Sidebar */}
                    <Col xs={24} md={6}>
                        <Card className="text-center">
                            <Avatar size={80} icon={<UserOutlined />} className="mb-4" />
                            <Title level={4} className="mb-1">{user.name}</Title>
                            <Text type="secondary" className="block mb-2">{user.email}</Text>
                            <Text className="block text-xs text-gray-500 mb-4">Student ID: {user.studentId}</Text>
                            
                            <Divider />
                            
                            <div className="text-left">
                                <div className="mb-2">
                                    <Text strong>Program: </Text>
                                    <Text className="text-blue-600">{user.program}</Text>
                                </div>
                                <div className="mb-2">
                                    <Text strong>Academic Year: </Text>
                                    <Text className="text-blue-600">{user.year}</Text>
                                </div>
                                <div className="mb-2">
                                    <Text strong>GPA: </Text>
                                    <Text className="text-green-600">{user.gpa}</Text>
                                </div>
                                <div className="mb-4">
                                    <Text strong>Status: </Text>
                                    <Badge status="success" text={user.status} />
                                </div>
                            </div>

                            <Divider />

                            <div className="text-left">
                                <Title level={5} className="mb-3">Quick Links</Title>
                                <div className="space-y-2">
                                    <div className="bg-blue-50 text-blue-800 px-3 py-2 rounded text-sm cursor-pointer hover:bg-blue-100">
                                        📊 Academic Dashboard
                                    </div>
                                    <div className="bg-gray-50 text-gray-700 px-3 py-2 rounded text-sm cursor-pointer hover:bg-gray-100">
                                        📚 My Courses
                                    </div>
                                    <div className="bg-gray-50 text-gray-700 px-3 py-2 rounded text-sm cursor-pointer hover:bg-gray-100">
                                        📋 Grades & Transcripts
                                    </div>
                                    <div className="bg-gray-50 text-gray-700 px-3 py-2 rounded text-sm cursor-pointer hover:bg-gray-100">
                                        📅 Class Schedule
                                    </div>
                                    <div className="bg-gray-50 text-gray-700 px-3 py-2 rounded text-sm cursor-pointer hover:bg-gray-100">
                                        💳 Fee Management
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>

                    {/* Main Content */}
                    <Col xs={24} md={18}>
                        <Card>
                            <Title level={2} className="mb-4">Student Profile</Title>
                            
                            {/* Academic Overview */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-blue-600">{user.gpa}</div>
                                    <div className="text-sm text-gray-600">Current GPA</div>
                                </div>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-green-600">6</div>
                                    <div className="text-sm text-gray-600">Courses Enrolled</div>
                                </div>
                                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-purple-600">120</div>
                                    <div className="text-sm text-gray-600">Credits Completed</div>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="mb-6">
                                <Title level={4} className="mb-3">Recent Activity</Title>
                                <div className="space-y-3">
                                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                        <CheckCircleOutlined className="text-green-500 mr-3" />
                                        <div>
                                            <div className="font-medium">Assignment submitted</div>
                                            <div className="text-sm text-gray-600">Data Structures - Assignment 2</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                        <ClockCircleOutlined className="text-orange-500 mr-3" />
                                        <div>
                                            <div className="font-medium">Upcoming exam</div>
                                            <div className="text-sm text-gray-600">Database Systems - Mid Semester</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                        <CheckCircleOutlined className="text-blue-500 mr-3" />
                                        <div>
                                            <div className="font-medium">Grade posted</div>
                                            <div className="text-sm text-gray-600">Web Development - Assignment 1: A-</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div>
                                <Title level={4} className="mb-3">Quick Actions</Title>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Button type="primary" size="large" className="h-12">
                                        View Current Grades
                                    </Button>
                                    <Button size="large" className="h-12">
                                        Download Transcript
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Profile;