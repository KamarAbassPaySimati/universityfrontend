/* eslint-disable max-len */
import React from 'react';
import Image from '../../../../../components/Image/Image';

const InfoCard = ({
    title,
    amount,
    lastUpdated,
    additionalInfo,
    imageSrc,
    bgColor = 'bg-primary-normal',
    isLoading
}) => {
    return (
        <div className={`${bgColor} ${title === 'Wallet Balance' ? 'py-[22px]' : 'pt-[22px] pb-2'} px-10 relative rounded-md text-white w-1/2 flex flex-col justify-between min-h-[156px]`}>
            <p className='text-2xl font-[400]'>{title}</p>
            <div className={`flex flex-col ${title === 'Wallet Balance' ? 'gap-1' : ''}`}>
                {isLoading
                    ? <>
                        <p className='text-3xl font-[700] flex gap-2'>
                            <tbody className=''>
                                <tr className="animate-pulse z-0">
                                    <td className={'text-sm font-light text-[#13365C] min-w-[180px]'}>
                                        <div className={'h-9 bg-slate-200 rounded z-[-10] relative'} />
                                    </td>
                                </tr>
                            </tbody>
                            MVK
                        </p>
                        <p className='text-sm font-[400] text-neutral-secondary flex'>
                            Last Updated:
                            <tbody className=''>
                                <tr className="animate-pulse z-0">
                                    <td className={'text-sm font-light text-[#13365C] px-2.5 min-w-[180px]'}>
                                        <div className={'h-5 bg-slate-200 rounded z-[-10] relative'} />
                                    </td>
                                </tr>
                            </tbody>
                        </p>
                        {title !== 'Wallet Balance' && <p className='text-sm font-[400] text-neutral-secondary flex'>
                            Next settlement on:
                            <tbody className=''>
                                <tr className="animate-pulse z-0">
                                    <td className={'text-sm font-light text-[#13365C] px-2.5 min-w-[180px]'}>
                                        <div className={'h-5 bg-slate-200 rounded z-[-10] relative'} />
                                    </td>
                                </tr>
                            </tbody>
                        </p>}
                    </>
                    : <>
                        <p className='text-3xl font-[700]'>{amount}</p>
                        <p className='text-sm font-[400] text-neutral-secondary'>Last Updated: {lastUpdated}</p>
                        {additionalInfo && <p className='text-sm font-[400] text-neutral-secondary'>Next settlement on: {additionalInfo}</p>}
                    </>}
            </div>
            <Image className={`absolute bottom-0 ${title === 'Wallet Balance' ? 'right-6' : 'right-0'}`} src={imageSrc} />
        </div>
    );
};

export default InfoCard;
