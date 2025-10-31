import React, { useState } from 'react';
import { Card, Table, Button, Modal, Form, Select, Row, Col, Statistic, Tag, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, BookOutlined } from '@ant-design/icons';

const { Option } = Select;

const Assignments = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [editingAssignment, setEditingAssignment] = useState(null);
    const [form] = Form.useForm();

    const [assignments, setAssignments] = useState([
        {
            key: '1',
            assignmentId: 'ASG001',
            facultyId: 'FAC001',
            facultyName: 'Dr. John Smith',
            courseCode: 'CS101',
            courseName: 'Introduction to Computer Science',
            semester: '2024-1',
            workload: 4,
            status: 'Active',
            students: 45
        },
        {
            key: '2',
            assignmentId: 'ASG002',
            facultyId: 'FAC002',
            facultyName: 'Dr. Sarah Johnson',
            courseCode: 'MATH201',
            courseName: 'Calculus II',
            semester: '2024-1',
            workload: 3,
            status: 'Active',
            students: 38
        }
    ]);

    const faculty = [
        { id: 'FAC001', name: 'Dr. John Smith' },
        { id: 'FAC002', name: 'Dr. Sarah Johnson' },
        { id: 'FAC003', name: 'Dr. Michael Brown' }
    ];

    const courses = [
        { code: 'CS101', name: 'Introduction to Computer Science' },
        { code: 'MATH201', name: 'Calculus II' },
        { code: 'ENG102', name: 'English Composition' }
    ];

    const handleAdd = () => {
        setEditingAssignment(null);
        form.resetFields();
        setModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingAssignment(record);
        form.setFieldsValue(record);
        setModalVisible(true);
    };

    const handleSubmit = (values) => {
        const selectedFaculty = faculty.find(f => f.id === values.facultyId);
        const selectedCourse = courses.find(c => c.code === values.courseCode);
        
        const assignmentData = {
            ...values,
            facultyName: selectedFaculty?.name,
            courseName: selectedCourse?.name
        };

        if (editingAssignment) {
            setAssignments(assignments.map(a => a.key === editingAssignment.key ? { ...a, ...assignmentData } : a));
            message.success('Assignment updated successfully');
        } else {
            const newAssignment = { ...assignmentData, key: Date.now().toString(), assignmentId: `ASG${Date.now()}` };
            setAssignments([...assignments, newAssignment]);
            message.success('Assignment created successfully');
        }
        setModalVisible(false);
    };

    const handleDelete = (key) => {
        setAssignments(assignments.filter(a => a.key !== key));
        message.success('Assignment deleted successfully');
    };

    const columns = [
        { title: 'Assignment ID', dataIndex: 'assignmentId', key: 'assignmentId' },
        { title: 'Faculty', dataIndex: 'facultyName', key: 'facultyName' },
        { title: 'Course Code', dataIndex: 'courseCode', key: 'courseCode' },
        { title: 'Course Name', dataIndex: 'courseName', key: 'courseName' },
        { title: 'Semester', dataIndex: 'semester', key: 'semester' },
        { title: 'Workload', dataIndex: 'workload', key: 'workload', render: (workload) => `${workload} hrs/week` },
        { title: 'Students', dataIndex: 'students', key: 'students' },
        { title: 'Status', dataIndex: 'status', key: 'status', render: (status) => <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag> },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <div className="space-x-2">
                    <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)} />
                </div>
            )
        }
    ];

    const totalWorkload = assignments.reduce((sum, a) => sum + a.workload, 0);
    const totalStudents = assignments.reduce((sum, a) => sum + a.students, 0);
    const activeAssignments = assignments.filter(a => a.status === 'Active').length;

    return (
        <div className="p-0 bg-gray-50 min-h-screen w-full">
            <div className="p-6 pb-4">
                <h1 className="text-2xl font-bold text-gray-800">Faculty Assignments</h1>
                <p className="text-gray-600">Manage course assignments and faculty workload</p>
            </div>

            <div className="px-6">
                <Row gutter={[16, 16]} className="mb-6">
                    <Col xs={24} sm={6}>
                        <Card><Statistic title="Total Assignments" value={assignments.length} prefix={<BookOutlined />} /></Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card><Statistic title="Active Assignments" value={activeAssignments} /></Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card><Statistic title="Total Workload" value={totalWorkload} suffix="hrs/week" /></Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card><Statistic title="Total Students" value={totalStudents} /></Card>
                    </Col>
                </Row>

                <Card title="Course Assignments" extra={<Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>New Assignment</Button>}>
                    <Table columns={columns} dataSource={assignments} pagination={{ pageSize: 20 }} />
                </Card>
            </div>

            <Modal title={editingAssignment ? 'Edit Assignment' : 'New Assignment'} open={modalVisible} onCancel={() => setModalVisible(false)} footer={null} width={600}>
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="facultyId" label="Faculty" rules={[{ required: true }]}>
                                <Select placeholder="Select faculty">
                                    {faculty.map(f => <Option key={f.id} value={f.id}>{f.name}</Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="courseCode" label="Course" rules={[{ required: true }]}>
                                <Select placeholder="Select course">
                                    {courses.map(c => <Option key={c.code} value={c.code}>{c.code} - {c.name}</Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item name="semester" label="Semester" rules={[{ required: true }]}>
                                <Select>
                                    <Option value="2024-1">2024-1</Option>
                                    <Option value="2024-2">2024-2</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="workload" label="Workload (hrs/week)" rules={[{ required: true }]}>
                                <Select>
                                    <Option value={2}>2 hours</Option>
                                    <Option value={3}>3 hours</Option>
                                    <Option value={4}>4 hours</Option>
                                    <Option value={6}>6 hours</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                                <Select>
                                    <Option value="Active">Active</Option>
                                    <Option value="Inactive">Inactive</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                        <Button style={{ marginLeft: 8 }} onClick={() => setModalVisible(false)}>Cancel</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Assignments;