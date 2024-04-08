/* eslint-disable max-len */
import React from 'react';
import Button2 from '../Button2/Button2';
import Button from '../Button/Button';

export default function ConfirmationPopup ({ message, title, handleSubmit, isLoading, handleClose, buttonColor }) {
    return (
        <div className="p-6 w-full bg-white rounded-[8px]" data-testid="modal">
            <h1 data-testid="modal-title" className="text-[20px] leading-[28px] font-[400] text-neutral-primary pb-2 border-b border-neutral-outline">
                {title}
            </h1>
            <p data-testid="modal-body" className="text-[14px] leading-[24px] font-[400] text-neutral-secondary Text mt-2">
                {message}
            </p>
            <div className="flex mt-8 gap-6">
                <Button2 className='w-[117px]' onClick={() => handleClose()} text='Cancel' testId='cancel_button' />
                <Button
                    className='w-[117px]'
                    onClick={handleSubmit}
                    isLoading={isLoading}
                    text='Confirm'
                    testId="confirm_button"
                    buttonColor= {buttonColor}
                />
            </div>
        </div>
    );
}
