import React from 'react';
import CardHeader from '../../components/CardHeader';
import { useSelector } from 'react-redux';
import Button2 from '../../components/Button2/Button2';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const userDetails = {
        'Phone Number': user.phone_number,
        Email: user.email,
        Role: user.user_type
    };
    const keys = Object.keys(userDetails);
    return (
        <CardHeader activePath='Profile'>
            <div className='mx-10 my-8 px-[30px] pt-[24px] pb-[28px] flex flex-col bg-[#FFFFFF]' data-testid="profile_info_card">

                <div className='flex justify-between border-b border-neutral-outline pb-[18px]'>
                    <div className='flex gap-[27px] justify-center items-center'>
                        <div className='bg-primary-normal text-[#FFFFFF] h-[66px] w-[66px] flex justify-center items-center
                            font-[400] text-[24px] leading-[32px] rounded-[8px]'>
                            {`${user?.first_name?.[0]}${user?.middle_name?.[0]}${user?.last_name?.[0]}`}
                        </div>
                        <div className='text-neutral-primary'>
                            <div className='font-[700] text-[30px] leading-[40px] capitalize' data-testid="name">
                                {`${user?.first_name} ${user?.middle_name} ${user?.last_name}`}
                            </div>
                            <div className='text-[14px] leading-[24px] font-[400]'>
                                Paymaart ID: <span className='font-[600]'>{user.paymaart_id}</span>
                            </div>
                        </div>
                    </div>
                    <div className='mt-1'>
                        <Button2
                            testId="update_password"
                            onClick={() => navigate('/update-password')}
                            text='Update Password'
                            icon='key-icon'
                            className='!w-[182px] !text-primary-normal' />
                    </div>
                </div>

                <div className='w-full flex mt-7'>
                    {keys.map((key, index) => (
                        <div key={index} className='w-1/5 text-[14px] leading-[24px] font-[400] mr-2'>
                            <p className='text-neutral-secondary mb-1'>{key}</p>
                            <span data-testid={key} className={`text-neutral-primary max-w-[300px] whitespace-nowrap
                                    break-words block overflow-hidden text-ellipsis ${key === 'Role' ? 'capitalize' : ''}`}>
                                {userDetails[key]}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </CardHeader>
    );
};

export default Profile;
