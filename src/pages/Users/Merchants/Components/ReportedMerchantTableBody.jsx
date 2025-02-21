/* eslint-disable max-len */
import React from 'react';
import { useNavigate } from 'react-router';
import { Tooltip } from 'react-tooltip';
import Image from '../../../../components/Image/Image';
import convertTimestampToCAT from '../../../../CommonMethods/timestampToCAT';
import formatID from '../../../../CommonMethods/formatId';
import formatLocalPhoneNumber from '../../../../CommonMethods/formatLocalPhoneNumber';

export default function ReportedMerchantTableBody({ user, index, GetList, setSearchParams, searchParams }) {
    const Navigate = useNavigate();

    return (
        <>
            <tr className='border-b border-neutral-outline h-[48px]'>
                <td
                    title={formatID(user?.merchant_id)}
                    data-testid="merchant_id"
                    className='py-2 px-[10px] text-left'
                >{formatID(user?.merchant_id) || '-'}</td>
                <td data-testid="merchant_name"
                    title={user?.name}
                    className='py-2 px-[10px] truncate'>{`${user?.name}`}</td>
                <td className='py-2 px-[10px] truncate'
                    title={`${user?.country_code} ${user?.phone_number ? user?.phone_number : '-'}`}>
                    {`${user?.country_code} ${formatLocalPhoneNumber(user?.country_code, user?.phone_number)}`}
                </td>
                <td className='py-2 px-[10px] truncate' title={user?.email}>{`${user?.email ? user?.email : '-'}`}</td>
                <td data-testid="reported_date" className='py-2 px-[10px] truncate '>{convertTimestampToCAT(user?.created_at)}</td>
                <td className='py-3 px-[10px] mr-1 ml-1 flex gap-[19px] text-center align-center justify-center'>
                    <Image className='cursor-pointer' toolTipId={`eye-${index}`} src='eye' testId={`view-${index}`}
                        onClick={() => {
                            const query = searchParams.get('search');
                            const activeTab = searchParams.get('tab');

                            let url = `/users/merchants/reported-merchant/specific-view/${user?.id}`;
                            if (query || activeTab) {
                                url += `?${query ? `search=${query}` : ''}${query && activeTab ? '&' : ''}${activeTab ? `tab=${activeTab}` : ''}`;
                            }
                            Navigate(url);
                        }}
                    />
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
