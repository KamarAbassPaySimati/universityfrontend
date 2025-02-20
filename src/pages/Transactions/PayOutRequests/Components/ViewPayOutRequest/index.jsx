/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import CardHeader from '../../../../../components/CardHeader';
import ViewDetail from '../../../../../components/ViewDeatilComponent/ViewDeatil';
import Modal from 'react-responsive-modal';
import ConfirmationPopup from '../../../../../components/ConfirmationPopup/ConfirmationPopup';
import GlobalContext from '../../../../../components/Context/GlobalContext';
import { dataService } from '../../../../../services/data.services';
import { PayOutRequestView } from './ViewPayOutRequeSlice';
import PayoutConformationPopup from '../../../../../components/ConfirmationPopup/PayoutConformationPopup';
import ErrorMessage from '../../../../../components/ErrorMessage/ErrorMessage';

export default function ViewPayOutRequest () {
    const dispatch = useDispatch();
    const { id } = useParams();
    const location = useLocation();

    const [BankDropDownValue, setBankDropDownValue] = useState([]);
    const getBankTypes = async () => {
        try {
            const response = await dataService.GetAPI('admin-users/list-trust-bank');
            const bankTypes = response.data.data;
            const arrayValue = bankTypes.reduce((acc, item) => {
                if (item.ref_no !== 'PTBAT') {
                    acc.push(`Pay-out to Agent from  ${item.ref_no} | EM credit to PMCAT`);
                }
                return acc;
            }, []);
            setBankDropDownValue(arrayValue);
        } catch (error) {
            console.error('Error fetching bank types:', error);
        }
    };
    const Felids = {
        nothing_to_show: {
            Type: {
                label: 'Type',
                type: 'dropdown',
                key: 'transaction_code',
                require: true,
                options: BankDropDownValue.sort()
            },
            'Transaction POP Ref. No': {
                label: 'Transaction POP Ref. No',
                type: 'input',
                key: 'pop_file_ref_no',
                require: true
            }
        }
    };
    const [states, setState] = useState({});
    const { View, TransactionDetails, BankDetails, loading } = useSelector(state => state.PayOutRequestView); // to get the api respons
    const [isRejectModalOpen, setRejectModalOpen] = useState();
    const [submitSelected, setSubmitSelected] = useState(false);
    const [isApproveModalOpen, setApproveModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { setToastError, setToastSuccess } = useContext(GlobalContext);
    // const { user } = useSelector((state) => state.auth);
    // const { paymaart_id: PaymaartId } = user;
    console.log(location, 'location checking');
    const getView = () => {
        try {
            dispatch(PayOutRequestView(id));
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getView();
        getBankTypes();
    }, []);

    const handleConfirmAction = async () => {
        if (isApproveModalOpen && (states.transaction_code === undefined || states.pop_file_ref_no === undefined || states.pop_file_ref_no === '' || states.pop_file_key === undefined || states.pop_file_key === '')) {
            setSubmitSelected(true);
        } else if (isRejectModalOpen && (states.reason === undefined || states.reason === '')) {
            setSubmitSelected(true);
        } else {
            try {
                const payload = {
                    paymaart_id: View.recipient_id,
                    payout_request_id: View.request_id,
                    status: isApproveModalOpen ? 'approved' : 'rejected',
                    amount: parseFloat(View.amount),
                    tax_amount: parseFloat(View.tax_amount),
                    vat_amount: parseFloat(View.vat_amount),
                    transaction_id: View?.transaction_id,
                    pop_file_key: states?.pop_file_key,
                    transaction_code: states?.transaction_code,
                    pop_file_ref_no: states?.pop_file_ref_no
                };
                switch (states.transaction_code) {
                case 'Pay-out to Agent from  PTBA1 | EM credit to PMCAT':
                    payload.bank_type = 'PTBA1';
                    break;
                case 'Pay-out to Agent from  PTBA2 | EM credit to PMCAT':
                    payload.bank_type = 'PTBA2';
                    break;
                case 'Pay-out to Agent from  PTBA3 | EM credit to PMCAT':
                    payload.bank_type = 'PTBA3';
                    break;
                default:
                    payload.bank_type = 'PTBA1';
                    break;
                }
                setIsLoading(true);
                const response = await dataService.PostAPI('payout-transactions/approve-reject', payload);
                if (!response.error) {
                    setIsLoading(false);
                    setToastSuccess(`Pay-out request ${isApproveModalOpen ? 'approved' : 'rejected'} successfully`);
                    setApproveModalOpen(false);
                    setRejectModalOpen(false);
                    getView();
                } else {
                    setIsLoading(false);
                    setApproveModalOpen(false);
                    setRejectModalOpen(false);
                    setToastError('Something went wrong!');
                }
            } catch (error) {
                setIsLoading(false);
                setApproveModalOpen(false);
                setRejectModalOpen(false);
                setToastError('Something went wrong!');
            }
        }
    };
    const handleReason = (event) => {
        const newValue = event.target.value;
        setSubmitSelected(false);
        setState((prevState) => ({ ...prevState, reason: newValue }));
    };
    console.log(searchParams, 'searchParams');
    return (
        <>
            <CardHeader
                activePath='Pay-out Request Details'
                paths={['Transactions', 'Pay-out Requests']}
                pathurls={['transactions/pay-out-requests']}
                minHeightRequired={true}
                ChildrenElement
            >
                {<>
                    <div className={`max-h-[calc(100vh-120px)] scrollBar overflow-auto mx-10 my-8 px-[30px] pt-[24px] pb-[28px] 
                flex flex-col bg-[#FFFFFF] border border-neutral-outline rounded-[6px]
                `}>
                        <div className='flex justify-between items-center'>
                            <h1 className='text-[#252C32] font-bold text-[30px] leading-[40px]'>Pay-out Request Details</h1>
                            {(View?.status !== 'rejected' && View?.status !== 'approved') && <div className='flex'>
                                <button data-testid="reject_button"
                                    onClick={() => setRejectModalOpen(true)}
                                    className={`flex  bg-primary-negative py-[8px] px-[16px] 
                                        justify-center items-center h-[40px] rounded-[6px] w-[117px]`}>
                                    <p className='text-[14px] font-semibold text-[#ffffff]'>Reject</p>
                                </button>
                                <button data-testid="activate_deactivate_button"
                                    onClick={() => {
                                        setApproveModalOpen(true);
                                        setState({});
                                        setSubmitSelected(false);
                                    }
                                    }
                                    className={`flex bg-[#13B681] py-[8px] px-[16px] justify-center items-center w-[117px]
                                    h-[40px] rounded-[6px] ml-4`}>
                                    <p className='text-[14px] font-semibold text-[#ffffff]'>Approve</p>
                                </button>
                            </div>}
                        </div>
                    </div>
                    <div data-testid="transaction_details" className={`max-h-[calc(100vh-120px)] scrollBar overflow-auto mx-10 mb-8 px-[30px] pt-[24px] pb-[28px] 
                flex flex-col bg-[#FFFFFF] border border-neutral-outline rounded-[6px]
                `}>
                        <h1 className='text-[#4F5962] font-semibold text-[18px] leading-[26px] my-2'>
                            Transaction Details
                        </h1>
                        <div className='w-full flex flex-wrap mt-1 -mx-1'>
                            {loading
                                ? ([...Array(4)].map((_, ind) => (
                                    <div className='w-1/3 px-1'>
                                        <ViewDetail
                                            itemkey='Loading...'
                                            userDetails='Loading...'
                                            loading={loading}
                                        />
                                    </div>
                                )))
                                : (Object?.keys(TransactionDetails)?.map((itemkey, index = 0) => (
                                    <div key={index} className='w-1/3 px-1'>
                                        <ViewDetail
                                            itemkey={itemkey.replaceAll('_', ' ')}
                                            userDetails={TransactionDetails[itemkey]}
                                            loading={loading}
                                        />
                                    </div>)
                                ))}
                        </div>
                    </div>
                    <div data-testid="bank_details" className={`max-h-[calc(100vh-120px)] scrollBar overflow-auto mx-10 mb-8 px-[30px] pt-[24px] pb-[28px] 
                flex flex-col bg-[#FFFFFF] border border-neutral-outline rounded-[6px]
                `}>
                        <h1 className='text-[#4F5962] font-semibold text-[18px] leading-[26px] my-2'>
                            Bank Details
                        </h1>
                        <div className='w-full flex flex-wrap mt-1 -mx-1'>
                            {loading
                                ? ([...Array(3)].map((_, ind) => (
                                    <div className='w-1/3 px-1'>
                                        <ViewDetail
                                            itemkey='Loading...'
                                            userDetails='Loading...'
                                            loading={loading}
                                        />
                                    </div>
                                )))
                                : (Object.keys(BankDetails).map((itemkey, index = 0) => (
                                    <div key={index} className='w-1/3 px-1'>
                                        <ViewDetail
                                            itemkey={itemkey.replaceAll('_', ' ')}
                                            userDetails={BankDetails[itemkey]}
                                            loading={loading}
                                        />
                                    </div>)
                                ))}
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
                        handleSubmit={handleConfirmAction}
                        isLoading={isLoading}
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
                    <PayoutConformationPopup
                        title={'Confirm to Approve?'}
                        message={'Fill the below details to approve'}
                        handleSubmit={handleConfirmAction}
                        isLoading={isLoading}
                        submitSelected={submitSelected}
                        handleClose={() => setApproveModalOpen(false)}
                        id={View?.request_id}
                        buttonColor={'bg-accent-positive'}
                        states={states}
                        setState={setState}
                        Felids={Felids}
                    />
                </div>
            </Modal>
        </>

    );
}
