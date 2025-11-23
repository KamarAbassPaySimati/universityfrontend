import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Select, Input, Modal, Descriptions, Divider, Row, Col } from 'antd';
import { SearchOutlined, FileTextOutlined, DownloadOutlined, PrinterOutlined } from '@ant-design/icons';

const { Option } = Select;

const Transcripts = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [transcriptVisible, setTranscriptVisible] = useState(false);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTranscripts();
    }, []);

    const fetchTranscripts = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/academics/transcripts`);
            const data = await response.json();
            
            console.log('Transcripts response:', data);
            
            if (data.error) {
                console.error('API Error:', data.error);
                setStudents([]);
                return;
            }
            
            if (Array.isArray(data)) {
                setStudents(data.map(student => ({
                    key: student.id.toString(),
                    studentId: student.studentId,
                    studentName: student.studentName,
                    program: student.program,
                    year: student.year,
                    cumulativeGPA: student.cumulativeGPA,
                    totalCredits: student.totalCredits,
                    averageGrade: student.averageGrade,
                    courseCount: student.courseCount,
                    courses: student.courses
                })));
            } else {
                console.error('Data is not an array:', data);
                setStudents([]);
            }
        } catch (error) {
            console.error('Error fetching transcripts:', error);
            setStudents([]);
        } finally {
            setLoading(false);
        }
    };



    const showTranscript = (student) => {
        setSelectedStudent(student);
        setTranscriptVisible(true);
    };

    const generatePDF = () => {
        // PDF generation logic
        console.log('Generating PDF for:', selectedStudent?.studentName);
    };

    const columns = [
        { title: 'Student ID', dataIndex: 'studentId', key: 'studentId' },
        { title: 'Student Name', dataIndex: 'studentName', key: 'studentName' },
        { title: 'Program', dataIndex: 'program', key: 'program' },
        { title: 'Year', dataIndex: 'year', key: 'year' },
        { title: 'Cumulative GPA', dataIndex: 'cumulativeGPA', key: 'cumulativeGPA', render: (gpa) => gpa.toFixed(2) },
        { title: 'Total Credits', dataIndex: 'totalCredits', key: 'totalCredits' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Button type="primary" icon={<FileTextOutlined />} onClick={() => showTranscript(record)}>
                    View Transcript
                </Button>
            )
        }
    ];

    const filteredStudents = students.filter(student =>
        student.studentName.toLowerCase().includes(searchText.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="p-0 bg-gray-50 min-h-screen w-full">
            <div className="p-6 pb-4">
                <h1 className="text-2xl font-bold text-gray-800">Student Transcripts</h1>
                <p className="text-gray-600">Generate and manage official transcripts</p>
            </div>

            <div className="px-6">
                <Card className="mb-6">
                    <Row gutter={[16, 16]} align="middle">
                        <Col xs={24} sm={8}>
                            <Input
                                placeholder="Search students..."
                                prefix={<SearchOutlined />}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </Col>
                    </Row>
                </Card>

                <Card title="Students">
                    <Table
                        columns={columns}
                        dataSource={filteredStudents}
                        loading={loading}
                        pagination={{ pageSize: 20 }}
                    />
                </Card>
            </div>

            <Modal
                title="Official Transcript"
                open={transcriptVisible}
                onCancel={() => setTranscriptVisible(false)}
                width={800}
                footer={[
                    <Button key="print" icon={<PrinterOutlined />}>Print</Button>,
                    <Button key="download" type="primary" icon={<DownloadOutlined />} onClick={generatePDF}>
                        Download PDF
                    </Button>
                ]}
            >
                {selectedStudent && (
                    <div className="transcript-content">
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-bold">UNIVERSITY MANAGEMENT SYSTEM</h2>
                            <h3 className="text-lg">OFFICIAL TRANSCRIPT</h3>
                        </div>

                        <Descriptions bordered size="small" column={2}>
                            <Descriptions.Item label="Student ID">{selectedStudent.studentId}</Descriptions.Item>
                            <Descriptions.Item label="Student Name">{selectedStudent.studentName}</Descriptions.Item>
                            <Descriptions.Item label="Program">{selectedStudent.program}</Descriptions.Item>
                            <Descriptions.Item label="Year">{selectedStudent.year}</Descriptions.Item>
                            <Descriptions.Item label="Cumulative GPA">{selectedStudent.cumulativeGPA}</Descriptions.Item>
                            <Descriptions.Item label="Total Credits">{selectedStudent.totalCredits}</Descriptions.Item>
                        </Descriptions>

                        <Divider>Academic Record</Divider>

                        <div className="mb-4">
                            <h4 className="font-semibold mb-2">Course History</h4>
                            <Table
                                size="small"
                                columns={[
                                    { title: 'Course Code', dataIndex: 'courseCode', key: 'courseCode' },
                                    { title: 'Course Name', dataIndex: 'courseName', key: 'courseName' },
                                    { title: 'Semester', dataIndex: 'semester', key: 'semester' },
                                    { title: 'Academic Year', dataIndex: 'academicYear', key: 'academicYear' },
                                    { title: 'Grade', dataIndex: 'finalGrade', key: 'finalGrade' },
                                    { title: 'Grade Description', dataIndex: 'gradeDescription', key: 'gradeDescription' }
                                ]}
                                dataSource={selectedStudent.courses}
                                pagination={false}
                                summary={() => (
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell colSpan={4}><strong>Summary</strong></Table.Summary.Cell>
                                        <Table.Summary.Cell><strong>Avg: {selectedStudent.averageGrade}%</strong></Table.Summary.Cell>
                                        <Table.Summary.Cell><strong>Courses: {selectedStudent.courseCount}</strong></Table.Summary.Cell>
                                    </Table.Summary.Row>
                                )}
                            />
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Transcripts;