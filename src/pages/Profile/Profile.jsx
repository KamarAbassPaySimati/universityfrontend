import React, { useState } from 'react';
import { Card, Form, Input, Button, Avatar, Upload, message, Divider } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, UploadOutlined, EditOutlined } from '@ant-design/icons';

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();

  const userProfile = {
    name: 'John Doe',
    email: 'john.doe@university.edu',
    phone: '+1 (555) 123-4567',
    role: 'Super Administrator',
    department: 'Information Technology',
    joinDate: 'January 15, 2020',
    avatar: null
  };

  const handleSave = (values) => {
    message.success('Profile updated successfully!');
    setEditing(false);
  };

  const uploadProps = {
    name: 'avatar',
    listType: 'picture',
    beforeUpload: () => false,
    onChange: (info) => {
      message.success('Avatar uploaded successfully!');
    }
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Profile Settings</h1>
            <Button 
              type="primary" 
              icon={<EditOutlined />}
              onClick={() => setEditing(!editing)}
            >
              {editing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Avatar Section */}
            <div className="lg:w-1/3">
              <Card className="text-center">
                <Avatar size={120} icon={<UserOutlined />} className="mb-4" />
                <h3 className="text-lg font-semibold">{userProfile.name}</h3>
                <p className="text-gray-500 mb-4">{userProfile.role}</p>
                {editing && (
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>Change Avatar</Button>
                  </Upload>
                )}
              </Card>
            </div>

            {/* Profile Information */}
            <div className="lg:w-2/3">
              <Card title="Personal Information">
                <Form
                  form={form}
                  layout="vertical"
                  initialValues={userProfile}
                  onFinish={handleSave}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                      label="Full Name"
                      name="name"
                      rules={[{ required: true, message: 'Please enter your name' }]}
                    >
                      <Input 
                        prefix={<UserOutlined />} 
                        disabled={!editing}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[{ required: true, type: 'email', message: 'Please enter valid email' }]}
                    >
                      <Input 
                        prefix={<MailOutlined />} 
                        disabled={!editing}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Phone"
                      name="phone"
                    >
                      <Input 
                        prefix={<PhoneOutlined />} 
                        disabled={!editing}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Department"
                      name="department"
                    >
                      <Input disabled={!editing} />
                    </Form.Item>
                  </div>

                  <Divider />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <Input value={userProfile.role} disabled />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                      <Input value={userProfile.joinDate} disabled />
                    </div>
                  </div>

                  {editing && (
                    <div className="mt-6 flex gap-2">
                      <Button type="primary" htmlType="submit">
                        Save Changes
                      </Button>
                      <Button onClick={() => setEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </Form>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;