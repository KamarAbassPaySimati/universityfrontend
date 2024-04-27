import React from 'react';

export default function InformationList ({ information, heading }) {
    return (
        <div className=' w-[450px] bg-[#3B2A6F] text-[#fff] font-normal text-[16px] p-6 rounded-[10px] max-h-[400px] pt-10'>
            <h1 className='mb-2 font-normal text-[16px] leading-6'>
                {heading}</h1>
            <ol class="space-y-4 list-inside text-[14px] font-normal leading-6 text-[#FFF] ">
                {Object.keys(information).map((itemText, itemIndex = 0) => (<li key={itemIndex} className='max-h-[300px]
         whiteScrollBar overflow-auto'>
                    {information[itemText].text}
                    {Object.keys(information[itemText]).length > 0 &&
                        Object.keys(information[itemText]).map((insideText, insideIndex = 0) => (
                            information[itemText][insideText].text &&
                            <ul class="ps-5 mt-2 space-y-1 list-disc list-inside"
                                key={insideIndex}>
                                <div className='flex'>
                                    <li></li>
                                    <span>{information[itemText][insideText].text}</span>
                                </div>
                                {Object.keys(information[itemText][insideText]).map((liText, liIndex = 0) => (
                                    information[itemText][insideText][liText].text &&
                                    <ul class="ps-5 mt-2 space-y-1 list-circle list-inside" key={liIndex}>
                                        <div className='flex'>
                                            <li></li>
                                            <span>{information[itemText][insideText][liText].text}</span>
                                        </div>

                                    </ul>))}
                            </ul>))}
                </li>))}
            </ol>

        </div>
    );
}
