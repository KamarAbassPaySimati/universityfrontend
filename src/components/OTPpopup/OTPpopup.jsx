import React from 'react';
import { Modal } from 'react-responsive-modal';
import Image from '../Image/Image';

export default function OTPpopup () {
    return (
        <Modal center open={true} closeIcon={<div style={{ color: 'white' }} disabled></div>}>
            <div className='customModal'>
                <div className="p-6 w-full bg-white rounded-[8px] flex-col items-center justify-center" data-testid="modal">
                    <Image src={'otp_img'}/>
                    <h1 className='font-normal text-[20px] leading-7'>One Time Password (OTP)</h1>
                    <p className='font-normal text-[14px] leading-6 text-[#A4A9AE]'>
                        Enter the one time password sent to *** *** 1254</p>
                </div>
            </div>
        </Modal>
    );
}
