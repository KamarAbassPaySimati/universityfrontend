/* eslint-disable max-len */
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
import Shimmer from '../Shimmers/Shimmer';

const CardHeader = ({
    children, paths, activePath, pathurls, testId, header, buttonText, minHeightRequired,
    navigationPath, table, updateButton, updateButtonPath, statusButton, ChildrenElement
}) => {
    const navigate = useNavigate();

    function cumulativeSum (arr) {
        const result = [];
        let sum = '';
        for (const str of arr) {
            sum += str + '/';
            result.push(sum);
        }
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
            <div className='h-[calc(100vh-56px)] bg-background border-t border-neutral-outline'>
                {header &&
                <div className={`${ChildrenElement ? '' : 'bg-[#FFFFFF] border-b border-neutral-outline py-7 px-8'} mx-10 mt-8 mb-6 text-[30px] font-[700] leading-[40px]
                 text-header-dark flex flex-row justify-between `}>
                    {header}
                    <div className='flex'>
                        {buttonText && <button onClick={() => { navigate(navigationPath); }}
                            className='flex bg-primary-normal py-[8px] px-[16px] justify-center items-center
                    h-[40px] rounded-[6px]'>
                            <img src='/images/onboardIcon.svg'
                                className='mr-[8px]'/>
                            <p className='text-[14px] font-[600] text-[#ffffff]'>{buttonText}</p>
                        </button>}
                        {statusButton === true
                            ? <Shimmer hight={'h-10'}/>
                            : (statusButton !== undefined &&
                            <button onClick={() => { navigate(updateButtonPath); }}
                                className={`flex ${statusButton === 'Activate' ? 'bg-[#13B681]' : 'bg-[#FF6363]'} py-[8px] px-[16px] justify-center items-center
                    h-[40px] rounded-[6px]`}>
                                <p className='text-[14px] font-[600] text-[#ffffff]'>{statusButton}</p>
                            </button>)
                        }
                        {updateButton === false
                            ? (
                                <button onClick={() => { navigate(updateButtonPath); }}
                                    className='ml-6 flex bg-primary-normal py-[8px] px-[16px] justify-center items-center
                    h-[40px] rounded-[6px]'>
                                    <Image src='update'
                                        className='mr-[8px]'/>
                                    <p className='text-[14px] font-[600] text-[#ffffff]'>Update</p>
                                </button>)
                            : (updateButton === true && <div className='ml-6 '><Shimmer hight={'h-10'}/></div>)
                        }
                    </div>
                </div>
                }
                {ChildrenElement !== true
                    ? (!table
                        ? <div className={`max-h-[calc(100vh-120px)] scrollBar overflow-auto mx-10 my-8 px-[30px] pt-[24px] pb-[28px] 
                flex flex-col bg-[#FFFFFF] border border-neutral-outline rounded-[6px]
                ${header ? 'max-h-[calc(100vh-240px)]' : ''} 
                ${minHeightRequired ? 'min-h-[calc(100vh-240px)]' : ''}`} data-testid={testId}>
                            {children}
                        </div>
                        : <div className='min-h-[calc(100vh-240px)] max-h-[calc(100vh-120px)] mx-10 my-6
                     bg-[#FFFFFF] rounded-[6px] border border-neutral-outline'>
                            {children}
                        </div>)
                    : <div>
                        {children}
                    </div> }
            </div>
        </div>
    );
};

export default CardHeader;
