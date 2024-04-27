import React, { Fragment } from 'react';
import RuleDropdown from './RuleDropdown';

export default function RulesList ({ heading, rulesList }) {
    return (
        <div className=' py-4'>
            <div className="max-w-md mx-auto rounded-lg  md:max-w-xl">
                <div className="md:flex">
                    <div className="w-full py-3">
                        <div className="h-48
                        rounded-lg  bg-[#F6F8F9]  p-2 overflow-auto scrollBar" >
                            <h1 className='font-normal text-[14px] leading-[22px]'>{heading}</h1>
                            {Object.keys(rulesList).map((ruleItem) => (
                                <Fragment key={ruleItem}>
                                    <RuleDropdown
                                        heading={rulesList[ruleItem].text}
                                        rules={rulesList[ruleItem]}
                                    />
                                </Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
