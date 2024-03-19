/**
 * The CardHeader component in JavaScript React renders a header with breadcrumbs, active path, and a
 * profile icon with a tooltip.
 * @returns The `CardHeader` component is being returned. It is a functional component that takes in
 * props such as `children`, `paths`, `activePath`, and `pathurls`. Inside the component, it renders a
 * header section with breadcrumbs based on the paths provided, an active path if available, and a
 * profile icon with a tooltip. The main content area is rendered below the header section.
 * the activePath is a string
 * the paths should be an array of string
 * the pathurls should be an array that correspond to urls for each path in paths
 */

import React from 'react';
import Image from '../Image/Image';
import { Tooltip } from 'react-tooltip';
import { Link, useNavigate } from 'react-router-dom';

const CardHeader = ({ children, paths, activePath, pathurls }) => {
    const navigate = useNavigate();

    function cumulativeSum (arr) {
        console.log(arr, 'arr');
        const result = [];
        let sum = '';
        for (const str of arr) {
            sum += str;
            result.push(sum);
        }
        console.log(result, 'result');
        return result;
    }

    return (
        <div className='h-screen w-[calc(100vw-240px)]'>
            <div className=' h-[56px] flex justify-between mx-10'>
                <div id='breadcrumbs' className='flex justify-center items-center cursor-default'>
                    {paths && paths.map((path, index) =>
                        <div key={index} className='flex'>
                            <span
                                onClick={() => navigate(`/${cumulativeSum(pathurls.slice(0, index + 1)).pop()}`)}
                                className="text-[14px] leading-[24px] font-[400] px-[6px] text-neutral-secondary cursor-pointer">
                                {path}
                            </span>
                            <Image src='chevron-right' />
                        </div>
                    )}
                    {activePath &&
                        <span className="text-[14px] leading-[24px] font-[400] text-neutral-primary px-[6px]">
                            {activePath}
                        </span>
                    }
                </div>
                <div className='flex justify-center items-center'>
                    <Image onClick={() => navigate('/profile')} className='profile cursor-pointer' src='profile' />
                    <Tooltip
                        className='my-tooltip'
                        anchorSelect=".profile"
                        place='bottom'
                        clickable
                    >
                        <Link to="/profile">Profile</Link>
                    </Tooltip>
                </div>
            </div>
            <div className='h-[calc(100vh-56px)] bg-background border-t border-neutral-outline bg-'>
                {children}
            </div>
        </div>
    );
};

export default CardHeader;
