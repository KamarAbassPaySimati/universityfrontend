/* eslint-disable max-len */
import React, { useContext, useEffect, useRef, useState } from 'react';
import CardHeader from '../../../../components/CardHeader';
import Image from '../../../../components/Image/Image';
import { dataService } from '../../../../services/data.services';
import GlobalContext from '../../../../components/Context/GlobalContext';
import { endpoints } from '../../../../services/endpoints';
import { useNavigate, useParams } from 'react-router';
import TransactionDetailsShimmer from '../../../../components/Shimmers/transactionDetailsShimmer';
import convertTimestampToCAT from '../../../../CommonMethods/timestampToCAT';
import { formattedAmount } from '../../../../CommonMethods/formattedAmount';
import Modal from 'react-responsive-modal';
import ConfirmationPopup from '../../../../components/ConfirmationPopup/ConfirmationPopup';
import CheckboxWithReason from '../../../../components/InputField/CheckboxWithResone';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage';
import { useSelector } from 'react-redux';
import ShareOptions from '../../../../components/ShareOptions/ShareOptions';

const ViewTransactionDetails = () => {
    // States
    const [transactionDetails, setTransactionDetails] = useState();
    const [dataLoading, setdataLoading] = useState(false);
    const [isFlagModelOpen, setIsFlagModelOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [submitSelected, setSubmitSelected] = useState(false);
    const [selectedCheckBox, setSelectedCheckBox] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();
    const { setToastError, setToastSuccess } = useContext(GlobalContext);
    const { viewTransaction } = endpoints;
    const captureRef = useRef();

    // Functions
    const getTransactionDetails = async () => {
        setdataLoading(true);
        try {
            const response = await dataService.GetAPI(`admin-users/${viewTransaction}/${id}`);
            if (!response.error) {
                setTransactionDetails(response?.data?.data);
            } else {
                navigate('/financials/transaction-history');
                setToastError('An Error Occured!');
            }
            setdataLoading(false);
        } catch (error) {
            navigate('/financials/transaction-history');
            setToastError('An Error Occured!');
            setdataLoading(false);
        }
    };
    const handleConfirmAction = async () => {
        if (selectedCheckBox.length === 0) {
            setSubmitSelected(true);
        } else {
            try {
                const obj = {
                    ft01: 'Transaction & System Failures',
                    ft02: 'Policy Clarity & Customer Support',
                    ft03: 'Service Quality & Marketing Accuracy',
                    ft04: 'User Experience Challenges'
                };
                const payload = {
                    flag: true,
                    id: transactionDetails.id,
                    flagged_by: user.paymaart_id,
                    reasons: selectedCheckBox.map(value => {
                        const key = Object.keys(obj).find(key => obj[key] === value);
                        return key; // Return the key if found
                    }).filter(key => key !== undefined), // Filter out any undefined values
                    table_name: transactionDetails.bank_type
                };
                setIsLoading(true);
                const response = await dataService.PostAPI('admin-transactions/flag-admin-transaction', payload);
                if (!response.error) {
                    setIsLoading(false);
                    setdataLoading(true);
                    getTransactionDetails();
                    setToastSuccess('Transaction flagged successfully');
                    setIsFlagModelOpen(false);
                } else {
                    setIsLoading(false);
                    setToastError('Something went wrong!');
                }
            } catch (error) {
                setIsLoading(false);
                setToastError('Something went wrong!');
            }
        }
    };
    // Hook Calls
    useEffect(() => {
        getTransactionDetails();
    }, []);
    const flagReason = {
        'Transaction & System Failures': [
            'Transaction failure due to security measures',
            'Inadequate communication about declined payments',
            'System errors and outages'
        ],
        'Policy Clarity & Customer Support': [
            'Lack of acceptable payment options',
            'Unclear terms and conditions regarding returns or chargebacks',
            'Recurring billing complications'
        ],
        'Service Quality & Marketing Accuracy': [
            'Privacy breach incidents',
            'Discrepancies between advertisements and purchased products'
        ],
        'User Experience Challenges': [
            'Password threats and phishing attacks',
            'Insufficient privacy protection practices',
            'Refund denials or delays'
        ]
    };
    const handleCheckBox = (e, id, type, index, selectedIndex, checkboxText) => {
        setSubmitSelected(false);
        const isChecked = e.target.checked;
        const checkedValue = selectedCheckBox;
        if (isChecked) {
            checkedValue.push(checkboxText);
        } else {
            const index = checkedValue.indexOf(checkboxText);
            if (index > -1) {
                checkedValue.splice(index, 1);
            }
        }
        setSelectedCheckBox(checkedValue);
    };
    const handleCloseModel = () => {
        setSelectedCheckBox([]);
        setSubmitSelected(false);
        setIsFlagModelOpen(false);
    };

    return (
        <CardHeader
            activePath={'Transaction Details'}
            paths={['Financials', 'Transaction History']}
            pathurls={['financials/transaction-history']}
            header='Transaction Details'
            minHeightRequired={true}
        >
            <div className='flex justify-center items-center' ref={captureRef}>
                <div className='border-background-light border bg-[#FFFFFF] w-[723px] rounded-[14px] p-[30px]
                    flex flex-col justify-center items-center relative m-4'>
                    <Image src='sideNavLogo' className='w-[165px]' />
                    <div className='absolute top-[23px] right-[23px] flex gap-[14px] hide-during-capture'>
                        { transactionDetails?.flagged
                            ? <Image src='flagged' testId={'flag_transaction_button'}
                            />
                            : <Image src='flag' onClick={() => setIsFlagModelOpen(true)} className='cursor-pointer' testId={'flag_transaction_button'}
                            />
                        }
                        <Image src='share' onClick={() => { if (!dataLoading)setIsShareModalOpen(true); }} className={`${dataLoading ? 'cursor-not-allowed' : 'cursor-pointer '}`} />
                    </div>
                    <div className='font-[600] text-[14px] leading-[24px] text-[#A4A9AE] mt-[10px] mb-6'>
                        Thank you for using Paymaart
                    </div>
                    <div className='px-[26px] py-[12px] w-[480px] flex flex-col border-background-light border
                            bg-background-light text-neutral-primary font[400] text-sm rounded-lg'>
                        <div className='w-full flex gap-1'>
                            <div className='w-1/2 flex flex-col gap-1'>
                                <p className='font-[500] text-base'>From</p>
                                <p>Paymaart Name</p>
                                <p>Paymaart ID</p>
                                <p className='font-[500] text-base mt-[10px]'>To</p>
                                <p>Paymaart Name</p>
                                <p>Paymaart ID</p>
                            </div>
                            <div className='w-1/2 flex flex-col gap-1'>
                                {dataLoading
                                    ? <>
                                        {[...Array(2)]?.map((item, index) => (
                                            <div className='flex flex-col gap-1' key={index}>
                                                <p className={`h-[24px] ${index === 1 ? 'mt-[10px]' : ''}`}></p>
                                                <TransactionDetailsShimmer col={2} />
                                            </div>
                                        ))}
                                    </>
                                    : <>
                                        <p className='h-[24px]'></p>
                                        <p>{transactionDetails?.sender_name || '-'}</p>
                                        <p>{transactionDetails?.sender_id || '-'}</p>
                                        <p className='h-[24px] mt-[10px]'></p>
                                        <p>{transactionDetails?.receiver_name || '-'}</p>
                                        <p>{transactionDetails?.receiver_id || '-'}</p>
                                    </>}
                            </div>
                        </div>
                    </div>
                    <div className='px-[26px] py-[12px] w-[480px] flex flex-col border-background-light border bg-background-light
                         text-neutral-primary font[400] text-sm rounded-lg mt-2 mb-[50px]'>
                        <div className='w-full flex gap-1'>
                            <div className='w-1/2 flex flex-col gap-1'>
                                <p className='font-[600] text-base'>Total Amount</p>
                                <p>Amount</p>
                                <p>Txn Fee*</p>
                                <p>*VAT Included</p>
                                <p>Txn ID</p>
                                <p>Date, time (CAT)</p>
                            </div>
                            <div className='w-1/2 flex flex-col gap-1'>
                                {dataLoading
                                    ? <TransactionDetailsShimmer col={6} />
                                    : <>
                                        <p className='font-[600] text-base'>
                                            {formattedAmount(transactionDetails?.total_amount) || '0.00'} MWK
                                        </p>
                                        <p>{formattedAmount(transactionDetails?.transaction_amount) || '0.00'} MWK</p>
                                        <p>{formattedAmount(transactionDetails?.transaction_fee) || '0.00'} MWK</p>
                                        <p>{formattedAmount(transactionDetails?.vat) || '0.00'} MWK</p>
                                        <p>{transactionDetails?.transaction_id || '-'}</p>
                                        <p>{`${convertTimestampToCAT(transactionDetails?.created_at)}` || '-'}</p>
                                    </>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal center open={isFlagModelOpen} onClose={handleCloseModel} closeIcon={<div style={{ color: 'white' }} disabled></div>}>
                <div className='customModal' data-testid="flagTransactionReasonPopUp">
                    <ConfirmationPopup
                        title={'Flag Transaction'}
                        message={'Select all applicable'}
                        messageStyle={'text-[14px] font-medium text-[#A4A9AE] mt-2'}
                        Reason={(<>
                            {Object.keys(flagReason).map((item, index = 0) => (
                                <>
                                    <CheckboxWithReason
                                        key={item}
                                        item={item}
                                        testId={item}
                                        handleOnChange={handleCheckBox}
                                        index={index}
                                        id={`reject_${index}`}
                                        type={'main'}
                                        flag
                                        // Checked={selectedCheckBox.includes(item)}
                                    />
                                    <ol class="space-y-4 ml-2 lower-alpha list-inside text-[12px] font-normal leading-[24px] pb-2">
                                        <ul class="ps-5 space-y-1 list-disc list-inside">
                                            {flagReason[item].map((ruleItem) => (
                                                <div className='flex text-[#4F5962]' key={ruleItem}>
                                                    <li></li>
                                                    <span>{ruleItem}</span>
                                                </div>
                                            ))}
                                        </ul>
                                    </ol>
                                </>
                            ))}
                            {submitSelected && <ErrorMessage error={'Select at least 1'} />
                            }
                        </>)}
                        handleSubmit={handleConfirmAction}
                        isLoading={isLoading}
                        handleClose={handleCloseModel}
                        buttonText={'Confirm'}
                        buttonColor={'bg-[#3B2A6F]'}
                        handleReason={() => {}}
                        error={submitSelected}
                    />
                </div>
            </Modal>
            <ShareOptions isModalOpen={isShareModalOpen} setIsModalOpen={setIsShareModalOpen} captureRef={captureRef} />
        </CardHeader>
    );
};

export default ViewTransactionDetails;
