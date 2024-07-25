/* eslint-disable max-len */
import React from 'react';
import { useNavigate } from 'react-router';
import { Tooltip } from 'react-tooltip';
import Image from '../../../../components/Image/Image';
import Shimmer from '../../../../components/Shimmers/Shimmer';
import { getStatusStyles, getStatusText } from '../../../../CommonMethods/getStatusUI';

function DeleteAccountTable ({ List, loading, searchParams }) {
    const Navigate = useNavigate();

    // DONT REMOVE IT IS REQUIRED
    // eslint-disable-next-line no-unused-vars
    const geturl = () => {
        switch (searchParams.get('type')) {
        case 'agents':
            return '/verify/kyc-registration/agent-profile/';
        case 'merchants':
            return '/verify/kyc-registration/merchant-profile/';
        case 'customers':
            return '/verify/kyc-registration/customer-profile/';
        default:
            // Add a fallback return value here
            return '/verify/kyc-registration/';
        }
    };

    const formatPhoneNumber = (countryCode, phoneNumber) => {
        const cleanPhoneNumber = phoneNumber.replace(/\s+/g, '');
        const formattedPhoneNumber = `${cleanPhoneNumber.slice(0, 2)} ${cleanPhoneNumber.slice(2, 5)} ${cleanPhoneNumber.slice(5, 9)}`;
        return `${countryCode} ${formattedPhoneNumber}`;
    };

    return (
        <>
            <table className='w-full min-w-max'>
                {(List?.data?.length > 0 || loading) &&
                    <thead className='text-neutral-secondary whitespace-nowrap text-[14px] leading-[24px]'>
                        <tr className=' border-b border-neutral-outline sticky top-0 bg-white z-10'>
                            <th className='py-2 px-[10px] text-left font-[400] '>Paymaart ID</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Name</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Email</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Phone Number</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Status</th>

                            <th className='py-2 px-[10px]'></th>
                        </tr>
                    </thead>}
                {loading
                    ? <Shimmer column={6} row={10} firstIndex />
                    : <tbody className='text-neutral-primary whitespace-nowrap text-[14px] leading-[24px] font-[400]'>
                        {List?.data?.map((user, index) => (
                            <tr key={index} className='border-b border-neutral-outline h-[48px]'>
                                <td data-testid="paymaart_id" title={user?.paymaart_id}
                                    className='py-2 px-[10px] text-left truncate max-w-[50px]'>{user?.paymaart_id || '-'}</td>
                                <td data-testid="agent_name" title={user?.name}
                                    className='py-2 px-[10px] text-left truncate max-w-[200px]'>{user?.name || '-'}
                                </td>
                                <td data-testid="email" title={user?.email}
                                    className='py-2 px-[10px] text-left truncate max-w-[200px]'>{user?.email || '-'}
                                </td>
                                <td data-testid="phone_number" title={user?.phone_number}
                                    className='py-2 px-[10px] text-left truncate max-w-[200px]'>  {user?.country_code && user?.phone_number
                                        ? formatPhoneNumber(user.country_code, user.phone_number)
                                        : '-'}
                                </td>
                                <td data-testid="status" className='py-2 px-[10px]'>
                                    {user?.status
                                        ? (
                                            <span className={`py-[4px] px-[10px] rounded text-[13px] font-semibold capitalize ${getStatusStyles(user?.status)} `} title={getStatusText(user?.status)}>
                                                {getStatusText(user?.status)}
                                            </span>
                                        )
                                        : (
                                            <span className='text-neutral-secondary'>
                                                -
                                            </span>
                                        )}
                                </td>

                                <td className={'py-3 px-[10px] mr-1 ml-1 flex gap-[19px] text-center align-center justify-start'}>
                                    {
                                        <>
                                            <Image toolTipId={`eye-${index}`} testId={`view-${index}`} src='eye' className={'cursor-pointer'}
                                                onClick={() => Navigate(`/verify/delete-account-requests/${searchParams.get('type').slice(0, -1)}-profile/${user?.paymaart_id}`
                                                )}
                                            />
                                        </>
                                    }
                                    <Tooltip
                                        id={`eye-${index}`}
                                        className='my-tooltip z-30'
                                        place="top"
                                        content="View"
                                    />
                                </td>
                            </tr>))}
                    </tbody >
                }
            </table >
        </>
    );
}

export default DeleteAccountTable;
