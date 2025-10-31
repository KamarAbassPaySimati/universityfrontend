import React from 'react';
import { Row, Col, Card, Statistic, List, Button, Progress } from 'antd';
import {
    UserOutlined,
    TeamOutlined,
    BookOutlined,
    TrophyOutlined,
    PlusOutlined,
    FileTextOutlined,
    CalendarOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined
} from '@ant-design/icons';

const Dashboard = () => {
    const metricCards = [
        {
            title: 'Total Students',
            value: 12543,
            trend: 8.2,
            icon: <UserOutlined className="text-blue-500" />,
            color: 'blue'
        },
        {
            title: 'Faculty Members',
            value: 847,
            trend: 3.1,
            icon: <TeamOutlined className="text-green-500" />,
            color: 'green'
        },
        {
            title: 'Active Courses',
            value: 324,
            trend: -2.4,
            icon: <BookOutlined className="text-purple-500" />,
            color: 'purple'
        },
        {
            title: 'Graduation Rate',
            value: 94.2,
            suffix: '%',
            trend: 1.8,
            icon: <TrophyOutlined className="text-orange-500" />,
            color: 'orange'
        }
    ];

    const recentActivities = [
        { title: 'New student admission: John Smith', time: '2 hours ago' },
        { title: 'Course "Advanced Mathematics" updated', time: '4 hours ago' },
        { title: 'Faculty meeting scheduled', time: '6 hours ago' },
        { title: 'Semester grades published', time: '1 day ago' },
        { title: 'New course "Data Science" created', time: '2 days ago' }
    ];

    const quickActions = [
        { title: 'Add New Student', icon: <UserOutlined />, color: 'blue' },
        { title: 'Create Course', icon: <BookOutlined />, color: 'green' },
        { title: 'Generate Reports', icon: <FileTextOutlined />, color: 'purple' },
        { title: 'Academic Calendar', icon: <CalendarOutlined />, color: 'orange' }
    ];

    const departmentData = [
        { name: 'Computer Science', students: 2847, percentage: 23 },
        { name: 'Engineering', students: 2156, percentage: 17 },
        { name: 'Business', students: 1923, percentage: 15 },
        { name: 'Medicine', students: 1654, percentage: 13 },
        { name: 'Arts & Sciences', students: 1432, percentage: 11 }
    ];

    return (
        <div className="p-0 bg-gray-50 min-h-screen w-full">
            <div className="p-6 pb-4">
                <h1 className="text-2xl font-bold text-gray-800">University Dashboard</h1>
                <p className="text-gray-600">Welcome back! Here's what's happening at your university.</p>
            </div>

            {/* Metric Cards */}
            <div className="px-6">
            <Row gutter={[16, 16]} className="mb-6">
                {metricCards.map((metric, index) => (
                    <Col xs={24} sm={12} lg={6} key={index}>
                        <Card className="h-full">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Statistic
                                        title={metric.title}
                                        value={metric.value}
                                        suffix={metric.suffix}
                                        valueStyle={{ fontSize: '24px', fontWeight: 'bold' }}
                                    />
                                    <div className="flex items-center mt-2">
                                        {metric.trend > 0 ? (
                                            <ArrowUpOutlined className="text-green-500 mr-1" />
                                        ) : (
                                            <ArrowDownOutlined className="text-red-500 mr-1" />
                                        )}
                                        <span className={metric.trend > 0 ? 'text-green-500' : 'text-red-500'}>
                                            {Math.abs(metric.trend)}%
                                        </span>
                                        <span className="text-gray-500 ml-1">vs last month</span>
                                    </div>
                                </div>
                                <div className="text-3xl">{metric.icon}</div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Charts and Data Section */}
            <Row gutter={[16, 16]} className="mb-6">
                <Col xs={24} lg={16}>
                    <Card title="Student Enrollment Trends" className="h-full">
                        <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
                            <div className="text-center">
                                <BookOutlined className="text-4xl text-gray-400 mb-2" />
                                <p className="text-gray-500">Enrollment chart will be implemented here</p>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card title="Department Distribution" className="h-full">
                        <div className="space-y-4">
                            {departmentData.map((dept, index) => (
                                <div key={index}>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium">{dept.name}</span>
                                        <span className="text-sm text-gray-500">{dept.students}</span>
                                    </div>
                                    <Progress percent={dept.percentage} size="small" />
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Bottom Section */}
            <Row gutter={[16, 16]} className="pb-6">
                <Col xs={24} lg={12}>
                    <Card title="Recent Activities" className="h-full">
                        <List
                            dataSource={recentActivities}
                            renderItem={(item) => (
                                <List.Item>
                                    <div>
                                        <div className="font-medium">{item.title}</div>
                                        <div className="text-gray-500 text-sm">{item.time}</div>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Quick Actions" className="h-full">
                        <Row gutter={[8, 8]}>
                            {quickActions.map((action, index) => (
                                <Col xs={12} key={index}>
                                    <Button
                                        type="default"
                                        size="large"
                                        className="w-full h-20 flex flex-col items-center justify-center"
                                        icon={action.icon}
                                    >
                                        <span className="text-xs mt-1">{action.title}</span>
                                    </Button>
                                </Col>
                            ))}
                        </Row>
                    </Card>
                </Col>
            </Row>
            </div>
        </div>
    );
};

export default Dashboard;