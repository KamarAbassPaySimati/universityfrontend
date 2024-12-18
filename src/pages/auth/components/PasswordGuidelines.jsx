/* eslint-disable max-len */
import React from 'react';

const PasswordGuidelines = () => {
    return (
        <div className='z-20 left-0 ml-[80px] mb-5 w-max max-w-[calc(100vw-90px)] break-words place-self-start hidden md:block'>
            <h1 className='text-[#fff] font-[500] text-[16px]'>Note: Password Guidelines</h1>
            <ul className='text-[#fff] font-[400] text-[14px] marker:text-[#fff] list-outside list-disc ml-6'>
                <li>Passwords must not include spaces or any punctuation marks like &apos;.&apos;, &apos;!&apos;, or &apos;?&apos;.</li>
                <li>Avoid using easily guessable personal information such as your name, birthdate, or common words.</li>
                <li>Do not use simple patterns like &apos;12345678&apos;, &apos;22446688&apos;, &apos;password&apos;, or sequential keyboard patterns like &apos;qwerty&apos;.</li>
                <li>Make sure passwords are created with random combinations of characters for better security.</li>
            </ul>
        </div>
    );
};

export default PasswordGuidelines;
