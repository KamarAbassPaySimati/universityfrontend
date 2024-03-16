import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
// import { useDispatch, useSelector } from 'react-redux';

export default function Layout () {
    // const auth = useSelector((state) => state.auth);
    // const { userType } = auth;
    // role={userType}

    return (
        <>
            <div className="bg-[#FFFFFF]">
                <div className="flex h-screen w-[100vw]">
                    <SideBar />
                    <Outlet />
                </div>
            </div>
        </>
    );
}
