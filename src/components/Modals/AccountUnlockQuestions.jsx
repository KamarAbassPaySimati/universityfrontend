/* eslint-disable no-const-assign */
/* eslint-disable react/jsx-indent */
/* eslint-disable max-len */
import React, { useContext, useState } from 'react';
import Modal from 'react-responsive-modal';
import Button from '../Button/Button';
import GlobalContext from '../Context/GlobalContext';
import { formatInputLocalPhoneNumber } from '../../CommonMethods/formatLocalPhoneNumber';
import { formatLastFourDigitID } from '../../CommonMethods/formatInput';
import Shimmer from '../Shimmers/Shimmer';
import { handleAnswerSubmit } from './AccountUnlock';
import UnlockConformation from './UnlockConformation';

const bankNames = ['CDH Investment Bank', 'Ecobank', 'International Bank', 'National Bank', 'Sate Bank', 'FDH Bank', 'First Capital Bank', 'Centenary Bank', 'National Bank'];

const AccountUnlockQuestions = ({ isModalOpen, setModalOpen, user, question, setQuestion, prevAppearedQuestion, setPrevAppearedQuestion }) => {
    const { setToastSuccess, setToastError } = useContext(GlobalContext);
    const [isLoadingNext, setIsLoadingNext] = useState(false);
    const [value, setValue] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [isResetLink, setIsResetLink] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const formatInput = (value, type) => {
        switch (type) {
        case 'string':
            return value;
        case 'paymaart_id':
            return formatLastFourDigitID(value);
        case 'phone_number':
            return formatInputLocalPhoneNumber(value);
        default:
            return value;
        }
    };

    const handleClose = () => {
        setValue('');
        setPrevAppearedQuestion([]);
        setQuestion({
            question: '',
            answerType: '',
            questionId: ''
        });
        setIsVerified(false);
        setModalOpen(false);
    };

    const handleInputChange = (e) => {
        setValue(formatInput(e.target.value, question?.answerType));
    };

    const handleSelectBank = (bank) => {
        setValue(bank);
        setIsOpen(false);
    };

    const handleConfirm = async (resetLink) => {
        try {
            setIsLoadingNext(true);
            await handleAnswerSubmit({
                paymaart_id: user.paymaart_id,
                question_id: question.questionId,
                answer: question?.answerType === 'phone_number' ? value.split(' ').join('') : value,
                questions: prevAppearedQuestion,
                to_reset: resetLink
            }, setToastError, undefined, setPrevAppearedQuestion, setQuestion, setIsResetLink); // setToastSuccess('Check your email for a password reset link. The link will be active for 10 minutes.');
            setValue('');
            setIsLoadingNext(false);
        } catch (err) {
            // setError('Failed to unlock account. Please try again.');
        } finally {
            setIsLoadingNext(false);
        }
    };
    const handleCloseResetLink = () => {
        setIsResetLink(false);
        handleClose();
    };
    const handleResetLink = () => {
        handleConfirm(true);
        setToastSuccess('Check your email for a password reset link. The link will be active for 10 minutes.');
        handleClose();
        setIsResetLink(false);
    };
    return (
        <Modal center open={isModalOpen} onClose={handleClose}
            closeIcon={<div style={{ color: 'white' }} disabled></div>}
        >
            {!isResetLink
                ? <div className="p-6 w-[531px] bg-white securityQuestionModal scrollbar-hide" data-testid='security_question_modal'>
                    <h1 data-testid="modal-title" className="text-[20px] leading-[28px] font-[400] text-neutral-primary pb-2 border-b border-neutral-outline">
                    Unlock Account
                    </h1>
                    <p data-testid="modal-body" className={'text-[14px] leading-[24px] font-[400] text-neutral-secondary Text mt-2 mb-3'}>
                    Please answer the security question to unlock the account
                    </p>
                    <div className='w-[70%]'>
                        <div className='flex flex-col gap-2 relative'>
                            <label data-testid="security-question" htmlFor={'a'} className='text-neutral-primary text-[14px] font-[500] leading-[16px]'>{isLoadingNext
                                ? (
                                    <Shimmer column={1} row={1} hight={'h-4'} />
                                )
                                : (
                                    question?.question
                                )}</label>
                            <div className=' relative flex justify-center items-center'>
                                {question?.answerType === 'bank_name' &&
                                (<>
                                    <div data-testid='bank'
                                        onClick={() => setIsOpen(!isOpen)}
                                        className={`flex justify-between w-full placeholder:text-neutral-secondary bg-[#F8F8F8] cursor-pointer text-neutral-primary px-[10px] py-[11px] font-[400] text-[14px] leading-[22px] focus:outline-none border-b focus:border-primary-normal
                                border-[#DDDDDD]`}
                                    >
                                        {value === '' ? 'Select Bank' : value}
                                        <img src='/images/chevron-down.svg' className={`ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                    </div>
                                    {isOpen && (
                                        <div className='absolute z-50 mt-1 w-full h-20 left-0 top-11 thin-scrollBar overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg'>
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
                                    )} </>)
                                }
                                {question?.answerType !== 'bank_name' && (
                                    <input
                                        disabled={isLoadingNext || isVerified}
                                        maxLength={50}
                                        data-testid="security-question-answer"
                                        value={value}
                                        type='text'
                                        className={`placeholder:text-neutral-secondary bg-[#F8F8F8] text-neutral-primary px-[10px] py-[11px] font-[400] text-[14px] leading-[22px] focus:outline-none border-b focus:border-primary-normal pr-[119px]
                                    border-[#DDDDDD]`}
                                        id={'a'}
                                        placeholder='Answer'
                                        onChange={handleInputChange}
                                    />)
                                }
                            </div>
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
                                disabled={value.trim().length === 0}
                                className={'w-[117px]'}
                                onClick={() => handleConfirm(false)}
                                isLoading={isLoadingNext}
                                text={'Next'}
                                testId="next_security_question"
                                buttonColor={'bg-primary-normal'}
                            />
                        </div>
                    </div>
                </div>
                : <UnlockConformation handleCloseResetLink={handleCloseResetLink} handleResetLink={handleResetLink}/>}
        </Modal>
    );
};

export default AccountUnlockQuestions;
