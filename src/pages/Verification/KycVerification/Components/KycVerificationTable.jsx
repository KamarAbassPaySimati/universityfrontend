/* eslint-disable max-len */
import React from 'react';
import Image from '../../../../components/Image/Image';
import Shimmer from '../../../../components/Shimmers/Shimmer';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { handleSort } from '../../../../CommonMethods/ListFunctions';
import NoDataError from '../../../../components/NoDataError/NoDataError';
import formatTimestamp from '../../../../CommonMethods/formatTimestamp';

const KycVerificationTable = (
    {
        loading, error, List, setSearchParams, notFound, searchParams, CurrentUserRole, paymaartId
    }
) => {
    return (
        <>
            <table className='w-full min-w-max'>
                {(List?.data?.length > 0 || loading) &&
                <thead className='text-neutral-secondary whitespace-nowrap text-[14px] leading-[24px]'>
                    <tr className=' border-b border-neutral-outline sticky top-0 bg-white z-10'>
                        <th className='py-2 px-[10px] text-left font-[400] '>Paymaart ID</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Name</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>
                            <div className='cursor-pointer flex gap-1 w-fit' data-testid="sort_admin_name" onClick={() => handleSort('submission_date', searchParams, setSearchParams)}>
                                <span>Submission Date</span>
                                <Image src='sort_icon' />
                            </div>
                        </th>
                        <th className='py-2 px-[10px] text-left font-[400]'>KYC Type</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Status</th>
                        <th className='py-2 px-[10px]'></th>
                    </tr>
                </thead>}
                {loading
                    ? <Shimmer column={6} row={10} firstIndex/>
                    : <tbody className='text-neutral-primary whitespace-nowrap text-[14px] leading-[24px] font-[400]'>
                        { List?.data?.map((user, index) => (
                            <tr key={index} className='border-b border-neutral-outline h-[48px]'>
                                <td data-testid="paymaart_id"
                                    className='py-2 px-[10px] text-left truncate max-w-[50px]'>{user?.paymaart_id || '-'}</td>
                                <td data-testid="name"
                                    className='py-2 px-[10px] text-left truncate max-w-[200px]'>{user?.name || '-'}
                                </td>
                                <td data-testid="submission_date" className='py-2 px-[10px] text-left truncate max-w-[300px]'>
                                    {formatTimestamp(user?.updated_at)}</td>
                                <td data-testid="kyc_type" className='py-2 px-[10px] text-left truncate max-w-[300px]'>
                                    {user?.citizen === 'Malawian'
                                        ? (user?.kyc_type === 'full' ? 'Malawi Full KYC' : 'Malawi Simplified KYC')
                                        : (user?.kyc_type === 'full' ? 'Non Malawi Full KYC' : 'Non Malawi Simplified KYC')}
                                </td>
                                <td data-testid="status" className='py-2 px-[10px]'>
                                    {user?.kyc_status
                                        ? (
                                            <span className={`py-[4px] px-[10px] rounded text-[13px] font-[600] capitalize 
                                            ${
                                            user?.kyc_status === 'in_progress'
                                                ? 'bg-accent-info-secondary text-accent-information'
                                                : user?.kyc_status === 'completed'
                                                    ? 'bg-accent-positive-secondary text-accent-positive'
                                                    : user?.kyc_status === 'info_required'
                                                        ? 'bg-accent-negative-secondary text-primary-negative'
                                                        : '' // Default styles when kyc_status doesn't match any condition
                                            }
                                            `}>
                                                {
                                                    user?.kyc_status === 'in_progress'
                                                        ? 'In-progress'
                                                        : user?.kyc_status === 'completed'
                                                            ? 'Completed'
                                                            : user?.kyc_status === 'info_required'
                                                                ? 'Further Information Required'
                                                                : '-' // Default styles when kyc_status doesn't match any condition
                                                }
                                            </span>
                                        )
                                        : (
                                            <span className='text-neutral-secondary'>
                                                -
                                            </span>
                                        )}
                                </td>

                                <td className={'py-3 px-[10px] mr-1 ml-1 flex gap-[19px] text-center align-center justify-end'}>
                                    {
                                        <>
                                            <Image toolTipId={`eye-${index}`} testId={`view-${index}`} src='eye' className={'cursor-pointer'} />
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
                    </tbody>
                }
            </table>
            {(!notFound && error) &&
            (<NoDataError heading='There are no admins added yet' text='Click “Register Admin ” to add admin' />)}
            {(List?.data?.length === 0 && !loading &&
            (searchParams.get('status') !== null || searchParams.get('search') !== null || searchParams.get('role') !== null)) &&
            (<NoDataError className='h-tableHeight' heading='No data found' text='Try adjusting your search or filter to find what you’re looking for' />)}
        </>
    );
};

export default KycVerificationTable;
