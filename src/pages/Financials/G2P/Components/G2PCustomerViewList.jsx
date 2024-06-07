/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import CardHeader from '../../../../components/CardHeader';
import ProfileName from '../../../../components/ProfileName/ProfileName';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { G2PCustomerView } from '../G2PCustomerViewSlice';
import { useSearchParams } from 'react-router-dom';
import formatTimestamp from '../../../../CommonMethods/formatTimestamp';
import G2PCustomerTable from './G2PSCustomerTable';

export default function G2PCustomerViewList() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
    const [notFound, setNotFound] = useState(false);
    const [error, setError] = useState(false);
    const { View, loading } = useSelector(state => state.G2PCustomerView); // to get the api respons

    const getG2PCustomerView = async () => {
        try {
            await dispatch(G2PCustomerView(`${id}&${searchParams.toString()}`));
        } catch (error) {

        }
    };
    useEffect(() => {
        if (View?.data?.length !== 0) {
            setNotFound(false);
        }
    }, [View]);

    useEffect(() => {
        getG2PCustomerView();
    }, []);

    console.log(View, 'VIEW');

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
                            Amount={(View?.amount) ? `${View.amount}` : `${View?.remaining_amount}`}
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
                <div data-testid="view_admin" className={`max-h-[calc(100vh-120px)] scrollBar overflow-auto mx-10 mb-8 px-[30px] pt-[24px] pb-[28px] 
        flex flex-col bg-[#FFFFFF] border border-neutral-outline rounded-[6px]
        `}>
                    {/* <G2PCustomerTable
                        View={View}
                        error ={error}
                        loading={loading}
                        setSearchParams={setSearchParams}
                        notFound={notFound}
                        searchParams={searchParams}
                    /> */}
                </div>
            </>}
        </CardHeader>
    );
}
