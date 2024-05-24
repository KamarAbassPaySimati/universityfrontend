/* eslint-disable max-len */
import React, { Fragment, useContext, useEffect, useState } from 'react';
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
import Modal from 'react-responsive-modal';
import ConfirmationPopup from '../../ConfirmationPopup/ConfirmationPopup';
import { dataService } from '../../../services/data.services';
import GlobalContext from '../../Context/GlobalContext';
import KYCReject from '../KYCReject';
import TillNumber from '../../Modals/TillNumber';
import { CDN } from '../../../config';
import { endpoints } from '../../../services/endpoints';

export default function KYCView ({ role, viewType }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [isApproveModalOpen, setIsApprovalModalOpen] = useState();
    const [isActivateModalOpen, setIsActivateModalOpen] = useState();
    const { approveKyc } = endpoints;
    const [isRejectModalOpen, setIsRejectModalOpen] = useState();
    const [isExpanded, setIsExpanded] = useState();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const { View, loading, userDetails } = useSelector(state => state.KYCProfileSpecificView); // to get the api respons
    const { setToastError, setToastSuccess } = useContext(GlobalContext);
    const [isTillNumberValue, setIsTillNumberValue] = useState(false);

    const getView = () => {
        try {
            dispatch(KYCProfileView(getApiurl(id, viewType, role)), viewType);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getView();
    }, []);
    const handleApproveClick = () => {
        setIsApprovalModalOpen(true);
    };
    const handleRejectClick = () => { // jjjfjfjfj
        setIsRejectModalOpen(true);
    };
    const handleClose = () => {
        setIsApprovalModalOpen(false);
    };
    const toggleExpand = () => {
        setIsExpanded(prevState => !prevState);
    };
    const handleTillNumber = () => {
        setIsTillNumberValue(true);
    };

    const handleConfirmAction = async () => {
        try {
            setIsLoading(true);
            const response = await dataService.PostAPI(`admin-users/${approveKyc}`,
                { user_id: View?.paymaart_id });
            if (!response.error) {
                setIsLoading(false);
                setIsApprovalModalOpen(false);
                getView();
                setToastSuccess('KYC approved successfully');
            } else {
                setIsLoading(false);
                setIsApprovalModalOpen(false);
                setToastError('Something went wrong!');
            }
        } catch (error) {
            setIsLoading(false);
            setIsApprovalModalOpen(false);
            setToastError('Something went wrong!');
        }
    };
    const handleConfirmActivation = async () => {
        try {
            setIsLoading(true);
            const response = await dataService.PatchAPI(('admin-users/activate-deactivate-user'),
                {
                    paymaart_id: View?.paymaart_id,
                    status: View.status === 'active' ? 'false' : 'true'
                });
            if (!response.error) {
                setIsLoading(false);
                setIsActivateModalOpen(false);
                getView();
                setToastSuccess(`${role.charAt(0).toUpperCase() + role.slice(1)} ${View.status === 'active' ? 'deactivated' : 'activated'} successfully`);
            } else {
                setIsLoading(false);
                setIsActivateModalOpen(false);
                setToastError('Something went wrong!');
            }
        } catch (error) {
            setIsLoading(false);
            setIsActivateModalOpen(false);
            setToastError('Something went wrong!');
        }
    };
    return (
        <>
            <CardHeader
                activePath={getPaths(viewType, role).activePath}
                paths={getPaths(viewType, role).paths}
                pathurls={getPaths(viewType, role).pathurls}
                header={getPaths(viewType, role).activePath}
                minHeightRequired={true}
                rejectOrApprove={(viewType === 'DeleteAccount' || (viewType === 'kyc' && (View?.user_kyc_status === 'in_progress' && user.paymaart_id !== View.added_admin))) ? true : undefined}
                reject={loading}
                approve={loading}
                updateButton={loading || (viewType === 'specific' ? View?.user_kyc_status === 'not_started' ? 'Complete KYC Registration' : 'Update' : undefined)}
                updateButtonPath={`${getPaths(viewType, role, loading || View?.user_kyc_status).updateButtonPath}${id}`}
                statusButton={loading || (viewType === 'specific' ? View?.status !== 'active' ? 'Activate' : 'Deactivate' : undefined)}
                onHandleStatusChange={viewType === 'kyc' && (View?.user_kyc_status === 'in_progress' && user.paymaart_id !== View.added_admin) ? handleApproveClick : () => setIsActivateModalOpen(true)}
                onHandleReject={handleRejectClick}
                ChildrenElement
            // onHandleStatusChange={handleStatusClick}
            >
                {<>
                    <div className={` mx-10 mb-4 px-[30px] pt-[24px] pb-[28px] 
                flex flex-col bg-[#FFFFFF] border border-neutral-outline rounded-[6px]
                `}>
                        <div className='flex justify-between items-center' data-testid="user_details">
                            <ProfileName
                                userButtonName={
                                    `${View?.first_name?.[0] || ''}${View?.middle_name?.[0] || ''}${View?.last_name?.[0] || ''}`}
                                UserName={`${View?.first_name || '-'} 
                                ${View?.middle_name || '-'} ${View?.last_name?.toUpperCase() || '-'}`}
                                payMaartID={View?.paymaart_id}
                                profilePicture={(role === 'customer' && View?.profile_pic !== null && View?.profile_pic !== undefined && View?.public_profile && View.profile_pic !== '') ? `${CDN}${View?.profile_pic}` : undefined}
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
                            {!loading &&
                                <div className='flex flex-col items-end text-[14px] leading-6 font-semibold text-[#4F5962] mb-1'>
                                    {viewType !== 'DeleteAccount' && (View?.user_kyc_status !== 'not_started' && <p data-testid="kyc_type"
                                        className='mb-1'>{View?.kyc_type === 'full' ? 'Full KYC' : 'Simplified KYC'},
                                        {View?.citizen === 'Malawian' ? ' Malawi citizen' : ' Non-Malawi citizen'}</p>)}
                                    <span data-testid="kyc_status"
                                        className={`py-[2px] px-[10px] text-[13px] font-semibold capitalize rounded w-fit
                                 ${getStatusColor((View?.user_kyc_status) || View?.status)?.color}`}>
                                        {getStatusColor((View?.user_kyc_status) || View?.status)?.text}
                                    </span>
                                </div>}
                        </div>
                    </div>
                    <div className='max-h-[calc(100vh-350px)] scrollBar overflow-auto'>
                        {!loading && (View?.user_kyc_status === 'info_required' || viewType === 'DeleteAccount') &&
                            <div className="mx-10 mb-4 px-[30px] pt-[24px] pb-[28px] flex flex-col bg-[#FFFFFF] border border-neutral-outline rounded-[6px] overflow-hidden">
                                <div className="flex flex-row justify-between">
                                    <h1 className="text-[18px] font-semibold text-neutral-primary">Reason for pending KYC</h1>
                                    <button className="text-[14px] font-400 text-primary-normal" onClick={toggleExpand}>
                                        {isExpanded ? 'Collapse' : 'Expand'}
                                    </button>
                                </div>
                                {isExpanded && (
                                    <div className="mt-2">
                                        {(viewType === 'DeleteAccount' ? View.reasons : View.rejection_reasons).map((itemValue, index) => (
                                            <div key={index} className={`${index === 0 ? 'border-t border-solid border-[#E5E9EB]' : ''} pt-[17px] overflow-hidden`}>
                                                <div className='flex'>
                                                    <span className="text-[#4F5962] font-semibold text-[14px] mt-[2.2px]">{index + 1}. </span>
                                                    {viewType === 'DeleteAccount'
                                                        ? <div className='ml-1'>
                                                            <span className="text-[#4F5962] font-semibold text-[14px]">{`${itemValue}`}</span>

                                                        </div>
                                                        : <div className='ml-1'>
                                                            <span className="text-[#4F5962] font-semibold text-[14px]">{`${itemValue.heading}: `}</span>
                                                            <span className="text-[#A4A9AE] font-[400] text-[14px]" style={{ overflowWrap: 'break-word' }}>{itemValue.label}</span>

                                                        </div>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        }
                        <KYCSections
                            heading='Basic Details'
                            testId='basic_details'
                            data-testid="basic_details"
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
                                                        userDetails={
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
                        {viewType !== 'DeleteAccount' && (View?.user_kyc_status !== 'not_started') && <>
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
                                                    <div key={index} className='flex flex-wrap xl:px-[40px] xl:w-1/3 w-1/2'>
                                                        <div key={index} className=''>
                                                            <h1
                                                                className='mt-4 text-[#A4A9AE] text-[14px] leading-6 font-normal'
                                                            >{itemkey}</h1>
                                                            {userDetails.identityDetails[itemkey]?.map((imageItem, index) => (
                                                                (imageItem !== null && imageItem !== '')
                                                                    ? (
                                                                        <div key={imageItem} className='pr-2'>
                                                                            <ImageViewWithModel
                                                                                name={
                                                                                    itemkey === 'Biometrics | Live Selfie'
                                                                                        ? `Biometrics.${imageItem
                                                                                            .slice(imageItem
                                                                                                .lastIndexOf('.') + 1)}`
                                                                                        : userDetails
                                                                                            .identityDetails[itemkey].length === 1
                                                                                            ? `${itemkey === 'ID Document'
                                                                                                ? View?.id_document
                                                                                                : View?.verification_document}${itemkey === 'ID Document' && View?.id_document === 'Passport'
                                                                                                ? ` Data Page.${imageItem.slice(imageItem.lastIndexOf('.') + 1)}`
                                                                                                : `.${imageItem.slice(imageItem.lastIndexOf('.') + 1)}`}`

                                                                                            : index === 0
                                                                                                ? `${itemkey === 'ID Document'
                                                                                                    ? View?.id_document
                                                                                                    : View?.verification_document
                                                                                                }
                                                                                                ${itemkey === 'ID Document' && View?.citizen !== 'Malawian' && View?.id_document === 'Passport' ? 'Data Page' : 'Front'}.${imageItem.slice(imageItem
                                                                            .lastIndexOf('.') + 1)}`
                                                                                                : `${itemkey === 'ID Document'
                                                                                                    ? View?.id_document
                                                                                                    : View?.verification_document
                                                                                                }
                                                                                                ${itemkey === 'ID Document' && View?.citizen !== 'Malawian' && View?.id_document === 'Passport' ? 'Visa Page' : 'Back'}.${imageItem.slice(imageItem
                                                                            .lastIndexOf('.') + 1)}`
                                                                                }
                                                                                item={imageItem}
                                                                                testId={`${itemkey}_${index}`}
                                                                                className={'w-[245px]'}
                                                                            />
                                                                        </div>
                                                                    )
                                                                    : (
                                                                        index === 0 && <h1 key={index}
                                                                            className='mt-2 text-ellipsis text-[14px] leading-6
                                                                        font-normal px-1'>-</h1>
                                                                    )
                                                            ))}
                                                            {(itemkey === 'ID Document') && (View?.id_document === 'Passport') && (
                                                                <>
                                                                    <p className='font-normal text-sm text-[#4F5962] mt-3 pl-1'>Type of Visa/Permit: Single/Multiple entry visa</p>
                                                                    <p className='font-normal text-sm text-[#4F5962] pl-1'>Visa/Permit reference number: 3</p>
                                                                </>
                                                            )}
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
                                                            <div key={index} className='w-1/3 px-1 xl:pr-[100px] pr-[40px]'>
                                                                <ViewDetail
                                                                    itemkey={itemkey.replaceAll('_', ' ')}
                                                                    userDetails={userDetails.tradingDetails[itemkey]}
                                                                    loading={loading}
                                                                />
                                                            </div>
                                                        ))}
                                                        <div className='flex flex-col'>
                                                            {View?.user_kyc_status === 'completed' &&
                                                                <div className='my-6'>
                                                                    <p className='font-normal text-[#A4A9AE] text-sm'>Till Numbers</p>
                                                                    <p className={`mt-1 ${View?.till_numbers?.length > 1 ? 'underline cursor-pointer' : 'cursor-default'}`} onClick={() => View?.till_numbers?.length > 1 && handleTillNumber()}>{(View?.till_numbers && Object.values(View?.till_numbers)[0] !== '') ? View?.till_numbers[0] : '-'}</p>
                                                                </div>
                                                            }
                                                            <h1 className='mt-4 text-[#A4A9AE] text-[14px] leading-6
                                                        font-normal px-1'>Business Images</h1>
                                                            {userDetails?.businessImages !== null &&
                                                                userDetails?.businessImages !== undefined
                                                                ? (
                                                                    <div className='flex flex-wrap '>
                                                                        {Object.keys(userDetails?.businessImages).map((imageKey,
                                                                            index) => (
                                                                            // eslint-disable-next-line react/jsx-indent
                                                                            <Fragment key={imageKey}>
                                                                                {userDetails.businessImages[imageKey] !==
                                                                                    null &&
                                                                                    (
                                                                                        <div className='w-1/3 px-1 xl:pr-[100px] pr-[40px]'>

                                                                                            <ImageViewWithModel
                                                                                                name={userDetails
                                                                                                    .businessImages[imageKey]}
                                                                                                item={
                                                                                                    userDetails.businessImages[imageKey]}
                                                                                                testId={`businessImages_${index}`}
                                                                                                className={'min-w-[245px]'}
                                                                                            />
                                                                                        </div>
                                                                                    )}
                                                                            </Fragment>

                                                                        ))}
                                                                    </div>
                                                                )
                                                                : <h1 className='mt-2 text-ellipsis text-[14px] leading-6
                                                        font-normal px-1'>-</h1>

                                                            }
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
                            /></>}
                    </div>
                </>}
            </CardHeader>
            <Modal center open={isActivateModalOpen} onClose={() => setIsActivateModalOpen(false)} closeIcon={<div style={{ color: 'white' }} disabled></div>}>
                <div className='customModal'>
                    <ConfirmationPopup
                        title={`Confirm to ${View?.status === 'active' ? 'Deactivate' : 'Activate'}?`}
                        message={`${View?.status === 'active' ? `This action will suspend ${role.charAt(0).toUpperCase() + role.slice(1)}'s account` : `This action will activate ${role.charAt(0).toUpperCase() + role.slice(1)}'s account`}`}
                        handleSubmit={handleConfirmActivation}
                        isLoading={isLoading}
                        handleClose={() => setIsActivateModalOpen(false)}
                        // buttonText={'Approve'}
                        buttonColor={`${View?.status === 'active' ? 'bg-primary-negative' : 'bg-accent-positive'}`}
                    />
                </div>
            </Modal>
            <Modal center open={isApproveModalOpen} onClose={handleClose} closeIcon={<div style={{ color: 'white' }} disabled></div>}>
                <div className='customModal'>
                    <ConfirmationPopup
                        title={'Confirm to Approve?'}
                        message={`This will allow ${role.charAt(0).toUpperCase() + role.slice(1)} to gain access to Paymaart`}
                        handleSubmit={handleConfirmAction}
                        isLoading={isLoading}
                        handleClose={handleClose}
                        buttonText={'Approve'}
                        buttonColor={'bg-accent-positive'}
                    />
                </div>
            </Modal>
            {isRejectModalOpen && <KYCReject
                View={View}
                userDetails={userDetails.basicDetails}
                setIsRejectModalOpen={setIsRejectModalOpen}
                id={id}
                getView={getView}
            />}
            <TillNumber isModalOpen={isTillNumberValue} setModalOpen={setIsTillNumberValue} user={View} />
        </>
    );
}
