import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, List, Button, Progress, Spin, message } from 'antd';
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
import DB_CONFIG from '../../config/database';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await fetch(`${DB_CONFIG.apiUrl}/dashboard/stats`);
            const data = await response.json();
            setDashboardData(data);
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
            message.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen w-full flex items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    const metricCards = [
        {
            title: 'Total Students',
            value: dashboardData?.totals?.students || 0,
            trend: 8.2, // Keep trend for now, can be calculated later
            icon: <UserOutlined className="text-blue-500" />,
            color: 'blue'
        },
        {
            title: 'Faculty Members',
            value: dashboardData?.totals?.faculty || 0,
            trend: 3.1,
            icon: <TeamOutlined className="text-green-500" />,
            color: 'green'
        },
        {
            title: 'Active Courses',
            value: dashboardData?.totals?.courses || 0,
            trend: -2.4,
            icon: <BookOutlined className="text-purple-500" />,
            color: 'purple'
        },
        {
            title: 'Graduation Rate',
            value: dashboardData?.totals?.graduationRate || 0,
            suffix: '%',
            trend: 1.8,
            icon: <TrophyOutlined className="text-orange-500" />,
            color: 'orange'
        }
    ];

    const recentActivities = dashboardData?.recentActivities || [
        { title: 'No recent activities', time: 'N/A' }
    ];

    const quickActions = [
        { title: 'Add New Student', icon: <UserOutlined />, color: 'blue' },
        { title: 'Create Course', icon: <BookOutlined />, color: 'green' },
        { title: 'Generate Reports', icon: <FileTextOutlined />, color: 'purple' },
        { title: 'Academic Calendar', icon: <CalendarOutlined />, color: 'orange' }
    ];

    // Calculate department data from API response
    const departmentData = dashboardData?.departmentStats?.map((dept, index) => {
        const maxStudents = Math.max(...(dashboardData.departmentStats.map(d => d.student_count) || [1]));
        return {
            name: dept.name || `Department ${index + 1}`,
            students: dept.student_count || 0,
            percentage: maxStudents > 0 ? Math.round((dept.student_count / maxStudents) * 100) : 0
        };
    }) || [];

    return (
        <div className="p-0 bg-gray-50 min-h-screen w-full">
            <div className="p-6 pb-4">
                <h1 className="text-2xl font-bold text-gray-800">University Dashboard</h1>
                <p className="text-gray-600">Welcome back! Here's what's happening at your university.</p>
                {dashboardData && (
                    <p className="text-sm text-gray-500 mt-1">
                        Last updated: {new Date().toLocaleString()}
                    </p>
                )}
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