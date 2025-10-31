import React, { useState } from 'react';
import { 
    Calendar, 
    Badge, 
    Card, 
    Row, 
    Col, 
    Select, 
    Button, 
    Modal, 
    Form, 
    Input, 
    TimePicker, 
    message,
    List,
    Tag,
    Space
} from 'antd';
import {
    PlusOutlined,
    ClockCircleOutlined,
    UserOutlined,
    BookOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;

const Schedules = () => {
    const [selectedInstructor, setSelectedInstructor] = useState('');
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    // Mock schedule data
    const [schedules, setSchedules] = useState([
        {
            id: '1',
            courseCode: 'CS101',
            courseName: 'Introduction to Computer Science',
            instructor: 'Dr. John Smith',
            room: 'Room 101',
            startTime: '09:00',
            endTime: '10:30',
            date: '2024-01-15',
            dayOfWeek: 'Monday',
            type: 'Lecture'
        },
        {
            id: '2',
            courseCode: 'MATH201',
            courseName: 'Calculus II',
            instructor: 'Dr. Sarah Johnson',
            room: 'Room 205',
            startTime: '11:00',
            endTime: '12:30',
            date: '2024-01-15',
            dayOfWeek: 'Monday',
            type: 'Lecture'
        },
        {
            id: '3',
            courseCode: 'CS101',
            courseName: 'Introduction to Computer Science',
            instructor: 'Dr. John Smith',
            room: 'Lab 1',
            startTime: '14:00',
            endTime: '15:30',
            date: '2024-01-15',
            dayOfWeek: 'Monday',
            type: 'Lab'
        },
        {
            id: '4',
            courseCode: 'ENG102',
            courseName: 'English Composition',
            instructor: 'Prof. Michael Brown',
            room: 'Room 301',
            startTime: '10:00',
            endTime: '11:30',
            date: '2024-01-16',
            dayOfWeek: 'Tuesday',
            type: 'Lecture'
        },
        {
            id: '5',
            courseCode: 'PHYS301',
            courseName: 'Quantum Physics',
            instructor: 'Dr. Emily Davis',
            room: 'Room 401',
            startTime: '13:00',
            endTime: '14:30',
            date: '2024-01-17',
            dayOfWeek: 'Wednesday',
            type: 'Lecture'
        }
    ]);

    const instructors = [
        'Dr. John Smith',
        'Dr. Sarah Johnson', 
        'Prof. Michael Brown',
        'Dr. Emily Davis',
        'Prof. David Wilson'
    ];

    const getTypeColor = (type) => {
        switch (type) {
            case 'Lecture': return 'blue';
            case 'Lab': return 'green';
            case 'Tutorial': return 'orange';
            case 'Exam': return 'red';
            default: return 'default';
        }
    };

    const getListData = (value) => {
        const dateStr = value.format('YYYY-MM-DD');
        return schedules.filter(schedule => schedule.date === dateStr);
    };

    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map(item => (
                    <li key={item.id}>
                        <Badge 
                            color={getTypeColor(item.type)} 
                            text={`${item.startTime} ${item.courseCode}`}
                            className="text-xs"
                        />
                    </li>
                ))}
            </ul>
        );
    };

    const onDateSelect = (value) => {
        setSelectedDate(value);
    };

    const handleAddSchedule = () => {
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleModalOk = () => {
        form.validateFields().then(values => {
            const newSchedule = {
                id: Date.now().toString(),
                ...values,
                startTime: values.timeRange[0].format('HH:mm'),
                endTime: values.timeRange[1].format('HH:mm'),
                date: selectedDate.format('YYYY-MM-DD'),
                dayOfWeek: selectedDate.format('dddd')
            };
            setSchedules([...schedules, newSchedule]);
            message.success('Schedule added successfully');
            setIsModalVisible(false);
            form.resetFields();
        });
    };

    const filteredSchedules = schedules.filter(schedule => {
        const matchesInstructor = !selectedInstructor || schedule.instructor === selectedInstructor;
        const matchesDate = schedule.date === selectedDate.format('YYYY-MM-DD');
        return matchesInstructor && matchesDate;
    });

    const todaySchedules = schedules.filter(schedule => 
        schedule.date === dayjs().format('YYYY-MM-DD')
    );

    return (
        <div className="p-0 bg-gray-50 min-h-screen w-full">
            <div className="p-6 pb-4">
                <h1 className="text-2xl font-bold text-gray-800">Class Schedules</h1>
                <p className="text-gray-600">Manage class schedules and timetables</p>
            </div>

            <div className="px-6">
                <Row gutter={[16, 16]}>
                    {/* Calendar Section */}
                    <Col xs={24} lg={16}>
                        <Card 
                            title="Academic Calendar" 
                            extra={
                                <Space>
                                    <Select
                                        placeholder="Filter by Instructor"
                                        style={{ width: 200 }}
                                        value={selectedInstructor}
                                        onChange={setSelectedInstructor}
                                        allowClear
                                    >
                                        {instructors.map(instructor => (
                                            <Option key={instructor} value={instructor}>
                                                {instructor}
                                            </Option>
                                        ))}
                                    </Select>
                                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAddSchedule}>
                                        Add Schedule
                                    </Button>
                                </Space>
                            }
                        >
                            <Calendar
                                dateCellRender={dateCellRender}
                                onSelect={onDateSelect}
                                value={selectedDate}
                            />
                        </Card>
                    </Col>

                    {/* Schedule Details Section */}
                    <Col xs={24} lg={8}>
                        <Row gutter={[16, 16]}>
                            {/* Today's Schedule */}
                            <Col span={24}>
                                <Card title="Today's Classes" size="small">
                                    <List
                                        dataSource={todaySchedules}
                                        renderItem={item => (
                                            <List.Item>
                                                <div className="w-full">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <div className="font-semibold text-blue-600">
                                                                {item.courseCode}
                                                            </div>
                                                            <div className="text-sm text-gray-600">
                                                                {item.courseName}
                                                            </div>
                                                            <div className="text-xs text-gray-500 mt-1">
                                                                <ClockCircleOutlined /> {item.startTime} - {item.endTime}
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                <UserOutlined /> {item.instructor}
                                                            </div>
                                                        </div>
                                                        <Tag color={getTypeColor(item.type)}>
                                                            {item.type}
                                                        </Tag>
                                                    </div>
                                                </div>
                                            </List.Item>
                                        )}
                                        locale={{ emptyText: 'No classes today' }}
                                    />
                                </Card>
                            </Col>

                            {/* Selected Date Schedule */}
                            <Col span={24}>
                                <Card 
                                    title={`Schedule for ${selectedDate.format('MMMM D, YYYY')}`} 
                                    size="small"
                                >
                                    <List
                                        dataSource={filteredSchedules}
                                        renderItem={item => (
                                            <List.Item>
                                                <div className="w-full">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <div className="font-semibold text-blue-600">
                                                                {item.courseCode}
                                                            </div>
                                                            <div className="text-sm text-gray-600">
                                                                {item.courseName}
                                                            </div>
                                                            <div className="text-xs text-gray-500 mt-1">
                                                                <ClockCircleOutlined /> {item.startTime} - {item.endTime}
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                <UserOutlined /> {item.instructor}
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                📍 {item.room}
                                                            </div>
                                                        </div>
                                                        <Tag color={getTypeColor(item.type)}>
                                                            {item.type}
                                                        </Tag>
                                                    </div>
                                                </div>
                                            </List.Item>
                                        )}
                                        locale={{ emptyText: 'No classes scheduled' }}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

            {/* Add Schedule Modal */}
            <Modal
                title="Add New Schedule"
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={() => setIsModalVisible(false)}
                width={600}
            >
                <Form form={form} layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="courseCode" label="Course Code" rules={[{ required: true }]}>
                                <Input placeholder="CS101" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="courseName" label="Course Name" rules={[{ required: true }]}>
                                <Input placeholder="Introduction to Computer Science" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="instructor" label="Instructor" rules={[{ required: true }]}>
                                <Select placeholder="Select Instructor">
                                    {instructors.map(instructor => (
                                        <Option key={instructor} value={instructor}>
                                            {instructor}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="room" label="Room" rules={[{ required: true }]}>
                                <Input placeholder="Room 101" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="timeRange" label="Time" rules={[{ required: true }]}>
                                <TimePicker.RangePicker 
                                    format="HH:mm" 
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                                <Select placeholder="Select Type">
                                    <Option value="Lecture">Lecture</Option>
                                    <Option value="Lab">Lab</Option>
                                    <Option value="Tutorial">Tutorial</Option>
                                    <Option value="Exam">Exam</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default Schedules;