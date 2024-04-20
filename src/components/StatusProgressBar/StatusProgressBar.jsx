/* eslint-disable max-len */
import React from 'react';

const ProgressBarComponent = ({ ProgressBar, LineClass, currentTab }) => {
    const getColors = (type, progressItem) => {
        if (currentTab === progressItem) {
            return { inner: 'bg-primary-normal', outer: 'bg-background-light' };
        } else {
            switch (type) {
            case 'completed':
                return { inner: 'bg-accent-positive', outer: 'bg-accent-positive-secondary_color' };
            case 'skip':
                return { inner: 'bg-neutral-secondary', outer: 'bg-neutral-outline' };
            default:
                return { inner: 'bg-neutral-secondary', outer: 'bg-neutral-outline' };
            }
        }
    };
    return (
        <>
            <div className='mx-auto mb-10'>
                <div className='w-[500px] flex justify-around'>
                    {Object.keys(ProgressBar).map((progressItem, index = 0) => (
                        <div key={progressItem} className={`rounded-full ${getColors(ProgressBar[progressItem].status, progressItem).outer} w-8 h-8 relative flex items-center justify-center`}>
                            <div className={`rounded-full ${getColors(ProgressBar[progressItem].status, progressItem).inner} w-[18px] h-[18px]`}></div>
                            {index === 0 && <div className={`${LineClass}`}></div>}
                        </div>
                    ))}
                </div>
                <div className='w-[500px] mt-2 capitalize flex justify-around text-center text-[16px] leading-[24px] font-medium'>
                    {Object.keys(ProgressBar).map((progressItem) => (
                        <p key={progressItem}>
                            {progressItem.replaceAll('_', ' ')}
                        </p>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProgressBarComponent;
