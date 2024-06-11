/* eslint-disable max-len */
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Tooltip } from 'react-tooltip';
import Shimmer from '../../../../components/Shimmers/Shimmer';
import Image from '../../../../components/Image/Image';
import formatTimestamp from '../../../../CommonMethods/formatTimestamp';
import NoDataError from '../../../../components/NoDataError/NoDataError';
import IframeModal from '../../../../components/Iframe/IframeModal';
import { CDN } from '../../../../config';

function G2PCustomerTable({ loading, error, View, notFound, searchParams, setSearchparams, setSelectedSheets, modalView, setModalView, file }) {
    const Navigate = useNavigate();
    const [selectedFileKey, setSelectedFileKey] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(null);
    return (
        <>
            <table className={`w-full min-w-max ${(!notFound || error) ? 'h-[calc(100vh - 710px)]' : ''}`}>
                {View && View.sheets.length > 0 &&
                    <thead className='text-neutral-secondary whitespace-nowrap text-[14px] leading-[24px]'>
                        <tr className='border-b border-neutral-outline sticky top-0 bg-white z-10'>
                            <th className='py-2 px-[10px] text-left font-[400]'>Sheet Name</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Uploaded Date</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Uploaded By</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Transferred Amount</th>
                            <th className='py-2 px-[10px]'></th>
                        </tr>
                    </thead>
                }
                {loading
                    ? <Shimmer column={5} row={10} firstIndex />
                    : <tbody className='text-neutral-primary whitespace-nowrap text-[14px] leading-[24px] font-[400]'>
                        {View?.sheets?.map((item, index) => (
                            <tr key={index} className='border-b border-neutral-outline h-[48px]'>
                                <td data-testid="agent_name" title={item?.sheet_name}
                                    className='py-2 px-[10px] truncate min-w-[200px] max-w-[200px]'>{`${item?.sheet_name}`}</td>
                                <td className='py-2 px-[10px]'>{formatTimestamp(item?.created_at)}</td>
                                <td data-testid="amount" title={item?.uploaded_by}
                                    className='py-2 px-[10px] truncate min-w-[200px] max-w-[200px]'>{`${item?.uploaded_by}`}</td>
                                <td data-testid="amount" title={item?.transferred_amount}
                                    className='py-2 px-[10px] truncate min-w-[100px] max-w-[100px]'>
                                    {item?.transferred_amount ? `${item.transferred_amount} .00 MWK` : '-'}
                                </td>
                                <td className='py-3 px-[10px] mr-1 ml-1 flex gap-[19px] text-center align-center justify-end'>
                                    <Image className='cursor-pointer' toolTipId={`eye-${index}`} src='eye' testId={`view-${index}`}
                                        onClick={() => {
                                            const fileLink = item.file_key;
                                            const viewLink = `https://docs.google.com/viewer?url=${CDN}public/${encodeURIComponent(fileLink)}`;
                                            window.open(viewLink, '_blank');// Assuming `item.file_key` is the key you want to use
                                        }} />

                                    <Image className='cursor-pointer' toolTipId={`delete-${index}`} src='delete' testId={`view-${index}`}
                                        onClick={() => Navigate(`/financials/g2p/${item?.paymaart_id}`)} />
                                    <Image className='cursor-pointer' toolTipId={`transaction-${index}`} src='transaction' testId={`view-${index}`}
                                        onClick={() => Navigate(`/financials/g2p/${item?.paymaart_id}`)} />
                                    {/* <Image className='cursor-pointer' toolTipId={`payin-${index}`} src='payin' /> */}
                                    <Tooltip
                                        id={`eye-${index}`}
                                        className='my-tooltip z-30'
                                        place="top"
                                        content="View"
                                    />
                                    <Tooltip
                                        id={`delete-${index}`}
                                        className='my-tooltip z-30'
                                        place="top"
                                        content="Delete"
                                    />
                                    <Tooltip
                                        id={`transaction-${index}`}
                                        className='my-tooltip z-30'
                                        place="top"
                                        content="Transfer Amount"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                }
                <IframeModal
                    isOpen={selectedIndex !== null} // Check if selectedIndex is set
                    handleClose={() => setSelectedIndex(null)}
                    link={selectedFileKey} // Use the selected file key from state
                    labelValue={selectedFileKey.split('/')[selectedFileKey.split('/').length - 1]} // Extract label value from the key
                />

            </table >
            {(!notFound && error) &&
                (<NoDataError topValue='mt-6' heading='There are no G2P profile to view yet' />)
            }
            {
                View && Object.keys(View).length === 0 && !loading &&
                (searchParams.get('status') !== null || searchParams.get('search') !== null) &&
                (<NoDataError className='h-tableHeight' topValue='mt-6' heading='There are no G2P profile to view yet' />)
            }
        </>
    );
}

export default G2PCustomerTable;
