/* eslint-disable max-len */
import React from 'react';
import Image from '../../../../../components/Image/Image';

const InfoCard = ({
    title,
    amount,
    lastUpdated,
    additionalInfo,
    imageSrc,
    bgColor = 'bg-primary-normal'
}) => {
    return (
        <div className={`${bgColor} ${title === 'Wallet Balance' ? 'py-[22px]' : 'pt-[22px] pb-2'} px-10 relative rounded-md text-white w-1/2 flex flex-col justify-between min-h-[156px]`}>
            <p className='text-2xl font-[400]'>{title}</p>
            <div className='flex flex-col gap-1'>
                <p className='text-3xl font-[700]'>{amount}</p>
                <div>
                    <p className='text-sm font-[400] text-neutral-secondary'>Last Updated: {lastUpdated}</p>
                    {additionalInfo && <p className='text-sm font-[400] text-neutral-secondary'>{additionalInfo}</p>}
                </div>
            </div>
            <Image className={`absolute bottom-0 ${title === 'Wallet Balance' ? 'right-6' : 'right-0'}`} src={imageSrc} />
        </div>
    );
};

export default InfoCard;
