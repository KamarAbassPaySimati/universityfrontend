import React from 'react';
import Image from '../Image/Image';
import InputTypeRadio from '../InputField/InputTypeRadio';

export default function KYCRegistration () {
    return (
        <div className='flex w-full py-8 px-10 h-heightFullWithPadding'>
            <div className='w-[40%] bg-primary-normal flex flex-col justify-between pt-[10%]'>
                <div className='flex items-center justify-center'>
                    <div className='flex items-start'>
                        <div>
                            <div class="rounded-full bg-white w-8 h-8 flex items-center justify-center">
                                <Image src={'blueTick'} className="w-5 h-5" />
                            </div>
                            <div className='border-r border-[#ffffff] h-[80px] w-1/2'></div>
                            <div class="rounded-full bg-white w-8 h-8 flex items-center justify-center">
                                <Image src={'grayTick'} className="w-5 h-5" />
                            </div>
                        </div>
                        <div className='px-5'>
                            <p class="flex text-[#ffffff] font-medium text-[16px] leading-[24px]">
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
                                <p class=" text-[#ffffff] font-medium text-[16px] leading-[24px] pt-2">
                                    KYC Registration
                                </p>
                                <p class=" text-[#ffffff] font-normal text-[12px] leading-[20px] pt-4">
                                    Address Details
                                </p>
                                <p class=" text-[#ffffff] font-normal text-[12px] leading-[20px] pt-2">
                                    Identity Details <span className='text-secondary-normal'>Guide</span>
                                </p>
                                <p class=" text-[#ffffff] font-normal text-[12px] leading-[20px] pt-2">
                                    Basic Details
                                </p>
                                <button
                                    className='w-[116px] rounded-[23px] text-background-dark
                                    mt-2 bg-background-light font-normal p-1 text-[14px] leading-[22px]'
                                    testId='kyc-btn'
                                >Pending</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Image src={'qr_light_img'} className={'h-[200px] w-[200px] m-3'}/>
            </div>
            <div className='w-[60%] bg-[#ffffff] px-[80px] flex flex-col justify-between'>
                <div className=''>
                    <p className='font-normal text-[24px] leading-[32px] py-[26px]'>KYC Registration</p>
                    <div className='flex justify-start items-center py-10'>
                        {/* for the active selection bg-background-light */}
                        <div className='w-[240px] flex items-center bg-background-light py-2.5 px-3 rounded'>
                            <Image src="malawi_citizen"/>
                            <p className='px-3 font-medium text-[15px] leading-[20px] text-neutral-primary'>Malawi citizen</p>
                        </div>
                        <div className='w-[240px] flex items-center py-2.5 px-3 rounded ml-[22px]'>
                            <Image src="non_malawi_citizen"/>
                            <p className='px-3 font-medium text-[15px] leading-[20px] text-neutral-primary'>Non Malawi citizen</p>
                        </div>
                    </div>
                    <p className='font-normal text-header-dark text-[16px] leading-[24px] pb-3'>Personal Customer</p>
                    <InputTypeRadio id='mandatory' label="Full KYC"/>
                    <InputTypeRadio id='simplified' label="Simplified KYC*"/>
                    <p className="ml-[40px] text-neutral-primary text-[12px]
                        leading-[20px] font-normal cursor-pointer mb-[36px]">
                        *Simplified KYC Registration is available to Malawi citizens whose monthly income does not exceed
                        300,000 MWK; or whose monthly withdrawals do not exceed 300,000 MWK
                    </p>
                    <div className='w-full flex items-center justify-between bg-background-light py-2.5 px-3 rounded h-[78px]'>
                        <p className='px-3 font-normal text-[20px] leading-[28px] text-header-dark'>Business Customer</p>
                    </div>
                </div>
                <div>
                    <button
                        className='w-full text-[#F6F8F9] h-10 rounded-md
                                 bg-primary-normal p-1 text-[14px] leading-[24px] font-medium'
                        testId='kyc-btn'
                    >Proceed</button>
                    <p className=" text-neutral-primary text-[12px] mt-2
                        leading-[20px] font-normal cursor-pointer mb-10">
                        Paymaart's
                        <span className='text-accent-information cursor-pointer'> KYC Registration process </span>
                        is defined according to provisions of the Financial Crimes Act 2019
                    </p>
                </div>
            </div>
        </div>
    );
}
