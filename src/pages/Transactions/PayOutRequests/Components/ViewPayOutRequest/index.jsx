/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CardHeader from '../../../../../components/CardHeader';
import ViewDetail from '../../../../../components/ViewDeatilComponent/ViewDeatil';
import Modal from 'react-responsive-modal';
import ConfirmationPopup from '../../../../../components/ConfirmationPopup/ConfirmationPopup';
import GlobalContext from '../../../../../components/Context/GlobalContext';

import { dataService } from '../../../../../services/data.services';
import { endpoints } from '../../../../../services/endpoints';
import { PayOutRequestView } from './ViewPayOutRequeSlice';

export default function ViewPayOutRequest () {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { View, TransactionDetails, BankDetails, Reason, loading } = useSelector(state => state.PayOutRequestView); // to get the api respons
    const [isModalOpen, setModalOpen] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const { setToastError, setToastSuccess } = useContext(GlobalContext);
    const { adminActivateDeactivate } = endpoints;
    // const { user } = useSelector((state) => state.auth);
    // const { paymaart_id: PaymaartId } = user;

    const getView = () => {
        try {
            dispatch(PayOutRequestView(id));
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getView();
    }, []);

    // on tap of activate/deactivate button
    // const handleStatusClick = () => {
    //     setModalOpen(true);
    // };
    const handleClose = () => {
        setModalOpen(false);
    };
    const handleConfirmAction = async () => {
        try {
            setIsLoading(true);
            const response = await dataService.PatchAPI(`admin-users/${adminActivateDeactivate}`,
                { username: TransactionDetails?.Email, status: View.status === 'active' ? 'false' : 'true' });
            if (!response.error) {
                setIsLoading(false);
                setModalOpen(false);
                getView();
                setToastSuccess(`Admin user ${View.status === 'active' ? 'deactivated' : 'activated'} successfully`);
            } else {
                setIsLoading(false);
                setModalOpen(false);
                setToastError('Something went wrong!');
            }
        } catch (error) {
            setIsLoading(false);
            setModalOpen(false);
            setToastError('Something went wrong!');
        }
    };
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
                            <div className='flex'>
                                <button data-testid="reject_button"
                                    // onClick={onHandleReject}
                                    className={`flex  bg-primary-negative py-[8px] px-[16px] 
                                        justify-center items-center h-[40px] rounded-[6px] w-[117px]`}>
                                    <p className='text-[14px] font-semibold text-[#ffffff]'>Reject</p>
                                </button>
                                <button data-testid="activate_deactivate_button"
                                    // onClick={onHandleStatusChange}
                                    className={`flex bg-[#13B681] py-[8px] px-[16px] justify-center items-center w-[117px]
                                    h-[40px] rounded-[6px] ml-4`}>
                                    <p className='text-[14px] font-semibold text-[#ffffff]'>Approve</p>
                                </button>
                            </div>
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
                                : (Object.keys(TransactionDetails).map((itemkey, index = 0) => (
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
                    <div data-testid="reason" className={`max-h-[calc(100vh-120px)] scrollBar overflow-auto mx-10 mb-8 px-[30px] pt-[24px] pb-[28px] 
                flex flex-col bg-[#FFFFFF] border border-neutral-outline rounded-[6px]
                `}>
                        <h1 className='text-[#4F5962] font-semibold text-[18px] leading-[26px] my-2'>
                            Reason
                        </h1>
                        <div className='w-full flex flex-wrap mt-1 -mx-1'>
                            {loading
                                ? ([...Array(1)].map((_, ind) => (
                                    <div className='w-ful px-1'>
                                        <ViewDetail
                                            itemkey='Loading...'
                                            userDetails='Loading...'
                                            loading={loading}
                                        />
                                    </div>
                                )))
                                : (Object.keys(Reason).map((itemkey, index = 0) => (
                                    <div key={index} className='w-full px-1'>
                                        <ViewDetail
                                            itemkey={itemkey.replaceAll('_', ' ')}
                                            userDetails={Reason[itemkey]}
                                            loading={loading}
                                        />
                                    </div>)
                                ))}
                        </div>
                    </div>
                </>}
            </CardHeader>
            <Modal center open={isModalOpen} onClose={handleClose} closeIcon={<div style={{ color: 'white' }} disabled></div>}>
                <div className='customModal'>
                    <ConfirmationPopup
                        title={`Confirm to ${View?.status === 'active' ? 'Deactivate' : 'Activate'}?`}
                        message={`${View?.status === 'active' ? 'This action will suspend Admin user\'s account' : 'This action will activate Admin user\'s account'}`}
                        handleSubmit={handleConfirmAction}
                        isLoading={isLoading}
                        handleClose={handleClose}
                        buttonColor={`${View?.status === 'active' ? 'bg-primary-negative' : 'bg-accent-positive'}`}
                    />
                </div>
            </Modal>
        </>

    );
}
