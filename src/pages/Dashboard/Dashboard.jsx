import React from 'react';
import CardHeader from '../../components/CardHeader';
import KYCReject from '../../components/KYC/KYCReject';

const Dashboard = () => {
    return (
        <CardHeader>
            <div className='text-3xl flex justify-center items-center text-primary-normal underline'>
                Dashboard
            </div>
            <KYCReject />
        </CardHeader>
    );
};

export default Dashboard;
