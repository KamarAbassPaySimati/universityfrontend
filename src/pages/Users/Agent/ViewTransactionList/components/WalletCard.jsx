import React from 'react';
import Image from '../../../../../components/Image/Image';

const WalletCard = () => {
    return (
        <div className='bg-primary-normal px-10 py-[22px] relative rounded-md
         text-white w-1/2 flex flex-col justify-between min-h-[156px]'>
            <p className='text-2xl font-[400]'>Wallet Balance</p>
            <div className='flex flex-col gap-1'>
                <p className='text-3xl font-[700]'>24,000.00 MWK</p>
                <p className='text-sm font-[400] text-neutral-secondary'>Last Updated: 12 Jan 2024, 12:30 hours</p>
            </div>
            <Image className='absolute right-6 bottom-0' src='wallet_balance' />
        </div>
    );
};

export default WalletCard;
