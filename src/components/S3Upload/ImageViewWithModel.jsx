import React, { useState } from 'react';
import Image from '../Image/Image';
import IframeModal from '../Iframe/IframeModal';

export default function ImageViewWithModel ({ name, item, testId, className, ReportedMerchant }) {
    const [show, setShow] = useState(false);
    return (
        <>
            <div className='mr-2'>
                <div className={`${ReportedMerchant ? 'bg-[#f0ecff]' : ''} mt-2 border-[2px] border-background-light h-[52px]
                            rounded-lg flex justify-between items-center ${className}`} >
                    <p className='p-2 text-neutral-primary text-[14px] leading-4 font-medium w-[90%] truncate'
                        title={name}>
                        {name}</p>
                    <div className='flex gap-3 px-2'>
                        <Image src='eyeLight' testId={testId}
                            className='h-6 w-6 cursor-pointer'
                            onClick={() => { setShow(true); } }/>
                    </div>
                    <IframeModal
                        isOpen={show} handleClose={() => setShow(false)} link={item}
                        labelValue={name}
                    />
                </div>
            </div>
        </>
    );
}
