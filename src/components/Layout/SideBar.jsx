import 'react-responsive-modal/styles.css';
import React, { useContext, useEffect, useState } from 'react';
import Image from '../Image/Image';
import { signOut } from 'aws-amplify/auth';
import { useDispatch } from 'react-redux';
import { logout } from '../../pages/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-responsive-modal';
import ConfirmationPopup from '../ConfirmationPopup/ConfirmationPopup.jsx';
import GlobalContext from '../Context/GlobalContext.jsx';
import { globalSignout } from '../../CommonMethods/globalSignout.js';

// border border-neutral-outline
const SideBar = ({ role }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const { setToastSuccessBottom } = useContext(GlobalContext);

    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    useEffect(() => {
        globalSignout();
    }, []);

    return (
        <>
            <div className='min-w-[240px] border-r border-neutral-outline'>
                <div className='flex justify-center h-[56px] items-center'>
                    <Image src='sideNavLogo' />
                </div>
                <div className='py-6 flex flex-col justify-between min-h-[calc(100vh-56px)] border-t border-neutral-outline'>
                    <div className='min-w-[208px] pt-8 flex flex-col gap-4 justify-start mx-4'>
                        <div className='flex gap-2 items-center px-2 py-1'>
                            <Image src='dashboard' />
                            <div className='font-[400] text-[14px] leading-[24px] text-neutral-secondary'>Dashboard</div>
                        </div>
                        {/* <div className='flex gap-2 items-center px-2 py-1'>
                            <Image src='dashboard' />
                            <div className='font-[400] text-[14px] leading-[24px] text-neutral-secondary'>Dashboard</div>
                        </div> */}
                    </div>
                    <div className='flex justify-center items-center'>
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
