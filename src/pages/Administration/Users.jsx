import React, { useState } from 'react';
import { Table, Input, Button, Card, Row, Col, Statistic, Tag, Modal, Form, Select, message } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';

const { Option } = Select;

const Users = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedRole, setSelectedRole] = useState('all');
    const [modalVisible, setModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [form] = Form.useForm();

    const [users, setUsers] = useState([
        {
            key: '1',
            userId: 'USR001',
            username: 'admin',
            email: 'admin@university.edu',
            fullName: 'System Administrator',
            role: 'super-admin',
            status: 'Active',
            lastLogin: '2024-01-15 10:30',
            createdDate: '2023-01-01'
        },
        {
            key: '2',
            userId: 'USR002',
            username: 'john.smith',
            email: 'john.smith@university.edu',
            fullName: 'Dr. John Smith',
            role: 'faculty',
            status: 'Active',
            lastLogin: '2024-01-14 14:20',
            createdDate: '2023-08-15'
        },
        {
            key: '3',
            userId: 'USR003',
            username: 'jane.doe',
            email: 'jane.doe@student.university.edu',
            fullName: 'Jane Doe',
            role: 'student',
            status: 'Active',
            lastLogin: '2024-01-15 09:15',
            createdDate: '2023-09-01'
        }
    ]);

    const roles = ['super-admin', 'admin', 'faculty', 'student'];

    const handleAdd = () => {
        setEditingUser(null);
        form.resetFields();
        setModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingUser(record);
        form.setFieldsValue(record);
        setModalVisible(true);
    };

    const handleSubmit = (values) => {
        if (editingUser) {
            setUsers(users.map(u => u.key === editingUser.key ? { ...u, ...values } : u));
            message.success('User updated successfully');
        } else {
            const newUser = { ...values, key: Date.now().toString(), userId: `USR${Date.now()}`, createdDate: new Date().toISOString().split('T')[0] };
            setUsers([...users, newUser]);
            message.success('User created successfully');
        }
        setModalVisible(false);
    };

    const handleDelete = (key) => {
        setUsers(users.filter(u => u.key !== key));
        message.success('User deleted successfully');
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'super-admin': return 'red';
            case 'admin': return 'orange';
            case 'faculty': return 'blue';
            case 'student': return 'green';
            default: return 'default';
        }
    };

    const columns = [
        { title: 'User ID', dataIndex: 'userId', key: 'userId' },
        { title: 'Username', dataIndex: 'username', key: 'username' },
        { title: 'Full Name', dataIndex: 'fullName', key: 'fullName' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Role', dataIndex: 'role', key: 'role', render: (role) => <Tag color={getRoleColor(role)}>{role}</Tag> },
        { title: 'Status', dataIndex: 'status', key: 'status', render: (status) => <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag> },
        { title: 'Last Login', dataIndex: 'lastLogin', key: 'lastLogin' },
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

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.fullName.toLowerCase().includes(searchText.toLowerCase()) || user.username.toLowerCase().includes(searchText.toLowerCase());
        const matchesRole = selectedRole === 'all' || user.role === selectedRole;
        return matchesSearch && matchesRole;
    });

    const roleStats = roles.reduce((acc, role) => {
        acc[role] = users.filter(u => u.role === role).length;
        return acc;
    }, {});

    return (
        <div className="p-0 bg-gray-50 min-h-screen w-full">
            <div className="p-6 pb-4">
                <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
                <p className="text-gray-600">Manage system users and their permissions</p>
            </div>

            <div className="px-6">
                <Row gutter={[16, 16]} className="mb-6">
                    <Col xs={24} sm={6}>
                        <Card><Statistic title="Total Users" value={users.length} prefix={<UserOutlined />} /></Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card><Statistic title="Active Users" value={users.filter(u => u.status === 'Active').length} /></Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card><Statistic title="Faculty Users" value={roleStats.faculty || 0} /></Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card><Statistic title="Student Users" value={roleStats.student || 0} /></Card>
                    </Col>
                </Row>

                <Card className="mb-6">
                    <Row gutter={[16, 16]} align="middle">
                        <Col xs={24} sm={6}>
                            <Input placeholder="Search users..." prefix={<SearchOutlined />} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                        </Col>
                        <Col xs={24} sm={6}>
                            <Select value={selectedRole} onChange={setSelectedRole} style={{ width: '100%' }}>
                                <Option value="all">All Roles</Option>
                                {roles.map(role => <Option key={role} value={role}>{role}</Option>)}
                            </Select>
                        </Col>
                        <Col xs={24} sm={12}>
                            <div className="flex justify-end">
                                <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>Add User</Button>
                            </div>
                        </Col>
                    </Row>
                </Card>

                <Card title="System Users">
                    <Table columns={columns} dataSource={filteredUsers} pagination={{ pageSize: 20 }} />
                </Card>
            </div>

            <Modal title={editingUser ? 'Edit User' : 'Add User'} open={modalVisible} onCancel={() => setModalVisible(false)} footer={null} width={600}>
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="username" label="Username" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="fullName" label="Full Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                                <Select>{roles.map(role => <Option key={role} value={role}>{role}</Option>)}</Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
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

export default Users;