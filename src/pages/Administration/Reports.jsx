import React, { useState } from 'react';
import { Card, Button, Select, DatePicker, Row, Col, Statistic, Table, Tag, message } from 'antd';
import { DownloadOutlined, FileExcelOutlined, FilePdfOutlined, PrinterOutlined } from '@ant-design/icons';

const { Option } = Select;
const { RangePicker } = DatePicker;

const Reports = () => {
    const [selectedReport, setSelectedReport] = useState('enrollment');
    const [dateRange, setDateRange] = useState(null);
    const [loading, setLoading] = useState(false);

    const reportTypes = [
        { value: 'enrollment', label: 'Enrollment Report' },
        { value: 'academic', label: 'Academic Performance Report' },
        { value: 'financial', label: 'Financial Report' },
        { value: 'faculty', label: 'Faculty Report' },
        { value: 'attendance', label: 'Attendance Report' }
    ];

    const enrollmentData = [
        { key: '1', department: 'Computer Science', newStudents: 45, totalStudents: 180, capacity: 200, utilizationRate: 90 },
        { key: '2', department: 'Mathematics', newStudents: 32, totalStudents: 128, capacity: 150, utilizationRate: 85 },
        { key: '3', department: 'Engineering', newStudents: 38, totalStudents: 152, capacity: 180, utilizationRate: 84 }
    ];

    const academicData = [
        { key: '1', department: 'Computer Science', avgGPA: 3.7, passRate: 92, distinction: 25, honor: 40 },
        { key: '2', department: 'Mathematics', avgGPA: 3.4, passRate: 88, distinction: 18, honor: 35 },
        { key: '3', department: 'Engineering', avgGPA: 3.5, passRate: 90, distinction: 22, honor: 38 }
    ];

    const financialData = [
        { key: '1', category: 'Tuition Fees', budgeted: 500000, actual: 485000, variance: -15000, status: 'Under Budget' },
        { key: '2', category: 'Faculty Salaries', budgeted: 800000, actual: 820000, variance: 20000, status: 'Over Budget' },
        { key: '3', category: 'Infrastructure', budgeted: 200000, actual: 180000, variance: -20000, status: 'Under Budget' }
    ];

    const generateReport = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            message.success(`${reportTypes.find(r => r.value === selectedReport)?.label} generated successfully`);
        } catch (error) {
            message.error('Failed to generate report');
        } finally {
            setLoading(false);
        }
    };

    const exportReport = (format) => {
        message.success(`Report exported as ${format.toUpperCase()}`);
    };

    const getReportData = () => {
        switch (selectedReport) {
            case 'enrollment': return enrollmentData;
            case 'academic': return academicData;
            case 'financial': return financialData;
            default: return enrollmentData;
        }
    };

    const getReportColumns = () => {
        switch (selectedReport) {
            case 'enrollment':
                return [
                    { title: 'Department', dataIndex: 'department', key: 'department' },
                    { title: 'New Students', dataIndex: 'newStudents', key: 'newStudents' },
                    { title: 'Total Students', dataIndex: 'totalStudents', key: 'totalStudents' },
                    { title: 'Capacity', dataIndex: 'capacity', key: 'capacity' },
                    { title: 'Utilization Rate', dataIndex: 'utilizationRate', key: 'utilizationRate', render: (rate) => `${rate}%` }
                ];
            case 'academic':
                return [
                    { title: 'Department', dataIndex: 'department', key: 'department' },
                    { title: 'Avg GPA', dataIndex: 'avgGPA', key: 'avgGPA' },
                    { title: 'Pass Rate', dataIndex: 'passRate', key: 'passRate', render: (rate) => `${rate}%` },
                    { title: 'Distinction', dataIndex: 'distinction', key: 'distinction' },
                    { title: 'Honor', dataIndex: 'honor', key: 'honor' }
                ];
            case 'financial':
                return [
                    { title: 'Category', dataIndex: 'category', key: 'category' },
                    { title: 'Budgeted', dataIndex: 'budgeted', key: 'budgeted', render: (amount) => `$${amount.toLocaleString()}` },
                    { title: 'Actual', dataIndex: 'actual', key: 'actual', render: (amount) => `$${amount.toLocaleString()}` },
                    { title: 'Variance', dataIndex: 'variance', key: 'variance', render: (variance) => (
                        <span className={variance >= 0 ? 'text-red-600' : 'text-green-600'}>
                            ${Math.abs(variance).toLocaleString()}
                        </span>
                    )},
                    { title: 'Status', dataIndex: 'status', key: 'status', render: (status) => (
                        <Tag color={status === 'Under Budget' ? 'green' : 'red'}>{status}</Tag>
                    )}
                ];
            default:
                return [];
        }
    };

    const getReportStats = () => {
        const data = getReportData();
        switch (selectedReport) {
            case 'enrollment':
                return [
                    { title: 'Total New Students', value: data.reduce((sum, d) => sum + d.newStudents, 0) },
                    { title: 'Total Students', value: data.reduce((sum, d) => sum + d.totalStudents, 0) },
                    { title: 'Total Capacity', value: data.reduce((sum, d) => sum + d.capacity, 0) },
                    { title: 'Avg Utilization', value: Math.round(data.reduce((sum, d) => sum + d.utilizationRate, 0) / data.length), suffix: '%' }
                ];
            case 'academic':
                return [
                    { title: 'Avg GPA', value: (data.reduce((sum, d) => sum + d.avgGPA, 0) / data.length).toFixed(1) },
                    { title: 'Avg Pass Rate', value: Math.round(data.reduce((sum, d) => sum + d.passRate, 0) / data.length), suffix: '%' },
                    { title: 'Total Distinctions', value: data.reduce((sum, d) => sum + d.distinction, 0) },
                    { title: 'Total Honors', value: data.reduce((sum, d) => sum + d.honor, 0) }
                ];
            case 'financial':
                return [
                    { title: 'Total Budgeted', value: data.reduce((sum, d) => sum + d.budgeted, 0), prefix: '$' },
                    { title: 'Total Actual', value: data.reduce((sum, d) => sum + d.actual, 0), prefix: '$' },
                    { title: 'Total Variance', value: data.reduce((sum, d) => sum + d.variance, 0), prefix: '$' },
                    { title: 'Categories', value: data.length }
                ];
            default:
                return [];
        }
    };

    return (
        <div className="p-0 bg-gray-50 min-h-screen w-full">
            <div className="p-6 pb-4">
                <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
                <p className="text-gray-600">Generate and export comprehensive university reports</p>
            </div>

            <div className="px-6">
                <Card className="mb-6">
                    <Row gutter={[16, 16]} align="middle">
                        <Col xs={24} sm={6}>
                            <Select
                                value={selectedReport}
                                onChange={setSelectedReport}
                                style={{ width: '100%' }}
                                placeholder="Select Report Type"
                            >
                                {reportTypes.map(type => (
                                    <Option key={type.value} value={type.value}>{type.label}</Option>
                                ))}
                            </Select>
                        </Col>
                        <Col xs={24} sm={8}>
                            <RangePicker
                                value={dateRange}
                                onChange={setDateRange}
                                style={{ width: '100%' }}
                                placeholder={['Start Date', 'End Date']}
                            />
                        </Col>
                        <Col xs={24} sm={10}>
                            <div className="flex space-x-2">
                                <Button type="primary" loading={loading} onClick={generateReport}>
                                    Generate Report
                                </Button>
                                <Button icon={<FileExcelOutlined />} onClick={() => exportReport('excel')}>
                                    Excel
                                </Button>
                                <Button icon={<FilePdfOutlined />} onClick={() => exportReport('pdf')}>
                                    PDF
                                </Button>
                                <Button icon={<PrinterOutlined />} onClick={() => exportReport('print')}>
                                    Print
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Card>

                <Row gutter={[16, 16]} className="mb-6">
                    {getReportStats().map((stat, index) => (
                        <Col xs={24} sm={6} key={index}>
                            <Card>
                                <Statistic
                                    title={stat.title}
                                    value={stat.value}
                                    prefix={stat.prefix}
                                    suffix={stat.suffix}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Card title={reportTypes.find(r => r.value === selectedReport)?.label}>
                    <Table
                        columns={getReportColumns()}
                        dataSource={getReportData()}
                        pagination={false}
                        size="small"
                    />
                </Card>
            </div>
        </div>
    );
};

export default Reports;