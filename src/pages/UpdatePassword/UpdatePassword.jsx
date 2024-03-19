import React from 'react';
import CardHeader from '../../components/CardHeader';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
    const navigate = useNavigate();
    return (
        <CardHeader activePath='Update Password' >
            <div className='mx-10 my-8 px-[30px] pt-[24px] pb-[28px] flex flex-col bg-[#FFFFFF]' data-testid="profile_info_card">

                <div className='flex justify-between border-b border-neutral-outline pb-[18px]'>
                    <p>Update Password</p>
                    <div className='flex gap-[27px] justify-center items-center'>
                        
                       
                    </div>
                </div>
            </div>
        </CardHeader>
    );
};

export default UpdatePassword;
