import React from 'react';
import Image from '../Image/Image';

export default function UploadPlaceholder ({ label }) {
    return (
        <div className=' py-4'>
            <p className='font-medium text-[14px] leading-4'>{label}</p>
            <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
                <div className="md:flex">
                    <div className="w-full py-3">
                        <div className=" border border-dashed h-48
                        rounded-lg  border-neutral-secondary flex justify-center items-center">
                            <div className='flex flex-col justify-center items-center absolute p-10'>
                                <button
                                    className='flex items-center rounded border border-neutral-outline p-2.5 text-neutral-primary
                                    gap-2.5 font-medium text-[14px] leading-4 mb-2'>
                                    <Image src="upload"/>
                                    Upload
                                </button>
                                <div
                                    className='text-center text-[12px] leading-[20px] font-normal text-neutral-primary'>
                                    <span className='text-neutral-secondary'> Supported file types: </span>
                                    .png, .jpg, .jpeg for images, and .pdf for documents</div>
                            </div>
                            <input type="file" className="h-full w-full opacity-0" name=""/>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
