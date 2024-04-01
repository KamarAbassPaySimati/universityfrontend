/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import CardHeader from '../../../../../../components/CardHeader';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SpecificView } from './SpecificAdminViewSlice';
import ProfileName from '../../../../../../components/ProfileName/ProfileName';
// import { formatInputPhone } from '../../../../../../CommonMethods/phoneNumberFormat';
// import formatTimestamp from '../../../../../../CommonMethods/formatTimestamp';
import ViewDetail from '../../../../../../components/ViewDeatilComponent/ViewDeatil';

export default function SpecificAdminView () {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { View, userDetails, loading } = useSelector(state => state.SpecificAdminView); // to get the api respons
    const getAdminView = () => {
        try {
            dispatch(SpecificView(id));
        } catch (error) {
            console.error(error);
        }
    };
    // const loading = true;
    useEffect(() => {
        getAdminView();
    }, []);
    // const userDetails = {
    //     'Phone Number': View?.phone_number ? `${View?.country_code} ${formatInputPhone(View?.phone_number)}` : '',
    //     Email: View?.email,
    //     Role: View?.user_type,
    //     Created_Date: formatTimestamp(View?.last_logged_in),
    //     Last_Logged_In: View?.last_logged_in
    // };
    // const keys = Object.keys(userDetails);
    return (
        <CardHeader
            activePath='Admin Profile'
            paths={['Users', 'Admins']}
            pathurls={['users/admins']}
            header='Admin Profile'
            minHeightRequired={true}
            updateButton={loading}
            updateButtonPath
            statusButton={loading || (View?.status !== 'active' ? 'Activate' : 'Deactivate')}
            ChildrenElement
        >
            {<>
                <div className={`max-h-[calc(100vh-120px)] scrollBar overflow-auto mx-10 mb-8 px-[30px] pt-[24px] pb-[28px] 
                flex flex-col bg-[#FFFFFF] border border-neutral-outline rounded-[6px]
                `}>
                    <div className='flex justify-between items-center'>
                        <ProfileName
                            userButtonName={`${View?.first_name?.[0] || ''}${View?.middle_name?.[0] || ''}${View?.last_name?.[0] || ''}`}
                            UserName={`${View?.first_name || '-'} ${View?.middle_name || '-'} ${View?.last_name?.toUpperCase() || '-'}`}
                            payMaartID={View?.paymaart_id}
                            loading={loading}
                        />
                        <span className={`py-[2px] px-[10px] text-[13px] font-[600] capitalize 
                                 ${View?.status === 'active'
            ? 'bg-[#ECFDF5] text-accent-positive'
            : 'bg-neutral-grey text-neutral-secondary'}`}>
                            {View?.status}
                        </span>
                    </div>
                </div><div className={`max-h-[calc(100vh-120px)] scrollBar overflow-auto mx-10 mb-8 px-[30px] pt-[24px] pb-[28px] 
                flex flex-col bg-[#FFFFFF] border border-neutral-outline rounded-[6px]
                `}>
                    <h1 className='text-[#4F5962] font-[600] text-[18px] leading-[26px] my-2'>
                        Basic Details
                    </h1>
                    <div className='w-full flex flex-wrap mt-1 -mx-1'>
                        {loading
                            ? ([...Array(5)].map((_, ind) => (
                                <div className='w-1/3 px-1'>
                                    <ViewDetail
                                        itemkey='Loading...'
                                        userDetails='Loading...'
                                        loading={loading}
                                    />
                                </div>
                            )))
                            : (Object.keys(userDetails).map((itemkey, index = 0) => (
                                <div key={index} className='w-1/3 px-1'>
                                    <ViewDetail
                                        itemkey={itemkey.replaceAll('_', ' ')}
                                        userDetails={userDetails[itemkey]}
                                        loading={loading}
                                    />
                                </div>)
                            ))}
                    </div>
                </div></>}
        </CardHeader>
    );
}
