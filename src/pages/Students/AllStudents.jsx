import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Card, Input, message } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ApiService from '../../services/api';

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/students`);
      const data = await response.json();
      console.log('Students API Response:', data);
      
      if (!Array.isArray(data)) {
        console.error('Data is not an array:', data);
        message.error('Invalid data format received');
        setStudents([]);
        return;
      }
      
      if (data.length === 0) {
        message.info('No student records found');
        setStudents([]);
        return;
      }
      
      // Data is already in the correct format from the API
      setStudents(data.map(student => ({
        ...student,
        id: student._id || student.id,
        key: student._id || student.id
      })));
    } catch (error) {
      console.error('Fetch error:', error);
      message.error('Failed to fetch students');
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Student ID',
      dataIndex: 'student_id',
      key: 'student_id',
    },
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Academic Year',
      dataIndex: 'academic_year',
      key: 'academic_year',
    },
    {
      title: 'Program',
      dataIndex: 'program_name',
      key: 'program_name',
    },
    {
      title: 'Year of Study',
      dataIndex: 'enrollment_year',
      key: 'enrollment_year',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span className={`px-2 py-1 rounded text-xs ${status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {status}
        </span>
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

  const filteredStudents = students.filter(student =>
    student.full_name?.toLowerCase().includes(searchText.toLowerCase()) ||
    student.student_id?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <Card className="h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">All Students</h2>
          <Button type="primary" icon={<PlusOutlined />}>
            Add Student
          </Button>
        </div>
        
        <div className="mb-4">
          <Input
            placeholder="Search students..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredStudents}
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

export default AllStudents;