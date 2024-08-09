/* eslint-disable max-len */
import React, { useContext, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import Shimmer from '../../../../components/Shimmers/Shimmer';
import Image from '../../../../components/Image/Image';
import NoDataError from '../../../../components/NoDataError/NoDataError';
import { CDN } from '../../../../config';
import Modal from 'react-responsive-modal';
import ConfirmationPopup from '../../../../components/ConfirmationPopup/ConfirmationPopup';
import { dataService } from '../../../../services/data.services';
import GlobalContext from '../../../../components/Context/GlobalContext';
import convertTimestampToCAT from '../../../../CommonMethods/timestampToCAT';
import { formattedAmount } from '../../../../CommonMethods/formattedAmount';

function G2PCustomerTable ({ loading, View, notFound, searchParams, getG2PCustomerView }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isApproveModalOpen, setIsApprovalModalOpen] = useState('');
    const [isTransactionModal, setIsTransactionModal] = useState({});
    const { setToastError, setToastSuccess } = useContext(GlobalContext);
    const [error, setError] = useState();

    // function for delete sheet
    const handleConfirmAction = async () => {
        setError(false);
        try {
            setIsLoading(true);
            const response = await dataService.DeleteAPI(`g2p-users/sheets/${isApproveModalOpen}`);
            if (!response.error) {
                setIsLoading(false);
                setIsApprovalModalOpen('');
                getG2PCustomerView();
                setToastSuccess('Sheet deleted successfully');
            } else {
                setIsLoading(false);
                setIsApprovalModalOpen('');
                setToastError('Something went wrong!');
            }
        } catch (error) {
            setIsLoading(false);
            setIsApprovalModalOpen('');
            setToastError('Something went wrong!');
        }
    };

    const handleApproveClick = (id) => {
        setIsApprovalModalOpen(id);
    };
    const handleClose = () => {
        setError(false);
        setIsApprovalModalOpen('');
    };

    // function for Transacction
    const handleConfirmClick = async () => {
        console.log(isTransactionModal, 'isTransactionModal');
        setError(false);
        try {
            setIsLoading(true);
            const body = {
                object_key: isTransactionModal.file_key,
                sender_id: View.paymaart_id,
                user_amount: View.remaining_amount,
                transaction_id: View.transaction_id,
                created_at: parseInt(isTransactionModal.created_at),
                g2p_transaction_expiry: parseInt(View.created_at)
            };
            const response = await dataService.PostAPI('bank-transactions/g2p-transaction', body);
            if (!response.error) {
                setIsLoading(false);
                setIsTransactionModal({});
                getG2PCustomerView();
                setToastSuccess('Sheet transferred successfully');
            } else {
                setIsLoading(false);
                setIsTransactionModal({});
                setToastError(response?.data?.data?.message || 'Something went wrong!');
            }
        } catch (error) {
            setIsLoading(false);
            setIsTransactionModal({});
            setToastError('Something went wrong!');
        }
    };
    const handleApprove = (filekey) => {
        setIsTransactionModal(filekey);
    };
    const handleCloseButton = () => {
        setError(false);
        setIsTransactionModal({});
    };

    return (
        <>
            <table className={`w-full min-w-max ${(!notFound || error) ? 'h-[calc(100vh - 710px)]' : ''}`}>
                {View && View.sheets.length > 0 &&
                    <thead className='text-neutral-secondary whitespace-nowrap text-[14px] leading-[24px]'>
                        <tr className='border-b border-neutral-outline sticky top-0 bg-white z-10'>
                            <th className='py-2 px-[10px] text-left font-[400]'>Sheet Name</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Uploaded Date, CAT</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Uploaded By</th>
                            <th className='py-2 px-[10px] text-right font-[400]'>Transferred Amount (MWK)</th>
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
                                <td className='py-2 px-[10px]'>{convertTimestampToCAT(item?.created_at)}</td>
                                <td data-testid="amount" title={item?.uploaded_by}
                                    className='py-2 px-[10px] truncate min-w-[200px] max-w-[200px]'>{`${item?.uploaded_by}`}</td>
                                <td data-testid="amount" title={item?.transferred_amount}
                                    className='py-2 px-[10px] text-right truncate min-w-[100px] max-w-[100px]'>
                                    {item?.transferred_amount ? `${formattedAmount(item.transferred_amount)}` : '-'}
                                </td>
                                <td className='py-3 px-[10px] mr-1 ml-1 flex gap-[19px] text-center align-center justify-end'>
                                    <Image className='cursor-pointer' toolTipId={`eye-${index}`} src='eye' testId={`view-${index}`}
                                        onClick={() => {
                                            const fileLink = item.file_key;
                                            const viewLink = `https://docs.google.com/viewer?url=${CDN}public/${encodeURIComponent(fileLink)}`;
                                            window.open(viewLink, '_blank');// Assuming `item.file_key` is the key you want to use
                                        }} />
                                    <Image
                                        className={`${item.transferred_amount !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                        toolTipId={`delete-${index}`}
                                        src='delete'
                                        testId={`delete-${index}`}
                                        onClick={() => item?.transferred_amount === null && handleApproveClick(item._id)}
                                    />
                                    <Image className={`${item.transferred_amount !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`} toolTipId={`transaction-${index}`} src='transaction' testId={`transaction-${index}`}
                                        onClick={() => item?.transferred_amount === null && handleApprove(item)} />
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
            </table >
            {(!notFound && error) &&
                (<NoDataError topValue='mt-6' heading='There are no G2P profile to view yet' />)
            }
            {
                View && Object.keys(View).length === 0 && !loading &&
                (searchParams.get('status') !== null || searchParams.get('search') !== null) &&
                (<NoDataError className='h-tableHeight' topValue='mt-6' heading='There are no G2P profile to view yet' />)
            }
            <Modal center open={isApproveModalOpen !== ''} onClose={handleClose} closeIcon={<div style={{ color: 'white' }} disabled></div>}>
                <div className='customModal'>
                    <ConfirmationPopup
                        title={'Confirm to Delete?'}
                        message={'This will delete the uploaded sheet'}
                        handleSubmit={() => handleConfirmAction()}
                        isLoading={isLoading}
                        handleClose={() => setIsApprovalModalOpen('')}
                        buttonText={'Confirm'}
                        buttonColor={'bg-accent-positive'}
                    />
                </div>
            </Modal>
            <Modal center open={Object.keys(isTransactionModal).length !== 0} onClose={handleCloseButton} closeIcon={<div style={{ color: 'white' }} disabled></div>}>
                <div className='customModal'>
                    <ConfirmationPopup
                        title={'Confirm to Execute Payment?'}
                        message={'This will complete settlement of G2P request.'}
                        handleSubmit={() => handleConfirmClick()}
                        isLoading={isLoading}
                        handleClose={() => setIsTransactionModal({})}
                        buttonText={'Confirm'}
                        buttonColor={'bg-accent-positive'}
                    />
                </div>
            </Modal>
        </>
    );
}

export default G2PCustomerTable;
