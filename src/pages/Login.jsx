import React, { useState } from 'react';
import { Form, Input, Button, message, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const user = await login(values.username, values.password);
      message.success('Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      message.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-4">University Management System</h1>
            <p className="text-xl text-blue-100 leading-relaxed">Streamline your academic operations with our comprehensive management platform</p>
          </div>
          <div className="space-y-4 text-blue-100">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
              <span>Student & Faculty Management</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
              <span>Academic Records & Analytics</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-indigo-300 rounded-full"></div>
              <span>Financial Management</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mb-32"></div>
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mt-16"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <UserOutlined className="text-white text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Please sign in to your account</p>
            </div>

            <Form name="login" onFinish={onFinish} layout="vertical" size="large">
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Username is required' }]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="Enter your username"
                  className="rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Password is required' }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Enter your password"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  className="rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500"
                />
              </Form.Item>

              <div className="flex items-center justify-between mb-6">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox className="text-gray-600">Remember me</Checkbox>
                </Form.Item>
                <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">Forgot password?</a>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 border-none rounded-lg font-semibold text-base hover:from-blue-700 hover:to-purple-700 shadow-lg"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </Form.Item>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <Button
                type="default"
                size="large"
                className="w-full h-12 border-gray-300 rounded-lg font-medium flex items-center justify-center gap-3 hover:bg-gray-50"
                onClick={() => message.info('Google Sign-In integration coming soon!')}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
            </Form>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 text-center mb-2">Demo Accounts:</p>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center p-2 bg-white rounded border">
                  <div className="font-medium text-gray-700">Admin</div>
                  <div className="text-gray-500">admin/admin</div>
                </div>
                <div className="text-center p-2 bg-white rounded border">
                  <div className="font-medium text-gray-700">Faculty</div>
                  <div className="text-gray-500">faculty/faculty</div>
                </div>
                <div className="text-center p-2 bg-white rounded border">
                  <div className="font-medium text-gray-700">Student</div>
                  <div className="text-gray-500">student/student</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;