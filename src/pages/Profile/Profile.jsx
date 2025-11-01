import React, { useState } from 'react';
import { Card, Avatar, Steps, Button, Badge, Divider, Row, Col, Typography } from 'antd';
import { UserOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;

const Profile = () => {
    const [user] = useState({
        name: 'Daud Kalisa Phiri',
        username: 'daud.kalisa.phiri',
        userId: 'user16964513',
        currentBalance: '162.68',
        availableBalance: '162.68',
        currency: 'USD',
        status: 'ACCEPTED'
    });

    const applicationSteps = [
        { title: 'Application form', status: 'finish' },
        { title: 'Upload the required academic documents', status: 'finish' },
        { title: 'Pay application fee', status: 'finish' },
        { title: 'Approval of scholarship and confirmation of payment plan', status: 'finish' },
        { title: 'Offer Letter', status: 'finish' },
        { title: 'Payment of Deposit', status: 'process' }
    ];

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
                        <Title level={4} className="mb-0">University Management System</Title>
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
                            <Text type="secondary" className="block mb-2">@{user.username}</Text>
                            <Text className="block text-xs text-gray-500 mb-4">Username: {user.userId}</Text>
                            
                            <Divider />
                            
                            <div className="text-left">
                                <div className="mb-2">
                                    <Text strong>Current Balance: </Text>
                                    <Text className="text-green-600">{user.currentBalance} {user.currency}</Text>
                                </div>
                                <div className="mb-2">
                                    <Text strong>Available Balance: </Text>
                                    <Text className="text-green-600">{user.availableBalance} {user.currency}</Text>
                                </div>
                                <div className="mb-4">
                                    <Text strong>Status: </Text>
                                    <Badge status="success" text={user.status} />
                                </div>
                            </div>

                            <Divider />

                            <div className="text-left">
                                <Title level={5} className="mb-3">Navigation</Title>
                                <div className="space-y-2">
                                    <div className="bg-orange-100 text-orange-800 px-3 py-2 rounded text-sm">
                                        📄 My page
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-medium mb-2">👨🎓 Student</div>
                                        <div className="ml-4 space-y-1 text-xs">
                                            <div>○ Profile</div>
                                            <div>○ Application</div>
                                            <div>○ Documents</div>
                                            <div>○ Transcript</div>
                                            <div>○ Change Password</div>
                                        </div>
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-medium mb-2">💰 Finance</div>
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-medium mb-2">📚 Modules</div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>

                    {/* Main Content */}
                    <Col xs={24} md={18}>
                        <Card>
                            <Title level={2} className="mb-1">Welcome {user.name.split(' ')[1]} {user.name.split(' ')[2]}</Title>
                            
                            {/* Success Message */}
                            <div className="bg-green-100 border border-green-200 rounded-lg p-4 mb-6">
                                <div className="flex items-center">
                                    <CheckCircleOutlined className="text-green-600 mr-2" />
                                    <Text strong className="text-green-800">Great News {user.name.split(' ')[1]} {user.name.split(' ')[2]}!</Text>
                                </div>
                                <Paragraph className="mb-2 mt-2 text-green-700">
                                    You have been offered a place to study with <strong>Unicaf University (MW)</strong>.
                                </Paragraph>
                                <Text className="text-green-700">
                                    For any questions or problems you have please contact our <strong>support team</strong>. Our team will be happy to assist you.
                                </Text>
                            </div>

                            {/* Application Steps */}
                            <div className="mb-6">
                                <Steps direction="vertical" current={5}>
                                    {applicationSteps.map((step, index) => (
                                        <Step
                                            key={index}
                                            title={step.title}
                                            status={step.status}
                                            icon={step.status === 'finish' ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
                                        />
                                    ))}
                                </Steps>
                            </div>

                            {/* Deposit Information */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <Paragraph className="mb-0">
                                    You should now proceed to pay your deposit by clicking on the "Pay Deposit" button below to secure your scholarship and your place in the course.
                                </Paragraph>
                            </div>

                            {/* Action Button */}
                            <div className="mt-6 text-center">
                                <Button type="primary" size="large" className="bg-blue-600 hover:bg-blue-700">
                                    Pay Deposit
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Profile;