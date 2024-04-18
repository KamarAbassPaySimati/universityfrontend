/* eslint-disable max-len */
import React, { useState } from 'react';
import Image from '../Image/Image';
import CapturePopup from './CapturePopup';
import Webcam from 'react-webcam';
import { CDN } from '../../config';
import { handleDelete } from '../S3Upload/S3Functions';

export default function Capture ({ label, handleStates, states, submitSelected }) {
    const [isCapture, setIsCapture] = useState(false);
    return (
        <>
            <div className=' py-4'>
                <p className='font-medium text-[14px] leading-4'>{label}</p>
                <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
                    <div className="md:flex">
                        <div className="w-full py-3">
                            <div
                                onClick = { () => {
                                    if (states.capture !== undefined && states.capture !== '') {
                                        handleDelete(states?.capture);
                                        handleStates('', 'capture');
                                    } else {
                                        setIsCapture(true);
                                    }
                                }}
                                className={`border border-dashed h-48 ${submitSelected ? 'border-error' : 'border-neutral-secondary'}
                        rounded-lg   flex justify-center items-center`} >
                                {(states.capture !== undefined && states.capture !== '')
                                    ? (
                                        <div className='flex justify-center items-center'>
                                            <img src={`${CDN}${states.capture}`} className='relative'/>
                                            <Image src='refresh' className='h-6 w-6 cursor-pointer absolute'/>
                                        </div>

                                    )
                                    : (<button className='flex items-center rounded border border-neutral-outline p-2.5 text-neutral-primary
                                    gap-2.5 font-medium text-[14px] leading-4 mb-2'>
                                        <Image src="camera"/>
                                        Capture
                                    </button>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isCapture && <CapturePopup
                handleStates={handleStates} Webcam={Webcam} isModalOpen={isCapture} handleClose={() => setIsCapture(false)}/>}
        </>
    );
}
