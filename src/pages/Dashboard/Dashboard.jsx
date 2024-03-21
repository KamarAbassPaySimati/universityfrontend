import React from 'react';
import CardHeader from '../../components/CardHeader';
import Button from '../../components/Button/Button';
import { dataService } from '../../services/data.services';
import useGlobalSignout from '../../CommonMethods/globalSignout';

const handleclick = () => {
    useGlobalSignout();
    dataService.PostAPI('dsffds', { fsdf: 'fdgd' });
};

const Dashboard = () => {
    return (
        <CardHeader>
            <div className='text-3xl flex justify-center items-center text-primary-normal underline'>
                Dashboard
            </div>
            <Button text='click' onClick={handleclick} />
        </CardHeader>
    );
};

export default Dashboard;
