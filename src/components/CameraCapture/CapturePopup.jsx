import React from 'react';
import { Modal } from 'react-responsive-modal';
import Image from '../Image/Image';
import WebCam from './WebCam';

export default function CapturePopup ({ isModalOpen, handleClose, Webcam }) {
    return (
        <Modal center open={isModalOpen} onClose={handleClose} closeIcon={<div style={{ color: 'white' }} disabled></div>}>
            <div className='customModal'></div>
            <div className="p-6 w-full bg-white rounded-[8px]" data-testid="modal">
                <Image src="paginator_left_arrow" className='cursor-pointer' onClick={handleClose}/>
                <h1
                    data-testid="modal-title"
                    className="text-[20px] leading-[28px] font-[400] text-center text-neutral-primary pb-1">
                    Biometrics | Live selfie
                </h1>
                <p
                    data-testid="modal-body"
                    className="text-[14px] text-center leading-[24px] font-[400] text-neutral-secondary Text mb-8">
                    Make sure you are real person
                </p>
                <WebCam Webcam={Webcam}/>
            </div>
        </Modal>
    );
}
