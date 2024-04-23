import React, { useContext, useState } from 'react';
import Image from '../Image/Image';
import { handleDelete, handleUpload } from './S3Functions';
import ImageLoader from './ImageLoader';
import GlobalContext from '../Context/GlobalContext';
import { CDN } from '../../config';

export default function ProfileUploadPlaceholder ({ path, selectedUploadImg, states, handleStates, testId, profilePublic }) {
    const [loadingImg, setLoadingImg] = useState(false);
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
                e.target.value = '';
                setLoadingImg(false);
                return;
            }
            const img = await handleUpload(e.target.files[0], path);
            handleStates(selectedUploadImg, img.key);
            setLoadingImg(false);
            e.target.value = '';
        } catch (error) {
            console.log('errrr', error);
            e.target.value = '';
        }
    };
    return (
        <div className='w-fit py-2'>
            {(states[selectedUploadImg] !== undefined && states[selectedUploadImg] !== '')
                ? <div className='flex gap-6 mb-[10px]'>
                    <div className="relative mt-[1px]">
                        <img
                            src={`${CDN}${states[selectedUploadImg]}`}
                            className="relative w-[100px] h-[100px] rounded-[10px] overflow-hidden"
                        />
                        <Image
                            src="deleteProfile"
                            className="absolute top-0 left-0 mt-20 ml-20"
                            onClick={() => {
                                handleDelete(states[selectedUploadImg]);
                                handleStates(selectedUploadImg, '');
                            }}
                        // Position secondImage at the bottom-right corner
                        />
                    </div>
                    <div className='mt-auto'>
                        <div className="label-checkbox w-full flex justify-start items-center gap-2 relative mt-[6px]">
                            <input
                                type="checkbox"
                                onClick={(e) => {
                                    handleStates(profilePublic, !states[profilePublic]);
                                }}
                                className="w-4 cursor-pointer mt-2"
                                id={profilePublic}
                                name={profilePublic}
                                checked={states[profilePublic]}
                            />
                            <label
                                data-testid="profile_visible"
                                className="text-neutral-primary text-[14px] leading-[22px] font-400 cursor-pointer"
                                htmlFor={profilePublic}
                            // Adjust the vertical alignment of the label
                            >
                                Make visible
                            </label>
                        </div>

                    </div>

                </div>

                : <div className='flex gap-6 mb-[25px]'>
                    <div className={`border border-dashed w-[100px] h-[100px] relative
        rounded-lg ${(imageUploadError)
            ? 'border-error'
            : 'border-neutral-secondary'} flex justify-center items-center`}>
                        {loadingImg
                            ? <ImageLoader />
                            : <Image src="emptyProfileIcon" className="relative w-[58px] h-[53px]"
                            />}
                        <Image
                            src="uploadImageIcon"
                            className="absolute top-0 left-0 mt-20 ml-20"
                        />
                        <input
                            onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    handleUploadFile(e);
                                }
                            }}
                            data-testid={testId}
                            accept="image/jpeg, image/png, image/jpg"
                            type="file"
                            className="h-full w-full opacity-0 absolute"
                            name=""
                            title=""

                        />

                    </div>
                    <div className=' flex flex-col mt-auto'>
                        <p className='font-400 text-[12px]
                                     text-[#A4A9AE]'>Supported file types: .png, .jpg, .jpeg for images</p>
                        <p className='font-400 text-[12px] text-[#A4A9AE] mb-[4px]'>Max file size: 10MB</p>
                    </div>

                </div>}
        </div>

    );
}
