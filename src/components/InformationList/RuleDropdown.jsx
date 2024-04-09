import React from 'react';
import Image from '../Image/Image';

export default function RuleDropdown ({ heading, rules }) {
    const [open, setOpen] = React.useState(false);
    const toggle = () => setOpen(!open);
    return (
        <div className='text-neutral-primary'>
            <button className='flex justify-between font-normal text-[16px] leading-6 items-center w-full p-2.5' onClick={toggle}>
                {heading}
                <Image src="chevron-dark-down" className={`${open ? '' : '-rotate-90'}`}/>
            </button>
            {open && <ol class="space-y-4 lower-alpha list-inside text-[14px] font-normal leading-[24px] ">
                <ul class="ps-5 mt-2 space-y-1 list-disc list-inside">
                    {Object.keys(rules).map((ruleItem) => (
                        rules[ruleItem].text &&
                        <li key={ruleItem}>{rules[ruleItem].text}</li>))}
                </ul>
            </ol>}

        </div>
    );
}
