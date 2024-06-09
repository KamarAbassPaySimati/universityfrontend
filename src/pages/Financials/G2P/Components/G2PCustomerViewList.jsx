/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import CardHeader from '../../../../components/CardHeader';
import ProfileName from '../../../../components/ProfileName/ProfileName';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { G2PCustomerViewData } from '../G2PCustomerViewSlice';
import { useSearchParams } from 'react-router-dom';
import formatTimestamp from '../../../../CommonMethods/formatTimestamp';
import G2PCustomerTable from './G2PSCustomerTable';
import NoDataError from '../../../../components/NoDataError/NoDataError';
import Paginator from '../../../../components/Paginator/Paginator';

export default function G2PCustomerViewList () {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
    const [notFound, setNotFound] = useState(false);
    const { View, loading, error } = useSelector(state => state.G2PCustomerView); // to get the api respons

    console.log(View, 'View');

    const getG2PCustomerView = async () => {
        try {
            await dispatch(G2PCustomerViewData(`${id}?${searchParams.toString()}`));
        } catch (error) {

        }
    };

    useEffect(() => {
        getG2PCustomerView();
    }, [searchParams]);

    useEffect(() => {
        if (View?.length !== 0) {
            setNotFound(false);
        }
    }, [View]);

    console.log(Object.fromEntries(searchParams), 'VIEW');

    return (
        <CardHeader
            activePath={'G2P Profile'}
            paths={['Financials', 'G2P']}
            pathurls={['financials/G2P']}
            header=''
            minHeightRequired={true}
            ChildrenElement
        >
            {<>
                <div className={`max-h-[calc(100vh-120px)] scrollBar overflow-auto mx-10 mb-8 mt-8 px-[30px] pt-[24px] pb-[28px] 
        flex flex-col bg-[#FFFFFF] border border-neutral-outline rounded-[6px]
        `}>
                    <div className='flex justify-between items-center'>
                        <ProfileName
                            g2pCustomer={true}
                            userButtonName={`${View?.first_name[0] || ''}${View?.middle_name[0] || ''}${View?.last_name[0] || ''}`}
                            UserName={`${View?.first_name} ${View?.middle_name} ${View?.last_name}`}
                            payMaartID={View?.paymaart_id}
                            Amount={(View?.amount) ? `${View?.amount}` : `${View?.remaining_amount} MWK`}
                            CreatedDate={formatTimestamp(View?.created_at)}
                            loading={loading}
                        />
                        <div className="flex items-center">
                            <button type='button' className='font-semibold text-base bg-white px-4 py-2 text-[#3B2A6F] border border-[#3B2A6F] rounded-[6px]'>
                                Sample File
                            </button>
                            <button type='button' className='font-semibold text-base text-white px-4 py-2 bg-[#3B2A6F] rounded-[6px] flex items-center ml-4'>
                                <span className='mr-2'><img src="/images/upload-white.svg" alt="upload" /></span>
                                Upload Sheet
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`relative ${notFound || View?.length === 0 ? '' : 'mx-10 mb-8 mt-8 border border-[#DDDDDD] bg-white rounded-[6px]'}`}>
                    {!notFound && !(View && View?.sheets?.length === 0 && !loading &&
                        !(searchParams.get('status') !== null || searchParams.get('search') !== null)) &&
                        <div className='overflow-auto scrollBar h-g2pCustomerTableHeight rounded-[6px]'>
                            <G2PCustomerTable
                                View={View}
                                loading={loading}
                                error={error}
                                searchParams={searchParams}
                                setSearchparams={setSearchParams}
                            />
                        </div>}
                    {notFound &&
                        <NoDataError
                            className='h-g2pNotFound' heading='No data found' text="404 could not find what you are looking for." />}
                    {View && View?.sheets?.length === 0 && !loading &&
                        !(searchParams.get('status') !== null || searchParams.get('search') !== null) &&
                        (<NoDataError className='h-g2pNotFound' heading='There are no G2P list to view yet' topValue='mt-8' />)}
                    {(!loading && !error && !notFound && View && View?.sheets?.length > 0) && <Paginator
                        currentPage={searchParams.get('page')}
                        totalPages={Math.ceil(View?.total_records / 10)}
                        setSearchParams={setSearchParams}
                        searchParams={searchParams}
                        totalRecords={View?.total_records}
                    />}
                </div>
            </>}
        </CardHeader>
    );
}
