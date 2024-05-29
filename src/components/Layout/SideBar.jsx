/* eslint-disable max-len */
import 'react-responsive-modal/styles.css';
import React, { useContext, useState } from 'react';
import Image from '../Image/Image';
import { signOut } from 'aws-amplify/auth';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../pages/auth/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from 'react-responsive-modal';
import ConfirmationPopup from '../ConfirmationPopup/ConfirmationPopup.jsx';
import GlobalContext from '../Context/GlobalContext.jsx';
import Slugify from '../../CommonMethods/Sulgify.js';
import { sideNavObject } from './sideNavObject.js';
import { setDropdown } from '../../redux/GlobalSlice.js';

// want to add a sidebar content add it to the sideNavObject
// check the side also has some privelages based object
// also add it to the global context inside the dropdown object
const SideBar = ({ role }) => {
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [hoveringOn, setHoveringOn] = useState('');

    const { setToastSuccessBottom } = useContext(GlobalContext);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { dropdown } = useSelector(state => state.globalData);

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

    async function handleSignOut () {
        try {
            setIsLoading(true);
            await signOut();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log('error signing out: ', error);
        }
    }

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleLogout = () => {
        handleSignOut();
        dispatch(logout());
        navigate('/');
        setToastSuccessBottom('You have been logged out');
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

    const handleOptionClick = (nav, option, key) => {
        navigate(nav.toLowerCase() + '/' + Slugify(option));
    };
    // useGlobalSignout();

    return (
        <>
            <div className='min-w-[240px] border-r border-neutral-outline'>
                <div className='flex justify-center h-[56px] items-center'>
                    <Image src='sideNavLogo' />
                </div>
                <div className='py-6 flex flex-col justify-between min-h-[calc(100vh-56px)] border-t border-neutral-outline'>
                    <div className='min-w-[208px] pt-8 flex flex-col gap-4 justify-start mx-4 max-h-[calc(100vh-151px)] overflow-y-auto scrollBar'>

                        {sideNavObject && sideNavObject[role] && Object.keys(sideNavObject[role]).map((nav) => (
                            <div key={nav} className='flex flex-col'>
                                <div className={`flex gap-2 justify-between px-2 py-1 pr-3 rounded-[6px] cursor-pointer
                    ${location.pathname.includes(Slugify(nav.toLowerCase())) ? 'bg-background-light' : ''}`} onMouseEnter={() => handleMouseEnter(nav.toLowerCase())} onMouseLeave={() => handleMouseLeave()} onClick={() => handleDropDown(sideNavObject[role][nav]?.path, sideNavObject[role][nav]?.dropdown)}>
                                    <div className='flex gap-2 items-center'>
                                        <Image src={`${hoveringOn === nav.toLowerCase() || location.pathname.includes(Slugify(nav.toLowerCase())) ? `active-${nav.toLowerCase()}` : nav.toLowerCase()}`} />
                                        <div className={`font-[400] text-[14px] leading-[24px]
                        ${hoveringOn === nav.toLowerCase() || location.pathname.includes(Slugify(nav.toLowerCase())) ? 'text-primary-normal' : location.pathname.includes(nav.toLowerCase()) ? 'font-semibold' : 'text-neutral-secondary '}`}>
                                            {nav}
                                        </div>
                                    </div>
                                    {sideNavObject[role][nav]?.dropdown && <Image className={`duration-300 ${dropdown[nav.toLowerCase()] ? 'rotate-180' : ''}`} src={hoveringOn === nav.toLowerCase() || location.pathname.includes(nav.toLowerCase()) ? 'active-chevron-down' : 'chevron-down'} />}
                                </div>
                                {console.log(sideNavObject[role][nav]?.dropdown, 'hfhfhhfhffh')}
                                {dropdown[nav.toLowerCase()] &&
                                    <>
                                        {sideNavObject[role][nav]?.dropdown?.map((option) => (
                                            <div key={option} className={`ml-12 hover:text-primary-normal mr-3 my-1 font-[400] text-[14px] leading-[24px] text-neutral-secondary cursor-pointer
                                        ${location.pathname.includes(Slugify(option)) ? 'text-primary-normal' : ''}`} onClick={() => handleOptionClick(nav, option, sideNavObject[role][nav]?.dropdown)} >
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
                            <Image src='logout-arrow' />
                        </button>
                    </div>
                </div>
            </div>
            <Modal center open={isOpen} onClose={handleClose} closeIcon={<div style={{ color: 'white' }} disabled></div>}>
                <div className='customModal'>
                    <ConfirmationPopup
                        title='Logout User'
                        message='Confirm to Logout?'
                        handleSubmit={handleLogout}
                        isLoading={isLoading}
                        handleClose={handleClose} />
                </div>
            </Modal>
        </>
    );
};

export default SideBar;
