import React from 'react';
import CardHeader from '../../components/CardHeader';
import { useSelector } from 'react-redux';

const Profile = () => {
    const { user } = useSelector(state => state.auth);
    console.log(user);
    return (
        <CardHeader activePath='Profile'>
            <div className='mx-10 my-8 px-[30px] pt-[24px] pb-[28px] flex flex-col bg-[#FFFFFF]'>
                <div className='flex justify-between'>
                    <div className='flex gap-[27px]'>
                        <div className='bg-primary-normal text-[#FFFFFF] h-[66px] w-[66px] flex justify-center items-center
                            font-[400] text-[24px] leading-[32px] rounded-[8px]'>
                            ABC
                        </div>
                        <div>
                            Sophia Rose DOE
                        </div>
                    </div>
                    <div>
                        Update Password
                    </div>
                </div>
            </div>
        </CardHeader>
    );
};

export default Profile;
