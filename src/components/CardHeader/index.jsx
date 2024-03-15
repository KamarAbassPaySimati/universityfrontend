import React from 'react';
import Image from '../Image/Image';

const CardHeader = ({ children }) => {
    function cumulativeSum (arr) {
        const result = [];
        let sum = '';
        for (const str of arr) {
            sum += str;
            result.push(sum);
        }
        return result;
    }

    return (
        <div className='h-screen w-[calc(100vw-240px)]'>
            <div className=' h-[56px] flex justify-between'>
                <div className='breadcrumbs'>

                </div>
                <div className='flex mr-10 justify-center items-center'>
                    <Image src='profile' />
                </div>
            </div>
            <div className='h-[calc(100vh-56px)] bg-background border-t border-neutral-outline bg-'>
                {children}
            </div>
        </div>
    );
};

export default CardHeader;
