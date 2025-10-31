import React, { useState } from 'react';
import { Card, Table, Button, Modal, Form, Input, Select, Row, Col, Statistic, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, TeamOutlined } from '@ant-design/icons';

const { Option } = Select;

const Departments = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [editingDept, setEditingDept] = useState(null);
    const [form] = Form.useForm();

    const [departments, setDepartments] = useState([
        {
            key: '1',
            deptId: 'DEPT001',
            name: 'Computer Science',
            head: 'Dr. John Smith',
            faculty: 15,
            students: 120,
            courses: 25,
            established: '1995',
            budget: 500000
        },
        {
            key: '2',
            deptId: 'DEPT002',
            name: 'Mathematics',
            head: 'Dr. Sarah Johnson',
            faculty: 12,
            students: 85,
            courses: 18,
            established: '1990',
            budget: 350000
        }
    ]);

    const handleAdd = () => {
        setEditingDept(null);
        form.resetFields();
        setModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingDept(record);
        form.setFieldsValue(record);
        setModalVisible(true);
    };

    const handleSubmit = (values) => {
        if (editingDept) {
            setDepartments(departments.map(d => d.key === editingDept.key ? { ...d, ...values } : d));
            message.success('Department updated successfully');
        } else {
            const newDept = { ...values, key: Date.now().toString(), deptId: `DEPT${Date.now()}` };
            setDepartments([...departments, newDept]);
            message.success('Department added successfully');
        }
        setModalVisible(false);
    };

    const handleDelete = (key) => {
        setDepartments(departments.filter(d => d.key !== key));
        message.success('Department deleted successfully');
    };

    const columns = [
        { title: 'Dept ID', dataIndex: 'deptId', key: 'deptId' },
        { title: 'Department Name', dataIndex: 'name', key: 'name' },
        { title: 'Head', dataIndex: 'head', key: 'head' },
        { title: 'Faculty', dataIndex: 'faculty', key: 'faculty' },
        { title: 'Students', dataIndex: 'students', key: 'students' },
        { title: 'Courses', dataIndex: 'courses', key: 'courses' },
        { title: 'Established', dataIndex: 'established', key: 'established' },
        { title: 'Budget', dataIndex: 'budget', key: 'budget', render: (budget) => `$${budget.toLocaleString()}` },
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

    const totalFaculty = departments.reduce((sum, d) => sum + d.faculty, 0);
    const totalStudents = departments.reduce((sum, d) => sum + d.students, 0);
    const totalBudget = departments.reduce((sum, d) => sum + d.budget, 0);

    return (
        <div className="p-0 bg-gray-50 min-h-screen w-full">
            <div className="p-6 pb-4">
                <h1 className="text-2xl font-bold text-gray-800">Department Management</h1>
                <p className="text-gray-600">Manage university departments and their resources</p>
            </div>

            <div className="px-6">
                <Row gutter={[16, 16]} className="mb-6">
                    <Col xs={24} sm={6}>
                        <Card><Statistic title="Total Departments" value={departments.length} prefix={<TeamOutlined />} /></Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card><Statistic title="Total Faculty" value={totalFaculty} /></Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card><Statistic title="Total Students" value={totalStudents} /></Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card><Statistic title="Total Budget" value={totalBudget} prefix="$" /></Card>
                    </Col>
                </Row>

                <Card title="Departments" extra={<Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>Add Department</Button>}>
                    <Table columns={columns} dataSource={departments} pagination={false} />
                </Card>
            </div>

            <Modal title={editingDept ? 'Edit Department' : 'Add Department'} open={modalVisible} onCancel={() => setModalVisible(false)} footer={null} width={600}>
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                    <Form.Item name="name" label="Department Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="head" label="Department Head" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item name="faculty" label="Faculty Count" rules={[{ required: true }]}>
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="students" label="Student Count" rules={[{ required: true }]}>
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="courses" label="Course Count" rules={[{ required: true }]}>
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="established" label="Established Year" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="budget" label="Annual Budget" rules={[{ required: true }]}>
                                <Input type="number" />
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

export default Departments;