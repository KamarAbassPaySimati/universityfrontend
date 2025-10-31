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
    Popconfirm,
    Upload
} from 'antd';
import {
    SearchOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    ExportOutlined,
    ImportOutlined,
    UserOutlined,
    CheckOutlined,
    CloseOutlined,
    EyeOutlined,
    UploadOutlined
} from '@ant-design/icons';

const { Option } = Select;

const Admissions = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedProgram, setSelectedProgram] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingApplication, setEditingApplication] = useState(null);
    const [form] = Form.useForm();

    // Mock admission applications data
    const [applications, setApplications] = useState([
        {
            key: '1',
            applicationId: 'APP001',
            name: 'Alice Johnson',
            email: 'alice.johnson@email.com',
            phone: '+1234567890',
            program: 'Bachelor of Science',
            department: 'Computer Science',
            applicationDate: '2024-01-15',
            status: 'Pending',
            gpa: 3.8,
            testScore: 1450,
            documents: ['Transcript', 'Essay', 'Recommendation']
        },
        {
            key: '2',
            applicationId: 'APP002',
            name: 'Robert Chen',
            email: 'robert.chen@email.com',
            phone: '+1234567891',
            program: 'Bachelor of Engineering',
            department: 'Engineering',
            applicationDate: '2024-01-12',
            status: 'Approved',
            gpa: 3.9,
            testScore: 1520,
            documents: ['Transcript', 'Essay', 'Recommendation', 'Portfolio']
        },
        {
            key: '3',
            applicationId: 'APP003',
            name: 'Maria Garcia',
            email: 'maria.garcia@email.com',
            phone: '+1234567892',
            program: 'Master of Business Administration',
            department: 'Business',
            applicationDate: '2024-01-10',
            status: 'Rejected',
            gpa: 3.2,
            testScore: 1200,
            documents: ['Transcript', 'Essay']
        },
        {
            key: '4',
            applicationId: 'APP004',
            name: 'James Wilson',
            email: 'james.wilson@email.com',
            phone: '+1234567893',
            program: 'Doctor of Medicine',
            department: 'Medicine',
            applicationDate: '2024-01-08',
            status: 'Under Review',
            gpa: 3.95,
            testScore: 1580,
            documents: ['Transcript', 'Essay', 'Recommendation', 'Research Papers']
        }
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'orange';
            case 'Under Review': return 'blue';
            case 'Approved': return 'green';
            case 'Rejected': return 'red';
            default: return 'default';
        }
    };

    const handleApprove = (applicationId) => {
        setApplications(applications.map(app => 
            app.key === applicationId ? { ...app, status: 'Approved' } : app
        ));
        message.success('Application approved successfully');
    };

    const handleReject = (applicationId) => {
        setApplications(applications.map(app => 
            app.key === applicationId ? { ...app, status: 'Rejected' } : app
        ));
        message.success('Application rejected');
    };

    const handleViewApplication = (application) => {
        setEditingApplication(application);
        form.setFieldsValue(application);
        setIsModalVisible(true);
    };

    const columns = [
        {
            title: 'Application ID',
            dataIndex: 'applicationId',
            key: 'applicationId',
            sorter: (a, b) => a.applicationId.localeCompare(b.applicationId),
        },
        {
            title: 'Applicant',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Space>
                    <Avatar icon={<UserOutlined />} />
                    <div>
                        <div>{text}</div>
                        <div className="text-xs text-gray-500">{record.email}</div>
                    </div>
                </Space>
            ),
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Program',
            dataIndex: 'program',
            key: 'program',
            filters: [
                { text: 'Bachelor of Science', value: 'Bachelor of Science' },
                { text: 'Bachelor of Engineering', value: 'Bachelor of Engineering' },
                { text: 'Bachelor of Arts', value: 'Bachelor of Arts' },
                { text: 'Master of Business Administration', value: 'Master of Business Administration' },
                { text: 'Doctor of Medicine', value: 'Doctor of Medicine' },
            ],
            onFilter: (value, record) => record.program === value,
        },
        {
            title: 'GPA',
            dataIndex: 'gpa',
            key: 'gpa',
            sorter: (a, b) => a.gpa - b.gpa,
            render: (gpa) => <span className={gpa >= 3.5 ? 'text-green-600 font-semibold' : ''}>{gpa}</span>
        },
        {
            title: 'Test Score',
            dataIndex: 'testScore',
            key: 'testScore',
            sorter: (a, b) => a.testScore - b.testScore,
            render: (score) => <span className={score >= 1400 ? 'text-green-600 font-semibold' : ''}>{score}</span>
        },
        {
            title: 'Application Date',
            dataIndex: 'applicationDate',
            key: 'applicationDate',
            sorter: (a, b) => new Date(a.applicationDate) - new Date(b.applicationDate),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={getStatusColor(status)}>{status}</Tag>
            ),
            filters: [
                { text: 'Pending', value: 'Pending' },
                { text: 'Under Review', value: 'Under Review' },
                { text: 'Approved', value: 'Approved' },
                { text: 'Rejected', value: 'Rejected' },
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
                        icon={<EyeOutlined />} 
                        onClick={() => handleViewApplication(record)}
                        title="View Details"
                    />
                    {record.status === 'Pending' && (
                        <>
                            <Button 
                                type="link" 
                                icon={<CheckOutlined />} 
                                onClick={() => handleApprove(record.key)}
                                className="text-green-600"
                                title="Approve"
                            />
                            <Button 
                                type="link" 
                                icon={<CloseOutlined />} 
                                onClick={() => handleReject(record.key)}
                                className="text-red-600"
                                title="Reject"
                            />
                        </>
                    )}
                </Space>
            ),
        },
    ];

    const filteredApplications = applications.filter(app => {
        return (
            app.name.toLowerCase().includes(searchText.toLowerCase()) ||
            app.applicationId.toLowerCase().includes(searchText.toLowerCase()) ||
            app.email.toLowerCase().includes(searchText.toLowerCase())
        );
    });

    const pendingCount = applications.filter(a => a.status === 'Pending').length;
    const approvedCount = applications.filter(a => a.status === 'Approved').length;
    const rejectedCount = applications.filter(a => a.status === 'Rejected').length;
    const underReviewCount = applications.filter(a => a.status === 'Under Review').length;

    return (
        <div className="p-0 bg-gray-50 min-h-screen w-full">
            <div className="p-6 pb-4">
                <h1 className="text-2xl font-bold text-gray-800">Admissions</h1>
                <p className="text-gray-600">Manage student admission applications</p>
            </div>

            <div className="px-6">
                {/* Stats Cards */}
                <Row gutter={[16, 16]} className="mb-6">
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic title="Total Applications" value={applications.length} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic title="Pending" value={pendingCount} valueStyle={{ color: '#faad14' }} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic title="Approved" value={approvedCount} valueStyle={{ color: '#52c41a' }} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic title="Under Review" value={underReviewCount} valueStyle={{ color: '#1890ff' }} />
                        </Card>
                    </Col>
                </Row>

                {/* Search and Filters */}
                <Card className="mb-6">
                    <Row gutter={[16, 16]} align="middle">
                        <Col xs={24} sm={8}>
                            <Input
                                placeholder="Search applications..."
                                prefix={<SearchOutlined />}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </Col>
                        <Col xs={24} sm={4}>
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
                        <Col xs={24} sm={4}>
                            <Select
                                placeholder="Status"
                                style={{ width: '100%' }}
                                value={selectedStatus}
                                onChange={setSelectedStatus}
                                allowClear
                            >
                                <Option value="Pending">Pending</Option>
                                <Option value="Under Review">Under Review</Option>
                                <Option value="Approved">Approved</Option>
                                <Option value="Rejected">Rejected</Option>
                            </Select>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Space>
                                <Button type="primary" icon={<PlusOutlined />}>
                                    New Application
                                </Button>
                                <Button icon={<ExportOutlined />}>Export</Button>
                                <Button icon={<ImportOutlined />}>Import</Button>
                            </Space>
                        </Col>
                    </Row>
                </Card>

                {/* Applications Table */}
                <Card>
                    <Table
                        columns={columns}
                        dataSource={filteredApplications}
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} applications`,
                        }}
                        scroll={{ x: 1200 }}
                    />
                </Card>
            </div>

            {/* View Application Modal */}
            <Modal
                title="Application Details"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setIsModalVisible(false)}>
                        Close
                    </Button>,
                    editingApplication?.status === 'Pending' && (
                        <Button key="reject" danger onClick={() => {
                            handleReject(editingApplication.key);
                            setIsModalVisible(false);
                        }}>
                            Reject
                        </Button>
                    ),
                    editingApplication?.status === 'Pending' && (
                        <Button key="approve" type="primary" onClick={() => {
                            handleApprove(editingApplication.key);
                            setIsModalVisible(false);
                        }}>
                            Approve
                        </Button>
                    )
                ]}
                width={700}
            >
                {editingApplication && (
                    <div className="space-y-4">
                        <Row gutter={16}>
                            <Col span={12}>
                                <div><strong>Application ID:</strong> {editingApplication.applicationId}</div>
                            </Col>
                            <Col span={12}>
                                <div><strong>Status:</strong> <Tag color={getStatusColor(editingApplication.status)}>{editingApplication.status}</Tag></div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <div><strong>Name:</strong> {editingApplication.name}</div>
                            </Col>
                            <Col span={12}>
                                <div><strong>Email:</strong> {editingApplication.email}</div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <div><strong>Phone:</strong> {editingApplication.phone}</div>
                            </Col>
                            <Col span={12}>
                                <div><strong>Application Date:</strong> {editingApplication.applicationDate}</div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <div><strong>Program:</strong> {editingApplication.program}</div>
                            </Col>
                            <Col span={12}>
                                <div><strong>Department:</strong> {editingApplication.department}</div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <div><strong>GPA:</strong> <span className={editingApplication.gpa >= 3.5 ? 'text-green-600 font-semibold' : ''}>{editingApplication.gpa}</span></div>
                            </Col>
                            <Col span={12}>
                                <div><strong>Test Score:</strong> <span className={editingApplication.testScore >= 1400 ? 'text-green-600 font-semibold' : ''}>{editingApplication.testScore}</span></div>
                            </Col>
                        </Row>
                        <div>
                            <strong>Documents Submitted:</strong>
                            <div className="mt-2">
                                {editingApplication.documents.map((doc, index) => (
                                    <Tag key={index} className="mb-1">{doc}</Tag>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Admissions;