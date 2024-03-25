import React, { useRef, useState } from 'react';
import { useOnClickOutside } from '../../CommonMethods/outsideClick';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function InputFieldWithDropDown (props) {
    const { labelName, value, placeholder, options, id, error, handleInput, testId } = props;
    const [show, setShow] = useState(false);

    const outsideClickRef = useRef();
    useOnClickOutside(outsideClickRef, () => {
        setShow(false);
    });
    return (
        <div className=" flex flex-col relative gap-2">
            <label htmlFor={id} className='text-neutral-primary text-[14px] font-[500] leading-[16px]'>{labelName}</label>
            <div ref={outsideClickRef} className={` bg-[#F8F8F8] text-neutral-primary
                     leading-[22px] focus:outline-none border-b focus:border-primary-normal flex justify-center items-center
                     rounded-tl rounded-tr  ${error ? 'border-error' : 'border-[#DDDDDD]'}
                     `} style={{ borderBottomColor: show ? '#3B2A6F' : '' }}>
                <button
                    onClick={() => setShow(!show)}
                    data-testid={testId}
                    className={`flex justify-between items-center px-[10px] py-[10px] w-full font-[400] text-[14px]  
                    ${value === '' ? 'text-[#8E949A]' : 'text-[#000000]'} 
                outline-0`}/*  */
                    type="button" aria-expanded="false">
                    {value === '' ? placeholder : value}
                    {show
                        ? <img loading="lazy" decoding="async"
                            src="/images/chevron-up.svg" alt="icon" />
                        : <img loading="lazy" decoding="async"
                            src="/images/chevron-dark-down.svg" alt="icon" />
                    }
                </button>
                <ul id="#patient-dropdownMenuButton1" className={`bg-[#FFFFFF] dropdown-menu 
                m-0 shadow-lg z-[9999] absolute !left-0 w-full p-2 
                border border-[#E5E4E5] !top-3 h-fit transform-none 
                ${show === true ? 'show' : 'hidden'}`}
                    aria-labelledby="patient-dropdownMenuButton1"
                    style={{ inset: 'auto auto 0px 0px', transform: 'translate(0px, 60px)' }}>
                    {options.map((item, index = 0) => (
                        <li onClick={(e) => {
                            e.preventDefault(); setShow(false);
                            handleInput(item);
                        }} key={index} className="automatic hover:bg-[#F2F4F5] rounded-lg p-2 cursor-pointer">
                            <a data-testid={`${testId}_${index}`}className="dropdown-item font-normal text-xs text-[#444652]"
                                href="/">
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            {error && <ErrorMessage error={error} />}
        </div>
    );
}

export default InputFieldWithDropDown;
