/* eslint-disable max-len */
import React, { useContext, useState } from 'react';
import Modal from 'react-responsive-modal';
import Image from '../Image/Image';
import html2canvas from 'html2canvas';
import { handleUploadBase64 } from '../S3Upload/S3Functions';
import { CDN } from '../../config';
import GlobalContext from '../Context/GlobalContext';
import { ColorRing } from 'react-loader-spinner';

const ShareOptions = ({ isModalOpen, setIsModalOpen, captureRef }) => {
    const [loadingWhatsapp, setLoadingWhatsapp] = useState(false);
    const [loadingEmail, setLoadingEmail] = useState(false);

    const { setToastError } = useContext(GlobalContext);

    // Function to handle capturing the image and uploading it
    const handleCaptureImage = async () => {
    // Temporarily hide elements before capturing the screenshot
        const elementsToHide = document.querySelectorAll('.hide-during-capture');
        elementsToHide[0].style.display = 'none';

        // Capture the screenshot
        const canvas = await html2canvas(captureRef.current);
        const base64String = canvas.toDataURL('image/png');

        // Display the hidden elements again
        elementsToHide[0].style.display = '';

        // Remove the data URI scheme if present
        const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');

        // Decode base64 string to binary array
        const binaryString = atob(base64Data);
        const length = binaryString.length;
        const binaryArray = new Uint8Array(length);
        for (let i = 0; i < length; i++) {
            binaryArray[i] = binaryString.charCodeAt(i);
        }

        // Handle the upload
        try {
            const capture = await handleUploadBase64(binaryArray, 'TransactionHistory');
            const url = `${CDN}public/${capture.key}`;
            return url;
        } catch (error) {
            console.error('Upload failed:', error);
            setToastError('An Error Occured!');
            throw error; // Re-throw the error to handle it in the caller function
        }
    };

    // Function to share the URL on WhatsApp
    const shareOnWhatsApp = async () => {
        if (loadingEmail || loadingWhatsapp) {
            return;
        }
        setLoadingWhatsapp(true);
        try {
            const URL = await handleCaptureImage();
            // const text = `Check out this image: ${encodeURI(URL)}`;
            const whatsappUrl = `https://web.whatsapp.com/send?text=${encodeURI(URL)}`;
            window.open(whatsappUrl, '_blank');
        } catch (error) {
            console.error('Failed to share on WhatsApp:', error);
            setToastError('An Error Occurred!');
        } finally {
            setIsModalOpen(false);
            setTimeout(() => {
                setLoadingWhatsapp(false);
            }, 500); // Delay of 500 milliseconds (0.5 seconds)
        }
    };

    // Function to share the URL via Email
    const shareViaEmail = async () => {
        if (loadingEmail || loadingWhatsapp) {
            return;
        }
        setLoadingEmail(true);
        try {
            const URL = await handleCaptureImage();
            // const subject = 'Check out this image';
            const body = `${URL}`;
            const mailtoUrl = `mailto:?&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoUrl;
        } catch (error) {
            console.error('Failed to share via Email:', error);
            setToastError('An Error Occurred!');
        } finally {
            setIsModalOpen(false);
            setTimeout(() => {
                setLoadingEmail(false);
            }, 500); // Delay of 500 milliseconds (0.5 seconds)
        }
    };

    return (
        <Modal center open={isModalOpen} onClose={() => setIsModalOpen(false)} closeIcon={<div style={{ color: 'white' }} disabled></div>}>
            <div className='customModal'>
                <div className="flex justify-between border-b border-neutral-outline pb-4">
                    <p data-testid="modal-title" className="text-[20px] leading-[28px] font-[400] text-[#000000]">
                        Share
                    </p>
                    <div onClick={() => setIsModalOpen(false)} className='cursor-pointer'>
                        <Image src='gray-close' />
                    </div>
                </div>
                <p data-testid="modal-body" className={'text-[12px] leading-[20px] font-[400] text-[#4F5962] mt-4 mb-2'}>
                    Share transaction via
                </p>
                <div className="flex gap-[18px]">
                    <div onClick={shareOnWhatsApp} className={`h-[70px] w-[70px] flex justify-center items-center rounded-full ${(loadingWhatsapp || loadingEmail) ? 'cursor-not-allowed' : 'cursor-pointer'} ${loadingWhatsapp ? '' : 'hover:bg-[#F0ECFF]'}`}>
                        {loadingWhatsapp
                            ? <ColorRing visible={true} height="40" width="40" ariaLabel="blocks-loading" wrapperClass="blocks-wrapper" colors={['#3B2A6F', '#3B2A6F', '#3B2A6F', '#3B2A6F']}/>
                            : <Image className='h-10' src='whatsapp-logo' />
                        }
                    </div>
                    <div onClick={shareViaEmail} className={`h-[70px] w-[70px] flex justify-center items-center rounded-full ${(loadingWhatsapp || loadingEmail) ? 'cursor-not-allowed' : 'cursor-pointer'} ${loadingEmail ? '' : 'hover:bg-[#F0ECFF]'}`}>
                        {loadingEmail
                            ? <ColorRing visible={true} height="40" width="40" ariaLabel="blocks-loading" wrapperClass="blocks-wrapper" colors={['#3B2A6F', '#3B2A6F', '#3B2A6F', '#3B2A6F']}/>
                            : <Image className='h-10' src='mail-logo' />
                        }
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ShareOptions;
