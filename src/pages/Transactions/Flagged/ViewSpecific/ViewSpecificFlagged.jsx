/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import CardHeader from '../../../../components/CardHeader';
import { useLocation, useNavigate, useParams } from 'react-router';
import GlobalContext from '../../../../components/Context/GlobalContext';
import Modal from 'react-responsive-modal';
import ConfirmationPopup from '../../../../components/ConfirmationPopup/ConfirmationPopup';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage';
import { getStatusStyles, getStatusText, getValueType } from '../../../../CommonMethods/getStatusUI';
import TransactionDetailsShimmer from '../../../../components/Shimmers/transactionDetailsShimmer';
import { formattedAmount } from '../../../../CommonMethods/formattedAmount';
import convertTimestampToCAT, { convertTimestampToDateYear, getQuarterEndDate } from '../../../../CommonMethods/timestampToCAT';
import { dataService } from '../../../../services/data.services';
import { capitalizeFirstLetter } from '../../../../CommonMethods/textCorrection';
import formatID from '../../../../CommonMethods/formatId';
import formatPhoneNumber from '../../../../CommonMethods/formatPhoneNumber';

const ViewSpecificFlagged = () => {
    const [states, setState] = useState({});
    const [flaggedDetails, setFlaggedDetails] = useState();
    const [isRejectModalOpen, setRejectModalOpen] = useState();
    const [submitSelected, setSubmitSelected] = useState(false);
    const [isApproveModalOpen, setApproveModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const { setToastError, setToastSuccess } = useContext(GlobalContext);

    const { id, senderId, transactionType } = useParams();
    const navigate = useNavigate();

    const reasonsKey = {
        ft01: 'Transaction & System Failures',
        ft02: 'Policy Clarity & Customer Support',
        ft03: 'Service Quality & Marketing Accuracy',
        ft04: 'User Experience Challenges'
    };

    const callTransactionHistoryType = [
        'cash_out',
        'unregistered_cashout',
        'pay_person',
        'pay_out',
        'payout_reject',
        'afrimax',
        // 'pay_in',
        'payout',
        'paymaart_on_behalf',
        'interest',
        'cashout_request',
        'cashout_refund',
        'cash_in',
        'unregistered_cash_in',
        'paymaart',
        'cashout',
        'payout_complete',
        'payout_approved'
    ];

    // Approve and Reject API Call
    const handleConfirmApproveReject = async (method) => {
        const payload = {
            id,
            transaction_id: flaggedDetails?.transaction_id,
            transaction_type: transactionType,
            status: method
        };
        if (method === 'rejected') {
            if (states.reason === undefined || states?.reason?.trim() === '') {
                setSubmitSelected(true);
                return;
            }
            payload.status_note = states.reason;
        }
        setIsButtonLoading(true);
        try {
            const response = await dataService.PostAPI('admin-transactions/approve-reject', payload);
            if (!response.error) {
                setToastSuccess(`Flagged transaction ${method} successfully`);
                getFlaggedDetails();
            } else {
                setToastError('Something went wrong!');
            }
            setIsButtonLoading(false);
            setApproveModalOpen(false);
            setRejectModalOpen(false);
        } catch (error) {
            setApproveModalOpen(false);
            setRejectModalOpen(false);
            setIsButtonLoading(false);
            setToastError('Something went wrong!');
        }
    };

    const handleReason = (event) => {
        const newValue = event.target.value;
        setSubmitSelected(false);
        setState((prevState) => ({ ...prevState, reason: newValue }));
    };

    const getFlaggedDetails = async () => {
        const flagURL = `admin-transactions/specific-flag?flag_id=${id}${callTransactionHistoryType?.includes(transactionType) ? '&condition=reasons' : ''}`;
        const transactionURL = `admin-users/view-agent-transaction?UUID=${id}&transactionType=${transactionType}&paymaartId=${senderId}`;
        setIsLoading(true);
        setFlaggedDetails({});
        try {
            const flagResponse = await dataService.GetAPI(flagURL);
            if (!flagResponse.error) {
                setFlaggedDetails(prevData => {
                    return { ...flagResponse?.data, ...prevData };
                });
            } else {
                navigate('/transactions/flagged');
                setToastError('An Error Occured!');
            }
            if (callTransactionHistoryType?.includes(transactionType)) {
                const response = await dataService.GetAPI(transactionURL);
                if (!response.error) {
                    setFlaggedDetails(prevData => {
                        return { ...response?.data?.data, ...prevData };
                    });
                } else {
                    navigate('/transactions/flagged');
                    setToastError('An Error Occured!');
                }
            }
            setIsLoading(false);
        } catch (error) {
            navigate('/transactions/flagged');
            setToastError('An Error Occured!');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getFlaggedDetails();
    }, []);

    const location = useLocation();
    const state = location.state || {};

    const constructQueryParams = (state) => {
        const params = new URLSearchParams();

        // Always include 'page' if it exists
        if (state.page) params.append('page', state.page);

        // Include 'Flagged Reason' only if it is non-empty
        if (state.FlaggedReason && state.FlaggedReason.trim() !== '') {
            params.append('Flagged Reason', state.FlaggedReason);
        }

        // Include 'search' only if it is non-empty
        if (state.search && state.search.trim() !== '') {
            params.append('search', state.search);
        }

        return params.toString();
    };

    // Construct the full URL with query parameters
    const queryParams = constructQueryParams(state);
    const fullUrl = `transactions/flagged${queryParams ? `?${queryParams}` : ''}`;

    // Update the pathurls array
    const pathurls = [fullUrl];

    return (
        <>
            <CardHeader
                activePath='Flagged Details'
                paths={['Transactions', 'Flagged ']}
                pathurls={pathurls} // Pass the dynamically constructed pathurls
                minHeightRequired={true}
                ChildrenElement
            >
                {<>
                    <div className={`max-h-[calc(100vh-120px)] scrollBar overflow-auto mx-10 my-8 px-[30px] pt-[24px] pb-[28px] 
            flex flex-col bg-[#FFFFFF] border-b border-neutral-outline
            `}>
                        <div className='flex justify-between items-center'>
                            <div className='flex justify-center items-center gap-5'>
                                <h1 className='text-[#252C32] font-bold text-[30px] leading-[40px]'>Flagged Details</h1>
                                <span className={`${isLoading ? 'h-[20px] bg-neutral-primary rounded animate-pulse w-16' : `py-[4px] px-[10px] rounded text-[13px] font-semibold capitalize ${getStatusStyles(flaggedDetails?.status || 'pending')}`} `} >
                                    {!isLoading && getStatusText(flaggedDetails?.status)}
                                </span>
                            </div>
                            {(flaggedDetails?.status !== 'rejected' && flaggedDetails?.status !== 'approved') &&
                                <div className='flex gap-4'>
                                    <button data-testid="reject_button"
                                        onClick={() => {
                                            if (!isLoading) {
                                                setRejectModalOpen(true);
                                                setState({});
                                            }
                                        }}
                                        className={`${isLoading
                                            ? 'h-10 bg-neutral-primary rounded animate-pulse w-[117px] cursor-default'
                                            : `flex  bg-primary-negative py-[8px] px-[16px] 
                                    justify-center items-center h-[40px] rounded-[6px] w-[117px]`}`}>
                                        {!isLoading && <p className='text-[14px] font-semibold text-[#ffffff]'>Reject</p>}
                                    </button>
                                    <button data-testid="approve_button"
                                        onClick={() => {
                                            if (!isLoading) {
                                                setApproveModalOpen(true);
                                                setSubmitSelected(false);
                                            }
                                        }}
                                        className={`${isLoading
                                            ? 'h-10 bg-neutral-primary rounded animate-pulse w-[117px] cursor-default'
                                            : `flex bg-[#13B681] py-[8px] px-[16px] justify-center items-center w-[117px] 
                                        h-[40px] rounded-[6px]`}`}>
                                        {!isLoading && <p className='text-[14px] font-semibold text-[#ffffff]'>Approve</p>}
                                    </button>
                                </div>}
                        </div>
                    </div>
                    <div data-testid="transaction_details" className={`max-h-[calc(100vh-240px)] scrollBar overflow-auto flex flex-col
                    mx-10 mb-8 px-[30px] pt-[24px] pb-[28px] bg-[#FFFFFF] `}> {/* border-b border-neutral-outline */}
                        <h1 className='text-[#4F5962] font-semibold text-[18px] leading-[26px] my-2'>
                            Transaction Details
                        </h1>

                        <div className='flex gap-[58px] mt-5 flex-wrap' data-testid="transaction_details">
                            <div data-testid='transaction_details' className=''>
                                <div className='bg-[#FFFFFF] flex flex-col justify-center items-center relative'>
                                    <div className='px-[26px] py-[12px] w-[480px] flex flex-col border-background-light border
                            bg-background-light text-neutral-primary font[400] text-sm rounded-lg'>
                                        <div className='w-full flex gap-1'>
                                            <div className='w-1/2 pb-1'>
                                                <p className='font-[500] text-base'>From</p>
                                            </div>
                                            <div className='w-1/2 pb-1'>
                                                <p className='h-[24px]'></p>
                                            </div>
                                        </div>
                                        <div className='w-full flex gap-1'>
                                            <div className='w-1/2 pb-1'>
                                                <p>Paymaart Name</p>
                                            </div>
                                            <div className='w-1/2 pb-1'>
                                                {isLoading
                                                    ? <div className="h-[20px] bg-neutral-primary rounded animate-pulse" />
                                                    : transactionType !== 'interest' ? <p className='break-word'>{flaggedDetails?.sender_name || '-'}  </p> : <p>Paymaart Bank</p>}
                                            </div>
                                        </div>
                                        {transactionType !== 'interest' && <div className='w-full flex gap-1'>
                                            <div className='w-1/2 pb-1'>
                                                <p>Paymaart ID</p>
                                            </div>
                                            <div className='w-1/2 pb-1'>
                                                {isLoading
                                                    ? <div className="h-[20px] bg-neutral-primary rounded animate-pulse" />
                                                    : transactionType !== 'interest' && <p>{formatID(flaggedDetails?.sender_id) || '-'}  </p>}
                                            </div>
                                        </div>}
                                        <div className='w-full flex gap-1'>
                                            <div className='w-1/2 pb-1'>
                                                <p className='font-[500] text-base mt-[10px]'>To</p>
                                            </div>
                                            <div className='w-1/2 pb-1'>
                                                <p className='h-[24px]'></p>
                                            </div>
                                        </div>
                                        {transactionType === 'payout' || transactionType === 'payout_approved'
                                            ? <>
                                                <div className='w-full flex gap-1'>
                                                    <div className='w-1/2 pb-1'>
                                                        {isLoading ? <TransactionDetailsShimmer col={1} /> : <p>Bank</p>}
                                                    </div>
                                                    <div className='w-1/2 pb-1'>
                                                        {isLoading
                                                            ? <div className="h-[20px] bg-neutral-primary rounded animate-pulse" />
                                                            : <p>{flaggedDetails?.bank_name || '-'}</p>}
                                                    </div>
                                                </div>
                                                <div className='w-full flex gap-1'>
                                                    <div className='w-1/2 pb-1'>
                                                        {isLoading ? <TransactionDetailsShimmer col={1} /> : <p>Acct. Name</p>}
                                                    </div>
                                                    <div className='w-1/2 pb-1'>
                                                        {isLoading
                                                            ? <div className="h-[20px] bg-neutral-primary rounded animate-pulse" />
                                                            : <p>{flaggedDetails?.account_name || '-'}</p>}
                                                    </div>
                                                </div>
                                                <div className='w-full flex gap-1'>
                                                    <div className='w-1/2 pb-1'>
                                                        {isLoading ? <TransactionDetailsShimmer col={1} /> : <p>Acct. No</p>}
                                                    </div>
                                                    <div className='w-1/2 pb-1'>
                                                        {isLoading
                                                            ? <div className="h-[20px] bg-neutral-primary rounded animate-pulse" />
                                                            : <p>{flaggedDetails?.account_no || '-'}</p>}
                                                    </div>
                                                </div>
                                            </>
                                            : <>
                                                <div className='w-full flex gap-1'>
                                                    <div className='w-1/2 pb-1'>
                                                        {isLoading ? <TransactionDetailsShimmer col={1} /> : <p>Paymaart Name</p>}
                                                    </div>
                                                    <div className='w-1/2 pb-1'>
                                                        {isLoading
                                                            ? <div className="h-[20px] bg-neutral-primary rounded animate-pulse" />
                                                            : <p className='break-word'>{transactionType === 'afrimax' ? 'Afrimax' : (flaggedDetails?.receiver_name || flaggedDetails?.merchantName || '-')}</p>}
                                                    </div>
                                                </div>
                                                <div className='w-full flex gap-1'>
                                                    <div className='w-1/2 pb-1'>
                                                        {isLoading ? <TransactionDetailsShimmer col={1} /> : <p>{flaggedDetails?.receiver_phone_no || flaggedDetails?.receiver_id?.startsWith('+') ? 'Phone Number' : 'Paymaart ID'}</p>}
                                                    </div>
                                                    <div className='w-1/2 pb-1'>
                                                        {isLoading
                                                            ? <div className="h-[20px] bg-neutral-primary rounded animate-pulse" />
                                                            : <p data-testid="beneficiary_paymaart_id">
                                                                {flaggedDetails?.receiver_phone_no
                                                                    ? formatPhoneNumber(flaggedDetails?.receiver_phone_no)
                                                                    : flaggedDetails?.receiver_id?.startsWith('+')
                                                                        ? formatPhoneNumber(flaggedDetails?.receiver_id)
                                                                        : formatID(flaggedDetails?.receiver_id) || '-'}
                                                            </p>}
                                                    </div>
                                                </div>
                                            </>}
                                        {(flaggedDetails?.obo_name ||
                                            flaggedDetails?.obo_id ||
                                            flaggedDetails?.afrimax_name ||
                                            flaggedDetails?.afrimax_id) &&
                                            !isLoading &&
                                            <>
                                                {!transactionType?.includes('CMR')
                                                    ? <div className='w-full flex gap-1'>
                                                        <div className='w-1/2 pb-1'>
                                                            <p className='font-[500] text-base mt-[10px]'>On Behalf of</p>
                                                        </div>
                                                        <div className='w-1/2 pb-1'>
                                                            <p className='h-[24px] mt-[10px]'></p>
                                                        </div>
                                                    </div>
                                                    : <div className='w-full flex gap-1'>
                                                        <div className='w-1/2 pb-1'>
                                                            <p className='mt-1'></p>
                                                        </div>
                                                        <div className='w-1/2 pb-1'>
                                                            <p className='mt-1'></p>
                                                        </div>
                                                    </div>}
                                                {flaggedDetails?.obo_name && !isLoading &&
                                                    (<div className='w-full flex gap-1'>
                                                        <div className='w-1/2 pb-1'>
                                                            <p>Paymaart Name</p>
                                                        </div>
                                                        <div className='w-1/2 pb-1'>
                                                            <p className='break-word'>{flaggedDetails?.obo_name || '-'}</p>
                                                        </div>
                                                    </div>)
                                                }
                                                {flaggedDetails?.obo_id && !isLoading &&
                                                    (<div className='w-full flex gap-1'>
                                                        <div className='w-1/2 pb-1'>
                                                            <p>Paymaart ID</p>
                                                        </div>
                                                        <div className='w-1/2 pb-1'>
                                                            <p>{formatID(flaggedDetails?.obo_id) || '-'}</p>
                                                        </div>
                                                    </div>)}
                                                {(flaggedDetails?.afrimax_name ||
                                                    flaggedDetails?.afrimax_id) && !isLoading && (
                                                    <>
                                                        <div className='w-full flex gap-1'>
                                                            <div className='w-1/2 pb-1'>
                                                                <p>Afrimax Name</p>
                                                            </div>
                                                            <div className='w-1/2 pb-1'>
                                                                <p className='break-word'>{flaggedDetails?.afrimax_name || '-'}</p>
                                                            </div>
                                                        </div>
                                                        <div className='w-full flex gap-1'>
                                                            <div className='w-1/2 pb-1'>
                                                                <p>Afrimax ID</p>
                                                            </div>
                                                            <div className='w-1/2 pb-1'>
                                                                <p>{flaggedDetails?.afrimax_id || '-'}</p>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </>}
                                    </div>
                                    <div className='px-[26px] py-[12px] w-[480px] flex flex-col border-background-light border bg-background-light
                         text-neutral-primary font[400] text-sm rounded-lg mt-2'>
                                        <div className='w-full flex gap-1'>
                                            <div className='w-1/2 flex flex-col gap-1'>
                                                <p className='font-[600] text-base'>{getValueType(transactionType)} Value*</p>
                                                {transactionType !== 'interest' &&
                                                    <>
                                                        <p>{flaggedDetails?.membership ? 'Txn Fee' : 'Txn Fee*'}</p>
                                                        <p>*VAT Included</p>
                                                    </>}
                                                {flaggedDetails?.commission && !isLoading && <p>Commission Earned</p>}
                                                <p>Txn ID</p>
                                                <p>Date, time (CAT)</p>
                                                {transactionType === 'afrimax' && <p>Plan</p>}
                                                {flaggedDetails?.agent_closing_balance && !isLoading && <p>Balance</p>}
                                                {flaggedDetails?.note && !isLoading && <p>Note</p>}
                                                {transactionType === 'interest' && <p>Interest Period</p>}
                                                {(flaggedDetails?.membership || flaggedDetails?.membership_start || flaggedDetails?.membership_expiry) && !isLoading && <p>Membership</p>}
                                            </div>
                                            <div className='w-1/2 flex flex-col gap-1'>
                                                {isLoading
                                                    ? <TransactionDetailsShimmer col={5} />
                                                    : <>
                                                        {formattedAmount(
                                                            Math.abs(
                                                                Number(flaggedDetails?.transaction_amount || 0) +
                                                                Number(flaggedDetails?.transaction_fee || 0)
                                                            )
                                                        ) || '0.00'} MWK

                                                        {transactionType !== 'interest' &&
                                                            <>
                                                                <p>{formattedAmount(flaggedDetails?.transaction_fee) || '0.00'} MWK</p>
                                                                <p>{formattedAmount(flaggedDetails?.vat) || '0.00'} MWK</p>
                                                            </>}
                                                        {flaggedDetails?.commission && <p>{formattedAmount(flaggedDetails?.commission) || '0.00'} MWK</p>}
                                                        <p data-testid="transaction_id">{flaggedDetails?.transaction_id || '-'}</p>
                                                        <p data-testid="date"> {`${convertTimestampToCAT(flaggedDetails?.created_at)}` || '-'}</p>
                                                        {transactionType === 'afrimax' && <p>{flaggedDetails?.afrimax_plan_name || '-'}</p>}
                                                        {flaggedDetails?.agent_closing_balance && <p>{formattedAmount(flaggedDetails?.agent_closing_balance) || '0.00'} MWK</p>}
                                                        {flaggedDetails?.note && <p>{flaggedDetails?.note}</p>}
                                                        {transactionType === 'interest' &&
                                                            <>
                                                                <p>Customer Interest</p>
                                                                <p>{`${getQuarterEndDate(flaggedDetails?.created_at)}`}</p>
                                                            </>}
                                                        {(flaggedDetails?.membership || flaggedDetails?.membership_start || flaggedDetails?.membership_expiry) && <p>{capitalizeFirstLetter(flaggedDetails?.membership).replace(/Primex/i, 'PrimeX') || '-'}</p>}
                                                        {(flaggedDetails?.membership || flaggedDetails?.membership_start || flaggedDetails?.membership_expiry) && <p>{`${convertTimestampToDateYear(flaggedDetails?.membership_start) || '---'} - ${convertTimestampToDateYear(flaggedDetails?.membership_expiry)}`}</p>}
                                                    </>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-[15px] flex justify-center text-[#A4A9AE] text-[12px] leading-[15.6px] gap-3'>
                                        <span>www.paymaart.com</span>
                                        <span>.</span>
                                        <span>hello@paymaart.com</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-5 font-[400] text-sm leading-6'>
                                <div className='flex flex-col gap-1'>
                                    <p className='text-neutral-secondary'>Flagged Reason</p>
                                    {isLoading
                                        ? <TransactionDetailsShimmer col={1} />
                                        : flaggedDetails?.reasons?.map((reason, index) => (
                                            <p key={index} className='text-neutral-primary'>{index + 1}. {reasonsKey?.[reason] || '-'}</p>
                                        ))}
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <p className='text-neutral-secondary'>Flagged by</p>
                                    {isLoading
                                        ? <TransactionDetailsShimmer col={1} />
                                        : <p className='text-neutral-primary'>
                                            {formatID(flaggedDetails?.flagged_by) || '-'}
                                        </p>}
                                </div>
                                <div className='flex flex-col gap-1 max-w-[450px]'>
                                    <p className='text-neutral-secondary'>Reversal Admin</p>
                                    {isLoading
                                        ? <TransactionDetailsShimmer col={1} />
                                        : <p className='text-neutral-primary break-words'>
                                            {flaggedDetails?.reversal_admin_name || '-'}
                                        </p>}
                                </div>
                                {flaggedDetails?.status_note &&
                                    <div className='flex flex-col gap-1 max-w-[450px]'>
                                        <p className='text-neutral-secondary'>Admin Note</p>
                                        {isLoading
                                            ? <TransactionDetailsShimmer col={1} />
                                            : <p className='text-neutral-primary break-words'>
                                                {flaggedDetails?.status_note || '-'}
                                            </p>}
                                    </div>}
                            </div>
                        </div>
                    </div>
                </>}
            </CardHeader>
            <Modal center open={isRejectModalOpen} onClose={() => setRejectModalOpen(false)} closeIcon={<div style={{ color: 'white' }} disabled></div>}>
                <div className='customModal'>
                    <ConfirmationPopup
                        title={'Confirm to Reject?'}
                        message={'Reason for rejection'}
                        messageStyle={'text-[14px] font-medium text-[#4F5962] mt-2'}
                        Reason={(<>
                            <label htmlFor=""></label>
                            {/* <input className='w-full border border-[#F8F8F8] bg-[#dddddd38] placeholder:font-normal placeholder:text-sm placeholder:text-[#8E949A] p-2.5 outline-none rounded' style={{ borderBottom: '1px solid #DDDDDD' }} placeholder='Enter Reason'> */}
                            <input data-testid="reason" className={`w-full border border-[#F8F8F8] bg-[#dddddd38] placeholder:font-normal placeholder:text-sm placeholder:text-[#8E949A] p-2.5 outline-none rounded ${submitSelected ? 'border-bottom-red mb-1' : 'border-bottom-default'}`} placeholder="Enter reason">
                            </input>
                            {submitSelected && <ErrorMessage error={'Required field'} />
                            }
                        </>)}
                        handleSubmit={() => handleConfirmApproveReject('rejected')}
                        isLoading={isButtonLoading}
                        handleClose={() => setRejectModalOpen(false)}
                        buttonText={'Reject'}
                        buttonColor={'bg-primary-negative'}
                        handleReason={handleReason}
                        error={submitSelected}
                    />
                </div>
            </Modal>
            <Modal center open={isApproveModalOpen} onClose={() => setApproveModalOpen(false)} closeIcon={<div style={{ color: 'white' }} disabled></div>}>
                <div className='customModal'>
                    <ConfirmationPopup
                        title={'Confirm to Approve?'}
                        message='This action will refund the transaction amount'
                        messageStyle={undefined}
                        handleSubmit={() => handleConfirmApproveReject('approved')}
                        isLoading={isButtonLoading}
                        handleClose={() => setApproveModalOpen(false)}
                        buttonText={'Approve'}
                        buttonColor={'bg-accent-positive'}
                    />
                </div>
            </Modal>
        </>
    );
};

export default ViewSpecificFlagged;
