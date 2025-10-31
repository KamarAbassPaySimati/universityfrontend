/* eslint-disable camelcase */
import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';


export default function Layout () {
    // Mock role for university system
    const role = 'super-admin';

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
