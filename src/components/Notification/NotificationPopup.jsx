/* eslint-disable max-len */
import React, { useEffect, useRef } from 'react';
import { useOnClickOutside } from '../../CommonMethods/outsideClick';

export default function NotificationPopup ({ setIsNotification }) {
    const NotificationRef = useRef();
    useOnClickOutside(NotificationRef, () => {
        setIsNotification(false);
    });
    const getNotificationList = () => {

    };
    useEffect(() => {
        getNotificationList();
    }, []);
    return (
        <div
            className='notification-tooltip absolute'
            anchorSelect=".info-icon"
            place='right-start'
            effect="solid"
            arrowColor="transparent"
            ref={NotificationRef}
        >
            <p className='text-[#4F5962] font-bold text-[16px] pb-[6px] border-b borer-[#E5E9EB]'>Notifications</p>
            <div className='h-[480px] overflow-auto scrollBar'>
                <div className='py-4 px-[10px] flex justify-between items-start'>
                    <div className='flex items-center w-[90%]'>
                        <div className='w-[15%]'>
                            <img src="/images/notification-icon.svg" alt="notification" className='w-full' />
                        </div>
                        <div className='ml-2.5 w-[85%]'>
                            <p className='font-normal text-sm text-[#4F5962]'>Pending KYC Registration</p>
                            <p className='font-normal text-sm text-[#4F5962]'>There are pending KYC Registrations requiring your attention.</p>
                        </div>
                    </div>
                    <div className='w-[12%]'>
                        <p className='text-xs text-[#A4A9AE] font-normal'>20m ago</p>
                    </div>
                </div>
                <div className='py-4 px-[10px] flex justify-between items-start'>
                    <div className='flex items-center w-[90%]'>
                        <div className='w-[15%]'>
                            <img src="/images/notification-icon.svg" alt="notification" className='w-full' />
                        </div>
                        <div className='ml-2.5 w-[85%]'>
                            <p className='font-normal text-sm text-[#4F5962]'>Pending KYC Registration</p>
                            <p className='font-normal text-sm text-[#4F5962]'>There are pending KYC Registrations requiring your attention.</p>
                        </div>
                    </div>
                    <div className='w-[12%]'>
                        <p className='text-xs text-[#A4A9AE] font-normal'>20m ago</p>
                    </div>
                </div>
                <div className='py-4 px-[10px] flex justify-between items-start'>
                    <div className='flex items-center w-[90%]'>
                        <div className='w-[15%]'>
                            <img src="/images/notification-icon.svg" alt="notification" className='w-full' />
                        </div>
                        <div className='ml-2.5 w-[85%]'>
                            <p className='font-normal text-sm text-[#4F5962]'>Pending KYC Registration</p>
                            <p className='font-normal text-sm text-[#4F5962]'>There are pending KYC Registrations requiring your attention.</p>
                        </div>
                    </div>
                    <div className='w-[12%]'>
                        <p className='text-xs text-[#A4A9AE] font-normal'>20m ago</p>
                    </div>
                </div>
                <div className='py-4 px-[10px] flex justify-between items-start'>
                    <div className='flex items-center w-[90%]'>
                        <div className='w-[15%]'>
                            <img src="/images/notification-icon.svg" alt="notification" className='w-full' />
                        </div>
                        <div className='ml-2.5 w-[85%]'>
                            <p className='font-normal text-sm text-[#4F5962]'>Pending KYC Registration</p>
                            <p className='font-normal text-sm text-[#4F5962]'>There are pending KYC Registrations requiring your attention.</p>
                        </div>
                    </div>
                    <div className='w-[12%]'>
                        <p className='text-xs text-[#A4A9AE] font-normal'>20m ago</p>
                    </div>
                </div>
                 <div className='py-4 px-[10px] flex justify-between items-start'>
                    <div className='flex items-center w-[90%]'>
                        <div className='w-[15%]'>
                            <img src="/images/notification-icon.svg" alt="notification" className='w-full' />
                        </div>
                        <div className='ml-2.5 w-[85%]'>
                            <p className='font-normal text-sm text-[#4F5962]'>Pending KYC Registration</p>
                            <p className='font-normal text-sm text-[#4F5962]'>There are pending KYC Registrations requiring your attention.</p>
                        </div>
                    </div>
                    <div className='w-[12%]'>
                        <p className='text-xs text-[#A4A9AE] font-normal'>20m ago</p>
                    </div>
                </div>
                <div className='py-4 px-[10px] flex justify-between items-start'>
                    <div className='flex items-center w-[90%]'>
                        <div className='w-[15%]'>
                            <img src="/images/notification-icon.svg" alt="notification" className='w-full' />
                        </div>
                        <div className='ml-2.5 w-[85%]'>
                            <p className='font-normal text-sm text-[#4F5962]'>Pending KYC Registration</p>
                            <p className='font-normal text-sm text-[#4F5962]'>There are pending KYC Registrations requiring your attention.</p>
                        </div>
                    </div>
                    <div className='w-[12%]'>
                        <p className='text-xs text-[#A4A9AE] font-normal'>20m ago</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
