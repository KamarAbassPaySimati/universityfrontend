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
            <div className="bg-[#FFFFFF] h-screen overflow-hidden">
                <div className="flex flex-col h-full">
                    <Topbar />
                    <div className="flex flex-1 h-0">
                        <SideBar role={role} user={user} />
                        <div className="flex-1 overflow-y-auto">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
