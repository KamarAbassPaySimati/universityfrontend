import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Select, Table, Progress } from 'antd';
// Charts removed - using basic components instead
import { RiseOutlined } from '@ant-design/icons';

const { Option } = Select;

const GradeAnalytics = () => {
    const [selectedSemester, setSelectedSemester] = useState('2024-1');

    const semesterTrends = [
        { semester: '2023-1', avgGPA: 3.2, passRate: 85 },
        { semester: '2023-2', avgGPA: 3.4, passRate: 88 },
        { semester: '2024-1', avgGPA: 3.6, passRate: 92 }
    ];

    const courseAnalytics = [
        { course: 'CS101', avgGrade: 85, difficulty: 'Medium', students: 45, passRate: 95 },
        { course: 'MATH201', avgGrade: 72, difficulty: 'Hard', students: 38, passRate: 78 },
        { course: 'ENG102', avgGrade: 88, difficulty: 'Easy', students: 52, passRate: 98 }
    ];

    const departmentData = [
        { department: 'Computer Science', avgGPA: 3.7, students: 120 },
        { department: 'Mathematics', avgGPA: 3.4, students: 85 },
        { department: 'Engineering', avgGPA: 3.5, students: 95 }
    ];

    const gradeDistribution = [
        { grade: 'A+', count: 25, percentage: 15 },
        { grade: 'A', count: 40, percentage: 24 },
        { grade: 'B', count: 50, percentage: 30 },
        { grade: 'C', count: 35, percentage: 21 },
        { grade: 'D', count: 12, percentage: 7 },
        { grade: 'F', count: 5, percentage: 3 }
    ];

    // Simple chart data for display

    const columns = [
        { title: 'Course', dataIndex: 'course', key: 'course' },
        { title: 'Avg Grade', dataIndex: 'avgGrade', key: 'avgGrade', render: (grade) => `${grade}%` },
        { title: 'Difficulty', dataIndex: 'difficulty', key: 'difficulty' },
        { title: 'Students', dataIndex: 'students', key: 'students' },
        { title: 'Pass Rate', dataIndex: 'passRate', key: 'passRate', render: (rate) => <Progress percent={rate} size="small" /> }
    ];

    return (
        <div className="p-0 bg-gray-50 min-h-screen w-full">
            <div className="p-6 pb-4">
                <h1 className="text-2xl font-bold text-gray-800">Grade Analytics</h1>
                <p className="text-gray-600">Performance insights and trends</p>
            </div>

            <div className="px-6">
                <Row gutter={[16, 16]} className="mb-6">
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic title="Overall GPA" value={3.6} precision={1} valueStyle={{ color: '#52c41a' }} prefix={<RiseOutlined />} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic title="Pass Rate" value={92} suffix="%" valueStyle={{ color: '#1890ff' }} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic title="Total Students" value={300} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic title="Courses Analyzed" value={15} />
                        </Card>
                    </Col>
                </Row>

                <Row gutter={[16, 16]} className="mb-6">
                    <Col xs={24} lg={12}>
                        <Card title="GPA Trend">
                            <div className="space-y-2">
                                {semesterTrends.map(trend => (
                                    <div key={trend.semester} className="flex justify-between">
                                        <span>{trend.semester}</span>
                                        <span className="font-semibold">{trend.avgGPA}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} lg={12}>
                        <Card title="Grade Distribution">
                            <div className="space-y-2">
                                {gradeDistribution.map(grade => (
                                    <div key={grade.grade} className="flex justify-between items-center">
                                        <span>Grade {grade.grade}</span>
                                        <div className="flex items-center space-x-2">
                                            <Progress percent={grade.percentage} size="small" className="w-20" />
                                            <span>{grade.count}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </Col>
                </Row>



                <Card title="Course Analytics">
                    <Table columns={columns} dataSource={courseAnalytics} pagination={false} />
                </Card>
            </div>
        </div>
    );
};

export default GradeAnalytics;