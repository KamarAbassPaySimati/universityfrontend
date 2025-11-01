/* eslint-disable camelcase */
import React from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import SideBar from './SideBar';


export default function Layout () {
    // Dynamic role - can be changed for testing different user types
    // In real app, this would come from authentication context
    const [searchParams] = useSearchParams();
    const role = searchParams.get('role') || 'super-admin';

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
