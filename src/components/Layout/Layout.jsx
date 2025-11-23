/* eslint-disable camelcase */
import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import Topbar from './Topbar';
import { useAuth } from '../../context/AuthContext';

export default function Layout () {
    const { user } = useAuth();
    const role = user?.role || 'student';

    return (
        <>
            <div className="bg-[#FFFFFF]">
                <div className="flex flex-col h-screen w-[100vw]">
                    <Topbar />
                    <div className="flex flex-1 overflow-hidden">
                        <div className="sticky top-0 h-full">
                            <SideBar role={role} user={user} />
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
