/* eslint-disable max-len */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import CardHeader from '../../../../components/CardHeader';
import ProfileName from '../../../../components/ProfileName/ProfileName';
import Button from '../../../../components/Button/Button';
import { useParams, useSearchParams } from 'react-router-dom';
import Topbar from '../../../../components/Topbar/Topbar';
import { useDispatch, useSelector } from 'react-redux';
import NoDataError from '../../../../components/NoDataError/NoDataError';
import InfoCard from './components/InfoCard';
import Paginator from '../../../../components/Paginator/Paginator';
import GlobalContext from '../../../../components/Context/GlobalContext';
import { dataService } from '../../../../services/data.services';
import { AgentTransactionHistoryList } from './AgentTransactionSlice';
import TransactionTable from './components/TransactionTable';
import { formattedAmount } from '../../../../CommonMethods/formattedAmount';
import convertTimestampToCAT from '../../../../CommonMethods/timestampToCAT';

const ViewTransactionList = () => {
    const [searchParams, setSearchParams] = useSearchParams({ });
    const [notFound, setNotFound] = useState(false);
    const [exportLoading, setExportloading] = useState(false);
    const { id } = useParams();

    const initailState = {
        'transaction-type': { 'Pay-Out': false, 'Pay-In': false, G2P: false, Others: false }
    };
    const [appliedFilter, setAppliedFilter] = useState(initailState);

    const { setToastError, setToastSuccess } = useContext(GlobalContext);
    const dispatch = useDispatch();
    const { List, loading, error } = useSelector(state => state.agentTransactionHistory);

    const filterOptions = {
        'Transaction Type': ['Pay-in', 'Pay-out', 'Cash-in', 'Cash-out', 'Pay Paymaart', 'Pay Afrimax', 'Pay Merchant', 'Other']
    };

    const handleExport = async () => {
        try {
            setExportloading(true);
            const res = await dataService.GetAPI(`admin-users/export-user-transactions?${searchParams.toString()}`);
            if (!res.error) {
                window.open(
                    res.data.s3_url,
                    '_blank'
                );
                setToastSuccess('Transaction details exported successfully');
                setExportloading(false);
            } else {
                setToastError('An Error Occured!');
                setExportloading(false);
            }
        } catch (error) {
            setToastError('An Error Occured!');
            setExportloading(false);
        }
    };

    const GetList = useCallback(async () => {
        try {
            dispatch(AgentTransactionHistoryList({ searchParams, id }));
        } catch (error) {
            console.error(error);
        }
    }, [searchParams]);

    useEffect(() => {
        console.log(error, 'error');
        if (error) {
            if (error.status === 400) {
                setNotFound(true);
            } else {
                setToastError('Something went wrong!');
            }
        }
    }, [error]);

    useEffect(() => {
        const params = Object.fromEntries(searchParams);
        if (List?.transactions?.length !== 0) {
            setNotFound(false);
            params.page = 1;
        }
    }, [List]);

    /* This `useEffect` hook is responsible for triggering a side effect whenever the dependencies
    specified in the dependency array change. In this case, the effect will run when the `GetList`
    function changes. */
    useEffect(() => {
        if (searchParams.get('page') === null) {
            setSearchParams({ page: 1 });
        } else {
            GetList();
        }
    }, [GetList]);

    return (
        <CardHeader
            activePath={'Transaction History'}
            paths={['Users', 'Agents']}
            pathurls={['users/agents']}
            header=''
            g2pHeight='true'
            minHeightRequired={true}
            ChildrenElement
            table={true}
        >
            <div className={`max-h-[calc(100vh-120px)] scrollBar overflow-auto mx-10 mb-8 mt-8 px-[30px] pt-[24px] pb-[28px] 
                flex flex-col bg-[#FFFFFF] border border-neutral-outline rounded-[6px]`}>
                <div className='flex justify-between items-center' data-testid="transaction-history">
                    <ProfileName
                        userButtonName={List?.full_name?.replace(/\b(\w)\w*\s*/g, '$1').toUpperCase() || '---'}
                        UserName={List?.full_name || '---'}
                        payMaartID={id}
                    />
                </div>
            </div>
            <div className={`max-h-[calc(100vh-245px)] min-h-[calc(100vh-265px)] relative z-[9] scrollBar overflow-auto ml-10 mr-5 pr-4 my-6
                flex flex-col `}
            >
                <div className='flex w-full gap-5'>
                    <InfoCard
                        title="Wallet Balance"
                        amount={`${List?.total_balance ? formattedAmount(List?.total_balance) : '0.00'} MVK`}
                        lastUpdated={`${List?.balance_updated_at ? convertTimestampToCAT(List?.balance_updated_at) : '-'}`}
                        imageSrc="wallet_balance"
                        isLoading={loading}
                    />
                    <InfoCard
                        title="Gross Agent Commission"
                        amount={`${List?.commission ? formattedAmount(List?.commission) : '0.00'} MVK`}
                        lastUpdated={`${List?.commission_updated_at ? convertTimestampToCAT(List?.commission_updated_at) : '-'}`}
                        additionalInfo={`${List?.commission_updated_at ? convertTimestampToCAT(List?.commission_updated_at) : '-'}`}
                        imageSrc="commision"
                        bgColor="bg-[#8075A1]"
                        isLoading={loading}
                    />
                    {/* <WalletCard />
                    <CommisionCard /> */}
                </div>
                <div className='relative z-[9] my-6 flex flex-col bg-[#FFFFFF] border-neutral-outline rounded-[6px] pb-2'> {/* border */}
                    <div className='mx-8 h-[67px] items-center flex justify-between'>
                        <p className='font-[600] text-lg text-neutral-primary'>Transaction Details</p>
                        <Button
                            testId='export-transaction-button'
                            type='button'
                            text='Export'
                            className='!w-[117px]'
                            isLoading={exportLoading}
                            onClick={handleExport} 
                        />
                    </div>

                    <div className={`relative ${notFound || List?.transactions?.length === 0 ? '' : 'thead-border-bottom'}`}>
                        {(!notFound && List?.transactions?.length === 0 &&
                        searchParams.get('transaction_type') === null &&
                    searchParams.get('search') === null && searchParams.get('start_date') === null && searchParams.get('end_date') === null)
                            ? (
                                <></>
                            )
                            : (!notFound &&
                            <div className='bg-[#fff] border-b border-neutral-outline'>
                                <Topbar
                                    setSearchParams={setSearchParams}
                                    searchParams={searchParams}
                                    filterOptions={filterOptions}
                                    placeHolder="Transaction ID or recipient Paymaart ID"
                                    filterType='Filter Transaction History'
                                    isLoading={loading}
                                    filterActive={(searchParams.get('transaction_type') !== null) && searchParams.get('start_date') !== null && searchParams.get('end_date') !== null}
                                    multiFilter={true}
                                    setAppliedFilter={setAppliedFilter}
                                    appliedFilter={appliedFilter}
                                    customClass={true}
                                    initialState={initailState}
                                />
                            </div>)
                        }
                        {!notFound && !(List?.transactions?.length === 0 && !loading &&
                !(searchParams.get('transaction_type') !== null || searchParams.get('search') !== null || searchParams.get('start_date') !== null || searchParams.get('end_date') !== null)) &&
                <div className='overflow-auto scrollBar h-tableHeight'>
                    <TransactionTable
                        error={error}
                        loading={loading}
                        List={List}
                        setSearchParams={setSearchParams}
                        notFound={notFound}
                        searchParams={searchParams}
                    />
                </div>}
                        {notFound &&
                        <NoDataError
                            className='h-noDataError1' heading='No data found' text = "404 could not find what you are looking for."/>}
                        {List?.transactions?.length === 0 && !loading &&
                !(searchParams.get('transaction_type') !== null || searchParams.get('search') !== null || searchParams.get('start_date') !== null || searchParams.get('end_date') !== null) &&
                (<NoDataError className='h-noDataError1' heading='No transaction history to view yet' text='Please check back later' />)}
                        {!loading && !error && !notFound && List?.transactions?.length !== 0 && <Paginator
                            currentPage={searchParams.get('page')}
                            totalPages={Math.ceil(List?.total_records / 10)}
                            setSearchParams={setSearchParams}
                            searchParams={searchParams}
                            totalRecords={List?.total_records}
                            type='page'
                        />}
                    </div>
                </div>
            </div>
        </CardHeader>
    );
};

export default ViewTransactionList;
