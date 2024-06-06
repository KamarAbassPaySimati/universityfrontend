/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import CardHeader from '../../../../components/CardHeader';
import { useParams } from 'react-router';
import ProfileName from '../../../../components/ProfileName/ProfileName';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { G2PCustomerView } from '../G2PCustomerViewSlice';

const G2PCustomerViewList = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams({ page_number: 1 });
    const [notFound, setNotFound] = useState(false);
    const { View, userDetails, loading } = useSelector(state => state.G2PCustomerView); // to get the api respons
    const { user } = useSelector((state) => state.auth);
    const { paymaart_id: PaymaartId } = user;

    const getG2pCustomerView = () => {
        console.log(' name, id', name, id);
        try {
            dispatch(G2PCustomerView({ PaymaartId: id, searchParams }));
        } catch (error) {
            console.error(error);
        }
    };
    console.log(View.full_name, 'hfhhhdjdhj');

    useEffect(() => {
        if (View?.data?.length !== 0) {
            setNotFound(false);
        }
    }, [View]);

    useEffect(() => {
        getG2pCustomerView();
    }, [id, searchParams]);

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
                            userButtonName={`${View?.first_name || ''}${View?.middle_name || ''}${View?.last_name || ''}`}
                            UserName={`${View.full_name}`}
                            payMaartID={View?.paymaart_id}
                            Amount={View?.amount ? `${View.amount} : ${View.remaining_amount}` : View?.remaining_amount}
                            CreatedDate={View.CreatedDate}
                            loading={loading}
                        />
                        <span className={`py-[2px] px-[10px] text-[13px] font-semibold capitalize 
                         ${View?.status === 'active'
            ? 'bg-[#ECFDF5] text-accent-positive'
            : 'bg-neutral-grey text-neutral-secondary'}`}>
                            {View?.status}
                        </span>
                    </div>
                </div>
                <div data-testid="view_admin" className={`max-h-[calc(100vh-120px)] scrollBar overflow-auto mx-10 mb-8 px-[30px] pt-[24px] pb-[28px] 
        flex flex-col bg-[#FFFFFF] border border-neutral-outline rounded-[6px]
        `}>
                    <h1 className='text-[#4F5962] font-semibold text-[18px] leading-[26px] my-2'>
                        Basic Details
                    </h1>
                </div>
            </>}
        </CardHeader>
    );
};

export default G2PCustomerViewList;
