import React from 'react';
import Image from '../Image/Image';

// border border-neutral-outline
const SideBar = ({ role }) => {
    return (
        <div className='min-w-[240px] border-r border-neutral-outline'>
            <div className='flex justify-center h-[56px] items-center'>
                <Image src='sideNavLogo' />
            </div>
            <div className='pt-8 flex justify-center min-h-[calc(100vh-56px)] border-t border-neutral-outline'>
                <div className='min-w-[208px]'>
                    <div className='flex gap-2 items-center px-2'>
                        <Image src='dashboard' />
                        <div className='font-[400] text-[14px] leading-[24px] text-neutral-secondary'>Dashboard</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
