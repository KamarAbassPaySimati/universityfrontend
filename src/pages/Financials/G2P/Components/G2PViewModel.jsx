/* eslint-disable max-len */
import React from 'react';
import FullScreenTable from '../../../../components/FullScreenTableView/FullScreenTable';

export default function G2PViewModel ({ name, item, testId, className, setSelectedSheets, selectedSheets, handleClose, labelValue }) {
    return (
        <>
            <div className='mr-2'>
                <div className={`mt-2 border-[2px] border-background-light h-[52px]
                            rounded-lg flex justify-between items-center ${className}`} >
                    {/* <FullScreenTable
                        setSelectedSheets={setSelectedSheets}
                        selectedSheets={selectedSheets}
                        labelValue={labelValue}
                        onClose={handleClose}
                    // imagevalue={`${CDN}${link}`}
                    // cdnImg
                    /> */}
                </div>
            </div>
        </>
    );
}
