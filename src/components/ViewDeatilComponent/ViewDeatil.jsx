/* eslint-disable max-len */
import React from 'react';

export default function ViewDetail ({ itemkey, userDetails, loading }) {
    return (
        <div className={`text-[14px] leading-[24px] font-[400] mt-6 ${loading ? 'animate-pulse z-0' : ''}`}>
            <p
                className={` mb-1 ${loading ? 'text-slate-200 bg-slate-200 max-w-[200px]' : 'text-neutral-secondary '}`}
            >{itemkey || '-'}</p>
            <span
                title={userDetails}
                data-testid={itemkey}
                className={`${loading ? 'text-slate-200 bg-slate-200 max-w-[200px]' : (itemkey === 'Last Logged In' && userDetails === 'Online') ? 'text-accent-positive' : 'text-neutral-primary max-w-[300px]'} 
                  cursor-default 
                                    break-words block overflow-hidden text-ellipsis ${itemkey === 'Role' ? 'capitalize' : ''}`}>
                {userDetails || '-'}
            </span>
        </div>
    );
}
