import React, { useContext, useEffect, useState } from 'react';
import CardHeader from '../../../../components/CardHeader';
import Image from '../../../../components/Image/Image';
import { dataService } from '../../../../services/data.services';
import GlobalContext from '../../../../components/Context/GlobalContext';
import { endpoints } from '../../../../services/endpoints';
import { useNavigate, useParams } from 'react-router';
import TransactionDetailsShimmer from '../../../../components/Shimmers/transactionDetailsShimmer';
import convertTimestampToCAT from '../../../../CommonMethods/timestampToCAT';
import { formattedAmount } from '../../../../CommonMethods/formattedAmount';

const ViewTransactionDetails = () => {
    // States
    const [transactionDetails, setTransactionDetails] = useState();
    const [dataLoading, setdataLoading] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();
    const { setToastError } = useContext(GlobalContext);
    const { viewTransaction } = endpoints;

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

    // Hook Calls
    useEffect(() => {
        getTransactionDetails();
    }, []);

    return (
        <CardHeader
            activePath={'Transaction Details'}
            paths={['Financials', 'Transaction History']}
            pathurls={['financials/transaction-history']}
            header='Transaction Details'
            minHeightRequired={true}
        >
            <div className='flex justify-center items-center'>
                <div className='border-background-light border bg-[#FFFFFF] w-[723px] rounded-[14px] p-[30px]
                    flex flex-col justify-center items-center relative mt-4'>
                    <Image src='sideNavLogo' className='w-[165px]' />
                    <div className='absolute top-[23px] right-[23px] flex gap-[14px]'>
                        <Image src='flag' className='cursor-pointer' />
                        <Image src='share' className='' />
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
                                        <p>{transactionDetails?.receiver_id || '-'}</p>
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
                                <p>*VAT Include</p>
                                <p>Txn ID</p>
                                <p>Date, time</p>
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
                                        <p>{`${convertTimestampToCAT(transactionDetails?.created_at)} CAT` || '-'}</p>
                                    </>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CardHeader>
    );
};

export default ViewTransactionDetails;
