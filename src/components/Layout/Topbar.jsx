import React from 'react';
import { Button, Avatar, Dropdown, Modal } from 'antd';
import { LogoutOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    Modal.confirm({
      title: 'Confirm Logout',
      content: 'Are you sure you want to logout?',
      okText: 'Yes, Logout',
      cancelText: 'Cancel',
      onOk: () => {
        logout();
        window.location.href = '/login';
      }
    });
  };

  const menuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => navigate('/profile')
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings'
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout
    }
  ];

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gray-800">University Management</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">Welcome, {user?.full_name}</span>
        <Dropdown menu={{ items: menuItems }} placement="bottomRight">
          <Avatar 
            icon={<UserOutlined />} 
            className="cursor-pointer bg-blue-500"
          />
        </Dropdown>
      </div>
    </div>
  );
};

export default Topbar;