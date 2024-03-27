import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import { useSelector } from 'react-redux';
import Slugify from '../../CommonMethods/Sulgify';

export default function Layout () {
    const user = useSelector((state) => state.auth);
    // eslint-disable-next-line camelcase
    const { user_type } = user;
    const role = Slugify(user_type);

    return (
        <>
            <div className="bg-[#FFFFFF]">
                <div className="flex h-screen w-[100vw]">
                    <SideBar role={role} />
                    <Outlet />
                </div>
            </div>
        </>
    );
}
