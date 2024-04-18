import React, { useState } from 'react';
import Image from '../Image/Image';
import KYCGuidPopup from './KYCGuidPopup';

export default function KYCRegistrationStatusPart ({ status }) {
    const [guidOpen, setGuidOpen] = useState(false);

    return (
        <>
            <div className='w-[40%] bg-primary-normal flex flex-col justify-between pt-[10%]'>
                <div className='flex items-center justify-center'>
                    <div className='flex items-start'>
                        <div>
                            <div
                                className="rounded-full bg-white w-8 h-8 flex items-center justify-center"
                            >
                                <Image src={'blueTick'} className="w-5 h-5" />
                            </div>
                            <div className='border-r border-[#ffffff] h-[80px] w-1/2'></div>
                            <div className="rounded-full bg-white w-8 h-8 flex items-center justify-center">
                                <Image src={'grayTick'} className="w-5 h-5" />
                            </div>
                        </div>
                        <div className='px-5'>
                            <p className="flex text-[#ffffff] font-medium text-[16px] leading-[24px]">
                                Registration
                            </p>
                            <div className='h-[80px]'>
                                <button
                                    className='w-[116px] rounded-[23px] text-[#ffffff]
                                    mt-2 bg-accent-positive font-normal p-1 text-[14px] leading-[22px]'
                                    testId='kyc-btn'
                                    text='Completed'
                                >Completed</button>
                            </div>
                            <div>
                                <p className=" text-[#ffffff] font-medium text-[16px] leading-[24px] pt-2">
                                    KYC Registration
                                </p>
                                <p className=" text-[#ffffff] font-normal text-[12px] leading-[20px] pt-4">
                                    Address Details
                                </p>
                                <p className=" text-[#ffffff] font-normal text-[12px] leading-[20px] pt-2">
                                    Identity Details
                                    <span
                                        className='text-secondary-normal cursor-pointer'
                                        onClick={() => setGuidOpen(true)}
                                    > Guide</span>
                                </p>
                                <p className=" text-[#ffffff] font-normal text-[12px] leading-[20px] pt-2">
                                    Basic Details
                                </p>
                                <button
                                    className={`w-[116px] rounded-[23px] mt-2 
                                    ${status === 'Pending'
            ? 'bg-background-light text-background-dark'
            : 'bg-[#FFEED9] text-[#FD9101]'} 
                                    font-normal p-1 text-[14px] leading-[22px]`}
                                    testId='kyc-btn'
                                >{status}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Image src={'qr_light_img'} className={'h-[200px] w-[200px] m-3'}/>
            </div>
            <KYCGuidPopup handleClose={() => setGuidOpen(false)} isModalOpen={guidOpen}/>

        </>

    );
}
