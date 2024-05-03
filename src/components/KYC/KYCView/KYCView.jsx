import React, { useEffect } from 'react';
import CardHeader from '../../CardHeader';
import { getPaths, getStatusColor } from './KYCViewFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import ViewDetail from '../../ViewDeatilComponent/ViewDeatil';
import ProfileName from '../../ProfileName/ProfileName';
import isTimestampFiveMinutesAgo from '../../../CommonMethods/lastLoggedInTimeStamp';
import formatTimestamp from '../../../CommonMethods/formatTimestamp';
import KYCSections from './KYCSections';
import { KYCProfileView } from './KYCProfileViewSlice';
import ImageViewWithModel from '../../S3Upload/ImageViewWithModel';

export default function KYCView ({ role, viewType }) {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { View, loading, userDetails } = useSelector(state => state.KYCProfileSpecificView); // to get the api respons

    const getView = () => {
        try {
            dispatch(KYCProfileView(id, viewType, role));
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getView();
    }, []);
    return (
        <>
            <CardHeader
                activePath={getPaths(viewType, role).activePath}
                paths={getPaths(viewType, role).paths}
                pathurls={getPaths(viewType, role).pathurls}
                header={getPaths(viewType, role).activePath}
                minHeightRequired= {true}
                rejectOrApprove = {viewType === 'kyc' ? true : undefined}
                reject={loading}
                approve={loading}
                updateButton={loading}
                updateButtonPath={`/users/admins/update-admin/${id}`}
                statusButton={id === View?.paymaart_id
                    ? undefined
                    : loading || (View?.status !== 'active' ? 'Activate' : 'Deactivate')}
                ChildrenElement
                // onHandleStatusChange={handleStatusClick}
            >
                {<>
                    <div className={`max-h-[calc(100vh-120px)] scrollBar overflow-auto mx-10 mb-8 px-[30px] pt-[24px] pb-[28px] 
                flex flex-col bg-[#FFFFFF] border border-neutral-outline rounded-[6px]
                `}>
                        <div className='flex justify-between items-center'>
                            <ProfileName
                                userButtonName={`${View?.name.split(' ')[0][0] || ''}${View?.name.split(' ')[1][0] || ''}
                                ${View?.last_name?.[0] || ''}`}
                                UserName={View?.name}
                                payMaartID={View?.user_id}
                                loading={loading}
                                lastLoggedIn={View?.updated_at
                                    ? isTimestampFiveMinutesAgo(View?.updated_at)
                                        ? formatTimestamp(View?.updated_at)
                                        : 'Online'
                                    : ''}
                                CreatedDate={formatTimestamp(View?.user_created_date)}
                            />
                            <div className='flex flex-col items-end text-[14px] leading-6 font-semibold text-[#4F5962] mb-1'>
                                <p>{View?.kyc_type === 'full' ? 'Full KYC' : 'Simplified KYC'} ,
                                    {View?.citizen === 'Malawian' ? 'Malawi citizen' : View?.citizen}</p>
                                <span className={`py-[2px] px-[10px] text-[13px] font-[600] capitalize rounded w-fit
                                 ${getStatusColor(View?.kyc_status)?.color}`}>
                                    {getStatusColor(View?.kyc_status)?.text}
                                </span>
                            </div>
                        </div>
                    </div>
                    <KYCSections
                        heading='Basic Details'
                        childe={
                            <div className='w-full flex flex-wrap mt-1 -mx-1'>
                                {loading
                                    ? ([...Array(3)].map((_, ind) => (
                                        <div className='w-1/3 px-1' key={ind}>
                                            <ViewDetail
                                                itemkey='Loading...'
                                                userDetails='Loading...'
                                                loading={loading}
                                            />
                                        </div>
                                    )))
                                    : (
                                        Object.keys(userDetails.basicDetails).map((itemkey, index = 0) => (
                                            <div key={index} className='w-1/3 px-1'>
                                                <ViewDetail
                                                    itemkey={itemkey.replaceAll('_', ' ')}
                                                    userDetails={userDetails.basicDetails[itemkey]}
                                                    loading={loading}
                                                />
                                            </div>)
                                        )
                                    )
                                }
                            </div>
                        }
                    />
                    <KYCSections
                        heading='Identity Details'
                        childe={
                            <div className='w-full flex flex-wrap mt-1 -mx-1'>
                                {loading
                                    ? ([...Array(3)].map((_, ind) => (
                                        <div className='w-1/3 px-1' key={ind}>
                                            <ViewDetail
                                                itemkey='Loading...'
                                                userDetails='Loading...'
                                                loading={loading}
                                            />
                                        </div>
                                    )))
                                    : (
                                        Object.keys(userDetails.identityDetails).map((itemkey, index = 0) => (
                                            <div key={index} className='w-1/3 px-1'>
                                                <h1
                                                    className='mt-6 text-[#A4A9AE] text-[14px] leading-6 font-normal'
                                                >{itemkey}</h1>
                                                {userDetails.identityDetails[itemkey].map((imageItem) => (
                                                    imageItem !== null && <div key={imageItem}>
                                                        {console.log('imageItem', imageItem)}
                                                        <ImageViewWithModel item={imageItem}/>
                                                    </div>
                                                ))}
                                            </div>)
                                        )
                                    )
                                }
                            </div>
                        }
                    />
                </>}
            </CardHeader>
        </>
    );
}
