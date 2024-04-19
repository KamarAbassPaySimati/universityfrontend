/* eslint-disable max-len */
import React from 'react';
import Image from '../../../../components/Image/Image';
import Shimmer from '../../../../components/Shimmers/Shimmer';
import { Tooltip } from 'react-tooltip';
import { handleSort } from '../../../../CommonMethods/ListFunctions';
import formatTimestamp from '../../../../CommonMethods/formatTimestamp';

const KycVerificationTable = (
    {
        loading, error, List, setSearchParams, notFound, searchParams
    }
) => {
    const getKYCTypeTitle = (user) => {
        if (user?.citizen === 'Malawian') {
            return user?.kyc_type === 'full' ? 'Malawi Full KYC' : 'Malawi Simplified KYC';
        } else {
            return user?.kyc_type === 'full' ? 'Non Malawi Full KYC' : 'Non Malawi Simplified KYC';
        }
    };
    const getStatusStyles = (status) => {
        switch (status) {
        case 'in_progress':
            return 'bg-accent-info-secondary text-accent-information';
        case 'completed':
            return 'bg-accent-positive-secondary text-accent-positive';
        case 'info_required':
            return 'bg-accent-negative-secondary text-primary-negative';
        default:
            return ''; // Default styles when status doesn't match any condition
        }
    };

    const getStatusText = (status) => {
        switch (status) {
        case 'in_progress':
            return 'In-progress';
        case 'completed':
            return 'Completed';
        case 'info_required':
            return 'Further Information Required';
        default:
            return '-'; // Default text when status doesn't match any condition
        }
    };
    return (
        <>
            <table className='w-full min-w-max'>
                {(List?.data?.length > 0 || loading) &&
                <thead className='text-neutral-secondary whitespace-nowrap text-[14px] leading-[24px]'>
                    <tr className=' border-b border-neutral-outline sticky top-0 bg-white z-10'>
                        <th className='py-2 px-[10px] text-left font-[400] '>Paymaart ID</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Name</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>
                            <div className='cursor-pointer flex gap-1 w-fit' data-testid="sort_submission_date" onClick={() => handleSort('submission_date', searchParams, setSearchParams)}>
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
                                <td data-testid="paymaart_id" title={user?.paymaart_id}
                                    className='py-2 px-[10px] text-left truncate max-w-[50px]'>{user?.paymaart_id || '-'}</td>
                                <td data-testid="name" title={user?.name}
                                    className='py-2 px-[10px] text-left truncate max-w-[200px]'>{user?.name || '-'}
                                </td>
                                <td data-testid="submission_date" title = {formatTimestamp(user?.updated_at)} className='py-2 px-[10px] text-left truncate max-w-[300px]'>
                                    {formatTimestamp(user?.updated_at)}</td>
                                <td data-testid="kyc_type" title={getKYCTypeTitle(user)} className='py-2 px-[10px] text-left truncate max-w-[300px]'>
                                    {getKYCTypeTitle(user)}
                                </td>
                                <td data-testid="status" className='py-2 px-[10px]'>
                                    {user?.kyc_status
                                        ? (
                                            <span className={`py-[4px] px-[10px] rounded text-[13px] font-[600] capitalize ${getStatusStyles(user?.kyc_status)} `} title={getStatusText(user?.kyc_status)}>
                                                {getStatusText(user?.kyc_status)}
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
            {/* {!notFound && error &&
            (<NoDataError heading='No profiles for verification' text='No profiles currently require verification. Please check back later' />)}
            {List?.data?.length === 0 && !loading &&
            (searchParams.get('simplifiedkyc') !== null || searchParams.get('fullkyc') !== null || searchParams.get('search') !== null) &&
            (<NoDataError className='h-tableHeight' heading='No data found' text='Try adjusting your search or filter to find what you’re looking for' />)} */}

        </>
    );
};

export default KycVerificationTable;
