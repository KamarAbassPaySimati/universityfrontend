import React from 'react';
import CardHeader from '../../components/CardHeader';
import UpdateToNewPassword from './Components/UpdateToNewPassword';

const UpdatePassword = () => {
    return (
        <CardHeader activePath='Update Password' paths={['Profile']} pathurls={['profile']} >
            <div className='mx-10 my-8 px-[30px] pt-[24px] pb-[28px] flex flex-col bg-[#FFFFFF]'
                data-testid="update_password_card">
                <p className='font-[600] text-[24px] text-neutral-primary mt-[32px] ml-[24px]'>Update Password</p>
                <div className='flex justify-center items-center  mt-[68px]'>
                    <UpdateToNewPassword />
                </div>
            </div>
        </CardHeader>
    );
};

export default UpdatePassword;
