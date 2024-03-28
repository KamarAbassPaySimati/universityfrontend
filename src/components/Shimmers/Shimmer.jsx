import React from 'react';

function Shimmer ({ column, row }) {
    return (
        <tbody>
            {[...Array(row)].map((_, index) => (
                <tr className="animate-pulse" key={index}>
                    {[...Array(column)].map((_, ind) => (
                        <td key={`${index}.${ind}`} className="text-sm font-light text-[#13365C] p-2.5 min-w-[150px]">
                            <div className="h-7 bg-slate-200 rounded" />
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
}

export default Shimmer;
