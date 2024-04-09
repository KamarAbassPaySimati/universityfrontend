import React, { useState } from 'react';
import Image from '../Image/Image';
import CapturePopup from './CapturePopup';
import Webcam from 'react-webcam';

export default function Capture ({ label }) {
    const [isCapture, setIsCapture] = useState(false);
    return (
        <>
            <div className=' py-4'>
                <p className='font-medium text-[14px] leading-4'>{label}</p>
                <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
                    <div className="md:flex">
                        <div className="w-full py-3">
                            <div className=" border border-dashed h-48
                        rounded-lg  border-neutral-secondary flex justify-center items-center" onClick={() => setIsCapture(true)}>
                                <button
                                    className='flex items-center rounded border border-neutral-outline p-2.5 text-neutral-primary
                                    gap-2.5 font-medium text-[14px] leading-4 mb-2'>
                                    <Image src="camera"/>
                                    Capture
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isCapture && <CapturePopup Webcam={Webcam} isModalOpen={isCapture} handleClose={() => setIsCapture(false)}/>}
        </>
    );
}
