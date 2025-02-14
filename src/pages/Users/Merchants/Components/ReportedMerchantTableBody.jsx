/* eslint-disable max-len */
import React from 'react';
import { useNavigate } from 'react-router';
import { Tooltip } from 'react-tooltip';
import Image from '../../../../components/Image/Image';
import convertTimestampToCAT from '../../../../CommonMethods/timestampToCAT';
import formatID from '../../../../CommonMethods/formatId';

export default function ReportedMerchantTableBody ({ user, index, GetList }) {
    const Navigate = useNavigate();

    return (
        <>
            <tr className='border-b border-neutral-outline h-[48px]'>
                <td
                    title={formatID(user?.merchant_id)}
                    data-testid="merchant_id"
                    className='py-2 px-[10px] text-left min-w-[150px] max-w-[150px]'
                >{formatID(user?.merchant_id) || '-'}</td>
                <td data-testid="merchant_name"
                    title={user?.name}
                    className='py-2 px-[10px] truncate min-w-[200px] max-w-[200px]'>{`${user?.name}`}</td>
                <td className='py-2 px-[10px] truncate min-w-[200px] max-w-[200px]' title={user?.phone_number}>{`${user?.phone_number ? user?.phone_number : '-'}`}</td>
                <td className='py-2 px-[10px] truncate min-w-[200px] max-w-[200px]' title={user?.email}>{`${user?.email ? user?.email : '-'}`}</td>
                <td className='py-2 px-[10px] truncate min-w-[200px] max-w-[200px]'>{convertTimestampToCAT(user?.created_at)}</td>
                <td className='py-3 px-[10px] mr-1 ml-1 flex gap-[19px] text-center align-center justify-end'>
                    <Image className='cursor-pointer' toolTipId={`eye-${index}`} src='eye' testId={`view-${index}`}
                        onClick={() => Navigate(`/users/merchants/reported-merchant/specific-view/${user?.id}`
                        )} />
                    <Tooltip
                        id={`eye-${index}`}
                        className='my-tooltip z-30'
                        place="top"
                        content="View"
                    />
                </td>
            </tr>
        </>
    );
}
