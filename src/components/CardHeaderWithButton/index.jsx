import React from 'react';
import { navigate } from '@reach/router';
import Shimmer from './Shimmer'; // Assuming Shimmer component is imported
import Image from '../Image/Image';

const CardHeaderWithButton = ({
    ChildrenElement, header, buttonText, navigationPath, statusButton, onHandleStatusChange,
    updateButton, updateButtonPath
}) => {
    return (
        <div>
            <div className={`${ChildrenElement ? '' : 'bg-[#FFFFFF] border-b border-neutral-outline py-7 px-8'} mx-10 
        mt-8 mb-6 text-[30px] font-[700] 
        leading-[40px] text-header-dark 
        flex flex-row justify-between `}>
                {header}
                <div className='flex'>
                    {buttonText && (
                        <button onClick={() => { navigate(navigationPath); }}
                            className='flex bg-primary-normal py-[8px] px-[16px]
                            justify-center items-center h-[40px] rounded-[6px]'>
                            <img src='/images/onboardIcon.svg' className='mr-[8px]'/>
                            <p className='text-[14px] font-semibold text-[#ffffff]'>{buttonText}</p>
                        </button>
                    )}
                    {statusButton === true
                        ? (
                            <Shimmer hight={'h-10'}/>
                        )
                        : (statusButton !== undefined && (
                            <button data-testid="activate_deactivate_button" onClick={onHandleStatusChange}
                                className={`flex ${statusButton === 'Activate'
                                    ? 'bg-[#13B681]'
                                    : 'bg-[#FF6363]'} py-[8px] px-[16px] 
                            justify-center items-center h-[40px] rounded-[6px]`}>
                                <p className='text-[14px] font-semibold text-[#ffffff]'>{statusButton}</p>
                            </button>
                        ))}
                    {statusButton && (updateButton === false
                        ? (
                            <button data-testid="update_button" onClick={() => { navigate(updateButtonPath); }}
                                className='ml-6 flex bg-primary-normal py-[8px] px-[16px]
                            justify-center items-center h-[40px] rounded-[6px]'>
                                <Image src='update' className='mr-[8px]'/>
                                <p className='text-[14px] font-semibold text-[#ffffff]'>Update</p>
                            </button>
                        )
                        : (updateButton === true && (
                            <div className='ml-6 '><Shimmer hight={'h-10'}/></div>
                        )))}
                </div>
            </div>
        </div>

    );
};

export default CardHeaderWithButton;
