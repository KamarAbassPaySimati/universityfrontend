/* eslint-disable max-len */
import React, { useContext, useState } from 'react';
import Modal from 'react-responsive-modal';
import Button from '../Button/Button';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { BeatLoader } from 'react-spinners';
import Image from '../Image/Image';
import GlobalContext from '../Context/GlobalContext';

const bankNames = ['CDH Investment Bank', 'Ecobank', 'International Bank', 'National Bank', 'Sate Bank', 'FDH Bank', 'First Capital Bank', 'Centenary Bank', 'National Bank'];

const AccountUnlockQuestions = ({ isModalOpen, setModalOpen, user, type }) => {
    const { setToastSuccess } = useContext(GlobalContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [value, setValue] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [correctAttemptCount, setCorrectAttemptCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setValue('');
        setError('');
        setCorrectAttemptCount(0);
        setIsVerified(false);
        setModalOpen(false);
        setModalOpen(false);
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setValue(inputValue);
        if (error) {
            setError('');
        }
    };

    const handleSelectBank = (bank) => {
        setValue(bank);
        setIsOpen(false);
    };

    const handleVerify = async () => {
        if (!value.trim()) {
            setError('Required field');
            return;
        }
        setIsLoading(true);
        try {
            console.log('Api call to verify');
            const isAnswerCorrect = true;
            if (isAnswerCorrect) {
                setCorrectAttemptCount(prev => prev + 1);
                setError('');
            } else {
                console.log('call api');
            }
            setValue('');
        } catch (err) {
            setError('Verification failed. Please try again.');
        } finally {
            if (correctAttemptCount === 1) {
                setIsVerified(true);
            }
            setIsLoading(false);
        }
    };

    const handleConfirm = async () => {
        if (!isVerified) {
            setError('Please verify your answer first');
            return;
        }

        setIsLoading(true);
        try {
            console.log('Mail sent');
            setToastSuccess('Check your email for a password reset link. The link will be active for 10 minutes.');
            handleClose();
        } catch (err) {
            setError('Failed to unlock account. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    console.log(user);

    return (
        <Modal center open={isModalOpen} onClose={handleClose}
            closeIcon={<div style={{ color: 'white' }} disabled></div>}
        >
            <div className="p-6 w-[531px] h-[292px] bg-white securityQuestionModal" data-testid="modal">
                <h1 data-testid="modal-title" className="text-[20px] leading-[28px] font-[400] text-neutral-primary pb-2 border-b border-neutral-outline">
                    Unlock Account
                </h1>
                <p data-testid="modal-body" className={'text-[14px] leading-[24px] font-[400] text-neutral-secondary Text mt-2 mb-3'}>
                    Please answer the security question to unlock the account
                </p>
                <div className='w-[70%]'>
                    {/* <div className='text-neutral-primary text-[14px] leading-[16px] font-medium mb-2'>What was your childhood nickname?</div> */}
                    {/* <input data-testid="reason" className={'w-full border border-[#F8F8F8] bg-[#dddddd38] placeholder:font-normal placeholder:text-sm placeholder:text-[#8E949A] p-2.5 outline-none rounded border-bottom-default'} placeholder="Enter reason"> */}
                    {/* </input> */}
                    <div className='flex flex-col gap-2 relative'>
                        <label htmlFor={'a'} className='text-neutral-primary text-[14px] font-[500] leading-[16px]'>What was your childhood nickname?</label>
                        <div className='bg-[#F8F8F8] relative w-fit flex justify-center items-center'>
                            {/* <input
                                disabled={isLoading || isVerified}
                                maxLength={100}
                                data-testid="account-unlock-answer"
                                value={value}
                                type='text'
                                className={`placeholder:text-neutral-secondary bg-[#F8F8F8] text-neutral-primary px-[10px] py-[11px] font-[400] text-[14px] leading-[22px] focus:outline-none border-b focus:border-primary-normal pr-[119px]
                                    ${error ? 'border-error' : 'border-[#DDDDDD]'}`}
                                id={'a'}
                                placeholder='Answer'
                                onChange={handleInputChange}
                            /> */}
                            <div
                                data-testid='change_code'
                                onClick={() => (isLoading || isVerified) && isOpen ? setIsOpen(false) : setIsOpen(true)}
                                className={`flex justify-between w-[350px] placeholder:text-neutral-secondary bg-[#F8F8F8] text-neutral-primary px-[10px] py-[11px] font-[400] text-[14px] leading-[22px] focus:outline-none border-b focus:border-primary-normal pr-[119px]
                                    ${error ? 'border-error' : 'border-[#DDDDDD]'}`}
                            >
                                {value === '' ? 'Select Bank' : value}
                                <img src='/images/chevron-down.svg' className={`ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                            </div>
                            {isOpen && (
                                <div className='absolute z-50 mt-1 w-[60%] h-28 left-0 top-11 thin-scrollBar overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg'>
                                    {bankNames.map((bank) => (
                                        <>
                                            <div
                                                key={bank}
                                                onClick={() => handleSelectBank(bank)}
                                                className='px-2 py-2 text-[14px] hover:bg-gray-200 cursor-pointer text-primary-normal'
                                                data-testid={'change_code_option'}
                                            >
                                                {bank}
                                            </div>
                                        </>
                                    ))}
                                </div>
                            )}
                            {isVerified
                                ? <div className='absolute top-0 right-0 items-center h-[45px] mr-3 flex gap-[10px]'>
                                    <Image src='greenTick' />
                                    <div data-testid={'buttonTestId'} className='text-accent-positive font-[400] text-[14px] leading-[22px]'>
                                        VERIFIED
                                    </div>
                                </div>
                                : <button data-testid={'buttonTestId'} className='absolute top-0 right-0 bg-[#FFFFFF] w-[95px] h-[34px] rounded-[8px] text-primary-normal
                    disabled:text-neutral-secondary font-[400] text-[14px] leading-[22px] my-[5px] mr-3 disabled:border-[#F5F5F5]
                        border-neutral-secondary border' disabled={isLoading} onClick={handleVerify}
                                >
                                    {!isLoading
                                        ? 'VERIFY'
                                        : <span>{<BeatLoader color='#3B2A6F' size='7px' />}</span>}
                                </button>}
                        </div>
                    </div>
                    <div className='flex justify-between mt-2'>
                        <ErrorMessage className={'mt-2'} error={error} />
                        <p className='text-[14px] leading-[16px] text-neutral-primary font-medium'>{correctAttemptCount}/2</p>
                    </div>
                </div>
                <div className="flex mt-8 gap-6 justify-end">
                    {<button className={'w-[117px] border-[#3B2A6F] text-[#3B2A6F] border rounded-md font-normal text-[14px] leading-6'}
                        onClick={() => handleClose()}
                        data-testid='cancel_button'
                    >
                        {'Cancel'}
                    </button>}
                    <div className={'w-[117px]'}>
                        <Button
                            className={'w-[117px]'}
                            onClick={handleConfirm}
                            isLoading={isLoading}
                            text={'Confirm'}
                            testId="confirm_button"
                            buttonColor={'bg-primary-normal'}
                        />
                    </div>

                </div>
            </div>
        </Modal>
    );
};

export default AccountUnlockQuestions;
