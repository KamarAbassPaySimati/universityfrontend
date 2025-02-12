/* eslint-disable max-len */
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Tooltip } from 'react-tooltip';
import Image from '../../../../components/Image/Image';
import TillNumber from '../../../../components/Modals/TillNumber';
import convertTimestampToCAT from '../../../../CommonMethods/timestampToCAT';
import formatID from '../../../../CommonMethods/formatId';
import AccountUnlockQuestions from '../../../../components/Modals/AccountUnlockQuestions';

export default function ReportedMerchantTableBody ({ user, index, GetList }) {
    const Navigate = useNavigate();
    const [isTillNumberValue, setIsTillNumberValue] = useState(false);
    const [isUnlock, setIsUnlock] = useState(false);
    const [prevAppearedQuestion, setPrevAppearedQuestion] = useState([]);
    const [question, setQuestion] = useState({
        question: '',
        answerType: '',
        questionId: ''
    });

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
                <td className='py-3 px-[10px] mr-1 ml-1 flex gap-[19px] text-center align-center justify-end'>
                    <Image className='cursor-pointer' toolTipId={`eye-${index}`} src='eye' testId={`view-${index}`}
                        onClick={() => Navigate(`/users/merchants/register-merchant/specific-view/${user?.paymaart_id}`
                        )} />
                    <Tooltip
                        id={`eye-${index}`}
                        className='my-tooltip z-30'
                        place="top"
                        content="View"
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
                GetList={GetList}
            />
        </>
    );
}
