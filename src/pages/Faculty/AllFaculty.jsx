import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Card, Input, message, Tag } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const AllFaculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    setLoading(true);
    try {
      // Mock data for demo
      setFaculty([
        { id: 1, employee_id: 'FAC001', full_name: 'Dr. John Smith', email: 'john.smith@university.edu', department: 'Computer Science', status: 'active' },
        { id: 2, employee_id: 'FAC002', full_name: 'Prof. Sarah Johnson', email: 'sarah.johnson@university.edu', department: 'Mathematics', status: 'active' },
        { id: 3, employee_id: 'FAC003', full_name: 'Dr. Michael Brown', email: 'michael.brown@university.edu', department: 'Engineering', status: 'active' }
      ]);
    } catch (error) {
      message.error('Failed to fetch faculty');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Employee ID',
      dataIndex: 'employee_id',
      key: 'employee_id',
    },
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      key: 'full_name',
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
      render: (department) => <Tag color="blue">{department}</Tag>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} size="small" />
          <Button icon={<DeleteOutlined />} size="small" danger />
        </Space>
      ),
    },
  ];

  const filteredFaculty = faculty.filter(member =>
    member.full_name?.toLowerCase().includes(searchText.toLowerCase()) ||
    member.employee_id?.toLowerCase().includes(searchText.toLowerCase()) ||
    member.department?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <Card className="h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Faculty Members</h2>
          <Button type="primary" icon={<PlusOutlined />}>
            Add Faculty
          </Button>
        </div>
        
        <div className="mb-4">
          <Input
            placeholder="Search faculty..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredFaculty}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </Card>
    </div>
  );
};

export default AllFaculty;