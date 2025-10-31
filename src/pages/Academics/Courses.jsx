import React, { useState } from 'react';
import { 
    Table, 
    Input, 
    Button, 
    Select, 
    Space, 
    Tag, 
    Card, 
    Row, 
    Col, 
    Statistic,
    Modal,
    Form,
    InputNumber,
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
    BookOutlined,
    UserOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

const Courses = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [form] = Form.useForm();

    // Mock courses data
    const [courses, setCourses] = useState([
        {
            key: '1',
            courseCode: 'CS101',
            courseName: 'Introduction to Computer Science',
            department: 'Computer Science',
            credits: 3,
            level: 'Undergraduate',
            semester: 'Both',
            instructor: 'Dr. John Smith',
            enrolledStudents: 45,
            maxCapacity: 50,
            status: 'Active',
            description: 'Basic concepts of computer science and programming'
        },
        {
            key: '2',
            courseCode: 'MATH201',
            courseName: 'Calculus II',
            department: 'Mathematics',
            credits: 4,
            level: 'Undergraduate',
            semester: '1',
            instructor: 'Dr. Sarah Johnson',
            enrolledStudents: 32,
            maxCapacity: 40,
            status: 'Active',
            description: 'Advanced calculus concepts and applications'
        },
        {
            key: '3',
            courseCode: 'ENG102',
            courseName: 'English Composition',
            department: 'English',
            credits: 3,
            level: 'Undergraduate',
            semester: 'Both',
            instructor: 'Prof. Michael Brown',
            enrolledStudents: 28,
            maxCapacity: 35,
            status: 'Active',
            description: 'Academic writing and composition skills'
        },
        {
            key: '4',
            courseCode: 'PHYS301',
            courseName: 'Quantum Physics',
            department: 'Physics',
            credits: 4,
            level: 'Graduate',
            semester: '2',
            instructor: 'Dr. Emily Davis',
            enrolledStudents: 15,
            maxCapacity: 20,
            status: 'Active',
            description: 'Advanced quantum mechanics and applications'
        },
        {
            key: '5',
            courseCode: 'BUS401',
            courseName: 'Strategic Management',
            department: 'Business',
            credits: 3,
            level: 'Graduate',
            semester: '1',
            instructor: 'Prof. David Wilson',
            enrolledStudents: 0,
            maxCapacity: 25,
            status: 'Inactive',
            description: 'Strategic planning and business management'
        }
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'green';
            case 'Inactive': return 'red';
            case 'Draft': return 'orange';
            default: return 'default';
        }
    };

    const getCapacityColor = (enrolled, max) => {
        const percentage = (enrolled / max) * 100;
        if (percentage >= 90) return 'red';
        if (percentage >= 75) return 'orange';
        return 'green';
    };

    const handleAddCourse = () => {
        setEditingCourse(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEditCourse = (course) => {
        setEditingCourse(course);
        form.setFieldsValue(course);
        setIsModalVisible(true);
    };

    const handleDeleteCourse = (courseId) => {
        setCourses(courses.filter(course => course.key !== courseId));
        message.success('Course deleted successfully');
    };

    const handleModalOk = () => {
        form.validateFields().then(values => {
            if (editingCourse) {
                setCourses(courses.map(course => 
                    course.key === editingCourse.key 
                        ? { ...course, ...values }
                        : course
                ));
                message.success('Course updated successfully');
            } else {
                const newCourse = {
                    key: Date.now().toString(),
                    ...values,
                    enrolledStudents: 0
                };
                setCourses([...courses, newCourse]);
                message.success('Course added successfully');
            }
            setIsModalVisible(false);
            form.resetFields();
        });
    };

    const columns = [
        {
            title: 'Course Code',
            dataIndex: 'courseCode',
            key: 'courseCode',
            sorter: (a, b) => a.courseCode.localeCompare(b.courseCode),
            render: (text) => <span className="font-semibold text-blue-600">{text}</span>
        },
        {
            title: 'Course Name',
            dataIndex: 'courseName',
            key: 'courseName',
            sorter: (a, b) => a.courseName.localeCompare(b.courseName),
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
            filters: [
                { text: 'Computer Science', value: 'Computer Science' },
                { text: 'Mathematics', value: 'Mathematics' },
                { text: 'English', value: 'English' },
                { text: 'Physics', value: 'Physics' },
                { text: 'Business', value: 'Business' },
            ],
            onFilter: (value, record) => record.department === value,
        },
        {
            title: 'Credits',
            dataIndex: 'credits',
            key: 'credits',
            sorter: (a, b) => a.credits - b.credits,
        },
        {
            title: 'Level',
            dataIndex: 'level',
            key: 'level',
            filters: [
                { text: 'Undergraduate', value: 'Undergraduate' },
                { text: 'Graduate', value: 'Graduate' },
            ],
            onFilter: (value, record) => record.level === value,
        },
        {
            title: 'Instructor',
            dataIndex: 'instructor',
            key: 'instructor',
        },
        {
            title: 'Enrollment',
            key: 'enrollment',
            render: (_, record) => (
                <div>
                    <span className={`font-semibold text-${getCapacityColor(record.enrolledStudents, record.maxCapacity)}-600`}>
                        {record.enrolledStudents}/{record.maxCapacity}
                    </span>
                    <div className="text-xs text-gray-500">
                        {Math.round((record.enrolledStudents / record.maxCapacity) * 100)}% full
                    </div>
                </div>
            ),
            sorter: (a, b) => (a.enrolledStudents / a.maxCapacity) - (b.enrolledStudents / b.maxCapacity),
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
                { text: 'Draft', value: 'Draft' },
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
                        onClick={() => handleEditCourse(record)}
                    />
                    <Popconfirm
                        title="Are you sure you want to delete this course?"
                        onConfirm={() => handleDeleteCourse(record.key)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const filteredCourses = courses.filter(course => {
        return (
            course.courseName.toLowerCase().includes(searchText.toLowerCase()) ||
            course.courseCode.toLowerCase().includes(searchText.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchText.toLowerCase())
        );
    });

    const activeCourses = courses.filter(c => c.status === 'Active').length;
    const totalEnrollments = courses.reduce((sum, c) => sum + c.enrolledStudents, 0);
    const totalCapacity = courses.reduce((sum, c) => sum + c.maxCapacity, 0);
    const avgEnrollment = totalCapacity > 0 ? Math.round((totalEnrollments / totalCapacity) * 100) : 0;

    return (
        <div className="p-0 bg-gray-50 min-h-screen w-full">
            <div className="p-6 pb-4">
                <h1 className="text-2xl font-bold text-gray-800">Course Management</h1>
                <p className="text-gray-600">Manage university courses and academic offerings</p>
            </div>

            <div className="px-6">
                {/* Stats Cards */}
                <Row gutter={[16, 16]} className="mb-6">
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic title="Total Courses" value={courses.length} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic title="Active Courses" value={activeCourses} valueStyle={{ color: '#52c41a' }} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic title="Total Enrollments" value={totalEnrollments} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic title="Avg Capacity" value={avgEnrollment} suffix="%" />
                        </Card>
                    </Col>
                </Row>

                {/* Search and Filters */}
                <Card className="mb-6">
                    <Row gutter={[16, 16]} align="middle">
                        <Col xs={24} sm={8}>
                            <Input
                                placeholder="Search courses..."
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
                                <Option value="Mathematics">Mathematics</Option>
                                <Option value="English">English</Option>
                                <Option value="Physics">Physics</Option>
                                <Option value="Business">Business</Option>
                            </Select>
                        </Col>
                        <Col xs={24} sm={3}>
                            <Select
                                placeholder="Level"
                                style={{ width: '100%' }}
                                value={selectedLevel}
                                onChange={setSelectedLevel}
                                allowClear
                            >
                                <Option value="Undergraduate">Undergraduate</Option>
                                <Option value="Graduate">Graduate</Option>
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
                                <Option value="Active">Active</Option>
                                <Option value="Inactive">Inactive</Option>
                                <Option value="Draft">Draft</Option>
                            </Select>
                        </Col>
                        <Col xs={24} sm={6}>
                            <Space>
                                <Button type="primary" icon={<PlusOutlined />} onClick={handleAddCourse}>
                                    Add Course
                                </Button>
                                <Button icon={<ExportOutlined />}>Export</Button>
                                <Button icon={<ImportOutlined />}>Import</Button>
                            </Space>
                        </Col>
                    </Row>
                </Card>

                {/* Courses Table */}
                <Card>
                    <Table
                        columns={columns}
                        dataSource={filteredCourses}
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} courses`,
                        }}
                        scroll={{ x: 1200 }}
                    />
                </Card>
            </div>

            {/* Add/Edit Course Modal */}
            <Modal
                title={editingCourse ? 'Edit Course' : 'Add New Course'}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={() => setIsModalVisible(false)}
                width={700}
            >
                <Form form={form} layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="courseCode" label="Course Code" rules={[{ required: true }]}>
                                <Input placeholder="CS101" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="courseName" label="Course Name" rules={[{ required: true }]}>
                                <Input placeholder="Introduction to Computer Science" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="department" label="Department" rules={[{ required: true }]}>
                                <Select>
                                    <Option value="Computer Science">Computer Science</Option>
                                    <Option value="Mathematics">Mathematics</Option>
                                    <Option value="English">English</Option>
                                    <Option value="Physics">Physics</Option>
                                    <Option value="Business">Business</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="level" label="Level" rules={[{ required: true }]}>
                                <Select>
                                    <Option value="Undergraduate">Undergraduate</Option>
                                    <Option value="Graduate">Graduate</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item name="credits" label="Credits" rules={[{ required: true }]}>
                                <InputNumber min={1} max={6} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="maxCapacity" label="Max Capacity" rules={[{ required: true }]}>
                                <InputNumber min={1} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="semester" label="Semester" rules={[{ required: true }]}>
                                <Select>
                                    <Option value="1">Semester 1</Option>
                                    <Option value="2">Semester 2</Option>
                                    <Option value="Both">Both Semesters</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="instructor" label="Instructor" rules={[{ required: true }]}>
                                <Input placeholder="Dr. John Smith" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                                <Select>
                                    <Option value="Active">Active</Option>
                                    <Option value="Inactive">Inactive</Option>
                                    <Option value="Draft">Draft</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="description" label="Description">
                        <TextArea rows={3} placeholder="Course description..." />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Courses;