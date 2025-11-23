import React from 'react';
import { Card, Row, Col, Table, Button, Tag, Space } from 'antd';
import { UserOutlined, SettingOutlined, FileTextOutlined, PlusOutlined } from '@ant-design/icons';

const Administration = () => {
  const systemUsers = [
    { id: 1, username: 'admin', email: 'admin@university.edu', role: 'Super Admin', status: 'Active', lastLogin: '2024-01-15 10:30' },
    { id: 2, username: 'registrar', email: 'registrar@university.edu', role: 'Admin', status: 'Active', lastLogin: '2024-01-15 09:15' },
    { id: 3, username: 'faculty_head', email: 'head@university.edu', role: 'Faculty Admin', status: 'Active', lastLogin: '2024-01-14 16:45' }
  ];

  const columns = [
    { title: 'Username', dataIndex: 'username', key: 'username' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { 
      title: 'Role', 
      dataIndex: 'role', 
      key: 'role',
      render: (role) => <Tag color="blue">{role}</Tag>
    },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: (status) => <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>
    },
    { title: 'Last Login', dataIndex: 'lastLogin', key: 'lastLogin' },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button size="small">Edit</Button>
          <Button size="small" danger>Disable</Button>
        </Space>
      )
    }
  ];

  const systemSettings = [
    { setting: 'Academic Year', value: '2024-2025', status: 'Active' },
    { setting: 'Registration Period', value: 'Jan 1 - Feb 15', status: 'Open' },
    { setting: 'Grade Submission Deadline', value: 'May 30, 2024', status: 'Upcoming' },
    { setting: 'System Maintenance', value: 'Every Sunday 2:00 AM', status: 'Scheduled' }
  ];

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">System Administration</h1>
      
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={16}>
          <Card 
            title="System Users" 
            extra={<Button type="primary" icon={<PlusOutlined />}>Add User</Button>}
          >
            <Table
              columns={columns}
              dataSource={systemUsers}
              rowKey="id"
              pagination={false}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Quick Actions" className="mb-4">
            <div className="space-y-2">
              <Button block icon={<UserOutlined />}>User Management</Button>
              <Button block icon={<SettingOutlined />}>System Settings</Button>
              <Button block icon={<FileTextOutlined />}>System Reports</Button>
            </div>
          </Card>
          
          <Card title="System Settings">
            <div className="space-y-3">
              {systemSettings.map((setting, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{setting.setting}</div>
                    <div className="text-sm text-gray-500">{setting.value}</div>
                  </div>
                  <Tag color="blue">{setting.status}</Tag>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Administration;