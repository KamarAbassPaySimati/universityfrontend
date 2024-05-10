import React from 'react';
import CardHeader from '../../components/CardHeader';
import OTPpopup from '../../components/OTPpopup/OTPpopup';

const Dashboard = () => {
    return (
        <CardHeader>
            <div className='text-3xl flex justify-center items-center text-primary-normal underline'>
                Dashboard
            </div>
            <OTPpopup />
        </CardHeader>
    );
};

export default Dashboard;
