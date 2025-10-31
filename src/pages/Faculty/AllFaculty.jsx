import React, { useState } from 'react';
import { Table, Input, Button, Card, Row, Col, Statistic, Tag, Modal, Form, Select, message } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const { Option } = Select;

const AllFaculty = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('all');
    const [modalVisible, setModalVisible] = useState(false);
    const [editingFaculty, setEditingFaculty] = useState(null);
    const [form] = Form.useForm();

    const [faculty, setFaculty] = useState([
        {
            key: '1',
            facultyId: 'FAC001',
            name: 'Dr. John Smith',
            email: 'john.smith@university.edu',
            department: 'Computer Science',
            designation: 'Professor',
            qualification: 'PhD Computer Science',
            experience: 15,
            courses: ['CS101', 'CS401'],
            status: 'Active',
            joinDate: '2010-08-15'
        },
        {
            key: '2',
            facultyId: 'FAC002',
            name: 'Dr. Sarah Johnson',
            email: 'sarah.johnson@university.edu',
            department: 'Mathematics',
            designation: 'Associate Professor',
            qualification: 'PhD Mathematics',
            experience: 12,
            courses: ['MATH201', 'MATH301'],
            status: 'Active',
            joinDate: '2012-01-20'
        }
    ]);

    const departments = ['Computer Science', 'Mathematics', 'Engineering', 'Business'];
    const designations = ['Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer'];

    const handleAdd = () => {
        setEditingFaculty(null);
        form.resetFields();
        setModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingFaculty(record);
        form.setFieldsValue(record);
        setModalVisible(true);
    };

    const handleSubmit = (values) => {
        if (editingFaculty) {
            setFaculty(faculty.map(f => f.key === editingFaculty.key ? { ...f, ...values } : f));
            message.success('Faculty updated successfully');
        } else {
            const newFaculty = { ...values, key: Date.now().toString(), facultyId: `FAC${Date.now()}` };
            setFaculty([...faculty, newFaculty]);
            message.success('Faculty added successfully');
        }
        setModalVisible(false);
    };

    const handleDelete = (key) => {
        setFaculty(faculty.filter(f => f.key !== key));
        message.success('Faculty deleted successfully');
    };

    const columns = [
        { title: 'Faculty ID', dataIndex: 'facultyId', key: 'facultyId' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Department', dataIndex: 'department', key: 'department' },
        { title: 'Designation', dataIndex: 'designation', key: 'designation' },
        { title: 'Experience', dataIndex: 'experience', key: 'experience', render: (exp) => `${exp} years` },
        { title: 'Courses', dataIndex: 'courses', key: 'courses', render: (courses) => courses.join(', ') },
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

    const filteredFaculty = faculty.filter(f => {
        const matchesSearch = f.name.toLowerCase().includes(searchText.toLowerCase()) || f.facultyId.toLowerCase().includes(searchText.toLowerCase());
        const matchesDepartment = selectedDepartment === 'all' || f.department === selectedDepartment;
        return matchesSearch && matchesDepartment;
    });

    return (
        <div className="p-0 bg-gray-50 min-h-screen w-full">
            <div className="p-6 pb-4">
                <h1 className="text-2xl font-bold text-gray-800">Faculty Management</h1>
                <p className="text-gray-600">Manage faculty members and their information</p>
            </div>

            <div className="px-6">
                <Row gutter={[16, 16]} className="mb-6">
                    <Col xs={24} sm={6}>
                        <Card><Statistic title="Total Faculty" value={faculty.length} /></Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card><Statistic title="Active Faculty" value={faculty.filter(f => f.status === 'Active').length} /></Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card><Statistic title="Departments" value={departments.length} /></Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card><Statistic title="Avg Experience" value={Math.round(faculty.reduce((sum, f) => sum + f.experience, 0) / faculty.length)} suffix="years" /></Card>
                    </Col>
                </Row>

                <Card className="mb-6">
                    <Row gutter={[16, 16]} align="middle">
                        <Col xs={24} sm={6}>
                            <Input placeholder="Search faculty..." prefix={<SearchOutlined />} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                        </Col>
                        <Col xs={24} sm={6}>
                            <Select value={selectedDepartment} onChange={setSelectedDepartment} style={{ width: '100%' }}>
                                <Option value="all">All Departments</Option>
                                {departments.map(dept => <Option key={dept} value={dept}>{dept}</Option>)}
                            </Select>
                        </Col>
                        <Col xs={24} sm={12}>
                            <div className="flex justify-end">
                                <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>Add Faculty</Button>
                            </div>
                        </Col>
                    </Row>
                </Card>

                <Card title="Faculty List">
                    <Table columns={columns} dataSource={filteredFaculty} pagination={{ pageSize: 20 }} />
                </Card>
            </div>

            <Modal title={editingFaculty ? 'Edit Faculty' : 'Add Faculty'} open={modalVisible} onCancel={() => setModalVisible(false)} footer={null} width={600}>
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="department" label="Department" rules={[{ required: true }]}>
                                <Select>{departments.map(dept => <Option key={dept} value={dept}>{dept}</Option>)}</Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="designation" label="Designation" rules={[{ required: true }]}>
                                <Select>{designations.map(des => <Option key={des} value={des}>{des}</Option>)}</Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="qualification" label="Qualification" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="experience" label="Experience (years)" rules={[{ required: true }]}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                        <Button style={{ marginLeft: 8 }} onClick={() => setModalVisible(false)}>Cancel</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AllFaculty;