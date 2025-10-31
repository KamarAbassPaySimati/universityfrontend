import React, { useState } from 'react';
import { 
    Table, 
    Input, 
    Button, 
    Select, 
    Card, 
    Row, 
    Col, 
    Statistic,
    Tag,
    Progress,
    Modal,
    Descriptions,
    Badge
} from 'antd';
import {
    SearchOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    ExclamationCircleOutlined,
    EyeOutlined
} from '@ant-design/icons';

const { Option } = Select;

const Clearance = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedProgram, setSelectedProgram] = useState('all');
    const [selectedYear, setSelectedYear] = useState('all');
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const students = [
        {
            key: '1',
            studentId: 'STU001',
            studentName: 'John Smith',
            program: 'Computer Science',
            year: 4,
            totalCredits: 120,
            completedCredits: 118,
            requiredCredits: 120,
            cgpa: 3.8,
            libraryCleared: true,
            feesCleared: true,
            hostelCleared: true,
            labCleared: false,
            projectCompleted: true,
            internshipCompleted: true,
            clearanceStatus: 'Pending',
            graduationEligible: false
        },
        {
            key: '2',
            studentId: 'STU002',
            studentName: 'Sarah Johnson',
            program: 'Computer Science',
            year: 4,
            totalCredits: 120,
            completedCredits: 120,
            requiredCredits: 120,
            cgpa: 3.9,
            libraryCleared: true,
            feesCleared: true,
            hostelCleared: true,
            labCleared: true,
            projectCompleted: true,
            internshipCompleted: true,
            clearanceStatus: 'Cleared',
            graduationEligible: true
        },
        {
            key: '3',
            studentId: 'STU003',
            studentName: 'Michael Brown',
            program: 'Mechanical Engineering',
            year: 4,
            totalCredits: 128,
            completedCredits: 125,
            requiredCredits: 128,
            cgpa: 3.2,
            libraryCleared: false,
            feesCleared: true,
            hostelCleared: true,
            labCleared: true,
            projectCompleted: false,
            internshipCompleted: true,
            clearanceStatus: 'Pending',
            graduationEligible: false
        },
        {
            key: '4',
            studentId: 'STU004',
            studentName: 'Emily Davis',
            program: 'Business Administration',
            year: 4,
            totalCredits: 120,
            completedCredits: 120,
            requiredCredits: 120,
            cgpa: 3.7,
            libraryCleared: true,
            feesCleared: true,
            hostelCleared: true,
            labCleared: true,
            projectCompleted: true,
            internshipCompleted: true,
            clearanceStatus: 'Cleared',
            graduationEligible: true
        }
    ];

    const programs = ['Computer Science', 'Mechanical Engineering', 'Business Administration', 'Electrical Engineering'];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Cleared': return 'success';
            case 'Pending': return 'warning';
            case 'Blocked': return 'error';
            default: return 'default';
        }
    };

    const getCompletionPercentage = (completed, required) => {
        return Math.round((completed / required) * 100);
    };

    const showDetails = (student) => {
        setSelectedStudent(student);
        setDetailsVisible(true);
    };

    const columns = [
        {
            title: 'Student ID',
            dataIndex: 'studentId',
            key: 'studentId',
            width: 100
        },
        {
            title: 'Student Name',
            dataIndex: 'studentName',
            key: 'studentName',
            width: 150
        },
        {
            title: 'Program',
            dataIndex: 'program',
            key: 'program',
            width: 150
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
            width: 80,
            render: (year) => <Tag color="blue">{year}</Tag>
        },
        {
            title: 'Credits',
            key: 'credits',
            width: 120,
            render: (_, record) => (
                <div>
                    <div className="text-sm font-semibold">
                        {record.completedCredits}/{record.requiredCredits}
                    </div>
                    <Progress 
                        percent={getCompletionPercentage(record.completedCredits, record.requiredCredits)}
                        size="small"
                        showInfo={false}
                    />
                </div>
            )
        },
        {
            title: 'CGPA',
            dataIndex: 'cgpa',
            key: 'cgpa',
            width: 80,
            render: (cgpa) => (
                <span className={cgpa >= 3.5 ? 'text-green-600 font-semibold' : cgpa >= 3.0 ? 'text-blue-600 font-semibold' : 'text-red-600 font-semibold'}>
                    {cgpa}
                </span>
            )
        },
        {
            title: 'Clearance Status',
            dataIndex: 'clearanceStatus',
            key: 'clearanceStatus',
            width: 120,
            render: (status) => (
                <Tag color={getStatusColor(status)} icon={
                    status === 'Cleared' ? <CheckCircleOutlined /> : 
                    status === 'Pending' ? <ClockCircleOutlined /> : 
                    <ExclamationCircleOutlined />
                }>
                    {status}
                </Tag>
            )
        },
        {
            title: 'Graduation Eligible',
            dataIndex: 'graduationEligible',
            key: 'graduationEligible',
            width: 120,
            render: (eligible) => (
                <Badge 
                    status={eligible ? 'success' : 'error'} 
                    text={eligible ? 'Yes' : 'No'}
                />
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 100,
            render: (_, record) => (
                <Button 
                    type="link" 
                    icon={<EyeOutlined />}
                    onClick={() => showDetails(record)}
                >
                    Details
                </Button>
            )
        }
    ];

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.studentName.toLowerCase().includes(searchText.toLowerCase()) ||
                            student.studentId.toLowerCase().includes(searchText.toLowerCase());
        const matchesProgram = selectedProgram === 'all' || student.program === selectedProgram;
        const matchesYear = selectedYear === 'all' || student.year.toString() === selectedYear;
        
        return matchesSearch && matchesProgram && matchesYear;
    });

    const clearedCount = students.filter(s => s.clearanceStatus === 'Cleared').length;
    const pendingCount = students.filter(s => s.clearanceStatus === 'Pending').length;
    const eligibleCount = students.filter(s => s.graduationEligible).length;

    return (
        <div className="p-0 bg-gray-50 min-h-screen w-full">
            <div className="p-6 pb-4">
                <h1 className="text-2xl font-bold text-gray-800">Student Clearance</h1>
                <p className="text-gray-600">Track graduation requirements and clearance status</p>
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
                            <Statistic 
                                title="Cleared" 
                                value={clearedCount} 
                                valueStyle={{ color: '#52c41a' }}
                                prefix={<CheckCircleOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic 
                                title="Pending" 
                                value={pendingCount} 
                                valueStyle={{ color: '#faad14' }}
                                prefix={<ClockCircleOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic 
                                title="Graduation Eligible" 
                                value={eligibleCount} 
                                valueStyle={{ color: '#1890ff' }}
                            />
                        </Card>
                    </Col>
                </Row>

                {/* Filters */}
                <Card className="mb-6">
                    <Row gutter={[16, 16]} align="middle">
                        <Col xs={24} sm={6}>
                            <Input
                                placeholder="Search students..."
                                prefix={<SearchOutlined />}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </Col>
                        <Col xs={24} sm={6}>
                            <Select
                                value={selectedProgram}
                                onChange={setSelectedProgram}
                                style={{ width: '100%' }}
                            >
                                <Option value="all">All Programs</Option>
                                {programs.map(program => (
                                    <Option key={program} value={program}>{program}</Option>
                                ))}
                            </Select>
                        </Col>
                        <Col xs={24} sm={6}>
                            <Select
                                value={selectedYear}
                                onChange={setSelectedYear}
                                style={{ width: '100%' }}
                            >
                                <Option value="all">All Years</Option>
                                <Option value="1">Year 1</Option>
                                <Option value="2">Year 2</Option>
                                <Option value="3">Year 3</Option>
                                <Option value="4">Year 4</Option>
                            </Select>
                        </Col>
                    </Row>
                </Card>

                {/* Students Table */}
                <Card title="Student Clearance Status">
                    <Table
                        columns={columns}
                        dataSource={filteredStudents}
                        pagination={{
                            pageSize: 20,
                            showSizeChanger: true,
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} students`,
                        }}
                        scroll={{ x: 1000 }}
                        size="small"
                    />
                </Card>
            </div>

            {/* Details Modal */}
            <Modal
                title={`Clearance Details - ${selectedStudent?.studentName}`}
                open={detailsVisible}
                onCancel={() => setDetailsVisible(false)}
                footer={null}
                width={600}
            >
                {selectedStudent && (
                    <div>
                        <Descriptions bordered size="small" column={2}>
                            <Descriptions.Item label="Student ID">{selectedStudent.studentId}</Descriptions.Item>
                            <Descriptions.Item label="Program">{selectedStudent.program}</Descriptions.Item>
                            <Descriptions.Item label="Year">{selectedStudent.year}</Descriptions.Item>
                            <Descriptions.Item label="CGPA">{selectedStudent.cgpa}</Descriptions.Item>
                            <Descriptions.Item label="Credits Completed">{selectedStudent.completedCredits}/{selectedStudent.requiredCredits}</Descriptions.Item>
                            <Descriptions.Item label="Credit Progress">
                                <Progress percent={getCompletionPercentage(selectedStudent.completedCredits, selectedStudent.requiredCredits)} size="small" />
                            </Descriptions.Item>
                        </Descriptions>

                        <div className="mt-4">
                            <h4 className="font-semibold mb-3">Clearance Requirements</h4>
                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <div className="flex items-center justify-between p-2 border rounded">
                                        <span>Library Clearance</span>
                                        <Badge status={selectedStudent.libraryCleared ? 'success' : 'error'} text={selectedStudent.libraryCleared ? 'Cleared' : 'Pending'} />
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="flex items-center justify-between p-2 border rounded">
                                        <span>Fees Clearance</span>
                                        <Badge status={selectedStudent.feesCleared ? 'success' : 'error'} text={selectedStudent.feesCleared ? 'Cleared' : 'Pending'} />
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="flex items-center justify-between p-2 border rounded">
                                        <span>Hostel Clearance</span>
                                        <Badge status={selectedStudent.hostelCleared ? 'success' : 'error'} text={selectedStudent.hostelCleared ? 'Cleared' : 'Pending'} />
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="flex items-center justify-between p-2 border rounded">
                                        <span>Lab Clearance</span>
                                        <Badge status={selectedStudent.labCleared ? 'success' : 'error'} text={selectedStudent.labCleared ? 'Cleared' : 'Pending'} />
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="flex items-center justify-between p-2 border rounded">
                                        <span>Project Completed</span>
                                        <Badge status={selectedStudent.projectCompleted ? 'success' : 'error'} text={selectedStudent.projectCompleted ? 'Yes' : 'No'} />
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="flex items-center justify-between p-2 border rounded">
                                        <span>Internship Completed</span>
                                        <Badge status={selectedStudent.internshipCompleted ? 'success' : 'error'} text={selectedStudent.internshipCompleted ? 'Yes' : 'No'} />
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        <div className="mt-4 p-3 bg-gray-50 rounded">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold">Overall Status:</span>
                                <Tag color={getStatusColor(selectedStudent.clearanceStatus)} size="large">
                                    {selectedStudent.clearanceStatus}
                                </Tag>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <span className="font-semibold">Graduation Eligible:</span>
                                <Badge 
                                    status={selectedStudent.graduationEligible ? 'success' : 'error'} 
                                    text={selectedStudent.graduationEligible ? 'Yes' : 'No'}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Clearance;