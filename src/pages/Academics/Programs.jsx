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
    TrophyOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

const Programs = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingProgram, setEditingProgram] = useState(null);
    const [form] = Form.useForm();

    // Mock programs data
    const [programs, setPrograms] = useState([
        {
            key: '1',
            programCode: 'BSC-CS',
            programName: 'Bachelor of Science in Computer Science',
            department: 'Computer Science',
            level: 'Undergraduate',
            duration: 4,
            totalCredits: 120,
            enrolledStudents: 245,
            maxCapacity: 300,
            status: 'Active',
            description: 'Comprehensive computer science program covering programming, algorithms, and software engineering'
        },
        {
            key: '2',
            programCode: 'BEng-ME',
            programName: 'Bachelor of Engineering in Mechanical Engineering',
            department: 'Engineering',
            level: 'Undergraduate',
            duration: 4,
            totalCredits: 128,
            enrolledStudents: 180,
            maxCapacity: 200,
            status: 'Active',
            description: 'Engineering program focusing on mechanical systems, thermodynamics, and design'
        },
        {
            key: '3',
            programCode: 'MBA',
            programName: 'Master of Business Administration',
            department: 'Business',
            level: 'Graduate',
            duration: 2,
            totalCredits: 60,
            enrolledStudents: 85,
            maxCapacity: 100,
            status: 'Active',
            description: 'Advanced business management program for working professionals'
        },
        {
            key: '4',
            programCode: 'MD',
            programName: 'Doctor of Medicine',
            department: 'Medicine',
            level: 'Graduate',
            duration: 6,
            totalCredits: 240,
            enrolledStudents: 120,
            maxCapacity: 150,
            status: 'Active',
            description: 'Medical degree program with clinical training and research components'
        },
        {
            key: '5',
            programCode: 'BA-ENG',
            programName: 'Bachelor of Arts in English Literature',
            department: 'Arts & Sciences',
            level: 'Undergraduate',
            duration: 3,
            totalCredits: 90,
            enrolledStudents: 0,
            maxCapacity: 80,
            status: 'Inactive',
            description: 'Literature and writing program with emphasis on critical analysis'
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

    const handleAddProgram = () => {
        setEditingProgram(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEditProgram = (program) => {
        setEditingProgram(program);
        form.setFieldsValue(program);
        setIsModalVisible(true);
    };

    const handleDeleteProgram = (programId) => {
        setPrograms(programs.filter(program => program.key !== programId));
        message.success('Program deleted successfully');
    };

    const handleModalOk = () => {
        form.validateFields().then(values => {
            if (editingProgram) {
                setPrograms(programs.map(program => 
                    program.key === editingProgram.key 
                        ? { ...program, ...values }
                        : program
                ));
                message.success('Program updated successfully');
            } else {
                const newProgram = {
                    key: Date.now().toString(),
                    ...values,
                    enrolledStudents: 0
                };
                setPrograms([...programs, newProgram]);
                message.success('Program added successfully');
            }
            setIsModalVisible(false);
            form.resetFields();
        });
    };

    const columns = [
        {
            title: 'Program Code',
            dataIndex: 'programCode',
            key: 'programCode',
            sorter: (a, b) => a.programCode.localeCompare(b.programCode),
            render: (text) => <span className="font-semibold text-blue-600">{text}</span>
        },
        {
            title: 'Program Name',
            dataIndex: 'programName',
            key: 'programName',
            sorter: (a, b) => a.programName.localeCompare(b.programName),
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
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
            render: (duration) => `${duration} years`,
            sorter: (a, b) => a.duration - b.duration,
        },
        {
            title: 'Credits',
            dataIndex: 'totalCredits',
            key: 'totalCredits',
            sorter: (a, b) => a.totalCredits - b.totalCredits,
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
                        onClick={() => handleEditProgram(record)}
                    />
                    <Popconfirm
                        title="Are you sure you want to delete this program?"
                        onConfirm={() => handleDeleteProgram(record.key)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const filteredPrograms = programs.filter(program => {
        return (
            program.programName.toLowerCase().includes(searchText.toLowerCase()) ||
            program.programCode.toLowerCase().includes(searchText.toLowerCase()) ||
            program.department.toLowerCase().includes(searchText.toLowerCase())
        );
    });

    const activePrograms = programs.filter(p => p.status === 'Active').length;
    const totalEnrollments = programs.reduce((sum, p) => sum + p.enrolledStudents, 0);
    const totalCapacity = programs.reduce((sum, p) => sum + p.maxCapacity, 0);
    const avgEnrollment = totalCapacity > 0 ? Math.round((totalEnrollments / totalCapacity) * 100) : 0;

    return (
        <div className="p-0 bg-gray-50 min-h-screen w-full">
            <div className="p-6 pb-4">
                <h1 className="text-2xl font-bold text-gray-800">Academic Programs</h1>
                <p className="text-gray-600">Manage university degree programs and academic offerings</p>
            </div>

            <div className="px-6">
                {/* Stats Cards */}
                <Row gutter={[16, 16]} className="mb-6">
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic title="Total Programs" value={programs.length} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic title="Active Programs" value={activePrograms} valueStyle={{ color: '#52c41a' }} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic title="Total Students" value={totalEnrollments} />
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
                                placeholder="Search programs..."
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
                                <Button type="primary" icon={<PlusOutlined />} onClick={handleAddProgram}>
                                    Add Program
                                </Button>
                                <Button icon={<ExportOutlined />}>Export</Button>
                                <Button icon={<ImportOutlined />}>Import</Button>
                            </Space>
                        </Col>
                    </Row>
                </Card>

                {/* Programs Table */}
                <Card>
                    <Table
                        columns={columns}
                        dataSource={filteredPrograms}
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} programs`,
                        }}
                        scroll={{ x: 1200 }}
                    />
                </Card>
            </div>

            {/* Add/Edit Program Modal */}
            <Modal
                title={editingProgram ? 'Edit Program' : 'Add New Program'}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={() => setIsModalVisible(false)}
                width={700}
            >
                <Form form={form} layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="programCode" label="Program Code" rules={[{ required: true }]}>
                                <Input placeholder="BSC-CS" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="programName" label="Program Name" rules={[{ required: true }]}>
                                <Input placeholder="Bachelor of Science in Computer Science" />
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
                            <Form.Item name="duration" label="Duration (Years)" rules={[{ required: true }]}>
                                <InputNumber min={1} max={8} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="totalCredits" label="Total Credits" rules={[{ required: true }]}>
                                <InputNumber min={30} max={300} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="maxCapacity" label="Max Capacity" rules={[{ required: true }]}>
                                <InputNumber min={10} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
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
                        <TextArea rows={3} placeholder="Program description..." />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Programs;