import React from 'react';
import CardHeader from '../../components/CardHeader';
import UpdateToNewPassword from './Components/UpdateToNewPassword';

const UpdatePassword = () => {
    return (
        <CardHeader activePath='Update Password' paths={['Profile']} pathurls={['profile']} >
            <div className='mx-10 my-8 px-[30px] pt-[24px] pb-[28px] flex flex-col bg-[#FFFFFF]'
                data-testid="update_password_card">
                <p>Update Password</p>
                <div className='flex justify-between border-b border-neutral-outline pb-[18px]'>
                    <UpdateToNewPassword />

                </div>
            </div>
        </CardHeader>
    );
};

export default UpdatePassword;
