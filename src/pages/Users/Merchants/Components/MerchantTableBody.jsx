/* eslint-disable max-len */
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { Tooltip } from 'react-tooltip';
import Image from '../../../../components/Image/Image';
import TillNumber from '../../../../components/Modals/TillNumber';
import convertTimestampToCAT from '../../../../CommonMethods/timestampToCAT';
import formatID from '../../../../CommonMethods/formatId';
import AccountUnlockQuestions from '../../../../components/Modals/AccountUnlockQuestions';
import { handleAnswerSubmit } from '../../../../components/Modals/AccountUnlock';
import GlobalContext from '../../../../components/Context/GlobalContext';

export default function MerchantTableBody ({ user, index }) {
    const Navigate = useNavigate();
    const [isTillNumberValue, setIsTillNumberValue] = useState(false);
    const [isUnlock, setIsUnlock] = useState(false);
    const { setToastError } = useContext(GlobalContext);
    const [prevAppearedQuestion, setPrevAppearedQuestion] = useState([]);
    const [correctAttemptCount, setCorrectAttemptCount] = useState(0);

    const [question, setQuestion] = useState({
        question: '',
        answerType: '',
        questionId: ''
    });
    const handleUnlockMerchnnat = () => {
        // setIsUnlock(true);
        handleAnswerSubmit({
            paymaart_id: user.paymaart_id,
            question_id: '',
            answer: '',
            questions: []
        }, setToastError, setIsUnlock, setPrevAppearedQuestion, setQuestion, setCorrectAttemptCount);
    };
    const handleTillNumber = () => {
        setIsTillNumberValue(true);
    };
    return (
        <>
            <tr className='border-b border-neutral-outline h-[48px]'>
                <td
                    title={formatID(user?.paymaart_id)}
                    data-testid="paymaart_id"
                    className='py-2 px-[10px] text-left min-w-[70px] max-w-[70px]'
                >{formatID(user?.paymaart_id) || '-'}</td>
                <td data-testid="merchant_name"
                    title={user?.name}
                    className='py-2 px-[10px] truncate min-w-[200px] max-w-[200px]'>{`${user?.name}`}</td>
                <td className='py-2 px-[10px] truncate min-w-[200px] max-w-[200px]' title={user?.trading_name}>{`${user?.trading_name ? user?.trading_name : '-'}`}</td>
                <td className='py-2 px-[10px]'>{convertTimestampToCAT(user?.created_at)}</td>
                <td
                    className={`py-2 px-[10px] ${user?.till_numbers?.length > 1 ? ' cursor-pointer underline' : 'cursor-default'}`}
                    onClick={() => user?.till_numbers?.length > 1 && handleTillNumber()}
                >{`${(user?.till_numbers && Object.values(user?.till_numbers)[0] !== '') ? user?.till_numbers[0] : '-'}`}</td>
                <td className='py-2 px-[10px] truncate min-w-[200px] max-w-[200px]' title={user?.trading_street_name}>{`${user?.trading_street_name ? user?.trading_street_name : '-'}`}</td>
                <td data-testid="status" className='py-2 px-[10px]'>
                    {user?.status
                        ? (
                            <span className={`py-[2px] px-[10px] rounded text-[13px] font-semibold capitalize
                                             ${user.status === 'active'
                                ? 'bg-[#ECFDF5] text-accent-positive'
                                : 'bg-neutral-grey text-neutral-secondary'}`}>
                                {user.status}
                            </span>
                        )
                        : (
                            <span className='text-neutral-secondary'>
                                -
                            </span>
                        )}
                </td>
                <td className='py-3 px-[10px] mr-1 ml-1 flex gap-[19px] text-center align-center justify-end'>
                    <Image className='cursor-pointer' toolTipId={`eye-${index}`} src='eye' testId={`view-${index}`}
                        onClick={() => Navigate(`/users/merchants/register-merchant/specific-view/${user?.paymaart_id}`
                        )} />
                    {user?.kyc_status === 'completed' && user?.kyc_type === 'full'
                        ? <span className='w-[24px]'></span>
                        : (
                            <Image className='cursor-pointer' toolTipId={`edit-${index}`} src='edit'
                                onClick={() => user?.kyc_status === 'not_started' ? Navigate(`/users/merchants/register-merchant/kyc-registration/${user?.paymaart_id}`) : Navigate(`/users/merchants/register-merchant/kyc-update/${user?.paymaart_id}`)}
                            />
                        )}
                    {!user?.isLocked
                        ? <Image testId={`merchant-lock-btn-${index}`} className='cursor-pointer' toolTipId={`lock-${index}`} onClick={() => handleUnlockMerchnnat()} src='lock'/>
                        : <Image src='unlock' className='cursor-default'/>}
                    <Tooltip
                        id={`eye-${index}`}
                        className='my-tooltip z-30'
                        place="top"
                        content="View"
                    />
                    <Tooltip
                        id={`edit-${index}`}
                        className='my-tooltip z-30'
                        place="top"
                        content={user?.kyc_status === 'not_started' ? 'Complete KYC Registration' : 'Edit'}
                    />
                    <Tooltip
                        id={`lock-${index}`}
                        className='my-tooltip z-30'
                        place="top-end"
                        content="Locked"
                    />
                </td>
            </tr>
            <TillNumber isModalOpen={isTillNumberValue} setModalOpen={setIsTillNumberValue} user={user} />
            <AccountUnlockQuestions
                isModalOpen={isUnlock}
                setModalOpen={setIsUnlock}
                user={user}
                question={question}
                setQuestion={setQuestion}
                prevAppearedQuestion={prevAppearedQuestion}
                setPrevAppearedQuestion={setPrevAppearedQuestion}
                correctAttemptCount={correctAttemptCount}
                setCorrectAttemptCount={setCorrectAttemptCount}
            />
        </>
    );
}
