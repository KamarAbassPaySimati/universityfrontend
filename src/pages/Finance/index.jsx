import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Table, Button, Tag, DatePicker, Select, Statistic, Row, Col } from 'antd';
import { DollarOutlined, CreditCardOutlined, BankOutlined, FileTextOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { Option } = Select;

const Finance = () => {
    const location = useLocation();
    const [selectedDateRange, setSelectedDateRange] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('all');

    // Mock data for financial records
    const mockTransactions = [
        {
            key: '1',
            id: 'TXN001',
            studentId: 'STU001',
            studentName: 'John Doe',
            type: 'Tuition Fee',
            amount: 5000,
            status: 'paid',
            date: '2024-01-15',
            semester: 'Spring 2024'
        },
        {
            key: '2',
            id: 'TXN002',
            studentId: 'STU002',
            studentName: 'Jane Smith',
            type: 'Library Fee',
            amount: 150,
            status: 'pending',
            date: '2024-01-14',
            semester: 'Spring 2024'
        },
        {
            key: '3',
            id: 'TXN003',
            studentId: 'STU003',
            studentName: 'Mike Johnson',
            type: 'Lab Fee',
            amount: 300,
            status: 'overdue',
            date: '2024-01-10',
            semester: 'Spring 2024'
        }
    ];

    // Mock data for student fee payments
    const mockStudentFees = [
        {
            key: '1',
            studentId: 'STU001',
            studentName: 'John Doe',
            program: 'Computer Science',
            totalFees: 8000,
            paidAmount: 8000,
            paymentPercentage: 100,
            semester: 'Spring 2024'
        },
        {
            key: '2',
            studentId: 'STU002',
            studentName: 'Jane Smith',
            program: 'Business Administration',
            totalFees: 7500,
            paidAmount: 5625,
            paymentPercentage: 75,
            semester: 'Spring 2024'
        },
        {
            key: '3',
            studentId: 'STU003',
            studentName: 'Mike Johnson',
            program: 'Engineering',
            totalFees: 9000,
            paidAmount: 4500,
            paymentPercentage: 50,
            semester: 'Spring 2024'
        },
        {
            key: '4',
            studentId: 'STU004',
            studentName: 'Sarah Wilson',
            program: 'Medicine',
            totalFees: 12000,
            paidAmount: 3000,
            paymentPercentage: 25,
            semester: 'Spring 2024'
        },
        {
            key: '5',
            studentId: 'STU005',
            studentName: 'David Brown',
            program: 'Law',
            totalFees: 10000,
            paidAmount: 0,
            paymentPercentage: 0,
            semester: 'Spring 2024'
        }
    ];

    const columns = [
        {
            title: 'Transaction ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Student',
            dataIndex: 'studentName',
            key: 'studentName',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => `$${amount.toLocaleString()}`,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                const colors = {
                    paid: 'green',
                    pending: 'orange',
                    overdue: 'red'
                };
                return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: () => (
                <Button type="link" size="small">
                    View Details
                </Button>
            ),
        },
    ];

    const getPageContent = () => {
        const path = location.pathname;
        
        if (path.includes('fee-management')) {
            const feeColumns = [
                {
                    title: 'Student ID',
                    dataIndex: 'studentId',
                    key: 'studentId',
                },
                {
                    title: 'Student Name',
                    dataIndex: 'studentName',
                    key: 'studentName',
                },
                {
                    title: 'Program',
                    dataIndex: 'program',
                    key: 'program',
                },
                {
                    title: 'Total Fees',
                    dataIndex: 'totalFees',
                    key: 'totalFees',
                    render: (amount) => `$${amount.toLocaleString()}`,
                },
                {
                    title: 'Paid Amount',
                    dataIndex: 'paidAmount',
                    key: 'paidAmount',
                    render: (amount) => `$${amount.toLocaleString()}`,
                },
                {
                    title: 'Payment Status',
                    dataIndex: 'paymentPercentage',
                    key: 'paymentPercentage',
                    render: (percentage) => {
                        const getColor = (pct) => {
                            if (pct === 100) return 'green';
                            if (pct >= 75) return 'blue';
                            if (pct >= 50) return 'orange';
                            if (pct >= 25) return 'yellow';
                            return 'red';
                        };
                        return <Tag color={getColor(percentage)}>{percentage}% Paid</Tag>;
                    },
                },
                {
                    title: 'Actions',
                    key: 'actions',
                    render: () => (
                        <Button type="link" size="small">
                            View Details
                        </Button>
                    ),
                },
            ];

            return (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Fee Management</h2>
                    
                    <Row gutter={16} className="mb-6">
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="100% Paid"
                                    value={mockStudentFees.filter(s => s.paymentPercentage === 100).length}
                                    suffix="Students"
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="75% Paid"
                                    value={mockStudentFees.filter(s => s.paymentPercentage === 75).length}
                                    suffix="Students"
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="50% Paid"
                                    value={mockStudentFees.filter(s => s.paymentPercentage === 50).length}
                                    suffix="Students"
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="25% Paid"
                                    value={mockStudentFees.filter(s => s.paymentPercentage === 25).length}
                                    suffix="Students"
                                />
                            </Card>
                        </Col>
                    </Row>

                    <Card>
                        <div className="mb-4 flex gap-4">
                            <Select defaultValue="all" style={{ width: 150 }} onChange={setSelectedStatus}>
                                <Option value="all">All Students</Option>
                                <Option value="100">100% Paid</Option>
                                <Option value="75">75% Paid</Option>
                                <Option value="50">50% Paid</Option>
                                <Option value="25">25% Paid</Option>
                                <Option value="0">Not Paid</Option>
                            </Select>
                            <Button type="primary">Generate Invoice</Button>
                            <Button>Export Report</Button>
                        </div>
                        <Table 
                            columns={feeColumns} 
                            dataSource={mockStudentFees.filter(student => 
                                selectedStatus === 'all' || student.paymentPercentage.toString() === selectedStatus
                            )}
                            pagination={{ pageSize: 10 }}
                        />
                    </Card>
                </div>
            );
        }
        
        if (path.includes('scholarships')) {
            return (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Scholarships</h2>
                    <Card>
                        <p>Scholarship management system coming soon...</p>
                    </Card>
                </div>
            );
        }
        
        if (path.includes('budgets')) {
            return (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Budget Management</h2>
                    <Card>
                        <p>Budget management system coming soon...</p>
                    </Card>
                </div>
            );
        }
        
        if (path.includes('reports')) {
            return (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Financial Reports</h2>
                    <Card>
                        <p>Financial reporting system coming soon...</p>
                    </Card>
                </div>
            );
        }

        // Default Finance Overview
        return (
            <div>
                <h2 className="text-xl font-semibold mb-4">Finance Overview</h2>
                <Row gutter={16} className="mb-6">
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Total Revenue"
                                value={125000}
                                prefix={<DollarOutlined />}
                                suffix="USD"
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Pending Payments"
                                value={15000}
                                prefix={<CreditCardOutlined />}
                                suffix="USD"
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Scholarships Awarded"
                                value={45000}
                                prefix={<BankOutlined />}
                                suffix="USD"
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Outstanding Fees"
                                value={8500}
                                prefix={<FileTextOutlined />}
                                suffix="USD"
                            />
                        </Card>
                    </Col>
                </Row>
                
                <Card title="Recent Transactions">
                    <Table 
                        columns={columns} 
                        dataSource={mockTransactions}
                        pagination={false}
                        size="small"
                    />
                </Card>
            </div>
        );
    };

    return (
        <div className="flex-1 p-6 bg-gray-50">
            {getPageContent()}
        </div>
    );
};

export default Finance;