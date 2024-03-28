import React from 'react';
import Image from '../../../../../components/Image/Image';

const AdminTable = () => {
    return (
        <table className='w-full'>
            <thead className='text-neutral-secondary whitespace-nowrap text-[14px] leading-[24px]'>
                <tr className='border-y border-neutral-outline'>
                    <th className='py-2 px-[10px] text-center font-[400]'>Paymaart ID</th>
                    <th className='py-2 px-[10px] text-left flex font-[400] gap-1'>
                        Name
                        <Image src='sort_icon' />
                    </th>
                    <th className='py-2 px-[10px] text-left font-[400]'>Email</th>
                    <th className='py-2 px-[10px] text-left font-[400]'>Phone Number</th>
                    <th className='py-2 px-[10px] text-left font-[400]'>Role</th>
                    <th className='py-2 px-[10px] text-left font-[400]'>Last Logged In</th>
                    <th className='py-2 px-[10px] text-left font-[400]'>Status</th>
                    <th className='py-2 px-[10px]'></th>
                </tr>
            </thead>
            <tbody className='text-neutral-primary whitespace-nowrap text-[14px] leading-[24px] font-[400]'>
                <tr className='border-y border-neutral-outline'>
                    <td className='py-2 px-[10px] text-center'>PMT12345</td>
                    <td className='py-2 px-[10px]'>Sophia Rose WILLIAMS </td>
                    <td className='py-2 px-[10px]'>abc@7edge.com</td>
                    <td className='py-2 px-[10px]'>+265 88 895 7712</td>
                    <td className='py-2 px-[10px]'>Super Admin</td>
                    <td className='py-2 px-[10px]'>13 Feb 2024, 22:30 hours</td>
                    <td className='py-2 px-[10px]'>Active</td>
                    <td className='py-2 px-[10px] flex gap-[19px]'>
                        <Image src='eye' />
                        <Image src='edit' />
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default AdminTable;
