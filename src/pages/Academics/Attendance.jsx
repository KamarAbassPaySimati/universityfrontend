import React, { useState } from 'react';
import { Card, Table, Progress, Tag, Select, Input, Button, Modal, Form, DatePicker, message } from 'antd';
import { SearchOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const Attendance = () => {
    const [selectedCourse, setSelectedCourse] = useState('CS101');
    const [searchText, setSearchText] = useState('');
    const [markVisible, setMarkVisible] = useState(false);
    const [form] = Form.useForm();

    const [attendanceData, setAttendanceData] = useState([
        {
            key: '1',
            studentId: 'STU001',
            studentName: 'John Smith',
            totalClasses: 40,
            attendedClasses: 35,
            attendancePercentage: 87.5,
            status: 'Eligible',
            lastAttended: '2024-01-15'
        },
        {
            key: '2',
            studentId: 'STU002',
            studentName: 'Sarah Johnson',
            totalClasses: 40,
            attendedClasses: 28,
            attendancePercentage: 70,
            status: 'Warning',
            lastAttended: '2024-01-12'
        },
        {
            key: '3',
            studentId: 'STU003',
            studentName: 'Michael Brown',
            totalClasses: 40,
            attendedClasses: 25,
            attendancePercentage: 62.5,
            status: 'Ineligible',
            lastAttended: '2024-01-08'
        }
    ]);

    const courses = [
        { code: 'CS101', name: 'Introduction to Computer Science' },
        { code: 'MATH201', name: 'Calculus II' },
        { code: 'ENG102', name: 'English Composition' }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Eligible': return 'success';
            case 'Warning': return 'warning';
            case 'Ineligible': return 'error';
            default: return 'default';
        }
    };

    const getAttendanceColor = (percentage) => {
        if (percentage >= 75) return '#52c41a';
        if (percentage >= 65) return '#faad14';
        return '#f5222d';
    };

    const markAttendance = (values) => {
        message.success('Attendance marked successfully');
        setMarkVisible(false);
        form.resetFields();
    };

    const columns = [
        { title: 'Student ID', dataIndex: 'studentId', key: 'studentId' },
        { title: 'Student Name', dataIndex: 'studentName', key: 'studentName' },
        { title: 'Total Classes', dataIndex: 'totalClasses', key: 'totalClasses' },
        { title: 'Attended', dataIndex: 'attendedClasses', key: 'attendedClasses' },
        {
            title: 'Attendance %',
            dataIndex: 'attendancePercentage',
            key: 'attendancePercentage',
            render: (percentage) => (
                <Progress
                    percent={percentage}
                    size="small"
                    strokeColor={getAttendanceColor(percentage)}
                    format={(percent) => `${percent}%`}
                />
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>
        },
        { title: 'Last Attended', dataIndex: 'lastAttended', key: 'lastAttended' }
    ];

    const filteredData = attendanceData.filter(student =>
        student.studentName.toLowerCase().includes(searchText.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchText.toLowerCase())
    );

    const eligibleCount = attendanceData.filter(s => s.status === 'Eligible').length;
    const warningCount = attendanceData.filter(s => s.status === 'Warning').length;
    const ineligibleCount = attendanceData.filter(s => s.status === 'Ineligible').length;

    return (
        <div className="p-0 bg-gray-50 min-h-screen w-full">
            <div className="p-6 pb-4">
                <h1 className="text-2xl font-bold text-gray-800">Attendance Management</h1>
                <p className="text-gray-600">Track student attendance and eligibility</p>
            </div>

            <div className="px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{eligibleCount}</div>
                            <div className="text-sm text-gray-600">Eligible (≥75%)</div>
                        </div>
                    </Card>
                    <Card>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-600">{warningCount}</div>
                            <div className="text-sm text-gray-600">Warning (65-74%)</div>
                        </div>
                    </Card>
                    <Card>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-red-600">{ineligibleCount}</div>
                            <div className="text-sm text-gray-600">Ineligible (&lt;65%)</div>
                        </div>
                    </Card>
                    <Card>
                        <div className="text-center">
                            <div className="text-2xl font-bold">{attendanceData.length}</div>
                            <div className="text-sm text-gray-600">Total Students</div>
                        </div>
                    </Card>
                </div>

                <Card className="mb-6">
                    <div className="flex flex-wrap gap-4 items-center">
                        <Select
                            value={selectedCourse}
                            onChange={setSelectedCourse}
                            style={{ width: 200 }}
                        >
                            {courses.map(course => (
                                <Option key={course.code} value={course.code}>
                                    {course.code} - {course.name}
                                </Option>
                            ))}
                        </Select>
                        <Input
                            placeholder="Search students..."
                            prefix={<SearchOutlined />}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            style={{ width: 200 }}
                        />
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => setMarkVisible(true)}>
                            Mark Attendance
                        </Button>
                    </div>
                </Card>

                <Card title={`Attendance for ${selectedCourse}`}>
                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        pagination={{ pageSize: 20 }}
                    />
                </Card>
            </div>

            <Modal
                title="Mark Attendance"
                open={markVisible}
                onCancel={() => setMarkVisible(false)}
                footer={null}
            >
                <Form form={form} onFinish={markAttendance} layout="vertical">
                    <Form.Item name="date" label="Date" rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="course" label="Course" rules={[{ required: true }]}>
                        <Select placeholder="Select course">
                            {courses.map(course => (
                                <Option key={course.code} value={course.code}>
                                    {course.code} - {course.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Mark Attendance</Button>
                        <Button style={{ marginLeft: 8 }} onClick={() => setMarkVisible(false)}>Cancel</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Attendance;