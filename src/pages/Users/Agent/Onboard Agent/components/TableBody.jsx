/* eslint-disable max-len */
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { Tooltip } from 'react-tooltip';
import Image from '../../../../../components/Image/Image';
import convertTimestampToCAT from '../../../../../CommonMethods/timestampToCAT';
import formatID from '../../../../../CommonMethods/formatId';
import AccountUnlockQuestions from '../../../../../components/Modals/AccountUnlockQuestions';
import { handleAnswerSubmit } from '../../../../../components/Modals/AccountUnlock';
import GlobalContext from '../../../../../components/Context/GlobalContext';
import formatLocalPhoneNumber from '../../../../../CommonMethods/formatLocalPhoneNumber';
import { useDispatch } from 'react-redux';
import { setSearchedParamsList } from '../../../../../redux/GlobalSlice';

export default function TableBody ({ user, index, GetList, searchParams }) {
    const Navigate = useNavigate();
    const [isUnlock, setIsUnlock] = useState(false);
    const { setToastError } = useContext(GlobalContext);
    const [prevAppearedQuestion, setPrevAppearedQuestion] = useState([]);
    const [loadingUnlock, setLoadingUnlock] = useState(false);
    const [question, setQuestion] = useState({
        question: '',
        answerType: '',
        questionId: ''
    });
    const handleUnlock = async () => {
        setLoadingUnlock(true);
        await handleAnswerSubmit({
            paymaart_id: user.paymaart_id,
            question_id: '',
            answer: '',
            questions: [],
            to_reset: false
        }, setToastError, setIsUnlock, setPrevAppearedQuestion, setQuestion);
        setLoadingUnlock(false);
    };
    const dispatch = useDispatch();
    const searchParamsString = window.location.search;

    return (
        <>
            <tr key={index} className='border-b border-neutral-outline h-[48px]'>
                <td data-testid="paymaart_id" title={formatID(user?.paymaart_id)} className='py-2 px-[10px] text-left truncate min-w-[70px] max-w-[70px]'>{formatID(user?.paymaart_id) || '-'}</td>
                <td data-testid="agent_name" title={user?.name} className='py-2 px-[10px] truncate min-w-[200px] max-w-[200px]'>{`${user?.name}`}</td>
                <td data-testid="phone_number" className='py-2 px-[10px]'>{`${user?.country_code} ${formatLocalPhoneNumber(user?.country_code, user?.phone_number)}`}</td>
                <td className='py-2 px-[10px]'>{convertTimestampToCAT(user?.created_at)}</td>
                <td className='py-2 px-[10px]'>
                    {user?.last_logged_in
                        ? isNaN(Number(user?.last_logged_in))
                            ? <span style={{ color: '#13B681', fontWeight: 'semibold' }}>Online</span>
                            : convertTimestampToCAT(user?.last_logged_in)
                        : '-'}</td>
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
                        onClick={() => Navigate(`/users/agents/register-agent/specific-view/${user?.paymaart_id}`,
                            { state: { page: searchParams.get('page'), status: searchParams.get('status') ? searchParams.get('status') : '', search: searchParams.get('search') ? searchParams.get('search') : '' } }
                        )} />
                    {user?.kyc_status === 'completed' && user?.kyc_type === 'full'
                        ? <span className='w-[24px]'></span>
                        : (
                            <Image className='cursor-pointer' toolTipId={`edit-${index}`} src='edit'
                                onClick={() => user?.kyc_status === 'not_started'
                                    ? Navigate(`/users/agents/register-agent/kyc-registration/${user?.paymaart_id}`, { state: { page: searchParams.get('page'), status: searchParams.get('status') ? searchParams.get('status') : '', search: searchParams.get('search') ? searchParams.get('search') : '' } }
                                    )
                                    : Navigate(`/users/agents/register-agent/kyc-update/${user?.paymaart_id}`)}
                            />
                        )}
                    <Image testId={`agent-transaction-view-btn-${index}`} className='cursor-pointer' toolTipId={`transactions-${index}`}
                        onClick={() => {
                            // Navigate to the new route with state
                            Navigate(`/users/agents/agents-transaction-histories/${user?.paymaart_id}`, {
                                state: {
                                    page: searchParams.get('page'),
                                    status: searchParams.get('status') || '',
                                    search: searchParams.get('search') || ''
                                }
                            });

                            // Dispatch the search params string to Redux
                            dispatch(setSearchedParamsList(searchParamsString));
                        }}src='report' />
                    {loadingUnlock
                        ? <div role="status">
                            <svg aria-hidden="true" class="w-6 h-6 text-gray-200 animate-spin  fill-[#3B2A6F]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>
                        : user?.is_locked
                            ? <Image testId={`unlock_button_${index}`} className='cursor-pointer' toolTipId={`lock-${index}`} onClick={() => handleUnlock()} src='lock'/>
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
                        id={`transactions-${index}`}
                        className='my-tooltip z-30'
                        place="top"
                        content="Transaction History"
                    />
                    <Tooltip
                        id={`lock-${index}`}
                        className='my-tooltip z-30'
                        place="top-end"
                        content="Locked"
                    />
                </td>
            </tr>
            <AccountUnlockQuestions
                isModalOpen={isUnlock}
                setModalOpen={setIsUnlock}
                user={user}
                question={question}
                setQuestion={setQuestion}
                prevAppearedQuestion={prevAppearedQuestion}
                setPrevAppearedQuestion={setPrevAppearedQuestion}
                GetList={GetList}
            />
        </>
    );
}
