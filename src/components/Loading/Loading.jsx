import React from 'react';
import { Spin } from 'antd';

const Loading = () => {
    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <Spin size="large" />
            <p className="mt-4 text-gray-600">Loading...</p>
        </div>
    );
};

export default Loading;
