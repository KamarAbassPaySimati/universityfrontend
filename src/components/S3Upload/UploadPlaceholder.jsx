import React, { useContext, useState } from 'react';
import Image from '../Image/Image';
import { handleDelete, handleUpload } from './S3Functions';
import ImageLoader from './ImageLoader';
import IframeModal from '../Iframe/IframeModal';
import GlobalContext from '../Context/GlobalContext';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { Tooltip } from 'react-tooltip';

export default function UploadPlaceholder ({
    label, path, selectedUploadImg, states, handleStates, disabled, error, testId,
    labelValue, multiselectImage, info
}) {
    const [loadingImg, setLoadingImg] = useState(false);
    const [showIframe, setShowIframe] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const imageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
    const { setToastError } = useContext(GlobalContext);
    const [imageUploadError, setImageUploadError] = useState(false);
    const [imageLimit, setImageLimit] = useState(false);
    const handleUploadFile = async (e) => {
        setImageUploadError(false);
        setImageLimit(false);
        if (multiselectImage && states[selectedUploadImg] && states[selectedUploadImg].length === 8) {
            setImageLimit(true);
            e.target.value = '';
            setLoadingImg(false);
            return;
        }
        try {
            setLoadingImg(true);
            if (!imageTypes.includes(e.target.files[0].type) ||
            (e.target.files[0] && e.target.files[0].size > 10 * 1024 * 1024)) {
                setImageUploadError(true);
                setToastError('Upload failed. Unsupported format or file size exceeded');
                e.target.value = '';
                setLoadingImg(false);
                return;
            }
            const img = await handleUpload(e.target.files[0], path);
            handleStates(`public/${img.key}`, selectedUploadImg);
            setLoadingImg(false);
            e.target.value = '';
        } catch (error) {
            console.log('errrr', error);
            e.target.value = '';
        }
    };
    return (
        <div>
            <div className={`${multiselectImage ? 'mt-4 flex-col flex items-start' : ''}`}>
                <div className={`${multiselectImage ? 'w-[350px] relative' : 'py-4'}`}>
                    <div className='flex justify-between'>
                        <p className='font-medium text-[14px] leading-4'>{label}</p>
                        {info && <Image src='info_icon' className='cursor-pointer info-icon' />}

                    </div>
                    <Tooltip
                        className='info-tooltip-one-line'
                        anchorSelect=".info-icon"
                        place='right-start'
                        effect="solid"
                        arrowColor="transparent"
                    >
                        <h1 className=''>{info}</h1>
                    </Tooltip>
                    {(states[selectedUploadImg] !== undefined &&
                    states[selectedUploadImg] !== '' && multiselectImage === undefined)
                        ? <div className='mt-2 bg-background-light w-full h-[52px] rounded-lg flex justify-between items-center'>
                            <p className='p-2 text-neutral-primary text-[14px] leading-4 font-medium w-[70%] truncate'
                                title={states[selectedUploadImg].split('/')[states[selectedUploadImg].split('/').length - 1]}>
                                {states[selectedUploadImg].split('/')[states[selectedUploadImg].split('/').length - 1]}</p>
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
                            <div>
                                <div className="md:flex">
                                    <div className="w-full py-3">
                                        <div className={`border border-dashed h-48
                        rounded-lg ${(error || imageUploadError || imageLimit)
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
                                                            <span
                                                                className='text-neutral-secondary'
                                                            > Supported file types: </span>
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
                                {imageLimit && <div className=''>
                                    <ErrorMessage error={'You can only upload maximum of 8 images'} /></div>}
                            </div>
                        </div>
                    }
                    {multiselectImage === undefined && <IframeModal
                        isOpen={showIframe} handleClose={() => setShowIframe(false)} link={states[selectedUploadImg]}
                        labelValue={labelValue}/>}
                </div>
            </div>
            <div className='flex justify-start items-center flex-wrap'>
                {multiselectImage && states[selectedUploadImg] && states[selectedUploadImg].map((item, index) => (
                    <div className='mr-2' key={item}>
                        <div className='mt-2 bg-background-light w-[350px] h-[52px]
                            rounded-lg flex justify-between items-center' >
                            <p className='p-2 text-neutral-primary text-[14px] leading-4 font-medium w-[70%] truncate'
                                title={item.split('/')[item.split('/').length - 1]}>
                                {item.split('/')[item.split('/').length - 1]}</p>
                            <div className='flex gap-3 px-2'>
                                <Image src='eyeLight' testId={`view_${testId}`}
                                    className='h-6 w-6 cursor-pointer'
                                    onClick={() => { setSelectedIndex(index); setLoadingImg(false); } }/>
                                <Image src='search_close' testId={`remove_${testId}`} className='h-6 w-6 cursor-pointer'
                                    onClick={() => {
                                        handleDelete(item);
                                        setImageLimit(false);
                                        handleStates(item, selectedUploadImg);
                                    }
                                    }
                                />
                            </div>
                            <IframeModal
                                isOpen={selectedIndex === index} handleClose={() => setSelectedIndex(null)} link={item}
                                labelValue={item.split('/')[item.split('/').length - 1]}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}
