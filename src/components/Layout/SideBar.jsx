/* eslint-disable max-len */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { sideNavObject } from './sideNavObject.js';
import { setDropdown } from '../../redux/GlobalSlice.js';
import {
    DashboardOutlined,
    UserOutlined,
    TeamOutlined,
    BookOutlined,
    SettingOutlined,
    TrophyOutlined,
    DownOutlined,
    LogoutOutlined
} from '@ant-design/icons';

const getIcon = (iconName, isActive) => {
    const iconProps = {
        className: `text-base ${isActive ? 'text-primary-normal' : 'text-neutral-secondary'}`,
        style: { fontSize: '16px' }
    };
    
    switch (iconName) {
        case 'DashboardOutlined': return <DashboardOutlined {...iconProps} />;
        case 'UserOutlined': return <UserOutlined {...iconProps} />;
        case 'TeamOutlined': return <TeamOutlined {...iconProps} />;
        case 'BookOutlined': return <BookOutlined {...iconProps} />;
        case 'SettingOutlined': return <SettingOutlined {...iconProps} />;
        case 'TrophyOutlined': return <TrophyOutlined {...iconProps} />;
        default: return <DashboardOutlined {...iconProps} />;
    }
};

// want to add a sidebar content add it to the sideNavObject
// check the side also has some privelages based object
// also add it to the global context inside the dropdown object
const SideBar = ({ role }) => {
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [hoveringOn, setHoveringOn] = useState('');



    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { dropdown } = useSelector(state => state.globalData) || { dropdown: {} };

    // const checkLoggedInUserForGlobalSignout = async () => {
    //     try {
    //         // eslint-disable-next-line no-unused-vars
    //         const userAttributes = await fetchUserAttributes();
    //     } catch (error) {
    //         dispatch(setUser(''));
    //         dispatch(logout());
    //         navigate('/');
    //     }
    // };

    // useEffect(() => {
    //     checkLoggedInUserForGlobalSignout();
    // }, []);

    const handleSignOut = () => {
        setIsLoading(true);
        // Simple logout for university system
        setTimeout(() => {
            setIsLoading(false);
            handleLogout();
        }, 500);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleLogout = () => {
        // dispatch(logout());
        navigate('/');
    };

    const handleMouseEnter = (key) => {
        setHoveringOn(key);
    };
    const handleMouseLeave = () => {
        setHoveringOn('');
    };

    const handleDropDown = (key, dropDown) => {
        if (dropDown === undefined) {
            navigate(key);
        }
        dispatch(setDropdown(key));
    };

    const handleOptionClick = (nav, option, key, currentPath) => {
        const targetPath = `/${nav.toLowerCase()}/${option.toLowerCase().replace(/\s+/g, '-')}`;
        if (currentPath !== targetPath) {
            navigate(targetPath);
        }
    };

    // useGlobalSignout();

    return (
        <>
            <div className='min-w-[240px] border-r border-neutral-outline'>
                <div className='flex justify-center h-[56px] items-center'>
                    <div className='text-xl font-bold text-primary-normal'>University MS</div>
                </div>
                <div className='py-6 flex flex-col justify-between min-h-[calc(100vh-56px)] border-t border-neutral-outline'>
                    <div className='min-w-[208px] pt-8 flex flex-col gap-4 justify-start mx-4 max-h-[calc(100vh-151px)] overflow-y-auto scrollBar'>

                        {sideNavObject && sideNavObject[role] && Object.keys(sideNavObject[role]).map((nav) => (
                            <div key={nav} className='flex flex-col'>
                                <div className={`flex gap-2 justify-between px-2 py-1 pr-3 rounded-[6px] cursor-pointer
                    ${location.pathname.includes(nav.toLowerCase()) ? 'bg-background-light' : ''}`} onMouseEnter={() => handleMouseEnter(nav.toLowerCase())} onMouseLeave={() => handleMouseLeave()} onClick={() => handleDropDown(sideNavObject[role][nav]?.path, sideNavObject[role][nav]?.dropdown)}>
                                    <div className='flex gap-2 items-center'>
                                        {getIcon(sideNavObject[role][nav]?.icon, hoveringOn === nav.toLowerCase() || location.pathname.includes(nav.toLowerCase()))}
                                        <div className={`font-[400] text-[14px] leading-[24px]
                        ${hoveringOn === nav.toLowerCase() || location.pathname.includes(nav.toLowerCase()) ? 'text-primary-normal' : location.pathname.includes(nav.toLowerCase()) ? 'font-semibold' : 'text-neutral-secondary '}`}>
                                            {nav}
                                        </div>
                                    </div>
                                    {sideNavObject[role][nav]?.dropdown && <DownOutlined className={`duration-300 ${dropdown[nav.toLowerCase()] ? 'rotate-180' : ''} ${hoveringOn === nav.toLowerCase() || location.pathname.includes(nav.toLowerCase()) ? 'text-primary-normal' : 'text-neutral-secondary'}`} />}
                                </div>
                                {dropdown[nav.toLowerCase()] &&
                                    <>
                                        {sideNavObject[role][nav]?.dropdown?.map((option) => (
                                            <div key={option} className={`ml-12 hover:text-primary-normal mr-3 my-1 font-[400] text-[14px] leading-[24px] text-neutral-secondary cursor-pointer
                                        ${location.pathname.includes(option.toLowerCase().replace(/\s+/g, '-')) ? 'text-primary-normal' : ''}`} onClick={() => handleOptionClick(nav, option, sideNavObject[role][nav]?.dropdown, location.pathname)} >
                                                {option}
                                            </div>
                                        ))}
                                    </>}
                            </div>
                        ))}

                    </div>
                    <div className='flex justify-center items-center mt-2'>
                        <button
                            data-testid='logout'
                            onClick={() => setIsOpen(true)}
                            className={`w-[123px] bg-[#fff] text-primary-normal border border-primary-normal font-[400] 
                            text-[14px] leading-[16px] py-2 rounded-[4px] flex justify-center items-center gap-[10px] h-[37px]`}>
                            Logout
                            <LogoutOutlined />
                        </button>
                    </div>
                </div>
            </div>
            <Modal
                title="Logout User"
                open={isOpen}
                onOk={handleSignOut}
                onCancel={handleClose}
                confirmLoading={isLoading}
                okText="Logout"
                cancelText="Cancel"
            >
                <p>Confirm to Logout?</p>
            </Modal>
        </>
    );
};

export default SideBar;
