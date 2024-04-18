import React, { useContext, useState } from 'react';
import Image from '../Image/Image';
import { handleDelete, handleUpload } from './S3Functions';
import ImageLoader from './ImageLoader';
import IframeModal from '../Iframe/IframeModal';
import GlobalContext from '../Context/GlobalContext';

export default function UploadPlaceholder ({ label, path, selectedUploadImg, states, handleStates, disabled, error, testId }) {
    const [loadingImg, setLoadingImg] = useState(false);
    const [showIframe, setShowIframe] = useState(false);
    const imageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
    const { setToastError } = useContext(GlobalContext);
    const [imageUploadError, setImageUploadError] = useState(false);

    const handleUploadFile = async (e) => {
        setImageUploadError(false);
        try {
            setLoadingImg(true);
            if (!imageTypes.includes(e.target.files[0].type) ||
            (e.target.files[0] && e.target.files[0].size > 10 * 1024 * 1024)) {
                setImageUploadError(true);
                setToastError('Upload failed. Unsupported format or file size exceeded');
                setLoadingImg(false);
                return;
            }
            const img = await handleUpload(e.target.files[0], path);
            handleStates(img.key, selectedUploadImg);
            setLoadingImg(false);
        } catch (error) {
            console.log('errrr', error);
        }
    };
    return (
        <div className=' py-4'>
            <p className='font-medium text-[14px] leading-4'>{label}</p>
            {(states[selectedUploadImg] !== undefined && states[selectedUploadImg] !== '')
                ? <div className='mt-2 bg-background-light w-full h-[52px] rounded-lg flex justify-between items-center'>
                    <p className='p-2 text-neutral-primary text-[14px] leading-4 font-medium break-words w-[70%]'>
                        {states[selectedUploadImg].split('/')[2]}</p>
                    <div className='flex gap-3 px-2'>
                        <Image src='eyeLight' testId={`view_${testId}`}
                            className='h-6 w-6 cursor-pointer' onClick={() => setShowIframe(true)}/>
                        <Image src='refresh' testId={`remove_${testId}`} className='h-6 w-6 cursor-pointer'
                            onClick={() => {
                                handleDelete(states[selectedUploadImg]);
                                handleStates('', selectedUploadImg);
                            }
                            }
                        />
                    </div>
                </div>
                : <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
                    <div className="md:flex">
                        <div className="w-full py-3">
                            <div className={`border border-dashed h-48
                        rounded-lg ${(error || imageUploadError)
            ? 'border-error'
            : 'border-neutral-secondary'} flex justify-center items-center`}>
                                {loadingImg
                                    ? <ImageLoader />
                                    : <>
                                        <div className='flex flex-col justify-center items-center absolute p-10'>
                                            <button
                                                className='flex items-center rounded
                                        border border-neutral-outline p-2.5 text-neutral-primary
                                    gap-2.5 font-medium text-[14px] leading-4 mb-2'>
                                                <Image src="upload"/>
                                                Upload
                                            </button>
                                            <div
                                                className='text-center text-[12px] leading-[20px]
                                                font-normal text-neutral-primary'>
                                                <span className='text-neutral-secondary'> Supported file types: </span>
                                                .png, .jpg, .jpeg for images, and .pdf for documents</div>
                                            <div
                                                className='text-center text-[12px] leading-[20px]
                                                font-normal text-neutral-primary'>
                                                <span className='text-neutral-secondary'> Max file size: </span>
                                                10 MB</div>
                                        </div>
                                        <input
                                            onChange={(e) => handleUploadFile(e)}
                                            disabled={disabled}
                                            data-testid={testId}
                                            accept="image/jpeg, image/png, application/pdf"
                                            type="file" className="h-full w-full opacity-0" name=""/>
                                    </>}

                            </div>
                        </div>
                    </div>
                </div>
            }
            <IframeModal
                isOpen={showIframe} handleClose={() => setShowIframe(false)} link={states[selectedUploadImg]} />

        </div>
    );
}
