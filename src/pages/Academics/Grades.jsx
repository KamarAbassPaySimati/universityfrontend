import React, { useState, useEffect } from 'react';
import { 
    Table, 
    Input, 
    Button, 
    Select, 
    Card, 
    Row, 
    Col, 
    Statistic,
    message,
    InputNumber,
    Progress,
    Tag
} from 'antd';
import {
    SearchOutlined,
    SaveOutlined,
    ExportOutlined,
    TrophyOutlined
} from '@ant-design/icons';

const { Option } = Select;

const Grades = () => {
    const [selectedCourse, setSelectedCourse] = useState('');
    const [searchText, setSearchText] = useState('');
    const [grades, setGrades] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch courses and grades from API
    useEffect(() => {
        fetchCourses();
        fetchGrades();
    }, []);

    useEffect(() => {
        if (selectedCourse) {
            fetchGradesByCourse(selectedCourse);
        } else {
            fetchGrades();
        }
    }, [selectedCourse]);

    const fetchCourses = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/academics/courses/codes`);
            const data = await response.json();
            setCourses(data);
            if (data.length > 0) {
                setSelectedCourse(data[0].code);
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
            message.error('Failed to fetch courses');
        }
    };

    const fetchGrades = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/academics/grades`);
            const data = await response.json();
            setGrades(data.map((grade, index) => ({
                key: grade._id,
                studentId: grade.registrationNumber,
                studentName: grade.studentName ? grade.studentName.trim() : 'Unknown',
                courseCode: grade.courseCode,
                courseName: grade.courseName,
                finalGrade: grade.finalGrade,
                gradeDescription: grade.gradeDescription || 'N/A',
                yearOfStudy: grade.yearOfStudy,
                academicYear: grade.academicYear,
                semester: grade.semester
            })));
        } catch (error) {
            console.error('Error fetching grades:', error);
            message.error('Failed to fetch grades');
        } finally {
            setLoading(false);
        }
    };

    const fetchGradesByCourse = async (courseCode) => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/academics/grades/course/${courseCode}`);
            const data = await response.json();
            setGrades(data.map((grade, index) => ({
                key: grade._id,
                studentId: grade.registrationNumber,
                studentName: grade.studentName ? grade.studentName.trim() : 'Unknown',
                courseCode: grade.courseCode,
                courseName: grade.courseName,
                finalGrade: grade.finalGrade,
                gradeDescription: grade.gradeDescription || 'N/A',
                yearOfStudy: grade.yearOfStudy,
                academicYear: grade.academicYear,
                semester: grade.semester
            })));
        } catch (error) {
            console.error('Error fetching grades by course:', error);
            message.error('Failed to fetch grades');
        } finally {
            setLoading(false);
        }
    };

    // Remove mock data
    const [oldGrades, setOldGrades] = useState([
        {
            key: '1',
            studentId: 'STU001',
            studentName: 'John Smith',
            assignment1: 18,
            assignment2: 16,
            midSem: 17,
            endSem: 45,
            total: 96,
            letterGrade: 'A+',
            gpa: 4.0
        },
        {
            key: '2',
            studentId: 'STU002',
            studentName: 'Sarah Johnson',
            assignment1: 19,
            assignment2: 18,
            midSem: 18,
            endSem: 42,
            total: 97,
            letterGrade: 'A+',
            gpa: 4.0
        },
        {
            key: '3',
            studentId: 'STU003',
            studentName: 'Michael Brown',
            assignment1: 15,
            assignment2: 14,
            midSem: 15,
            endSem: 42,
            total: 86,
            letterGrade: 'A',
            gpa: 4.0
        },
        {
            key: '4',
            studentId: 'STU004',
            studentName: 'Emily Davis',
            assignment1: 20,
            assignment2: 19,
            midSem: 19,
            endSem: 38,
            total: 96,
            letterGrade: 'A+',
            gpa: 4.0
        },
        {
            key: '5',
            studentId: 'STU005',
            studentName: 'David Wilson',
            assignment1: 12,
            assignment2: 13,
            midSem: 12,
            endSem: 35,
            total: 72,
            letterGrade: 'B',
            gpa: 3.0
        }
    ]);



    const calculateTotal = (assignment1, assignment2, midSem, endSem) => {
        const total = (assignment1 || 0) + (assignment2 || 0) + (midSem || 0) + (endSem || 0);
        return Math.min(total, 100);
    };

    const getLetterGrade = (total) => {
        if (total >= 90) return 'A+';
        if (total >= 80) return 'A';
        if (total >= 70) return 'B';
        if (total >= 60) return 'C';
        if (total >= 50) return 'D';
        return 'F';
    };

    const getGPA = (letterGrade) => {
        switch (letterGrade) {
            case 'A+': return 4.0;
            case 'A': return 4.0;
            case 'B': return 3.0;
            case 'C': return 2.0;
            case 'D': return 1.0;
            case 'F': return 0.0;
            default: return 0.0;
        }
    };

    const getGradeColor = (letterGrade) => {
        switch (letterGrade) {
            case 'A+': return 'gold';
            case 'A': return 'green';
            case 'B': return 'blue';
            case 'C': return 'orange';
            case 'D': return 'red';
            case 'F': return 'red';
            default: return 'default';
        }
    };

    const handleGradeChange = (studentKey, field, value) => {
        setGrades(grades.map(student => {
            if (student.key === studentKey) {
                const updatedStudent = { ...student, [field]: value };
                const total = calculateTotal(
                    updatedStudent.assignment1,
                    updatedStudent.assignment2,
                    updatedStudent.midSem,
                    updatedStudent.endSem
                );
                const letterGrade = getLetterGrade(total);
                const gpa = getGPA(letterGrade);
                
                return {
                    ...updatedStudent,
                    total,
                    letterGrade,
                    gpa
                };
            }
            return student;
        }));
    };

    const handleSaveGrades = () => {
        message.success('Grades saved successfully!');
    };

    const columns = [
        {
            title: 'Registration Number',
            dataIndex: 'studentId',
            key: 'studentId',
            width: 150,
            fixed: 'left'
        },
        {
            title: 'Student Name',
            dataIndex: 'studentName',
            key: 'studentName',
            width: 200,
            fixed: 'left'
        },
        {
            title: 'Course Code',
            dataIndex: 'courseCode',
            key: 'courseCode',
            width: 100
        },
        {
            title: 'Course Name',
            dataIndex: 'courseName',
            key: 'courseName',
            width: 250
        },
        {
            title: 'Year of Study',
            dataIndex: 'yearOfStudy',
            key: 'yearOfStudy',
            width: 100
        },
        {
            title: 'Academic Year',
            dataIndex: 'academicYear',
            key: 'academicYear',
            width: 120
        },
        {
            title: 'Semester',
            dataIndex: 'semester',
            key: 'semester',
            width: 120
        },
        {
            title: 'Final Grade',
            dataIndex: 'finalGrade',
            key: 'finalGrade',
            width: 100,
            render: (grade) => (
                <span className={grade >= 80 ? 'font-bold text-green-600' : grade >= 60 ? 'font-bold text-blue-600' : 'font-bold text-red-600'}>
                    {grade}
                </span>
            )
        },
        {
            title: 'Grade Description',
            dataIndex: 'gradeDescription',
            key: 'gradeDescription',
            width: 150,
            render: (description) => {
                if (!description) return <Tag>N/A</Tag>;
                const color = description.includes('A') ? 'green' : 
                             description.includes('B') ? 'blue' : 
                             description.includes('C') ? 'orange' : 'red';
                return (
                    <Tag color={color} className="font-bold">
                        {description}
                    </Tag>
                );
            }
        }
    ];

    const filteredGrades = grades.filter(student =>
        student.studentName.toLowerCase().includes(searchText.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchText.toLowerCase())
    );

    const classAverage = grades.length > 0 ? 
        (grades.reduce((sum, student) => sum + student.finalGrade, 0) / grades.length).toFixed(1) : 0;
    
    const passRate = grades.length > 0 ? 
        Math.round((grades.filter(student => student.finalGrade >= 50).length / grades.length) * 100) : 0;

    const gradeDistribution = {
        'A': grades.filter(s => s.gradeDescription && s.gradeDescription.includes('A')).length,
        'B': grades.filter(s => s.gradeDescription && s.gradeDescription.includes('B')).length,
        'C': grades.filter(s => s.gradeDescription && s.gradeDescription.includes('C')).length,
        'D': grades.filter(s => s.gradeDescription && s.gradeDescription.includes('D')).length,
        'F': grades.filter(s => s.gradeDescription && s.gradeDescription.includes('F')).length
    };

    return (
        <div className="p-0 bg-gray-50 min-h-screen w-full">
            <div className="p-6 pb-4">
                <h1 className="text-2xl font-bold text-gray-800">Grade Management</h1>
                <p className="text-gray-600">Enter and manage student grades for courses</p>
            </div>

            <div className="px-6">
                {/* Stats Cards */}
                <Row gutter={[16, 16]} className="mb-6">
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic title="Total Students" value={grades.length} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic title="Class Average" value={classAverage} suffix="/100" />
                        </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic title="Pass Rate" value={passRate} suffix="%" valueStyle={{ color: passRate >= 80 ? '#52c41a' : '#faad14' }} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card>
                            <Statistic title="A Grades" value={gradeDistribution['A']} valueStyle={{ color: '#52c41a' }} />
                        </Card>
                    </Col>
                </Row>

                {/* Controls */}
                <Card className="mb-6">
                    <Row gutter={[16, 16]} align="middle">
                        <Col xs={24} sm={6}>
                            <Select
                                value={selectedCourse}
                                onChange={setSelectedCourse}
                                style={{ width: '100%' }}
                            >
                                <Option value="">All Courses</Option>
                                {courses.map(course => (
                                    <Option key={course.code} value={course.code}>
                                        {course.code} - {course.name}
                                    </Option>
                                ))}
                            </Select>
                        </Col>
                        <Col xs={24} sm={6}>
                            <Input
                                placeholder="Search students..."
                                prefix={<SearchOutlined />}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </Col>
                        <Col xs={24} sm={12}>
                            <div className="flex justify-end space-x-2">
                                <Button type="primary" icon={<SaveOutlined />} onClick={handleSaveGrades}>
                                    Save Grades
                                </Button>
                                <Button icon={<ExportOutlined />}>
                                    Export
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Card>

                {/* Grade Distribution */}
                <Row gutter={[16, 16]} className="mb-6">
                    <Col xs={24}>
                        <Card title="Grade Distribution">
                            <Row gutter={[16, 16]}>
                                {Object.entries(gradeDistribution).map(([grade, count]) => {
                                    const color = grade === 'A' ? '#52c41a' : grade === 'B' ? '#1890ff' : grade === 'C' ? '#fa8c16' : '#f5222d';
                                    return (
                                        <Col xs={24} sm={4} key={grade}>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold" style={{ color }}>
                                                    {count}
                                                </div>
                                                <div className="text-sm text-gray-600">Grade {grade}</div>
                                                <Progress 
                                                    percent={grades.length > 0 ? Math.round((count / grades.length) * 100) : 0} 
                                                    size="small" 
                                                    showInfo={false}
                                                    strokeColor={color}
                                                />
                                            </div>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Card>
                    </Col>
                </Row>

                {/* Grades Table */}
                <Card title={selectedCourse ? `Grades for ${selectedCourse}` : 'All Grades'}>
                    <Table
                        columns={columns}
                        dataSource={filteredGrades}
                        loading={loading}
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
        </div>
    );
};

export default Grades;