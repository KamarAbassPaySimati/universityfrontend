import React, { useRef, useState } from 'react';
import Image from '../Image/Image';
import { useOnClickOutside } from '../../CommonMethods/outsideClick';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function InputSearch ({ testId, id, handleInput, handleSearchItem, label, value, submitSelected }) {
    const [options, setOptions] = useState([]);
    const [search, setSearch] = useState(value);
    const [timer, setTimer] = useState(null);
    const [show, setShow] = useState(false);

    const outsideClickRef = useRef();
    useOnClickOutside(outsideClickRef, () => {
        setShow(false);
    });
    const handleSearch = async (e) => {
        const newValue = e.target.value;
        setSearch(newValue);
        clearTimeout(timer);
        const newTimer = setTimeout(async () => {
            const value = await handleSearchItem(id, newValue);
            setOptions(value);
            if (value.length > 0 && newValue !== '') {
                setShow(true);
            } else {
                setShow(false);
            }
        }, 500);
        setTimer(newTimer);
    };
    return (
        <div className='' ref={outsideClickRef}>
            <label htmlFor={id} className='text-neutral-primary text-[14px] font-[500] leading-[16px]'>{label}</label>

            <div className={`google-key relative mt-1 ${(submitSelected && search === '')
                ? 'google-key-error'
                : 'google-key-border'}`}>
                <input
                    type="text"
                    value={search}
                    placeholder="Search"
                    onChange={handleSearch}
                    className='w-full'
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Image src={'search_icon'} className="h-6 w-6 text-gray-400" />
                </div>
                <ul id="#patient-dropdownMenuButton1"
                    className={`bg-[#FFFFFF] dropdown-menu 
                m-0 shadow-lg z-[9999] absolute !left-0 w-full p-2 
                border border-[#E5E4E5] !top-3 min-h-heightDropDown transform-none overflow-auto scrollBar
                ${show === true ? 'show' : 'hidden'}`} aria-labelledby="patient-dropdownMenuButton1"
                    style={{ inset: 'auto auto 0px 0px', transform: 'translate(0px, 60px)' }}>
                    {options.map((item, index = 0) => (
                        <li onClick={(e) => {
                            e.preventDefault(); setShow(false);
                            setSearch(item);
                            handleInput(item, id);
                        }} key={index} className="automatic hover:bg-[#F2F4F5] rounded-lg p-2 cursor-pointer">
                            <a data-testid={`${testId}_${index}`}className="dropdown-item font-normal text-xs text-[#444652]"
                                href="/">
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            {(submitSelected && search === '') && <ErrorMessage error={'Required field'} />}
        </div>

    );
}
