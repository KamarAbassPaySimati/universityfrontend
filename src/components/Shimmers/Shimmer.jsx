/* eslint-disable max-len */
import React from 'react';
// width - used for specifiing the width of the shimmer

function Shimmer ({ column, row, firstIndex, hight, width }) {
    return (
        <>
            <thead>
                <tr className="animate-pulse">
                    {[...Array(column)].map((_, ind) => (
                        <th key={`header-${ind}`} className={`text-sm font-medium text-[#13365C] ${width} min-w-[150px] p-2.5`}>
                            <div className="h-7 bg-slate-200 rounded w-full" />
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className=''>
                {[...Array(row)].map((_, index) => (
                    <tr className="animate-pulse z-0" key={index}>
                        {[...Array(column)].map((_, ind) => (
                            <td key={`${index}.${ind}`} className={`text-sm font-light text-[#13365C] ${width} ${hight ? '' : 'p-2.5'} ${(firstIndex !== undefined && ind === 0) ? 'min-w-[80px]' : 'min-w-[150px]'}`}>
                                <div className={` ${hight || 'h-7'} bg-slate-200 rounded z-[-10] relative`} />
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </>
    );
}

export default Shimmer;
