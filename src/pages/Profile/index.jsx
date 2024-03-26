import React from 'react';
import CardHeader from '../../components/CardHeader';
import { useSelector } from 'react-redux';
import Button2 from '../../components/Button2/Button2';
import { useNavigate } from 'react-router-dom';
import formatPhoneNumber from '../../CommonMethods/formatPhoneNumber';

const Profile = () => {
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const userDetails = {
        'Phone Number': formatPhoneNumber(user.phone_number),
        Email: user.email,
        Role: user.user_type
    };
    const keys = Object.keys(userDetails);
    return (
        <CardHeader activePath='Profile' >
            <div className=' flex flex-col bg-[#FFFFFF]' data-testid="profile_info_card">

                <div className='flex justify-between border-b border-neutral-outline pb-[18px]'>
                    <div className='flex gap-[27px] justify-center items-center'>
                        <div className='bg-primary-normal text-[#FFFFFF] h-[66px] w-[66px] flex justify-center items-center
                            font-[400] text-[24px] leading-[32px] rounded-[8px] uppercase'>
                            {`${user?.first_name?.[0] || ''}${user?.middle_name?.[0] || ''}${user?.last_name?.[0] || ''}`}
                        </div>
                        <div className='text-neutral-primary'>
                            <div className='font-[700] text-[30px] leading-[40px] capitalize' data-testid="name">
                                {`${user?.first_name || '-'} ${user?.middle_name || '-'}`}
                                <span className='uppercase'> {user?.last_name || '-'}</span>
                            </div>
                            <div className='text-[14px] leading-[24px] font-[400]'>
                                Paymaart ID: <span data-testid="paymaart_id" className='font-[600]'>{user.paymaart_id}</span>
                            </div>
                        </div>
                    </div>
                    <div className='mt-1'>
                        <Button2
                            testId="update_password"
                            onClick={() => navigate('/profile/update-password')}
                            text='Update Password'
                            icon='key-icon'
                            className='!w-[182px] !text-primary-normal' />
                    </div>
                </div>

                <div className='w-full flex mt-7'>
                    {keys.map((key, index) => (
                        <div key={index} className={`text-[14px] leading-[24px] font-[400] mr-2 
                            ${key === 'Email' ? 'w-[30%]' : 'w-1/5'}`}>
                            <p className='text-neutral-secondary mb-1'>{key}</p>
                            <span
                                title={userDetails[key]}
                                data-testid={key}
                                className={`text-neutral-primary max-w-[300px] whitespace-nowrap cursor-default
                                    break-words block overflow-hidden text-ellipsis ${key === 'Role' ? 'capitalize' : ''}`}>
                                {userDetails[key] || '-'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </CardHeader>
    );
};

export default Profile;
