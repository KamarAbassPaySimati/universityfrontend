import React, { useState } from 'react';
import { Card, Table, Button, Modal, Form, Input, Select, Tag, Space, message } from 'antd';
import { EyeOutlined, CheckOutlined, CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

const GradeAppeals = () => {
    const [appeals, setAppeals] = useState([
        {
            key: '1',
            appealId: 'APP001',
            studentId: 'STU001',
            studentName: 'John Smith',
            course: 'CS101',
            currentGrade: 'B',
            requestedGrade: 'A',
            reason: 'Calculation error in final exam',
            status: 'Pending',
            submittedDate: '2024-01-15',
            facultyResponse: null
        },
        {
            key: '2',
            appealId: 'APP002',
            studentId: 'STU002',
            studentName: 'Sarah Johnson',
            course: 'MATH201',
            currentGrade: 'C',
            requestedGrade: 'B',
            reason: 'Missing assignment was submitted on time',
            status: 'Approved',
            submittedDate: '2024-01-10',
            facultyResponse: 'Verified submission timestamp'
        }
    ]);

    const [detailsVisible, setDetailsVisible] = useState(false);
    const [responseVisible, setResponseVisible] = useState(false);
    const [selectedAppeal, setSelectedAppeal] = useState(null);
    const [form] = Form.useForm();

    const showDetails = (appeal) => {
        setSelectedAppeal(appeal);
        setDetailsVisible(true);
    };

    const showResponse = (appeal) => {
        setSelectedAppeal(appeal);
        setResponseVisible(true);
    };

    const handleResponse = (values) => {
        const updatedAppeals = appeals.map(appeal => 
            appeal.key === selectedAppeal.key 
                ? { ...appeal, status: values.decision, facultyResponse: values.response }
                : appeal
        );
        setAppeals(updatedAppeals);
        setResponseVisible(false);
        message.success('Response submitted successfully');
        form.resetFields();
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'success';
            case 'Rejected': return 'error';
            case 'Pending': return 'warning';
            default: return 'default';
        }
    };

    const columns = [
        { title: 'Appeal ID', dataIndex: 'appealId', key: 'appealId' },
        { title: 'Student ID', dataIndex: 'studentId', key: 'studentId' },
        { title: 'Student Name', dataIndex: 'studentName', key: 'studentName' },
        { title: 'Course', dataIndex: 'course', key: 'course' },
        { title: 'Current Grade', dataIndex: 'currentGrade', key: 'currentGrade' },
        { title: 'Requested Grade', dataIndex: 'requestedGrade', key: 'requestedGrade' },
        { title: 'Status', dataIndex: 'status', key: 'status', render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag> },
        { title: 'Submitted Date', dataIndex: 'submittedDate', key: 'submittedDate' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button type="link" icon={<EyeOutlined />} onClick={() => showDetails(record)}>
                        View
                    </Button>
                    {record.status === 'Pending' && (
                        <Button type="primary" size="small" onClick={() => showResponse(record)}>
                            Respond
                        </Button>
                    )}
                </Space>
            )
        }
    ];

    return (
        <div className="p-0 bg-gray-50 min-h-screen w-full">
            <div className="p-6 pb-4">
                <h1 className="text-2xl font-bold text-gray-800">Grade Appeals</h1>
                <p className="text-gray-600">Manage student grade appeal requests</p>
            </div>

            <div className="px-6">
                <Card title="Grade Appeals">
                    <Table
                        columns={columns}
                        dataSource={appeals}
                        pagination={{ pageSize: 20 }}
                    />
                </Card>
            </div>

            <Modal
                title="Appeal Details"
                open={detailsVisible}
                onCancel={() => setDetailsVisible(false)}
                footer={null}
                width={600}
            >
                {selectedAppeal && (
                    <div>
                        <div className="mb-4">
                            <strong>Appeal ID:</strong> {selectedAppeal.appealId}
                        </div>
                        <div className="mb-4">
                            <strong>Student:</strong> {selectedAppeal.studentName} ({selectedAppeal.studentId})
                        </div>
                        <div className="mb-4">
                            <strong>Course:</strong> {selectedAppeal.course}
                        </div>
                        <div className="mb-4">
                            <strong>Grade Change:</strong> {selectedAppeal.currentGrade} → {selectedAppeal.requestedGrade}
                        </div>
                        <div className="mb-4">
                            <strong>Reason:</strong>
                            <div className="mt-2 p-3 bg-gray-50 rounded">{selectedAppeal.reason}</div>
                        </div>
                        {selectedAppeal.facultyResponse && (
                            <div className="mb-4">
                                <strong>Faculty Response:</strong>
                                <div className="mt-2 p-3 bg-blue-50 rounded">{selectedAppeal.facultyResponse}</div>
                            </div>
                        )}
                        <div className="mb-4">
                            <strong>Status:</strong> <Tag color={getStatusColor(selectedAppeal.status)}>{selectedAppeal.status}</Tag>
                        </div>
                    </div>
                )}
            </Modal>

            <Modal
                title="Respond to Appeal"
                open={responseVisible}
                onCancel={() => setResponseVisible(false)}
                footer={null}
                width={600}
            >
                <Form form={form} onFinish={handleResponse} layout="vertical">
                    <Form.Item name="decision" label="Decision" rules={[{ required: true }]}>
                        <Select placeholder="Select decision">
                            <Option value="Approved">Approve</Option>
                            <Option value="Rejected">Reject</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="response" label="Response" rules={[{ required: true }]}>
                        <TextArea rows={4} placeholder="Provide detailed response..." />
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit" icon={<CheckOutlined />}>
                                Submit Response
                            </Button>
                            <Button onClick={() => setResponseVisible(false)}>Cancel</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default GradeAppeals;