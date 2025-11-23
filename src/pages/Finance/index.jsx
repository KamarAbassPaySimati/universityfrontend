import React from 'react';
import { Card, Row, Col, Statistic, Table, Button } from 'antd';
import { DollarOutlined, CreditCardOutlined, BankOutlined, FileTextOutlined } from '@ant-design/icons';

const Finance = () => {
  const financialStats = [
    { title: 'Total Revenue', value: 2450000, prefix: '$', color: 'green' },
    { title: 'Outstanding Fees', value: 125000, prefix: '$', color: 'orange' },
    { title: 'Scholarships Awarded', value: 85000, prefix: '$', color: 'blue' },
    { title: 'Budget Utilization', value: 78.5, suffix: '%', color: 'purple' }
  ];

  const recentTransactions = [
    { id: 1, student: 'John Doe', amount: 5000, type: 'Tuition Fee', status: 'Paid', date: '2024-01-15' },
    { id: 2, student: 'Jane Smith', amount: 3000, type: 'Scholarship', status: 'Processed', date: '2024-01-14' },
    { id: 3, student: 'Mike Johnson', amount: 2500, type: 'Lab Fee', status: 'Pending', date: '2024-01-13' }
  ];

  const columns = [
    { title: 'Student', dataIndex: 'student', key: 'student' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount', render: (amount) => `$${amount}` },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Date', dataIndex: 'date', key: 'date' }
  ];

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Financial Management</h1>
      
      <Row gutter={[16, 16]} className="mb-6">
        {financialStats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                valueStyle={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Recent Transactions">
            <Table
              columns={columns}
              dataSource={recentTransactions}
              rowKey="id"
              pagination={false}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Quick Actions">
            <div className="space-y-2">
              <Button block icon={<DollarOutlined />}>Process Payment</Button>
              <Button block icon={<CreditCardOutlined />}>Generate Invoice</Button>
              <Button block icon={<BankOutlined />}>Scholarship Management</Button>
              <Button block icon={<FileTextOutlined />}>Financial Reports</Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Finance;