import React, { useState } from 'react';
import { Upload, Button, message, Card, Table } from 'antd';
import { UploadOutlined, FileExcelOutlined } from '@ant-design/icons';

const UploadRecords = () => {
  const [uploading, setUploading] = useState(false);
  const [records, setRecords] = useState([]);

  const uploadProps = {
    name: 'file',
    action: `${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/upload/excel`,
    accept: '.xlsx,.xls',
    beforeUpload: (file) => {
      const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                     file.type === 'application/vnd.ms-excel';
      if (!isExcel) {
        message.error('You can only upload Excel files!');
      }
      return isExcel;
    },
    onChange: (info) => {
      if (info.file.status === 'uploading') {
        setUploading(true);
      }
      if (info.file.status === 'done') {
        setUploading(false);
        message.success(`${info.file.name} uploaded successfully`);
        fetchRecords();
      } else if (info.file.status === 'error') {
        setUploading(false);
        message.error(`${info.file.name} upload failed.`);
      }
    },
  };

  const fetchRecords = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/upload/records`);
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      message.error('Failed to fetch records');
    }
  };

  const columns = [
    { title: 'Registration Number', dataIndex: 'registrationNumber', key: 'registrationNumber' },
    { title: 'Student Name', dataIndex: 'studentName', key: 'studentName' },
    { title: 'Year', dataIndex: 'yearOfStudy', key: 'yearOfStudy' },
    { title: 'Academic Year', dataIndex: 'academicYear', key: 'academicYear' },
    { title: 'Semester', dataIndex: 'semester', key: 'semester' },
    { title: 'Course Code', dataIndex: 'courseCode', key: 'courseCode' },
    { title: 'Course Name', dataIndex: 'courseName', key: 'courseName' },
    { title: 'Grade', dataIndex: 'finalGrade', key: 'finalGrade' },
    { title: 'Description', dataIndex: 'gradeDescription', key: 'gradeDescription' }
  ];

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <Card className="mb-6">
        <div className="text-center">
          <FileExcelOutlined className="text-4xl text-green-500 mb-4" />
          <h2 className="text-xl font-semibold mb-4">Upload Student Records</h2>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />} loading={uploading} size="large">
              {uploading ? 'Uploading...' : 'Upload Excel File'}
            </Button>
          </Upload>
          <p className="text-gray-500 mt-2">Upload Excel file with student records</p>
        </div>
      </Card>

      {records.length > 0 && (
        <Card title={`Student Records (${records.length})`}>
          <Table
            columns={columns}
            dataSource={records}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
            scroll={{ x: 1200 }}
          />
        </Card>
      )}
    </div>
  );
};

export default UploadRecords;