import React from 'react';
import CardHeader from '../../components/CardHeader';
import UpdateToNewPassword from './Components/UpdateToNewPassword';

const UpdatePassword = () => {
    return (
        <CardHeader activePath='Update Password' paths={['Profile']} pathurls={['profile']} testId='update_password_card'>
            <p className='font-[600] text-[24px] text-neutral-primary'>Update Password</p>
            <div className='flex justify-center items-center  mt-[44px] mb-22'>
                <UpdateToNewPassword />
            </div>
            <div className='left-0 ml-[20px] mb-8 mt-15 w-max max-w-[calc(100vw-90px)] break-words place-self-start pt-[84px]'>
                <h1 className='text-[#4F5962] font-[500] text-[16px]'>Note: Password Guidelines</h1>
                <ul className='text-[#4F5962] font-[400] text-[14px] marker:text-[#4F5962] list-outside list-disc ml-6 leading-6'>
                    <li>Passwords must not include spaces or any punctuation marks like &apos;.&apos;, &apos;!&apos;,
                        or &apos;?&apos;.</li>
                    <li>Avoid using easily guessable personal information such as your name, birthdate, or common words.</li>
                    <li>Do not use simple patterns like &apos;12345678&apos;, &apos;22446688&apos;, &apos;password&apos;,
                        or sequential keyboard patterns like &apos;qwerty&apos;.</li>
                    <li>Make sure passwords are created with random combinations of characters for better security.</li>
                </ul>
            </div>
        </CardHeader>
    );
};

export default UpdatePassword;
