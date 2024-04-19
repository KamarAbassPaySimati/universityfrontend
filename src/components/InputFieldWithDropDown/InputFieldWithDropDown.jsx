/* eslint-disable max-len */
import React, { useRef, useState, useEffect } from 'react';
import { useOnClickOutside } from '../../CommonMethods/outsideClick';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Image from '../Image/Image';
import InformationList from '../InformationList/InformationList';

function InputFieldWithDropDown (props) {
    const { labelName, value, placeholder, options, id, error, handleInput, testId, information } = props;
    const [show, setShow] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const infoRef = useRef();
    const outsideClickRef = useRef();
    const buttonRef = useRef();
    const dropdownRef = useRef();
    useOnClickOutside(outsideClickRef, () => {
        setShow(false);
    });
    useOnClickOutside(infoRef, () => {
        setShowInfo(false);
    });
    const calculateDropdownPosition = () => {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - buttonRect.bottom - 40;
        // 40px
        const dropdownHeight = dropdownRef.current.clientHeight;

        if (spaceBelow < dropdownHeight) {
            dropdownRef.current.style.top = `-${dropdownHeight - 22}px`;
        } else {
            dropdownRef.current.style.top = '105%';
        }
    };
    useEffect(() => {
        window.addEventListener('resize', calculateDropdownPosition);
        calculateDropdownPosition(); // Initial position calculation
        return () => {
            window.removeEventListener('resize', calculateDropdownPosition);
        };
    }, [show]);
    return (
        <div className=" flex flex-col relative gap-2">
            <div className='flex items-center'>
                <label htmlFor={id} className='text-neutral-primary text-[14px] font-[500] leading-[16px] mr-4'>
                    {labelName}</label>
                {information &&
                <div ref={infoRef} className='flex'>
                    <Image src="info_icon" className="w-5 h-5 cursor-pointer info-icon relative" onClick={() => setShowInfo(!showInfo)}/>
                    <div className='absolute z-10 ml-5'>
                        {showInfo && <InformationList
                            heading={information.heading}
                            information={information.information}
                        />}
                    </div>
                </div>
                }
            </div>
            <div ref={outsideClickRef} className={` bg-[#F8F8F8] text-neutral-primary
                     leading-[22px] focus:outline-none border-b focus:border-primary-normal flex justify-center items-center
                     rounded-tl rounded-tr  ${error ? 'border-error' : 'border-[#DDDDDD]'}
                     `} style={{ borderBottomColor: show ? '#3B2A6F' : '' }}>
                <button
                    ref={buttonRef}
                    onClick={() => setShow(!show)}
                    data-testid={testId}
                    className={`flex justify-between items-center px-[10px] py-[10px] w-full font-[400] text-[14px]  
                    ${value === '' ? 'text-[#8E949A]' : 'text-[#4F5962]'} 
                outline-0`}/*  */
                    type="button" aria-expanded="false">
                    {value === '' ? placeholder : value}
                    {show
                        ? <img loading="lazy" decoding="async" src="/images/chevron-up.svg" alt="icon" />
                        : <img loading="lazy" decoding="async" src="/images/chevron-dark-down.svg" alt="icon" />
                    }
                </button>
                <ul id="#patient-dropdownMenuButton1"
                    data-testid={`${labelName.replaceAll(' ', '_').toLowerCase()}_dropdown_list`} ref={dropdownRef}
                    className={`bg-[#FFFFFF] 
                m-0 shadow-lg z-[9999] absolute !left-0 w-full p-2 
                border border-[#E5E4E5]
                ${show === true ? 'show' : 'hidden'}`} aria-labelledby="patient-dropdownMenuButton1"
                >
                    <li>
                        <ul className='max-h-[390px] overflow-auto bg-[#fff]'>
                            {options.map((item, index = 0) => (
                                <li onClick={(e) => {
                                    e.preventDefault(); setShow(false);
                                    handleInput(item, id);
                                }} key={index} className="automatic hover:bg-[#F2F4F5] rounded-lg p-2 cursor-pointer">
                                    <a data-testid={`${item.replaceAll(' ', '_').toLowerCase()}`} className="dropdown-item font-normal text-xs text-[#444652]"
                                        href="/">
                                        {item}
                                    </a>
                                </li>
                            ))}

                        </ul>
                    </li>

                </ul>
            </div>
            {(error && !show) && <ErrorMessage error={error} />}
        </div>
    );
}

export default InputFieldWithDropDown;
