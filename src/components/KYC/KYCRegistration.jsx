import React, { useState } from 'react';
import Image from '../Image/Image';
import InputTypeRadio from '../InputField/InputTypeRadio';
import Button from '../Button/Button';
import KYCRegistrationPopup from './KYCRegistrationPopup';
import KYCRegistrationStatusPart from './KYCRegistrationStatusPart';

export default function KYCRegistration ({ states, handleStates, handleSubmit, isLoading }) {
    const citizenType = ['Malawi citizen', 'Non Malawi citizen'];
    const personalCustomer = ['Full KYC', 'Simplified KYC'];
    const [registrationProcess, setRegistrationProcess] = useState(false);
    return (
        <div className='flex w-full py-8 px-10 h-heightFullWithPadding'>
            <KYCRegistrationStatusPart status={'Pending'}/>
            <div className='w-[60%] bg-[#ffffff] px-[80px] flex flex-col justify-between  overflow-auto scrollBar'>
                <div className=''>
                    <p className='font-normal text-[24px] leading-[32px] py-[5%]'>KYC Registration</p>
                    <div className='flex justify-start items-center py-[5%] flex-wrap'>
                        {/* for the active selection bg-background-light */}
                        {citizenType.map((item, index = 0) => (
                            <div
                                className={`flex ${states?.citizen_type === item ? 'bg-background-light ' : ''}
                                py-2.5 px-3 rounded items-center cursor-pointer`}
                                key={item}
                                data-testid={item.replaceAll(' ', '_').toLowerCase()}
                                onClick={() => handleStates(item, 'citizen_type')}
                            >
                                <Image src={item.replaceAll(' ', '_').toLowerCase()}/>
                                <p className='px-3 font-medium text-[15px] leading-[20px] text-neutral-primary
                                text-wrap'>{item}</p>
                            </div>))}
                    </div>
                    <p className='font-normal text-header-dark text-[16px] leading-[24px] pb-3'>Personal Customer</p>
                    {personalCustomer.map((radioItem) => (
                        (states?.citizen_type === 'Non Malawi citizen' && radioItem !== 'Full KYC')
                            ? null
                            : (
                                <InputTypeRadio
                                    id={radioItem}
                                    label={radioItem}
                                    key={radioItem}
                                    checkedState={states?.personal_customer === radioItem}
                                    handleRadioButton={() => handleStates(radioItem, 'personal_customer')}
                                />)))}
                    {states?.citizen_type === 'Malawi citizen' && <>
                        <p className="ml-[30px] text-neutral-primary text-[12px]
                        leading-[20px] font-normal cursor-pointer mb-[5%]">
                            *Simplified KYC Registration is available to Malawi citizens whose monthly income does not exceed
                            300,000 MWK; or whose monthly withdrawals do not exceed 300,000 MWK
                        </p>
                        <div className='w-full flex items-center justify-between bg-background-light px-3 rounded '>
                            <p className='px-3 font-normal text-[20px] leading-[28px] text-header-dark'>Business Customer</p>
                            <div className="moving-text-container">
                                <button className="moving-text-btn">
                                    <span
                                        className="moving-text font-normal text-[12px] leading-[18px] text-[#FFFFFF]">
                                        Coming Soon</span>
                                </button>
                            </div>

                        </div>
                    </>}
                </div>
                <div>
                    <Button
                        className='w-full text-[#F6F8F9] h-10 rounded-md
                                 bg-primary-normal p-1 text-[14px] leading-[24px] font-medium mt-4'
                        testId='proceed_button'
                        text={'Proceed'}
                        isLoading={isLoading}
                        onClick={() => handleSubmit('proceed')}
                    />
                    <p className=" text-neutral-primary text-[12px] mt-2
                        leading-[20px] font-normal mb-10">
                        Paymaart&apos;s
                        <span className='text-accent-information cursor-pointer'
                            onClick={() => setRegistrationProcess(true)}> KYC Registration process </span>
                        is defined according to provisions of the Financial Crimes Act 2019
                    </p>
                </div>
            </div>
            <KYCRegistrationPopup handleClose={() => setRegistrationProcess(false)} isModalOpen={registrationProcess}/>
        </div>
    );
}
