import React from 'react';
import CircularNumber from './CircularNumber';
import { QRCode } from 'react-qrcode-logo';
import Button from '../../../components/Button/Button';

const Totp = () => {
    return (
        <div>
            <div>
                <img src='/images/Header.svg' />
                <div className='bg-primary-normal text-[#fff] px-[67px] py-3 font-[400] text-[24px] leading-[32px]'>
                    Setup Two-Factor Authentication (2FA)
                </div>
                <div className='flex gap-4 justify-center items-center mt-[106px] mb-[57px]'>
                    <CircularNumber text='1' active={true} />
                    <div className='text-neutral-primary'>
                        Scan QR Code
                    </div>
                    <img src='/images/line.svg' />
                    <CircularNumber text='2' active={false} />
                    <div className='text-neutral-primary'>
                        Authentication OTP
                    </div>
                </div>
                <div className='p-8 border border-neutral-outline'>
                    <div className='text-center'>
                        <div>
                            Paymaart QR Code
                        </div>
                        <div>
                            Scan QR Code using your Google Authenticator app
                        </div>
                    </div>
                    <QRCode value='value' logoImage='/images/qr_logo.svg' />
                    <Button text='Next' className='mt-8' />
                </div>
            </div>
        </div>
    );
};

export default Totp;
