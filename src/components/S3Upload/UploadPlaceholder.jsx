import React, { useState } from 'react';
import Image from '../Image/Image';
import { handleDelete, handleUpload } from './S3Functions';

export default function UploadPlaceholder ({ label }) {
    const [uploadedFile, setUploadedFile] = useState({});
    const handleUploadFile = async (e) => {
        setUploadedFile(await handleUpload(e.target.files[0]));
    };
    console.log(uploadedFile, 'uploadedFile');
    return (
        <div className=' py-4'>
            <p className='font-medium text-[14px] leading-4'>{label}</p>
            {Object.keys(uploadedFile).length > 0
                ? <div className='mt-2 bg-background-light w-full h-[52px] rounded-lg flex justify-between items-center'>
                    <p className='p-2 text-neutral-primary text-[14px] leading-4 font-medium'>{uploadedFile.key}</p>
                    <div className='flex gap-3 px-2'>
                        <Image src='eyeLight' className='h-6 w-6'/>
                        <Image src='refresh' className='h-6 w-6 cursor-pointer'
                            onClick={() => {
                                handleDelete(uploadedFile.key);
                                setUploadedFile({});
                            }
                            }
                        />

                    </div>
                </div>
                : <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
                    <div className="md:flex">
                        <div className="w-full py-3">
                            <div className=" border border-dashed h-48
                        rounded-lg  border-neutral-secondary flex justify-center items-center">
                                <div className='flex flex-col justify-center items-center absolute p-10'>
                                    <button
                                        className='flex items-center rounded 
                                        border border-neutral-outline p-2.5 text-neutral-primary
                                    gap-2.5 font-medium text-[14px] leading-4 mb-2'>
                                        <Image src="upload"/>
                                        Upload
                                    </button>
                                    <div
                                        className='text-center text-[12px] leading-[20px] font-normal text-neutral-primary'>
                                        <span className='text-neutral-secondary'> Supported file types: </span>
                                        .png, .jpg, .jpeg for images, and .pdf for documents</div>
                                </div>
                                <input
                                    onChange={(e) => handleUploadFile(e)}
                                    type="file" className="h-full w-full opacity-0" name=""/>

                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>
    );
}
