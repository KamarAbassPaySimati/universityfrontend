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
    UserOutlined,
    BookOutlined,
    CalendarOutlined
} from '@ant-design/icons';

const { Option } = Select;

const Enrollments = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingEnrollment, setEditingEnrollment] = useState(null);
    const [form] = Form.useForm();

    // Mock enrollment data
    const [enrollments, setEnrollments] = useState([
        {
            key: '1',
            enrollmentId: 'ENR001',
            studentId: 'STU001',
            studentName: 'John Smith',
            email: 'john.smith@university.edu',
            courses: ['CS101', 'MATH201', 'ENG102'],
            totalCredits: 15,
            semester: '1',
            academicYear: '2024',
            enrollmentDate: '2024-01-15',
            status: 'Enrolled',
            gpa: 3.8
        },
        {
            key: '2',
            enrollmentId: 'ENR002',
            studentId: 'STU002',
            studentName: 'Sarah Johnson',
            email: 'sarah.johnson@university.edu',
            courses: ['ENG201', 'MECH301', 'PHYS202'],
            totalCredits: 18,
            semester: '2',
            academicYear: '2024',
            enrollmentDate: '2024-01-12',
            status: 'Enrolled',
            gpa: 3.9
        },
        {
            key: '3',
            enrollmentId: 'ENR003',
            studentId: 'STU003',
            studentName: 'Michael Brown',
            email: 'michael.brown@university.edu',
            courses: ['BUS301', 'ECON201'],
            totalCredits: 12,
            semester: '1',
            academicYear: '2024',
            enrollmentDate: '2024-01-10',
            status: 'Dropped',
            gpa: 3.2
        },
        {
            key: '4',
            enrollmentId: 'ENR004',
            studentId: 'STU004',
            studentName: 'Emily Davis',
            email: 'emily.davis@university.edu',
            courses: ['MED401', 'BIO301', 'CHEM302', 'ANAT201'],
            totalCredits: 20,
            semester: '1',
            academicYear: '2024',
            enrollmentDate: '2024-01-08',
            status: 'Enrolled',
            gpa: 3.95
        },
        {
            key: '5',
            enrollmentId: 'ENR005',
            studentId: 'STU005',
            studentName: 'David Wilson',
            email: 'david.wilson@university.edu',
            courses: ['ART201', 'HIST301'],
            totalCredits: 9,
            semester: '2',
            academicYear: '2023',
            enrollmentDate: '2023-08-15',
            status: 'Completed',
            gpa: 3.7
        }
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Enrolled': return 'green';
            case 'Dropped': return 'red';
            case 'Completed': return 'blue';
            case 'Pending': return 'orange';
            default: return 'default';
        }
    };

    const handleAddEnrollment = () => {
        setEditingEnrollment(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEditEnrollment = (enrollment) => {
        setEditingEnrollment(enrollment);
        form.setFieldsValue({
            ...enrollment,
            courses: enrollment.courses.join(', ')
        });
        setIsModalVisible(true);
    };

    const handleDeleteEnrollment = (enrollmentId) => {
        setEnrollments(enrollments.filter(enrollment => enrollment.key !== enrollmentId));
        message.success('Enrollment deleted successfully');
    };

    const handleModalOk = () => {
        form.validateFields().then(values => {
            const coursesArray = values.courses.split(',').map(course => course.trim());
            const enrollmentData = {
                ...values,
                courses: coursesArray,
                totalCredits: coursesArray.length * 3, // Assuming 3 credits per course
                enrollmentDate: values.enrollmentDate?.format('YYYY-MM-DD')
            };

            if (editingEnrollment) {
                setEnrollments(enrollments.map(enrollment => 
                    enrollment.key === editingEnrollment.key 
                        ? { ...enrollment, ...enrollmentData }
                        : enrollment
                ));
                message.success('Enrollment updated successfully');
            } else {
                const newEnrollment = {
                    key: Date.now().toString(),
                    enrollmentId: `ENR${String(enrollments.length + 1).padStart(3, '0')}`,
                    ...enrollmentData
                };
                setEnrollments([...enrollments, newEnrollment]);
                message.success('Enrollment added successfully');
            }
            setIsModalVisible(false);
            form.resetFields();
        });
    };

    const columns = [
        {
            title: 'Enrollment ID',
            dataIndex: 'enrollmentId',
            key: 'enrollmentId',
            sorter: (a, b) => a.enrollmentId.localeCompare(b.enrollmentId),
        },
        {
            title: 'Student',
            dataIndex: 'studentName',
            key: 'studentName',
            render: (text, record) => (
                <Space>
                    <Avatar icon={<UserOutlined />} />
                    <div>
                        <div>{text}</div>
                        <div className="text-xs text-gray-500">{record.studentId}</div>
                    </div>
                </Space>
            ),
            sorter: (a, b) => a.studentName.localeCompare(b.studentName),
        },
        {
            title: 'Courses',
            dataIndex: 'courses',
            key: 'courses',
            render: (courses) => (
                <div>
                    {courses.slice(0, 2).map((course, index) => (
                        <Tag key={index} className="mb-1">{course}</Tag>
                    ))}
                    {courses.length > 2 && (
                        <Tag className="mb-1">+{courses.length - 2} more</Tag>
                    )}
                </div>
            ),
        },
        {
            title: 'Credits',
            dataIndex: 'totalCredits',
            key: 'totalCredits',
            sorter: (a, b) => a.totalCredits - b.totalCredits,
        },
        {
            title: 'Semester',
            dataIndex: 'semester',
            key: 'semester',
            render: (semester) => `Sem ${semester}`,
            filters: [
                { text: 'Semester 1', value: '1' },
                { text: 'Semester 2', value: '2' },
            ],
            onFilter: (value, record) => record.semester === value,
        },
        {
            title: 'Academic Year',
            dataIndex: 'academicYear',
            key: 'academicYear',
            filters: [
                { text: '2024', value: '2024' },
                { text: '2023', value: '2023' },
                { text: '2022', value: '2022' },
            ],
            onFilter: (value, record) => record.academicYear === value,
        },
        {
            title: 'GPA',
            dataIndex: 'gpa',
            key: 'gpa',
            sorter: (a, b) => a.gpa - b.gpa,
            render: (gpa) => <span className={gpa >= 3.5 ? 'text-green-600 font-semibold' : ''}>{gpa}</span>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={getStatusColor(status)}>{status}</Tag>
            ),
            filters: [
                { text: 'Enrolled', value: 'Enrolled' },
                { text: 'Dropped', value: 'Dropped' },
                { text: 'Completed', value: 'Completed' },
                { text: 'Pending', value: 'Pending' },
            ],
            onFilter: (value, record) => record.status === value,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button 
                        type="link" 
                        icon={<EditOutlined />} 
                        onClick={() => handleEditEnrollment(record)}
                    />
                    <Popconfirm
                        title="Are you sure you want to delete this enrollment?"
                        onConfirm={() => handleDeleteEnrollment(record.key)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const filteredEnrollments = enrollments.filter(enrollment => {
        return (
            enrollment.studentName.toLowerCase().includes(searchText.toLowerCase()) ||
            enrollment.enrollmentId.toLowerCase().includes(searchText.toLowerCase()) ||
            enrollment.studentId.toLowerCase().includes(searchText.toLowerCase())
        );
    });

    const enrolledCount = enrollments.filter(e => e.status === 'Enrolled').length;
    const completedCount = enrollments.filter(e => e.status === 'Completed').length;
    const droppedCount = enrollments.filter(e => e.status === 'Dropped').length;
    const totalCredits = enrollments.reduce((sum, e) => sum + e.totalCredits, 0);

    return (
        <div className="p-0 bg-gray-50 min-h-screen w-full">
            <div className="p-6 pb-4">
                <h1 className="text-2xl font-bold text-gray-800">Course Enrollments</h1>
                <p className="text-gray-600">Manage student course enrollments and academic records</p>
            </div>

            <div className="px-6">
                {/* Stats Cards */}
                <Row gutter={[16, 16]} className="mb-6">
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic title="Total Enrollments" value={enrollments.length} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic title="Currently Enrolled" value={enrolledCount} valueStyle={{ color: '#52c41a' }} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic title="Completed" value={completedCount} valueStyle={{ color: '#1890ff' }} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic title="Total Credits" value={totalCredits} />
                        </Card>
                    </Col>
                </Row>

                {/* Search and Filters */}
                <Card className="mb-6">
                    <Row gutter={[16, 16]} align="middle">
                        <Col xs={24} sm={8}>
                            <Input
                                placeholder="Search enrollments..."
                                prefix={<SearchOutlined />}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </Col>
                        <Col xs={24} sm={3}>
                            <Select
                                placeholder="Semester"
                                style={{ width: '100%' }}
                                value={selectedSemester}
                                onChange={setSelectedSemester}
                                allowClear
                            >
                                <Option value="1">Semester 1</Option>
                                <Option value="2">Semester 2</Option>
                            </Select>
                        </Col>
                        <Col xs={24} sm={3}>
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
                            </Select>
                        </Col>
                        <Col xs={24} sm={3}>
                            <Select
                                placeholder="Status"
                                style={{ width: '100%' }}
                                value={selectedStatus}
                                onChange={setSelectedStatus}
                                allowClear
                            >
                                <Option value="Enrolled">Enrolled</Option>
                                <Option value="Completed">Completed</Option>
                                <Option value="Dropped">Dropped</Option>
                                <Option value="Pending">Pending</Option>
                            </Select>
                        </Col>
                        <Col xs={24} sm={7}>
                            <Space>
                                <Button type="primary" icon={<PlusOutlined />} onClick={handleAddEnrollment}>
                                    New Enrollment
                                </Button>
                                <Button icon={<ExportOutlined />}>Export</Button>
                                <Button icon={<ImportOutlined />}>Import</Button>
                            </Space>
                        </Col>
                    </Row>
                </Card>

                {/* Enrollments Table */}
                <Card>
                    <Table
                        columns={columns}
                        dataSource={filteredEnrollments}
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} enrollments`,
                        }}
                        scroll={{ x: 1200 }}
                    />
                </Card>
            </div>

            {/* Add/Edit Enrollment Modal */}
            <Modal
                title={editingEnrollment ? 'Edit Enrollment' : 'Add New Enrollment'}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={() => setIsModalVisible(false)}
                width={600}
            >
                <Form form={form} layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="studentId" label="Student ID" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="studentName" label="Student Name" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="semester" label="Semester" rules={[{ required: true }]}>
                                <Select>
                                    <Option value="1">Semester 1</Option>
                                    <Option value="2">Semester 2</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="academicYear" label="Academic Year" rules={[{ required: true }]}>
                                <Select>
                                    <Option value="2024">2024</Option>
                                    <Option value="2023">2023</Option>
                                    <Option value="2022">2022</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="courses" label="Courses (comma separated)" rules={[{ required: true }]}>
                        <Input placeholder="CS101, MATH201, ENG102" />
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                                <Select>
                                    <Option value="Enrolled">Enrolled</Option>
                                    <Option value="Pending">Pending</Option>
                                    <Option value="Completed">Completed</Option>
                                    <Option value="Dropped">Dropped</Option>
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

export default Enrollments;