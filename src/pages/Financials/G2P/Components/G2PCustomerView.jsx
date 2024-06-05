/* eslint-disable max-len */
import React from 'react';
import CardHeader from '../../../../components/CardHeader';
import { useParams } from 'react-router';
import ProfileName from '../../../../components/ProfileName/ProfileName';
import { useSelector } from 'react-redux';

function G2PCustomerView () {
    const { View, userDetails, loading } = useSelector(state => state.G2PCustomerView); // to get the api respons
    const { name } = useParams();

    return (
        <CardHeader
            activePath={name}
            paths={['Financials', 'G2P']}
            // pathurls={[`financials/g2p/${full_name}`]}
            // header={name}
            minHeightRequired={true}
            headerWithoutButton={true}
            table={true}>
            <div>
                <div className={`max-h-[calc(100vh-120px)] scrollBar overflow-auto mx-10 mb-8 px-[30px] pt-[24px] pb-[28px] 
                flex flex-col bg-[#FFFFFF] border border-neutral-outline rounded-[6px]`}>
                    <div className='flex justify-between items-center'>
                        <ProfileName
                            userButtonName={`${View?.first_name?.[0] || ''}${View?.middle_name?.[0] || ''}${View?.last_name?.[0] || ''}`}
                            UserName={`${View?.first_name || '-'} ${View?.middle_name || '-'} ${View?.last_name?.toUpperCase() || '-'}`}
                            payMaartID={View?.paymaart_id}
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
            </div>
        </CardHeader>
    );
}

export default G2PCustomerView;
