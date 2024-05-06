import React, { useEffect } from 'react';
import CardHeader from '../../CardHeader';
import { getApiurl, getPaths, getStatusColor } from './KYCViewFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import ViewDetail from '../../ViewDeatilComponent/ViewDeatil';
import ProfileName from '../../ProfileName/ProfileName';
import isTimestampFiveMinutesAgo from '../../../CommonMethods/lastLoggedInTimeStamp';
import formatTimestamp from '../../../CommonMethods/formatTimestamp';
import KYCSections from './KYCSections';
import { KYCProfileView } from './KYCProfileViewSlice';
import ImageViewWithModel from '../../S3Upload/ImageViewWithModel';
import InputTypeCheckbox from '../../InputField/InputTypeCheckbox';

export default function KYCView ({ role, viewType }) {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { View, loading, userDetails } = useSelector(state => state.KYCProfileSpecificView); // to get the api respons

    const getView = () => {
        try {
            dispatch(KYCProfileView(getApiurl(id, viewType, role)));
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
                rejectOrApprove = {viewType === 'kyc' && View?.kyc_status === 'in_progress' ? true : undefined}
                reject={loading}
                approve={loading}
                updateButton={loading}
                updateButtonPath={`${getPaths(viewType, role).updateButtonPath}${id}`}
                statusButton={loading || (View?.status !== 'active' ? 'Activate' : 'Deactivate')}
                ChildrenElement
                // onHandleStatusChange={handleStatusClick}
            >
                {<>
                    <div className={` mx-10 mb-8 px-[30px] pt-[24px] pb-[28px] 
                flex flex-col bg-[#FFFFFF] border border-neutral-outline rounded-[6px]
                `}>
                        <div className='flex justify-between items-center' data-testid="user_details">
                            <ProfileName
                                userButtonName={`${View?.name.split(' ')[0][0] || ''}${View?.name.split(' ')[1][0] || ''}
                                ${View?.last_name?.[0] || ''}`}
                                UserName={View?.name}
                                payMaartID={View?.paymaart_id}
                                loading={loading}
                                viewType={viewType}
                                lastLoggedIn={View?.last_logged_in === null
                                    ? '-----'
                                    : View?.last_logged_in
                                        ? isTimestampFiveMinutesAgo(View?.last_logged_in)
                                            ? formatTimestamp(View?.last_logged_in)
                                            : 'Online'
                                        : ''}
                                CreatedDate={formatTimestamp(View?.user_created_date)}
                            />
                            {View?.kyc_type && !loading &&
                            <div className='flex flex-col items-end text-[14px] leading-6 font-semibold text-[#4F5962] mb-1'>
                                <p data-testid="kyc_type"
                                    className='mb-1'>{View?.kyc_type === 'full' ? 'Full KYC' : 'Simplified KYC'},
                                    {View?.citizen === 'Malawian' ? ' Malawi citizen' : ' Non-Malawi citizen'}</p>
                                <span data-testid="kyc_status"
                                    className={`py-[2px] px-[10px] text-[13px] font-[600] capitalize rounded w-fit
                                 ${getStatusColor(View?.kyc_status)?.color}`}>
                                    {getStatusColor(View?.kyc_status)?.text}
                                </span>
                            </div>}
                        </div>
                    </div>
                    <div className='max-h-[calc(100vh-350px)] scrollBar overflow-auto'>
                        <KYCSections
                            heading='Basic Details'
                            testId='basic_details'
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
                                            Object.keys(
                                                userDetails.basicDetails
                                            ).map((itemkey, index = 0) =>
                                                (<div key={index} className='w-1/3 px-1'>
                                                    <ViewDetail
                                                        itemkey={itemkey.replaceAll('_', ' ')}
                                                        userDetails= {
                                                            userDetails.basicDetails[itemkey]
                                                        }
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
                            testId='identity_details'
                            childe={
                                <div className='w-full flex flex-wrap mt-1 xl:-mx-[40px]'>
                                    {loading
                                        ? ([...Array(3)].map((_, ind) => (
                                            <div className='w-1/3 pl-8 px-1' key={ind}>
                                                <ViewDetail
                                                    itemkey='Loading...'
                                                    userDetails='Loading...'
                                                    loading={loading}
                                                />
                                            </div>
                                        )))
                                        : (
                                            Object.keys(userDetails.identityDetails).map((itemkey, index = 0) => (
                                                <div key ={index} className='flex flex-wrap xl:px-[40px] xl:w-1/3 w-1/2'>
                                                    <div key={index} className=''>
                                                        <h1
                                                            className='mt-4 text-[#A4A9AE] text-[14px] leading-6 font-normal'
                                                        >{itemkey}</h1>
                                                        {userDetails.identityDetails[itemkey].map((imageItem, index = 0) => (
                                                            imageItem !== null && <div key={imageItem} className='pr-2'>
                                                                <ImageViewWithModel
                                                                    item={imageItem}
                                                                    testId={`${itemkey}_${index}`}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>)
                                            )
                                        )
                                    }
                                </div>
                            }
                        />
                        {role === 'merchant' && (
                            <KYCSections
                                heading='Trading Details'
                                testId='trading_details'
                                childe={
                                    <div className='w-full flex flex-wrap mt-1 -mx-1'>
                                        {loading
                                            ? ([...Array(4)].map((_, ind) => (
                                                <div className='w-1/3 px-1' key={ind}>
                                                    <ViewDetail
                                                        itemkey='Loading...'
                                                        userDetails='Loading...'
                                                        loading={loading}
                                                    />
                                                </div>
                                            )))
                                            : (
                                                <>
                                                    {Object.keys(userDetails.tradingDetails).map((itemkey, index = 0) => (
                                                        <div key={index} className='w-1/3 px-1'>
                                                            <ViewDetail
                                                                itemkey={itemkey.replaceAll('_', ' ')}
                                                                userDetails={userDetails.tradingDetails[itemkey]}
                                                                loading={loading}
                                                            />
                                                        </div>
                                                    ))}
                                                    <div className='flex flex-col'>
                                                        <h1 className='mt-4 text-[#A4A9AE] text-[14px]
                                                        leading-6 font-normal px-1'>Business Images</h1>
                                                        {userDetails?.businessImages !== null && (
                                                            <div className='flex flex-wrap xl:px-[2px] px-[3px]'>
                                                                {Object.keys(userDetails?.businessImages).map((
                                                                    imageItem, index) => (
                                                                    <div key={index}
                                                                            className='xl:w-1/3 w-1/2'>
                                                                            <div className='flex flex-row'>
                                                                            {imageItem !== null && (
                                                                                <ImageViewWithModel
                                                                                    item={imageItem}
                                                                                    testId={`businessImages_${index}`}
                                                                                />
                                                                            )}
                                                                        </div>
                                                                        </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>

                                                </>
                                            )
                                        }
                                    </div>
                                }
                            />
                        )}

                        <KYCSections
                            heading='Personal Details'
                            testId='personal_details'
                            childe={
                                <div>
                                    <div className='w-full flex flex-wrap mt-1 -mx-1'>
                                        {loading
                                            ? ([...Array(2)].map((_, ind) => (
                                                <div className='w-1/3 px-1' key={ind}>
                                                    <ViewDetail
                                                        itemkey='Loading...'
                                                        userDetails='Loading...'
                                                        loading={loading}
                                                    />
                                                </div>
                                            )))
                                            : (
                                                Object.keys(userDetails.personalDetails).map((itemkey, index = 0) => (
                                                    <div key={index} className='w-1/3 px-1'>
                                                        <ViewDetail
                                                            itemkey={itemkey.replaceAll('_', ' ')}
                                                            userDetails={userDetails.personalDetails[itemkey]}
                                                            loading={loading}
                                                        />
                                                    </div>)
                                                )
                                            )
                                        }
                                    </div>
                                    <div className='max-h-[calc(100vh-120px)] scrollBar
                                    overflow-auto mb-8 px-[30px] pb-[28px]
                flex flex-col bg-[#F0ECFF] mt-6 border border-none rounded-[6px]
                '>
                                        <div className='w-full flex flex-wrap mt-1 -mx-1'>
                                            {loading
                                                ? ([...Array(2)].map((_, ind) => (
                                                    <div className='w-1/3 px-1' key={ind}>
                                                        <ViewDetail
                                                            itemkey='Loading...'
                                                            userDetails='Loading...'
                                                            loading={loading}
                                                        />
                                                    </div>
                                                )))
                                                : (
                                                    Object.keys(userDetails.Occupation).map((itemkey, index = 0) => (
                                                        <div key={index} className='w-1/3 px-1'>
                                                            <ViewDetail
                                                                itemkey={itemkey.replaceAll('_', ' ')}
                                                                userDetails={userDetails.Occupation[itemkey]}
                                                                loading={loading}
                                                            />
                                                        </div>)
                                                    )
                                                )
                                            }
                                        </div>
                                    </div>
                                    {!loading && userDetails?.purpose &&
                                    <p className='text-neutral-secondary font-medium text-[14px] leading-4 mb-4'>
                                        Purpose and intended nature of the business relationship</p>}
                                    {loading
                                        ? ([...Array(2)].map((_, ind) => (
                                            <div className='w-1/2 px-1' key={ind}>
                                                <ViewDetail
                                                    itemkey='Loading...'
                                                    userDetails='Loading...'
                                                    loading={loading}
                                                />
                                            </div>
                                        )))
                                        : (
                                            userDetails?.purpose && userDetails?.purpose.map((purposeItem, index) => (
                                                <div key={purposeItem}
                                                >
                                                    <InputTypeCheckbox
                                                        key={purposeItem}
                                                        id={purposeItem}
                                                        testId={`purpose_${index}`}
                                                        checkboxText={purposeItem}
                                                        disabled={true}
                                                        Checked={true}
                                                    />
                                                </div>
                                            ))
                                        )
                                    }
                                    <div className='w-full flex flex-wrap mt-1 -mx-1'>
                                        {loading
                                            ? ([...Array(2)].map((_, ind) => (
                                                <div className='w-1/3 px-1' key={ind}>
                                                    <ViewDetail
                                                        itemkey='Loading...'
                                                        userDetails='Loading...'
                                                        loading={loading}
                                                    />
                                                </div>
                                            )))
                                            : (
                                                Object.keys(userDetails.incomeDetails).map((itemkey, index = 0) => (
                                                    <div key={index} className='w-1/3 px-1'>
                                                        <ViewDetail
                                                            itemkey={itemkey.replaceAll('_', ' ')}
                                                            userDetails={userDetails.incomeDetails[itemkey]}
                                                            loading={loading}
                                                        />
                                                    </div>)
                                                )
                                            )
                                        }
                                    </div>
                                </div>
                            }
                        />
                        <KYCSections
                            heading='Bank Details'
                            testId='bank_details'
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
                                            Object.keys(userDetails.bankDetails).map((itemkey, index = 0) => (
                                                <div key={index} className='w-1/3 px-1'>
                                                    <ViewDetail
                                                        itemkey={itemkey.replaceAll('_', ' ')}
                                                        userDetails={userDetails.bankDetails[itemkey]}
                                                        loading={loading}
                                                    />
                                                </div>)
                                            )
                                        )
                                    }
                                </div>
                            }
                        />
                    </div>
                </>}
            </CardHeader>
        </>
    );
}
