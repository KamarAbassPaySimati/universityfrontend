import React, { useState } from 'react';
import { 
    Table, 
    Input, 
    Button, 
    Select, 
    Space, 
    Tag, 
    Avatar, 
    Card, 
    Row, 
    Col, 
    Statistic,
    Modal,
    Form,
    DatePicker,
    message,
    Popconfirm
} from 'antd';
import {
    SearchOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    ExportOutlined,
    ImportOutlined,
    UserOutlined
} from '@ant-design/icons';

const { Option } = Select;

const AllStudents = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');
    const [selectedProgram, setSelectedProgram] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [form] = Form.useForm();

    // Mock student data
    const [students, setStudents] = useState([
        {
            key: '1',
            studentId: 'STU001',
            name: 'John Smith',
            email: 'john.smith@university.edu',
            department: 'Computer Science',
            year: '2024',
            semester: '1',
            program: 'Bachelor of Science',
            status: 'Active',
            enrollmentDate: '2023-09-01',
            avatar: null
        },
        {
            key: '2',
            studentId: 'STU002',
            name: 'Sarah Johnson',
            email: 'sarah.johnson@university.edu',
            department: 'Engineering',
            year: '2023',
            semester: '2',
            program: 'Bachelor of Engineering',
            status: 'Active',
            enrollmentDate: '2022-09-01',
            avatar: null
        },
        {
            key: '3',
            studentId: 'STU003',
            name: 'Michael Brown',
            email: 'michael.brown@university.edu',
            department: 'Business',
            year: '2022',
            semester: '1',
            program: 'Master of Business Administration',
            status: 'Inactive',
            enrollmentDate: '2021-09-01',
            avatar: null
        },
        {
            key: '4',
            studentId: 'STU004',
            name: 'Emily Davis',
            email: 'emily.davis@university.edu',
            department: 'Medicine',
            year: '2024',
            semester: '1',
            program: 'Doctor of Medicine',
            status: 'Active',
            enrollmentDate: '2024-09-01',
            avatar: null
        },
        {
            key: '5',
            studentId: 'STU005',
            name: 'David Wilson',
            email: 'david.wilson@university.edu',
            department: 'Arts & Sciences',
            year: '2021',
            semester: '2',
            program: 'Bachelor of Arts',
            status: 'Graduated',
            enrollmentDate: '2020-09-01',
            avatar: null
        }
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'green';
            case 'Inactive': return 'orange';
            case 'Graduated': return 'blue';
            default: return 'default';
        }
    };

    const handleAddStudent = () => {
        setEditingStudent(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEditStudent = (student) => {
        setEditingStudent(student);
        form.setFieldsValue(student);
        setIsModalVisible(true);
    };

    const handleDeleteStudent = (studentId) => {
        setStudents(students.filter(student => student.key !== studentId));
        message.success('Student deleted successfully');
    };

    const handleModalOk = () => {
        form.validateFields().then(values => {
            if (editingStudent) {
                // Update existing student
                setStudents(students.map(student => 
                    student.key === editingStudent.key 
                        ? { ...student, ...values, enrollmentDate: values.enrollmentDate?.format('YYYY-MM-DD') }
                        : student
                ));
                message.success('Student updated successfully');
            } else {
                // Add new student
                const newStudent = {
                    key: Date.now().toString(),
                    studentId: `STU${String(students.length + 1).padStart(3, '0')}`,
                    ...values,
                    enrollmentDate: values.enrollmentDate?.format('YYYY-MM-DD'),
                    avatar: null
                };
                setStudents([...students, newStudent]);
                message.success('Student added successfully');
            }
            setIsModalVisible(false);
            form.resetFields();
        });
    };

    const columns = [
        {
            title: 'Student ID',
            dataIndex: 'studentId',
            key: 'studentId',
            sorter: (a, b) => a.studentId.localeCompare(b.studentId),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Space>
                    <Avatar icon={<UserOutlined />} />
                    {text}
                </Space>
            ),
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
            filters: [
                { text: 'Computer Science', value: 'Computer Science' },
                { text: 'Engineering', value: 'Engineering' },
                { text: 'Business', value: 'Business' },
                { text: 'Medicine', value: 'Medicine' },
                { text: 'Arts & Sciences', value: 'Arts & Sciences' },
            ],
            onFilter: (value, record) => record.department === value,
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
            filters: [
                { text: 'Freshman', value: 'Freshman' },
                { text: 'Sophomore', value: 'Sophomore' },
                { text: 'Junior', value: 'Junior' },
                { text: 'Senior', value: 'Senior' },
                { text: 'Graduate', value: 'Graduate' },
            ],
            onFilter: (value, record) => record.year === value,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={getStatusColor(status)}>{status}</Tag>
            ),
            filters: [
                { text: 'Active', value: 'Active' },
                { text: 'Inactive', value: 'Inactive' },
                { text: 'Graduated', value: 'Graduated' },
            ],
            onFilter: (value, record) => record.status === value,
        },
        {
            title: 'Enrollment Date',
            dataIndex: 'enrollmentDate',
            key: 'enrollmentDate',
            sorter: (a, b) => new Date(a.enrollmentDate) - new Date(b.enrollmentDate),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button 
                        type="link" 
                        icon={<EditOutlined />} 
                        onClick={() => handleEditStudent(record)}
                    />
                    <Popconfirm
                        title="Are you sure you want to delete this student?"
                        onConfirm={() => handleDeleteStudent(record.key)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const filteredStudents = students.filter(student => {
        return (
            student.name.toLowerCase().includes(searchText.toLowerCase()) ||
            student.studentId.toLowerCase().includes(searchText.toLowerCase()) ||
            student.email.toLowerCase().includes(searchText.toLowerCase())
        );
    });

    const activeStudents = students.filter(s => s.status === 'Active').length;
    const inactiveStudents = students.filter(s => s.status === 'Inactive').length;
    const graduatedStudents = students.filter(s => s.status === 'Graduated').length;

    return (
        <div className="p-0 bg-gray-50 min-h-screen w-full">
            <div className="p-6 pb-4">
                <h1 className="text-2xl font-bold text-gray-800">All Students</h1>
                <p className="text-gray-600">Manage and view all student records</p>
            </div>

            <div className="px-6">
                {/* Stats Cards */}
                <Row gutter={[16, 16]} className="mb-6">
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic title="Total Students" value={students.length} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic title="Active" value={activeStudents} valueStyle={{ color: '#52c41a' }} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic title="Inactive" value={inactiveStudents} valueStyle={{ color: '#faad14' }} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic title="Graduated" value={graduatedStudents} valueStyle={{ color: '#1890ff' }} />
                        </Card>
                    </Col>
                </Row>

                {/* Search and Filters */}
                <Card className="mb-6">
                    <Row gutter={[16, 16]} align="middle">
                        <Col xs={24} sm={8}>
                            <Input
                                placeholder="Search students..."
                                prefix={<SearchOutlined />}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </Col>
                        <Col xs={24} sm={4}>
                            <Select
                                placeholder="Department"
                                style={{ width: '100%' }}
                                value={selectedDepartment}
                                onChange={setSelectedDepartment}
                                allowClear
                            >
                                <Option value="Computer Science">Computer Science</Option>
                                <Option value="Engineering">Engineering</Option>
                                <Option value="Business">Business</Option>
                                <Option value="Medicine">Medicine</Option>
                                <Option value="Arts & Sciences">Arts & Sciences</Option>
                            </Select>
                        </Col>
                        <Col xs={24} sm={2}>
                            <Select
                                placeholder="Year"
                                style={{ width: '100%' }}
                                value={selectedYear}
                                onChange={setSelectedYear}
                                allowClear
                            >
                                <Option value="2024">2024</Option>
                                <Option value="2023">2023</Option>
                                <Option value="2022">2022</Option>
                                <Option value="2021">2021</Option>
                                <Option value="2020">2020</Option>
                            </Select>
                        </Col>
                        <Col xs={24} sm={2}>
                            <Select
                                placeholder="Semester"
                                style={{ width: '100%' }}
                                value={selectedSemester}
                                onChange={setSelectedSemester}
                                allowClear
                            >
                                <Option value="1">Sem 1</Option>
                                <Option value="2">Sem 2</Option>
                            </Select>
                        </Col>
                        <Col xs={24} sm={3}>
                            <Select
                                placeholder="Program"
                                style={{ width: '100%' }}
                                value={selectedProgram}
                                onChange={setSelectedProgram}
                                allowClear
                            >
                                <Option value="Bachelor of Science">BSc</Option>
                                <Option value="Bachelor of Engineering">BEng</Option>
                                <Option value="Bachelor of Arts">BA</Option>
                                <Option value="Master of Business Administration">MBA</Option>
                                <Option value="Doctor of Medicine">MD</Option>
                            </Select>
                        </Col>
                        <Col xs={24} sm={2}>
                            <Select
                                placeholder="Status"
                                style={{ width: '100%' }}
                                value={selectedStatus}
                                onChange={setSelectedStatus}
                                allowClear
                            >
                                <Option value="Active">Active</Option>
                                <Option value="Inactive">Inactive</Option>
                                <Option value="Graduated">Graduated</Option>
                            </Select>
                        </Col>
                        <Col xs={24} sm={5}>
                            <Space>
                                <Button type="primary" icon={<PlusOutlined />} onClick={handleAddStudent}>
                                    Add Student
                                </Button>
                                <Button icon={<ExportOutlined />}>Export</Button>
                                <Button icon={<ImportOutlined />}>Import</Button>
                            </Space>
                        </Col>
                    </Row>
                </Card>

                {/* Students Table */}
                <Card>
                    <Table
                        columns={columns}
                        dataSource={filteredStudents}
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} students`,
                        }}
                        scroll={{ x: 1200 }}
                    />
                </Card>
            </div>

            {/* Add/Edit Student Modal */}
            <Modal
                title={editingStudent ? 'Edit Student' : 'Add New Student'}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={() => setIsModalVisible(false)}
                width={600}
            >
                <Form form={form} layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
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
                                <Select>
                                    <Option value="Computer Science">Computer Science</Option>
                                    <Option value="Engineering">Engineering</Option>
                                    <Option value="Business">Business</Option>
                                    <Option value="Medicine">Medicine</Option>
                                    <Option value="Arts & Sciences">Arts & Sciences</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="year" label="Year" rules={[{ required: true }]}>
                                <Select>
                                    <Option value="Freshman">Freshman</Option>
                                    <Option value="Sophomore">Sophomore</Option>
                                    <Option value="Junior">Junior</Option>
                                    <Option value="Senior">Senior</Option>
                                    <Option value="Graduate">Graduate</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                                <Select>
                                    <Option value="Active">Active</Option>
                                    <Option value="Inactive">Inactive</Option>
                                    <Option value="Graduated">Graduated</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="enrollmentDate" label="Enrollment Date" rules={[{ required: true }]}>
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default AllStudents;