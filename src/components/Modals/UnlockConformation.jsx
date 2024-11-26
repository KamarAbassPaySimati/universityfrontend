/* eslint-disable no-const-assign */
/* eslint-disable react/jsx-indent */
/* eslint-disable max-len */
import React, { useState } from 'react';
import Button from '../Button/Button';

const UnlockConformation = ({ handleCloseResetLink, handleResetLink }) => {
    // const { setToastSuccess, setToastError } = useContext(GlobalContext);
    // unlock-sed-link
    const [isLoading, setIsLoading] = useState(false);
    const handleResetLinkClick = async () => {
        setIsLoading(true);
        await handleResetLink();
        setIsLoading(false);
    };
    return (
        <div className="p-6 w-[531px] bg-white securityQuestionModal scrollbar-hide " data-testid="modal">
            <div className='flex justify-center items-center'>
                <img src='/images/unlock-sed-link.svg' />
            </div>
            <h1 data-testid="modal-title" className="text-center text-[20px] leading-[28px] font-[400] text-[#000103] py-2 ">
            Your account is now unlocked
            </h1>
            <p data-testid="modal-body" className={'text-center text-[14px] leading-[24px] font-[400] text-neutral-secondary mb-3'}>
            To securely access your account, please reset your password </p>
            <div className={'flex item-center justify-center'}>
                <div className='w-[200px]'>
                    <Button
                        // disabled={value.trim().length === 0}
                        className={'w-[117px]'}
                        onClick={() => handleResetLinkClick()}
                        isLoading={isLoading}
                        text={'Request Reset Link'}
                        testId="confirm_button"
                        buttonColor={'bg-primary-normal'}
                    />
                </div>
            </div>
            <p className='text-[#3B2A6F] text-center text-[14px] leading-[24px] font-[400] pt-[20px] cursor-pointer' onClick={() => handleCloseResetLink()}>Cancel</p>
        </div>
    );
};

export default UnlockConformation;
