import React, { useState } from 'react';
import { Card, Form, Input, Button, Switch, Select, Row, Col, Divider, message, InputNumber } from 'antd';
import { SaveOutlined, ReloadOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

const Settings = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const [settings, setSettings] = useState({
        // General Settings
        universityName: 'University Management System',
        universityCode: 'UMS',
        academicYear: '2024-2025',
        currentSemester: '2024-1',
        
        // Academic Settings
        passingGrade: 60,
        maxCreditsPerSemester: 24,
        minAttendancePercentage: 75,
        gradeScale: 'percentage',
        
        // System Settings
        enableNotifications: true,
        enableEmailAlerts: true,
        autoBackup: true,
        sessionTimeout: 30,
        
        // Admission Settings
        admissionStartDate: '2024-06-01',
        admissionEndDate: '2024-08-31',
        applicationFee: 100,
        
        // Contact Information
        address: '123 University Street, Education City',
        phone: '+1-234-567-8900',
        email: 'info@university.edu',
        website: 'www.university.edu'
    });

    const handleSave = async (values) => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSettings({ ...settings, ...values });
            message.success('Settings saved successfully');
        } catch (error) {
            message.error('Failed to save settings');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        form.setFieldsValue(settings);
        message.info('Settings reset to saved values');
    };

    return (
        <div className="p-0 bg-gray-50 min-h-screen w-full">
            <div className="p-6 pb-4">
                <h1 className="text-2xl font-bold text-gray-800">System Settings</h1>
                <p className="text-gray-600">Configure university system settings and preferences</p>
            </div>

            <div className="px-6">
                <Form form={form} initialValues={settings} onFinish={handleSave} layout="vertical">
                    <Row gutter={[24, 0]}>
                        <Col xs={24} lg={12}>
                            <Card title="General Settings" className="mb-6">
                                <Form.Item name="universityName" label="University Name" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="universityCode" label="University Code" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item name="academicYear" label="Academic Year" rules={[{ required: true }]}>
                                            <Select>
                                                <Option value="2024-2025">2024-2025</Option>
                                                <Option value="2025-2026">2025-2026</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="currentSemester" label="Current Semester" rules={[{ required: true }]}>
                                            <Select>
                                                <Option value="2024-1">2024-1</Option>
                                                <Option value="2024-2">2024-2</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>

                            <Card title="Academic Settings" className="mb-6">
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item name="passingGrade" label="Passing Grade (%)" rules={[{ required: true }]}>
                                            <InputNumber min={0} max={100} style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="maxCreditsPerSemester" label="Max Credits/Semester" rules={[{ required: true }]}>
                                            <InputNumber min={12} max={30} style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item name="minAttendancePercentage" label="Min Attendance (%)" rules={[{ required: true }]}>
                                            <InputNumber min={50} max={100} style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="gradeScale" label="Grade Scale" rules={[{ required: true }]}>
                                            <Select>
                                                <Option value="percentage">Percentage (0-100)</Option>
                                                <Option value="gpa">GPA (0-4.0)</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>

                        <Col xs={24} lg={12}>
                            <Card title="System Settings" className="mb-6">
                                <Form.Item name="enableNotifications" label="Enable Notifications" valuePropName="checked">
                                    <Switch />
                                </Form.Item>
                                <Form.Item name="enableEmailAlerts" label="Enable Email Alerts" valuePropName="checked">
                                    <Switch />
                                </Form.Item>
                                <Form.Item name="autoBackup" label="Auto Backup" valuePropName="checked">
                                    <Switch />
                                </Form.Item>
                                <Form.Item name="sessionTimeout" label="Session Timeout (minutes)" rules={[{ required: true }]}>
                                    <InputNumber min={15} max={120} style={{ width: '100%' }} />
                                </Form.Item>
                            </Card>

                            <Card title="Admission Settings" className="mb-6">
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item name="admissionStartDate" label="Admission Start Date" rules={[{ required: true }]}>
                                            <Input type="date" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="admissionEndDate" label="Admission End Date" rules={[{ required: true }]}>
                                            <Input type="date" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item name="applicationFee" label="Application Fee ($)" rules={[{ required: true }]}>
                                    <InputNumber min={0} style={{ width: '100%' }} />
                                </Form.Item>
                            </Card>
                        </Col>
                    </Row>

                    <Card title="Contact Information" className="mb-6">
                        <Form.Item name="address" label="Address" rules={[{ required: true }]}>
                            <TextArea rows={2} />
                        </Form.Item>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="website" label="Website" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    <Card>
                        <div className="flex justify-end space-x-2">
                            <Button icon={<ReloadOutlined />} onClick={handleReset}>Reset</Button>
                            <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>
                                Save Settings
                            </Button>
                        </div>
                    </Card>
                </Form>
            </div>
        </div>
    );
};

export default Settings;