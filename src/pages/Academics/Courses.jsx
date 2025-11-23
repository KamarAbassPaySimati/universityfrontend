import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Card, Input, message, Tag } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/academics/courses/detailed`);
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      message.error('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Course Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Course Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Students',
      dataIndex: 'studentCount',
      key: 'studentCount',
      render: (count) => <Tag color="blue">{count}</Tag>
    },
    {
      title: 'Avg Grade',
      dataIndex: 'averageGrade',
      key: 'averageGrade',
      render: (grade) => (
        <Tag color={grade >= 70 ? 'green' : grade >= 60 ? 'orange' : 'red'}>
          {grade}%
        </Tag>
      )
    },
    {
      title: 'Program',
      dataIndex: 'program',
      key: 'program',
    },
    {
      title: 'Faculty',
      dataIndex: 'faculty',
      key: 'faculty',
    },
    {
      title: 'Semester',
      dataIndex: 'semester',
      key: 'semester',
      render: (semester) => <Tag color="green">{semester}</Tag>
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

  const filteredCourses = courses.filter(course =>
    course.name?.toLowerCase().includes(searchText.toLowerCase()) ||
    course.code?.toLowerCase().includes(searchText.toLowerCase()) ||
    course.program?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <Card className="h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Course Management</h2>
          <Button type="primary" icon={<PlusOutlined />}>
            Add Course
          </Button>
        </div>
        
        <div className="mb-4">
          <Input
            placeholder="Search courses..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredCourses}
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

export default Courses;