import React from 'react';

export default function GuidList ({ information, heading }) {
    return (
        <>
            <h1 className='mb-2 font-normal text-[16px] leading-6'>
                {heading}</h1>
            <ol class="space-y-4 list-decimal list-inside text-[14px] font-normal leading-6 text-[#FFF] ml-[10px]">
                {Object.keys(information).map((itemText, itemIndex = 0) => (
                    information[itemText].text && <li key={itemIndex}>
                        {information[itemText].text}
                        {Object.keys(information[itemText]).length > 0 &&
                        Object.keys(information[itemText]).map((insideText, insideIndex = 0) => (
                            information[itemText][insideText].text &&
                            <ul class="ps-5 mt-2 space-y-1 list-inside"
                                key={insideIndex}>
                                <div className='flex'>
                                    <li></li>
                                    <span>{information[itemText][insideText].text}</span>
                                </div>
                                {Object.keys(information[itemText][insideText]).length > 0 &&
                                 Object.keys(information[itemText][insideText]).map((liText, liIndex = 0) => (
                                     information[itemText][insideText][liText].text &&
                                     <ul class="ps-5 mt-2 space-y-1 list-disc list-inside" key={liIndex}>
                                         <div className='flex'>
                                             <li></li>
                                             <span>{information[itemText][insideText][liText].text}</span>
                                         </div>
                                         {Object.keys(information[itemText][insideText][liText]).length > 0 &&
                                            Object.keys(information[itemText][insideText][liText]).map((
                                                liTextLast, liIndexLast = 0) => (
                                                information[itemText][insideText][liText][liTextLast].text &&
                                                <ul class="ps-5 mt-2 space-y-1 list-circle list-inside" key={liIndexLast}>
                                                    <div className='flex'>
                                                        <li></li>
                                                        <span>{information[itemText][insideText][liText][liTextLast].text}</span>
                                                    </div>
                                                </ul>))}
                                     </ul>))}
                            </ul>))}
                    </li>))}
            </ol>

        </>
    );
}
