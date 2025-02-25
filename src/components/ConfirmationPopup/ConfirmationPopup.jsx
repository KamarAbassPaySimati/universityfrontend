/* eslint-disable max-len */
import React from 'react';
import Button from '../Button/Button';

export default function ConfirmationPopup ({ message, buttonWidth, messageStyle, CancelButtonText, title, handleSubmit, isLoading, handleClose, buttonColor, buttonText, Reason, handleReason, handleUpdateStatus, updateStatus }) {
    return (
        <div className="p-6 w-[550px] bg-white rounded-[8px] " data-testid="modal">
            <h1 data-testid="modal-title" className="text-[20px] leading-[28px] font-[400] text-neutral-primary pb-2 border-b border-neutral-outline">
                {title}
            </h1>
            <p data-testid="modal-body" className={messageStyle || 'text-[14px] leading-[24px] font-[400] text-neutral-secondary Text mt-2 mb-4'}>
                {message}
            </p>
            <div onChange={() => handleUpdateStatus(event)} className='mb-8 ml-2'>
                {updateStatus}
            </div>
            <div onChange={() => handleReason(event)}>
                {Reason}
            </div>
            {/* {error && <ErrorMessage error={'Required field'} />} */}
            <div className="flex mt-8 gap-6 justify-end">
                {CancelButtonText !== '' && <button className={`${buttonWidth || 'w-[117px]'} border-[#3B2A6F] text-[#3B2A6F] border rounded-md font-normal text-[14px] leading-6 ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={() => handleClose()}
                    data-testid='cancel_button'
                    disabled={isLoading}
                >
                    {CancelButtonText || 'Cancel'}
                </button>}
                <div className={buttonWidth || 'w-[117px]'}>
                    <Button
                        className={buttonWidth || 'w-[117px]'}
                        onClick={handleSubmit}
                        isLoading={isLoading}
                        text={`${buttonText === undefined || buttonText === null ? 'Confirm' : buttonText}`}
                        testId="confirm_button"
                        buttonColor={buttonColor}
                    />
                </div>
            </div>
        </div>
    );
}
