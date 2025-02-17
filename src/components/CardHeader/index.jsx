/* eslint-disable max-len */
/**
 * The CardHeader component in JavaScript React renders a header with breadcrumbs, active path, and a
 * profile icon with a tooltip.
 * @returns The `CardHeader` component is being returned. It is a functional component that takes in
 * props such as `children`, `paths`, `activePath`, and `pathurls`. Inside the component, it renders a
 * header section with breadcrumbs based on the paths provided, an active path if available, and a
 * profile icon with a tooltip. The main content area is rendered below the header section.
 * the activePath is a string
 * the paths should be an array of string
 * the pathurls should be an array that correspond to urls for each path in paths
 */

import React, { useEffect, useState } from 'react';
import Image from '../Image/Image';
import { Tooltip } from 'react-tooltip';
import { Link, useNavigate } from 'react-router-dom';
import Shimmer from '../Shimmers/Shimmer';
import { handleSearchParamsForKyc } from '../../CommonMethods/ListFunctions';
import NotificationPopup from '../Notification/NotificationPopup';
import { dataService } from '../../services/data.services';

const CardHeader = ({
    children, paths, activePath, pathurls, testId, header, buttonText, minHeightRequired, showTabs,
    navigationPath, table, updateButton, updateButtonPath, statusButton, ChildrenElement, onHandleStatusChange, headerWithoutButton, toggleButtons,
    searchParams, setSearchParams, rejectOrApprove, reject, approve, onHandleReject, UpdateIcon, onClickButtonFunction, g2pHeight, dataLoading, handleupdatebutton
}) => {
    const [onHover, setONHover] = useState(false);
    const navigate = useNavigate();

    function cumulativeSum (arr) {
        const result = [];
        let sum = '';

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== '') {
                if (sum !== '') {
                    sum += '/' + arr[i];
                } else {
                    sum += arr[i];
                }
            }
            result.push(sum);
        }

        return result;
    }

    const [isNotification, setIsNotification] = useState(false);
    const [notificationData, setNotificationData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false); // New loading state
    const [page, setPage] = useState(1);

    const fetchNotificationData = async (pageNumber) => {
        try {
            setLoading(true); // Set loading state to true before API call
            const res = await dataService.GetAPI(`admin-users/notifications?page=${pageNumber}`);
            const newData = res.data.data;
            if (res.data.nextPage === null) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
            setNotificationData(prevData => [...prevData, ...newData]);
            setPage(pageNumber + 1);
        } catch (error) {
            console.error('Error occurred:', error);
        } finally {
            setLoading(false); // Reset loading state after API call is completed
        }
    };
    useEffect(() => {
        fetchNotificationData(1);
    }, []);

    return (
        <div className='h-screen w-[calc(100vw-240px)]'>
            <div className=' h-[56px] flex justify-between mx-10'>
                <div id='breadcrumbs' className='flex justify-center items-center cursor-default'>
                    {paths && paths.map((path, index) =>
                        <div key={index} className='flex'>
                            <span
                                onClick={() => navigate(`/${cumulativeSum(pathurls.slice(0, index + 1)).pop()}`)}
                                className="text-[14px] leading-[24px] font-[400] px-[6px] text-neutral-secondary cursor-pointer">
                                {path}
                            </span>
                            <Image src='chevron-right' />
                        </div>
                    )}
                    {activePath &&
                        <span className="text-[14px] leading-[24px] font-[400] text-neutral-primary px-[6px]">
                            {activePath}
                        </span>
                    }
                </div>
                <div className='flex justify-center items-center relative'>
                    <img
                        onClick={() => setIsNotification(!isNotification)}
                        onMouseEnter={() => setONHover(true)}
                        onMouseLeave={() => setONHover(false)}
                        data-testid="notification_bell"
                        className={`notifications info-icon cursor-pointer ${onHover ? '' : 'px-1'}`}
                        src={`/images/${notificationData.length === 0
                            ? onHover ? 'hover-notification-dot' : 'notification'
                            : onHover ? 'hover-notification-dot' : 'notification-dot'}.svg`}
                    />
                    <Tooltip
                        className='my-tooltip'
                        anchorSelect=".notifications"
                        place='bottom'
                        clickable
                    >
                        <Link to="/profile">Notifications</Link>
                    </Tooltip>
                    {isNotification &&
                        <NotificationPopup
                            page={page}
                            setPage={setPage}
                            setIsNotification={setIsNotification}
                            loading={loading}
                            notificationData={notificationData}
                            fetchNotificationData={fetchNotificationData}
                            hasMore={hasMore}
                        />}
                    <Image onClick={() => navigate('/profile')} className='profile cursor-pointer ml-9' src='profile' />
                    <Tooltip
                        className='my-tooltip'
                        anchorSelect=".profile"
                        place='bottom'
                        clickable
                    >
                        <Link to="/profile">Profile</Link>
                    </Tooltip>

                </div>
            </div>
            <div className={'h-[calc(100vh-56px)] bg-background border-t border-neutral-outline '}>
                {/* checks for card has buttons */}
                {header && (headerWithoutButton === false || headerWithoutButton === undefined) &&
                    <div data-testid='header-text' className={`${ChildrenElement ? '' : showTabs ? 'px-8 bg-[#FFFFFF] border-b border-neutral-outline pt-5' : 'bg-[#FFFFFF] border-b border-neutral-outline py-7 px-8'}  mx-10 mt-8 mb-6 text-[30px] font-[700] leading-[40px]
                 text-header-dark flex flex-row justify-between `}>
                        <div className=''>
                            {header}
                            {showTabs &&
                            <div className='-mt-[2px] flex gap-6 pt-2'>
                                {/* toggle buttons  */}
                                {toggleButtons && toggleButtons.map((item, index) => (
                                    <button
                                        data-testid={item.key.toLowerCase()}
                                        key={index}
                                        onClick={() => { if (!dataLoading) handleSearchParamsForKyc('type', item.key.toLowerCase(), searchParams, setSearchParams); }}
                                        className={`-py-2 h-10 text-[14px] text-neutral-primary ${dataLoading ? 'cursor-not-allowed' : 'cursor-pointer'} ${searchParams.get('type') === item.key.toLowerCase() ? '  border-b-[1px] border-neutral-primary font-semibold' : 'font-[400]'}`}
                                    >
                                        {item.key}
                                    </button>
                                ))}
                            </div>}
                        </div>
                        <div className='flex'>
                            {buttonText && (
                                <button
                                    data-testid={buttonText}
                                    onClick={() => navigationPath === '' ? onClickButtonFunction() : navigate(navigationPath)}
                                    className='flex bg-primary-normal py-[8px] px-[16px] justify-center items-center h-[40px] rounded-[6px]'
                                >
                                    <img
                                        src={UpdateIcon ? '/images/update.svg' : '/images/onboardIcon.svg'}
                                        alt="Icon"
                                        className='mr-[8px]'
                                    />
                                    <p className='text-[14px] font-semibold text-[#ffffff]'>{buttonText}</p>
                                </button>
                            )}
                            {rejectOrApprove && rejectOrApprove !== undefined
                                ? (reject
                                    ? <Shimmer height={'h-10'} />
                                    : (
                                        <button data-testid="reject_button" onClick={onHandleReject}
                                            className={`flex  bg-primary-negative py-[8px] px-[16px] 
                                        justify-center items-center h-[40px] rounded-[6px] w-[117px]`}>
                                            <p className='text-[14px] font-semibold text-[#ffffff]'>Reject</p>
                                        </button>))
                                : (statusButton === true
                                    ? <Shimmer height={'h-10'} />
                                    : (statusButton !== undefined &&
                                        <button data-testid="activate_deactivate_button" onClick={onHandleStatusChange}
                                            className={`flex ${statusButton === 'Activate' ? 'bg-[#13B681]' : 'bg-[#FF6363]'} py-[8px] px-[16px] justify-center items-center h-[40px] rounded-[6px]`}>
                                            <p className='text-[14px] font-semibold text-[#ffffff]'>{statusButton}</p>
                                        </button>)
                                )
                            }
                            {
                                rejectOrApprove && rejectOrApprove !== undefined
                                    ? (approve
                                        ? <Shimmer height={'h-10'} />
                                        : (
                                            <button data-testid="approve_button" onClick={onHandleStatusChange}
                                                className={`flex ml-6 bg-[#13B681] py-[8px] px-[16px] 
                                        justify-center items-center h-[40px] rounded-[6px] w-[117px]`}>
                                                <p className='text-[14px] font-semibold text-[#ffffff]'>Approve</p>
                                            </button>))
                                    : (statusButton && ((updateButton !== '' && updateButton !== true)
                                        ? (
                                            <button data-testid="update_button"
                                                onClick={() => {
                                                    if (handleupdatebutton) {
                                                        handleupdatebutton();
                                                        return;
                                                    };
                                                    navigate(updateButtonPath);
                                                }}
                                                className='ml-6 flex bg-primary-normal py-[8px] px-[16px] justify-center items-center
                    h-[40px] rounded-[6px]'>
                                                {updateButton === 'Update' && <Image src='update'
                                                    className='mr-[8px]' />}
                                                <p className='text-[14px] font-semibold text-[#ffffff]'>{updateButton}</p>
                                            </button>)
                                        : (updateButton === true && <div className='ml-6 '><Shimmer hight={'h-10'} /></div>)))
                            }
                        </div>
                    </div>
                }
                {/* checks for card has only toggles down */}
                {((header && headerWithoutButton)) &&
                    <div className={`${ChildrenElement ? '' : 'bg-[#FFFFFF] border-b border-neutral-outline pt-5 px-8'} mx-10 mt-8 mb-6 text-[30px] font-[700] leading-[40px]
                    ${(buttonText === '' || g2pHeight) ? 'h-[90px]' : ' h-[107px]'}
                 text-header-dark flex flex-col gap-2`}>
                        {header}
                        <div className='-mt-[2px] flex gap-6'>
                            {/* toggle buttons  */}
                            {toggleButtons && toggleButtons.map((item, index) => (
                                <button
                                    data-testid={item.key.toLowerCase()}
                                    key={index}
                                    onClick={() => { if (!dataLoading) handleSearchParamsForKyc('type', item.key.toLowerCase(), searchParams, setSearchParams); }}
                                    className={`-py-2 h-10 text-[14px] text-neutral-primary ${dataLoading ? 'cursor-not-allowed' : 'cursor-pointer'} ${searchParams.get('type') === item.key.toLowerCase() ? '  border-b-[1px] border-neutral-primary font-semibold' : 'font-[400]'}`}
                                >
                                    {item.key}
                                </button>
                            ))}
                        </div>

                    </div>
                }
                {ChildrenElement !== true
                    ? (!table
                        ? <div className={`max-h-[calc(100vh-120px)] scrollBar overflow-auto mx-10 my-8 px-[30px] pt-[24px] pb-[28px] 
                flex flex-col bg-[#FFFFFF] border border-neutral-outline rounded-[6px]
                ${header ? 'max-h-[calc(100vh-240px)] relative z-[9]' : ''} 
                ${minHeightRequired ? 'min-h-[calc(100vh-240px)]' : ''}`} data-testid={testId}>
                            {children}
                        </div>
                        : <div className='min-h-[calc(100vh-240px)] max-h-[calc(100vh-120px)] mx-10 my-4
                     bg-[#FFFFFF] rounded-[6px] border border-neutral-outline'>
                            {children}
                        </div>)
                    : <div>
                        {children}
                    </div>}
            </div>
        </div >
    );
};

export default CardHeader;
