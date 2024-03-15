import React from 'react';
import Image from '../Image/Image';

// border border-neutral-outline
const SideBar = ({ role }) => {
    return (
        <div className='min-w-[240px]'>
            <div className='flex justify-center h-[56px] items-center'>
                <Image src='sideNavLogo' />
            </div>
            <div className='mt-8 flex justify-center'>
                <div>

                </div>
            </div>
        </div>
    );
};

export default SideBar;
