import React from 'react';
import Image from '../Image/Image';
import GuidList from './GuidList';

export default function RuleDropdown ({ heading, rules, textColor, imageSrc, Guid }) {
    const [open, setOpen] = React.useState(false);
    const toggle = () => setOpen(!open);
    return (
        <div className={`${textColor || 'text-neutral-primary'}`}>
            <button className='flex justify-between font-normal text-[16px] leading-6 items-center w-full p-2.5' onClick={toggle}>
                {heading}
                <Image src={imageSrc || 'chevron-dark-down'}
                    className={`${imageSrc !== undefined ? open ? 'rotate-90' : '' : open ? '' : '-rotate-90'}`}/>
            </button>
            {open && (Guid
                ? <GuidList information={rules} />
                : <ol class="space-y-4 lower-alpha list-inside text-[14px] font-normal leading-[24px] ">
                    <ul class="ps-5 mt-2 space-y-1 list-disc list-inside">
                        {Object.keys(rules).map((ruleItem) => (
                            rules[ruleItem].text &&
                            <div className='flex' key={ruleItem}>
                                <li></li>
                                <span>{rules[ruleItem].text}</span>
                            </div>
                        ))}
                    </ul>
                </ol>)}

        </div>
    );
}
