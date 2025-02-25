/* eslint-disable max-len */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useOnClickOutside } from '../../CommonMethods/outsideClick';
import InfiniteScroll from 'react-infinite-scroll-component';
import { formatTimeAgo } from '../../CommonMethods/formatTimeAgo';
import { useNavigate } from 'react-router';
import formatID from '../../CommonMethods/formatId';
import Shimmer from '../Shimmers/Shimmer';

export default function NotificationPopup ({
    loading,
    page, setPage,
    setIsNotification, notificationData, fetchNotificationData, hasMore, notificationMessage
}) {
    const NotificationRef = useRef();
    const navigate = useNavigate();
    useOnClickOutside(NotificationRef, () => {
        setIsNotification(false);
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Show shimmer for 1 second
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const debounce = useCallback((func, delay) => {
        let timer;
        return function () {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, arguments);
            }, delay);
        };
    }, []);

    const handleScroll = debounce(() => {
        if (!loading && hasMore) {
            fetchNotificationData(page);
        }
    }, 200);

    const handleOnClick = (paymaartId, type, transactionId, senderId) => {
        const subString = paymaartId.substring(0, 3);
        switch (type) {
        case 'kyc':
            switch (subString) {
            case 'AGT':
                navigate(`/verify/kyc-registration/agent-profile/${paymaartId}`);
                break;
            case 'CMR':
                navigate(`/verify/kyc-registration/customer-profile/${paymaartId}`);
                break;
            case 'MCT':
                navigate(`/verify/kyc-registration/merchant-profile/${paymaartId}`);
                break;
            default:
                break;
            }
            break;
        case 'delete':
            switch (subString) {
            case 'AGT':
                navigate(`/verify/delete-account-requests/agent-profile/${paymaartId}`);
                break;
            case 'CMR':
                navigate(`/verify/delete-account-requests/customer-profile/${paymaartId}`);
                break;
            case 'MCT':
                navigate(`/verify/delete-account-requests/merchant-profile/${paymaartId}`);
                break;
            default:
                break;
            }
            break;
        case 'flag':
            navigate(`/transactions/flagged/view/${senderId}/${type}/${transactionId}`);
            break;
        case 'payout':
            navigate(`/transactions/pay-out-requests/${transactionId}`);
            break;
        case 'report-merchant':
            navigate(`/users/merchants/reported-merchant/specific-view/${transactionId}`);
            break;
        default:
            break;
        }
    };

    return (
        <div
            className='notification-tooltip absolute z-[11]'
            anchorSelect=".info-icon"
            place='right-start'
            effect="solid"
            arrowColor="transparent"
            ref={NotificationRef}
            data-testid="notification_list"
        >
            <p className='text-[#4F5962] font-bold text-[16px] pb-[6px] border-b border-[#E5E9EB]'>
                Notifications
            </p>
            <div className='h-[480px] overflow-auto scrollBar' onScroll={handleScroll}>
                {isLoading
                    ? (
                        <div className="flex flex-col space-y-1 p-2 pl-0">
                            {[...Array(9)].map((_, index) => (
                                <Shimmer key={index} width={'w-[700px]'} />
                            ))}
                        </div>
                    )
                    : notificationData.length > 0
                        ? (
                            <InfiniteScroll
                                dataLength={notificationData.length}
                                next={() => setPage(page + 1)}
                                hasMore={hasMore}
                                loader={<p>Loading...</p>}
                                scrollableTarget="scrollBar"
                                scrollThreshold={0.9}
                            >
                                {notificationData.map((notificationItem, notificationIndex) => (
                                    <div
                                        className='px-[10px] flex justify-between items-center'
                                        key={notificationIndex}
                                        onClick={() =>
                                            handleOnClick(
                                                notificationItem.user_id,
                                                notificationItem.type,
                                                notificationItem.request_id,
                                                notificationItem.sender_id
                                            )
                                        }
                                        data-testid={
                                            notificationItem.type === 'kyc'
                                                ? 'view_kyc_notification'
                                                : notificationItem.type === 'delete'
                                                    ? 'view_delete_request_notification'
                                                    : notificationItem.type === 'flag'
                                                        ? 'view_flag_transaction_notification'
                                                        : 'view_payout_transaction_notification'
                                        }
                                    >
                                        <div className='flex items-center w-[90%]'>
                                            <div className='w-[15%]'>
                                                <img
                                                    src="/images/notification-icon.svg"
                                                    alt="notification"
                                                    className='w-full'
                                                />
                                            </div>
                                            <div className='ml-2.5 w-[85%]'>
                                                <p className='font-normal text-sm text-[#4F5962]'>
                                                    {notificationItem?.type === 'kyc'
                                                        ? `Pending KYC Registration for ${formatID(notificationItem.user_id)}`
                                                        : notificationItem?.type === 'delete'
                                                            ? `Pending Delete Account Request for ${formatID(notificationItem.user_id)}`
                                                            : notificationItem?.type === 'flag'
                                                                ? `Pending Flag Transaction Request for ${formatID(notificationItem.user_id)}`
                                                                : notificationItem?.type === 'report-merchant'
                                                                    ? `Merchant Reported for ${formatID(notificationItem?.user_id)}`
                                                                    : `Pending Payout Request for ${formatID(notificationItem.user_id)}`}
                                                </p>
                                                <p className='font-normal text-sm text-[#4F5962]'>
                                                    {notificationItem.type === 'kyc'
                                                        ? 'There are pending KYC Registrations requiring your attention.'
                                                        : notificationItem.type === 'delete'
                                                            ? 'There are pending Delete Account Requests requiring your attention.'
                                                            : notificationItem.type === 'flag'
                                                                ? 'There are flagged transactions requiring your attention.'
                                                                : notificationItem?.type === 'report-merchant'
                                                                    ? <>
                                                                        Customer {formatID(notificationItem?.customer_id)} has reported this merchant.
                                                                        <br />
                                                                        Your attention is required.
                                                                    </>
                                                                    : 'There are pending Payout Transactions requiring your attention.'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className='w-[12%]'>
                                            <p className='text-xs text-[#A4A9AE] font-normal text-end'>
                                                {formatTimeAgo(notificationItem.created_at)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </InfiniteScroll>
                        )
                        : (
                            <div className='flex justify-center items-center h-full'>
                                <p className='text-[#4F5962] font-bold text-[16px]'>No Notifications</p>
                            </div>
                        )}
            </div>
        </div>
    );
}
