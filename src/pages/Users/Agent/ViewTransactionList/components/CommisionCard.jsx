import React from 'react';
import Image from '../../../../../components/Image/Image';

const CommisionCard = () => {
    return (
        <div className='bg-[#8075A1] px-10 pt-[22px] pb-2 relative rounded-md
         text-white w-1/2 flex flex-col justify-between min-h-[156px]'>
            <p className='text-2xl font-[400]'>Gross Agent Commission</p>
            <div className='flex flex-col gap-1'>
                <p className='text-3xl font-[700]'>24,000.00 MWK</p>
                <div>
                    <p className='text-sm font-[400] text-neutral-secondary'>Last Updated: 12 Jan 2024, 12:30 hours</p>
                    <p className='text-sm font-[400] text-neutral-secondary'>Next settlement on: 01 June, 2024</p>
                </div>
            </div>
            <Image className='absolute right-0 bottom-0' src='commision' />
        </div>
    );
};

export default CommisionCard;
