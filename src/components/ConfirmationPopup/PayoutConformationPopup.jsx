/* eslint-disable max-len */
import React from 'react';
import Button from '../Button/Button';
import FelidDivision from '../FelidDivision/FelidDivision';
import UploadPlaceholder from '../S3Upload/UploadPlaceholder';

export default function PayoutConformationPopup ({
    states, setState,
    message, buttonWidth, messageStyle, CancelButtonText, viewOutside, Felids, title, handleSubmit, isLoading, handleClose, buttonColor, buttonText, submitSelected, id
}) {
    const handleStates = (value, id, type) => {
        if (type === 'input') {
            setState((prevState) => ({ ...prevState, [id]: value.target.value }));
        } else {
            setState((prevState) => ({ ...prevState, [id]: value }));
        }
    };
    return (
        <div>
            <div className="p-6 w-[780px] bg-white rounded-[8px] " data-testid="modal">
                <h1 data-testid="modal-title" className="ml-2 text-[20px] leading-[28px] font-[400] text-neutral-primary pb-2 border-b border-neutral-outline">
                    {title}
                </h1>
                <p data-testid="modal-body" className={ messageStyle || 'text-[14px] leading-[24px] font-[400] ml-2 text-neutral-secondary Text mt-2'}>
                    {message}
                </p>
                <FelidDivision
                    divisionClassName = {'w-1/3'}
                    divisionObject = {Felids}
                    handleOnChange={handleStates}
                    states={states}
                    submitSelected={submitSelected}
                />
                <div className="w-[339px] relative ml-2">
                    <UploadPlaceholder
                        label={'Transaction POP'}
                        labelValue={'Transaction POP'}
                        testId={'pop_file_key'}
                        disabled={undefined}
                        path={`approve_payout_request/${id}`}
                        handleUploadImg={handleStates}
                        selectedUploadImg={'pop_file_key'}
                        states={states}
                        handleStates={handleStates}
                        error={submitSelected && (states?.pop_file_key?.trim() === '' ||
                                    states.pop_file_key === undefined)}
                        viewOutside={viewOutside}
                    />
                </div>
                <div className="flex mt-8 gap-6 justify-end">
                    <button className={`${buttonWidth || 'w-[117px]'} border-[#3B2A6F] text-[#3B2A6F] border rounded-md font-normal text-[14px] leading-6 ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        onClick={() => handleClose()}
                        data-testid='cancel_button'
                        disabled={isLoading}
                    >
                        {CancelButtonText || 'Cancel'}
                    </button>
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

        </div>
    );
}
