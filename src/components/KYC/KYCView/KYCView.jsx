/* eslint-disable no-mixed-operators */
/* eslint-disable max-len */
import React, { Fragment, useContext, useEffect, useState } from 'react';
import CardHeader from '../../CardHeader';
import { getApiurl, getPaths, getStatusColor } from './KYCViewFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import ViewDetail from '../../ViewDeatilComponent/ViewDeatil';
import ProfileName from '../../ProfileName/ProfileName';
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
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import convertTimestampToCAT from '../../../CommonMethods/timestampToCAT';
import formatLocalPhoneNumber from '../../../CommonMethods/formatLocalPhoneNumber';
import InputTypeRadio from '../../InputField/InputTypeRadio';

export default function KYCView ({ role, viewType, getStatusText }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [isApproveModalOpen, setIsApprovalModalOpen] = useState();
    const [isActivateModalOpen, setIsActivateModalOpen] = useState(false);
    const { approveKyc } = endpoints;
    const [isRejectModalOpen, setIsRejectModalOpen] = useState();
    const [isExpanded, setIsExpanded] = useState();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const { View, loading, userDetails } = useSelector(state => state.KYCProfileSpecificView); // to get the api respons
    const { setToastError, setToastSuccess } = useContext(GlobalContext);
    const [isTillNumberValue, setIsTillNumberValue] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const UpdateStatusList = ['Pending Investigation', 'Under Review', 'Resolved', 'Banned'];
    const [updateStatusValue, setIsUpdateStatusValue] = useState('');

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

    const handleRejectClick = () => {
        setIsRejectModalOpen(true);
    };

    const handleClose = () => {
        setError(false);
        setIsApprovalModalOpen(false);
        setIsUpdateModalOpen(false);
        setInputValue('');
    };

    const toggleExpand = () => {
        setIsExpanded(prevState => !prevState);
    };

    const handleTillNumber = () => {
        setIsTillNumberValue(true);
    };

    const handleReason = (event) => {
        const newValue = event.target.value;
        setError(false);
        setInputValue(newValue);
    };

    const handleConfirmAction = async () => {
        setError(false);
        if (inputValue.trim() === '' && (viewType === 'DeleteAccount' || viewType === 'Reported_merchants')) {
            setError(true);
            return;
        }
        if (viewType === 'Reported_merchants') {
            try {
                setIsLoading(true);
                const payload = {
                    status: updateStatusValue,
                    reason: inputValue
                };

                const response = await dataService.PatchAPI(
                    `admin-users/reported-merchants/${View?.id}`,
                    payload // Send payload in the request body
                );
                if (response.error) {
                    setIsUpdateModalOpen(false);
                    setToastError(response?.data?.data?.message);
                } else {
                    setIsUpdateModalOpen(false);
                    setToastSuccess(response?.data?.message);
                }
                setIsLoading(false);
                setIsUpdateModalOpen(false);
            } catch (error) {
                setIsUpdateModalOpen(false);
                console.error('Error updating status:', error);
            }
        }

        if (viewType !== 'DeleteAccount' && viewType !== 'Reported_merchants') {
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
        } else if (viewType !== 'Reported_merchants') {
            try {
                const body = { reason: inputValue };
                setIsLoading(true);
                const response = await dataService.PatchAPI(
                    `admin-users/delete-confirmation?user_id=${View.paymaart_id}&status=approved&name=${View.first_name}${View.middle_name}${View.last_name}`, body);
                if (!response.error) {
                    setIsLoading(false);
                    setIsApprovalModalOpen(false);
                    getView();
                    setToastSuccess('Account deletion request approved successfully ');
                } else {
                    setIsLoading(false);
                    setIsApprovalModalOpen(false);
                    setToastError('Something went wrong!');
                }
            } catch (error) {
                setIsLoading(false);
                setIsActivateModalOpen(false);
                setToastError('Something went wrong!');
            }
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
            setIsActivateModalOpen(false);
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

    const bankDetails = ['Bank Name', 'Account Number', 'Account Name'];

    const handleupdatebutton = () => {
        setIsUpdateModalOpen(true);
    };

    const handleUpdateStatus = (selectedValue) => {
        setError(false);
        setIsUpdateStatusValue(selectedValue);
    };

    useEffect(() => {
        if (View?.status) {
            setIsUpdateStatusValue(View.status); // Update status when API response updates
        } else if (UpdateStatusList.length > 0) {
            setIsUpdateStatusValue(UpdateStatusList[0]); // Default to first item
        }
    }, [View]);

    useEffect(() => {
        if (viewType === 'Reported_merchants') {
            if (View?.admin_comment) {
                setInputValue(View.admin_comment);
            } else {
                setInputValue('');
            }
        }
    }, [View, viewType]);

    const location = useLocation();
    const state = location.state || {};

    // Function to construct query parameters dynamically
    const constructQueryParams = (state) => {
        const params = new URLSearchParams();

        if (state.page) params.append('page', state.page);
        if (state.status && state.status.trim() !== '') {
            params.append('status', state.status);
        }
        if (state.type && state.type.trim() !== '') {
            params.append('type', state.type);
        }
        if (state.citizen && state.citizen.trim() !== '') {
            params.append('citizen', state.citizen);
        }
        if (state.fullkyc && state.fullkyc.trim() !== '') {
            params.append('fullkyc', state.fullkyc);
        }
        if (state.simplifiedkyc && state.simplifiedkyc.trim() !== '') {
            params.append('simplifiedkyc', state.simplifiedkyc);
        }
        if (state.search && state.search.trim() !== '') {
            params.append('search', state.search);
        }

        return params.toString();
    };

    // Get the base path from getPaths function
    const { pathurls } = getPaths(viewType, role, state.status) || { pathurls: [] };

    // Construct the dynamic path using getPaths result
    const basePath = pathurls.join('/'); // Join array into a single path
    const queryParams = constructQueryParams(state);

    // Final path construction
    const fullUrl = `${basePath}${queryParams ? `?${queryParams}` : ''}`;

    // Updated pathurls array
    const updatedPathurls = [fullUrl];

    return (
        <>
            <CardHeader
                activePath={getPaths(viewType, role).activePath}
                paths={getPaths(viewType, role).paths}
                pathurls={updatedPathurls}
                header={getPaths(viewType, role).activePath}
                minHeightRequired={true}
                rejectOrApprove={((viewType === 'DeleteAccount' && View?.status === 'pending') || (viewType === 'kyc' && (View?.user_kyc_status === 'in_progress' && user.paymaart_id !== View.added_admin))) ? true : undefined}
                reject={loading}
                approve={loading}
                updateButton={(loading) || (
                    (viewType === 'Reported_merchants'
                        ? 'Update Status'
                        : viewType === 'specific'
                            ? (() => {
                                switch (View?.user_kyc_status) {
                                case 'not_started':
                                    return 'Complete KYC Registration';
                                case 'completed':
                                    return (View?.kyc_type === 'simplified' && View?.citizen === 'Malawian') ? 'Update' : '';
                                default:
                                    return 'Update';
                                }
                            })()
                            : undefined))}
                updateButtonPath={`${getPaths(viewType, role, loading || View?.user_kyc_status).updateButtonPath}${id}`}
                statusButton={loading || (viewType === 'specific' ? View?.status !== 'active' ? 'Activate' : 'Deactivate' : undefined)}
                onHandleStatusChange={(viewType === 'DeleteAccount' || (viewType === 'kyc' && (View?.user_kyc_status === 'in_progress' && user.paymaart_id !== View.added_admin))) ? handleApproveClick : () => setIsActivateModalOpen(true)}
                onHandleReject={handleRejectClick}
                handleupdatebutton={(viewType === 'Reported_merchants' ? handleupdatebutton : null)}
                ChildrenElement
                upadteButtonStatus={viewType === 'Reported_merchants'}
            >
                {<>
                    <div className={` mx-10 mb-4 px-[30px] pt-[24px] pb-[28px] 
                flex flex-col bg-[#FFFFFF] border border-neutral-outline rounded-[6px]
                `}>
                        <div className='flex justify-between items-center' data-testid="user_details">
                            <ProfileName
                                userButtonName={
                                    viewType === 'Reported_merchants'
                                        ? (View?.merchant_name
                                            ? View.merchant_name.split(' ').map(word => word[0]).join('')
                                            : '')
                                        : `${View?.merchant_name?.[0] || ''}${View?.middle_name?.[0] || ''}${View?.last_name?.[0] || ''}`
                                }
                                UserName={
                                    viewType === 'Reported_merchants'
                                        ? View?.merchant_name || '-'
                                        : `${View?.first_name || '-'} ${View?.middle_name || '-'} ${View?.last_name?.toUpperCase() || '-'}`
                                }
                                payMaartID={viewType === 'Reported_merchants'
                                    ? View?.merchant_id || '-'
                                    : View?.paymaart_id}
                                profilePicture={(role === 'customer' && View?.profile_pic !== null && View?.profile_pic !== undefined && View?.public_profile && View.profile_pic !== '') ? `${CDN}${View?.profile_pic}` : undefined}
                                loading={loading}
                                viewType={viewType}
                                lastLoggedIn={(viewType !== 'Reported_merchants') &&
                                    View?.last_logged_in
                                    ? isNaN(Number(View?.last_logged_in))
                                        ? 'Online'
                                        : `${convertTimestampToCAT(View?.last_logged_in)} CAT`
                                    : '-----'}
                                CreatedDate={(viewType !== 'Reported_merchants') && ` ${convertTimestampToCAT(View?.user_created_date)} CAT`}
                            />
                            {!loading && (viewType !== 'Reported_merchants') &&
                                <div className='flex flex-col items-end text-[14px] leading-6 font-semibold text-[#4F5962] mb-1'>
                                    {viewType !== 'DeleteAccount' && (View?.user_kyc_status !== 'not_started' && <p data-testid="kyc_type"
                                        className='mb-1'>{View?.kyc_type === 'full' ? 'Full KYC' : 'Simplified KYC'},
                                        {View?.citizen === 'Malawian' ? ' Malawi citizen' : ' Non-Malawi citizen'}</p>)}
                                    <span data-testid="kyc_status"
                                        className={`py-[2px] px-[10px] text-[13px] font-semibold capitalize rounded w-fit
                                 ${getStatusColor(viewType !== 'DeleteAccount' ? (View?.user_kyc_status) : View?.status)?.color}`}>
                                        {getStatusColor(viewType !== 'DeleteAccount' ? (View?.user_kyc_status) : View?.status)?.text}
                                    </span>
                                </div>}
                        </div>
                    </div>
                    <div className='max-h-[calc(100vh-350px)] scrollBar overflow-auto'>
                        {!loading && (View?.user_kyc_status === 'info_required' || viewType === 'DeleteAccount') &&
                            <div className="mx-10 mb-4 px-[30px] pt-[24px] pb-[28px] flex flex-col bg-[#FFFFFF] border border-neutral-outline rounded-[6px] overflow-hidden">
                                <div className="flex flex-row justify-between">
                                    {viewType === 'kyc'
                                        ? <h1 className="text-[18px] font-semibold text-neutral-primary">Reason for pending KYC</h1>
                                        : <h1 className="text-[18px] font-semibold text-neutral-primary">Reason for account deletion</h1>

                                    }
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
                        {viewType === 'Reported_merchants' &&
                            <KYCSections
                                heading='Merchant Details'
                                testId='merchant_details'
                                data-testid="merchant_details"
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
                                                <div className='w-full flex'>
                                                    <div className='w-1/3 px-1'>
                                                        <p className='font-normal text-sm text-[#A4A9AE]'>Trading Name</p>
                                                        <p className='font-normal text-sm text-[#4F5962] mt-1'>{userDetails?.trading_name || '-'}</p>
                                                    </div>
                                                    <div className='w-1/3 px-1'>
                                                        <p className='font-normal text-sm text-[#A4A9AE]'>Phone Number</p>
                                                        <p className='font-normal text-sm text-[#4F5962] mt-1'>{`${userDetails?.country_code} ${formatLocalPhoneNumber(userDetails?.country_code, userDetails?.phone_number)}`}</p>
                                                    </div>
                                                    <div className='w-1/3 px-1'>
                                                        <p className='font-normal text-sm text-[#A4A9AE]'>Email</p>
                                                        <p className='font-normal text-sm text-[#4F5962] mt-1'>{userDetails?.email || '-'}</p>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                }
                            />
                        }
                        {viewType === 'Reported_merchants' &&
                            <KYCSections
                                heading='Reported Issue'
                                testId='Reported Issue'
                                data-testid="Reported Issue"
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
                                                <div className='w-full flex flex-wrap'>
                                                    <div className='w-1/3 px-1'>
                                                        <p className='font-normal text-sm text-[#A4A9AE]'>Reported by</p>
                                                        <p className='font-normal text-sm text-[#4F5962] mt-1'>{`${userDetails?.customer_name}, ${userDetails?.customer_id}` || '-'}</p>
                                                    </div>
                                                    <div className='w-1/3 px-1'>
                                                        <p className='font-normal text-sm text-[#A4A9AE]'>Reported Date</p>
                                                        <p className='font-normal text-sm text-[#4F5962] mt-1'>
                                                            {userDetails?.created_at
                                                                ? new Date(userDetails.created_at * 1000).toLocaleString('en-GB', {
                                                                    day: '2-digit',
                                                                    month: 'short',
                                                                    year: 'numeric',
                                                                    hour: '2-digit',
                                                                    minute: '2-digit',
                                                                    hour12: false,
                                                                    timeZone: 'Africa/Harare' // CAT time zone (UTC+2)
                                                                }).replace(',', '') + ' hours'
                                                                : '-'
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className='w-1/3 px-1'>
                                                        <p className='font-normal text-sm text-[#A4A9AE]'>Reason</p>
                                                        <div className='font-normal text-sm text-[#4F5962] mt-1'>
                                                            {userDetails?.reasons?.length > 0
                                                                ? userDetails.reasons.map((item, index) => (
                                                                    <p key={index} className='mt-1 font-normal text-sm text-[#4F5962] break-words'>{item}</p>
                                                                ))
                                                                : '-'}
                                                        </div>
                                                    </div>
                                                    {<div className='w-1/3 px-1 mt-6'>
                                                        {(userDetails && userDetails?.image_1 !== null || userDetails?.image_2 !== null) &&
                                                            <p className='font-normal text-sm text-[#A4A9AE]'>Proof</p>}
                                                        {userDetails && userDetails?.image_1 !== null &&
                                                            <ImageViewWithModel
                                                                name={userDetails?.image_1 && userDetails?.image_1?.split('/').pop()}
                                                                item={`${userDetails.image_1}`}
                                                                // testId={`businessImages_${index}`}
                                                                className={'2xl:w-[65%] min-w-[245px]'}
                                                                ReportedMerchant={true}
                                                            />}
                                                        {userDetails?.image_2 !== null &&
                                                            <ImageViewWithModel
                                                                name={userDetails?.image_2 && userDetails?.image_2.split('/').pop()}
                                                                item={`${userDetails.image_2}`}
                                                                // testId={`businessImages_${index}`}
                                                                className={'2xl:w-[65%] min-w-[245px]'}
                                                                ReportedMerchant={true}
                                                            />}
                                                    </div>}
                                                </div>
                                            )
                                        }
                                    </div>
                                }
                            />
                        }
                        {(viewType === 'Reported_merchants' && View?.status && View?.admin_comment) &&
                            <KYCSections
                                heading='Admin Actions'
                                testId='Admin Actions'
                                data-testid="Admin Actions"
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
                                                userDetails?.logs && userDetails?.logs.map((item, index) => (
                                                    <div key={index} className='w-full flex flex-wrap'>
                                                        <div className='w-1/3 px-1'>
                                                            <p className='font-normal text-sm text-[#A4A9AE]'>{`Actioned Admin ${index + 1}`}</p>
                                                            <p className='font-normal text-sm text-[#4F5962] mt-1'>{`${item?.actioned_by_name}` || '-'}</p>
                                                        </div>
                                                        <div className='w-1/3 px-1'>
                                                            <p className='font-normal text-sm text-[#A4A9AE]'>Actioned Date</p>
                                                            <p className='font-normal text-sm text-[#4F5962] mt-1'>
                                                                {item?.created_at
                                                                    ? new Date(userDetails.created_at * 1000).toLocaleString('en-GB', {
                                                                        day: '2-digit',
                                                                        month: 'short',
                                                                        year: 'numeric',
                                                                        hour: '2-digit',
                                                                        minute: '2-digit',
                                                                        hour12: false,
                                                                        timeZone: 'Africa/Harare' // CAT time zone (UTC+2)
                                                                    }).replace(',', '') + ' hours'
                                                                    : '-'
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className='w-1/3 px-1'>
                                                            <p className='font-normal text-sm text-[#A4A9AE]'>Actioned Status</p>
                                                            <div className='font-normal text-sm text-[#4F5962] mt-1'>
                                                                {item?.actioned_status || '-'}
                                                            </div>
                                                        </div>
                                                        <div className='w-1/3 px-1 my-6'>
                                                            <p className='font-normal text-sm text-[#A4A9AE]'>Note</p>
                                                            <div className='font-normal text-sm text-[#4F5962] mt-1 break-words'>
                                                                {item?.admin_comment || '-'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            )
                                        }
                                    </div>
                                }
                            />
                        }
                        {viewType !== 'Reported_merchants' &&
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
                                            : userDetails?.basicDetails && (
                                                Object.keys(userDetails?.basicDetails
                                                ).map((itemkey, index = 0) =>
                                                    (<div key={index} className='w-1/3 px-1'>
                                                        <ViewDetail
                                                            itemkey={itemkey.replaceAll('_', ' ')}
                                                            userDetails={
                                                                userDetails?.basicDetails[itemkey]
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
                        }
                        {(viewType !== 'Reported_merchants') && (viewType !== 'DeleteAccount' && View?.user_kyc_status !== 'not_started') && <>
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
                                            : userDetails?.identityDetails && (
                                                Object.keys(userDetails?.identityDetails).map((itemkey, index = 0) => (
                                                    <div key={index} className='flex flex-wrap xl:px-[40px] xl:w-1/3 w-1/2'>
                                                        <div key={index} className=''>
                                                            <h1
                                                                className='mt-4 text-[#A4A9AE] text-[14px] leading-6 font-normal'
                                                            >{itemkey}</h1>
                                                            {userDetails?.identityDetails[itemkey]?.map((imageItem, index) => (
                                                                (imageItem !== null && imageItem !== '')
                                                                    ? (
                                                                        <div key={imageItem} className='pr-2'>
                                                                            <ImageViewWithModel
                                                                                name={
                                                                                    itemkey === 'Biometrics | Live Selfie'
                                                                                        ? `Biometrics.${imageItem
                                                                                            ?.slice(imageItem
                                                                                                .lastIndexOf('.') + 1)}`
                                                                                        : userDetails
                                                                                            .identityDetails[itemkey].length === 1
                                                                                            ? `${itemkey === 'ID Document'
                                                                                                ? View?.id_document
                                                                                                : View?.verification_document}${itemkey === 'ID Document' && View?.id_document === 'Passport'
                                                                                                ? ` Data Page.${imageItem?.slice(imageItem.lastIndexOf('.') + 1)}`
                                                                                                : `.${imageItem?.slice(imageItem.lastIndexOf('.') + 1)}`}`

                                                                                            : index === 0
                                                                                                ? `${itemkey === 'ID Document'
                                                                                                    ? View?.id_document
                                                                                                    : View?.verification_document
                                                                                                }
                                                                                                ${itemkey === 'ID Document' && View?.citizen !== 'Malawian' && View?.id_document === 'Passport' ? 'Data Page' : 'Front'}.${imageItem?.slice(imageItem
                                                                            .lastIndexOf('.') + 1)}`
                                                                                                : `${itemkey === 'ID Document'
                                                                                                    ? View?.id_document
                                                                                                    : View?.verification_document
                                                                                                }
                                                                                                ${itemkey === 'ID Document' &&
                                                                                                    View?.citizen !== 'Malawian' && View?.id_document === 'Passport'
                                                                            ? 'Visa Page'
                                                                            : 'Back'}.${imageItem?.slice(imageItem
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
                                                            {(itemkey === 'ID Document') && (View?.id_document === 'Passport') && View?.citizen !== 'Malawian' && (
                                                                <>
                                                                    <p className='font-normal text-sm text-[#4F5962] mt-3 pl-1'>Type of Visa/Permit: {View?.nature_of_permit}</p>
                                                                    <p className='font-normal text-sm text-[#4F5962] pl-1'>Visa/Permit reference number: {View?.ref_no}</p>
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
                                                : userDetails?.tradingDetails && (
                                                    <>
                                                        {Object.keys(userDetails?.tradingDetails).map((itemkey, index = 0) => (
                                                            <div key={index} className='w-1/3 px-1 xl:pr-[100px] pr-[40px]'>
                                                                <ViewDetail
                                                                    itemkey={itemkey.replaceAll('_', ' ')}
                                                                    userDetails={userDetails?.tradingDetails[itemkey]}
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
                                                : userDetails?.personalDetails && (
                                                    Object.keys(userDetails?.personalDetails).map((itemkey, index = 0) => (
                                                        <div key={index} className='w-1/3 px-1'>
                                                            <ViewDetail
                                                                itemkey={itemkey.replaceAll('_', ' ')}
                                                                userDetails={userDetails?.personalDetails[itemkey]}
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
                                                    : userDetails?.Occupation && (
                                                        Object.keys(userDetails?.Occupation).map((itemkey, index = 0) => (
                                                            <div key={index} className='w-1/3 px-1'>
                                                                <ViewDetail
                                                                    itemkey={itemkey.replaceAll('_', ' ')}
                                                                    userDetails={userDetails?.Occupation[itemkey]}
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
                                                : userDetails?.incomeDetails && (
                                                    Object.keys(userDetails?.incomeDetails).map((itemkey, index = 0) => (
                                                        <div key={index} className='w-1/3 px-1'>
                                                            <ViewDetail
                                                                itemkey={itemkey.replaceAll('_', ' ')}
                                                                userDetails={userDetails?.incomeDetails[itemkey]}
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
                                            : (userDetails?.bankDetails && userDetails?.bankDetails.length === 0
                                                ? bankDetails.map((itemKey, index) => (
                                                    <div key={itemKey + index} className="w-1/3 px-1 hello">
                                                        <div className={`text-[14px] leading-[24px] font-[400] mt-6 ${loading ? 'animate-pulse z-0' : ''}`}>
                                                            <p
                                                                className={` mb-1 ${loading ? 'text-slate-200 bg-slate-200 max-w-[200px]' : 'text-neutral-secondary '}`}
                                                            >{itemKey || '-'}</p>
                                                            <span
                                                                data-testid={itemKey}
                                                                className={`${loading ? 'text-slate-200 bg-slate-200 max-w-[200px]' : 'text-neutral-primary max-w-[300px]'} 
                                                          cursor-default break-words block overflow-hidden text-ellipsis ${itemKey === 'Role' ? 'capitalize' : ''}`}>
                                                                -
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))
                                                : userDetails?.bankDetails && userDetails?.bankDetails?.map((bankDetail, idx) => (
                                                    <div key={idx} className={`w-full flex ${idx}`}>
                                                        {idx === 0
                                                            ? (
                                                                Object.keys(bankDetail).map((itemkey, index) => (
                                                                    <div key={index} className='w-1/3 px-1 hello'>
                                                                        <ViewDetail
                                                                            itemkey={itemkey.replaceAll('_', ' ')}
                                                                            userDetails={bankDetail[itemkey]} // Changed to bankDetail[itemkey] to correctly access the value
                                                                            loading={loading}
                                                                        />
                                                                    </div>
                                                                ))
                                                            )
                                                            : (
                                                                <div className="w-full px-1 flex">
                                                                    {Object.keys(bankDetail).map((itemkey, index) => (
                                                                        <div key={index} className={`w-1/3 ${index === 0 ? '' : 'px-1'}`}>
                                                                            <p className={`${loading ? 'text-slate-200 bg-slate-200 max-w-[200px]' : 'text-neutral-primary max-w-[300px]'} 
                                                                                cursor-default break-words block overflow-hidden text-ellipsis text-[14px] leading-[24px] font-[400]`}>
                                                                                {bankDetail[itemkey]}
                                                                            </p>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                    </div>
                                                ))
                                            )
                                        }
                                    </div>
                                }
                            /></>
                        }
                    </div>
                </>}
            </CardHeader >
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
                        message={viewType === 'DeleteAccount' ? 'Reason for approval' : `This will allow ${role.charAt(0).toUpperCase() + role.slice(1)} to gain access to Paymaart`}
                        messageStyle={viewType === 'DeleteAccount' ? 'text-[14px] font-medium text-[#4F5962] mt-2' : undefined}
                        Reason={viewType === 'DeleteAccount' && (<>
                            <label htmlFor=""></label>
                            {/* <input className='w-full border border-[#F8F8F8] bg-[#dddddd38] placeholder:font-normal placeholder:text-sm placeholder:text-[#8E949A] p-2.5 outline-none rounded' style={{ borderBottom: '1px solid #DDDDDD' }} placeholder='Enter Reason'> */}
                            <input data-testid="reason" className={`w-full border border-[#F8F8F8] bg-[#dddddd38] placeholder:font-normal placeholder:text-sm placeholder:text-[#8E949A] p-2.5 outline-none rounded ${error ? 'border-bottom-red mb-1' : 'border-bottom-default'}`} placeholder="Enter Reason">
                            </input>
                            {error && <ErrorMessage error={'Required field'} />
                            }
                        </>)}
                        handleSubmit={handleConfirmAction}
                        isLoading={isLoading}
                        handleClose={handleClose}
                        buttonText={'Approve'}
                        buttonColor={'bg-accent-positive'}
                        handleReason={handleReason}
                        error={error}
                    />
                </div>
            </Modal>
            {
                (isRejectModalOpen && viewType === 'kyc') && <KYCReject
                    View={View}
                    userDetails={userDetails.basicDetails}
                    setIsRejectModalOpen={setIsRejectModalOpen}
                    id={id}
                    getView={getView}
                />
            }
            {
                (isRejectModalOpen && viewType === 'DeleteAccount') && <KYCReject
                    View={View}
                    userDetails={userDetails.basicDetails}
                    setIsRejectModalOpen={setIsRejectModalOpen}
                    message={'Reason for rejection'}
                    Reason={viewType === 'DeleteAccount' && (
                        <>
                            <label htmlFor=""></label>
                            <input data-testid="reason" className={'w-full border border-[#F8F8F8] bg-[#dddddd38] placeholder:font-normal placeholder:text-sm placeholder:text-[#8E949A] p-2.5 outline-none rounded'} placeholder="Enter Reason">
                            </input>
                        </>)}
                    id={id}
                    getView={getView}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                />
            }
            <Modal center open={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} closeIcon={<div style={{ color: 'white' }} disabled></div>}>
                <div className='customModal'>
                    <ConfirmationPopup
                        title={viewType === 'Reported_merchants' ? 'Update Status' : 'Confirm to Approve?'}
                        message={viewType === 'DeleteAccount' ? 'Reason for approval' : viewType === 'Reported_merchants' ? 'Select any one' : `This will allow ${role.charAt(0).toUpperCase() + role.slice(1)} to gain access to Paymaart`}
                        messageStyle={viewType === 'DeleteAccount' ? 'text-[14px] font-medium text-[#4F5962] mt-2' : undefined}
                        updateStatus={viewType === 'Reported_merchants'
                            ? (
                                UpdateStatusList.map((radioItem) => (
                                    <InputTypeRadio
                                        id={radioItem}
                                        label={radioItem}
                                        key={radioItem}
                                        checkedState={updateStatusValue === radioItem} // Check if selected
                                        handleRadioButton={() => handleUpdateStatus(radioItem)}
                                    />
                                ))
                            )
                            : undefined}

                        Reason={viewType === 'DeleteAccount' || viewType === 'Reported_merchants' &&
                            (<>
                                {viewType === 'Reported_merchants' &&
                                    <label htmlFor="" className='font-medium text-sm text-[#4F5962] mt-8'>Note</label>}
                                <input
                                    data-testid="reason"
                                    className={`w-full border border-[#F8F8F8] bg-[#dddddd38] placeholder:font-normal placeholder:text-sm placeholder:text-[#8E949A] p-2.5 outline-none rounded mt-2 ${error ? 'border-bottom-red mb-1' : 'border-bottom-default'
                                    }`}
                                    placeholder={viewType === 'Reported_merchants' ? 'Add a note' : 'Enter Reason'}
                                    value={inputValue}
                                    onChange={handleReason}

                                />

                                {error && <ErrorMessage error={'Required field'} />}
                            </>)}
                        handleSubmit={handleConfirmAction}
                        isLoading={isLoading}
                        handleClose={handleClose}
                        buttonText={viewType === 'Reported_merchants' ? 'Update' : 'Approve'}
                        buttonColor={viewType === 'Reported_merchants' ? 'bg-primary-normal' : 'bg-accent-positive'}
                        handleReason={handleReason}
                        error={error}
                    />
                </div>
            </Modal>
            <TillNumber isModalOpen={isTillNumberValue} setModalOpen={setIsTillNumberValue} user={View} />
        </>
    );
};
