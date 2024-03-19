import React from 'react';
import Image from '../components/Image/Image';

function NotFound () {
    return (
        <div className='flex flex-col h-screen w-screen justify-center items-center gap-10'>
            <Image src='404' />
            <div className='flex flex-col justify-center items-center gap-1 font-[400]'>
                <h1 className='text-[#000103] text-[20px] leading-[28px]'>Page Not Found</h1>
                <p className='text-neutral-secondary text-[14px] leading-[24px]'>We can’t find the page you’re looking for </p>
            </div>
        </div>
    );
}

export default NotFound;
