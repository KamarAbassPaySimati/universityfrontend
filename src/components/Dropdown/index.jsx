/* eslint-disable max-len */
// CustomDropdown.js
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from '../Image/Image';

const Dropdown = ({
    initialSelect,
    onChange,
    error = false,
    isFocused = false,
    data,
    testid,
    testidInput,
    testidOpions,
    className,
    optionClassname,
    textColor,
    height,
    noDataMessage,
    scroll,
    searchIcon = false,
    toolTip = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const outsideClickRef = useRef();
    const dropdownRef = useRef(null);
    const buttonRef = useRef();

    const calculateDropdownPosition = () => {
        if (!buttonRef.current || !dropdownRef.current) return;
        const buttonRect = buttonRef.current.getBoundingClientRect(); // Fixed typo
        const spaceBelow = window.innerHeight - buttonRect.bottom - 40;
        const dropdownHeight = dropdownRef.current.clientHeight;
        if (spaceBelow < dropdownHeight) {
            dropdownRef.current.style.top = `-${dropdownHeight - 22}px`;
        } else {
            dropdownRef.current.style.top = '100%';
        }
    };
    useEffect(() => {
        window.addEventListener('resize', calculateDropdownPosition);
        calculateDropdownPosition(); // Initial position calculation
        return () => {
            window.removeEventListener('resize', calculateDropdownPosition);
        };
    }, [isOpen, searchQuery]);

    const handleDropdownClick = useCallback(() => {
        setIsOpen((prevState) => !prevState);
    }, []);

    const handleOptionClick = useCallback(
        (value) => {
            onChange(value);
            setIsOpen(false);
            setSearchQuery('');
        },
        [onChange]
    );

    const handleSearchChange = useCallback((e) => {
        setSearchQuery(e.target.value);
    }, []);

    const filtered = useMemo(
        () => data.filter((value) => value.toLowerCase().includes(searchQuery.toLowerCase())),
        [data, searchQuery]
    );

    const handleClickOutside = (event) => {
        if (outsideClickRef.current && !outsideClickRef.current.contains(event.target)) {
            setIsOpen(false);
            setSearchQuery('');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            setIsOpen(false);
            setSearchQuery('');
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='relative' ref={outsideClickRef}>
            <div
                ref={buttonRef}
                data-testid={testid}
                onClick={handleDropdownClick}
                title={toolTip ? initialSelect : ''}
                className={`pl-2 outline-none font-[400] pr-[5px] text-[14px] leading-[22px] bg-[#F8F8F8] border-b cursor-pointer flex items-center justify-between ${isFocused ? 'border-primary-normal' : 'border-[#DDDDDD]'} ${error ? 'border-error' : 'border-[#DDDDDD]'} ${className} ${scroll}`}
            >
                {initialSelect}
                <img src='/images/chevron-down.svg' className={`ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className={`absolute z-50 border-t-[#3b2a6f] w-fit thin-scrollBar overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg ${height}`}>
                    <div className='sticky top-0 bg-white z-10 border-b border-gray-300 flex items-center'>
                        {searchIcon && <Image src={'search_icon'} className="h-5 w-5 ms-2 my-2 text-gray-400" />}
                        <input
                            type='text'
                            value={searchQuery}
                            data-testid={testidInput}
                            onChange={handleSearchChange}
                            placeholder='Search...'
                            className={`w-full px-2 py-2 text-[14px] focus:outline-none ${textColor}`}
                        />
                    </div>
                    {filtered.length > 0
                        ? (
                            filtered.map((value) => (
                                <div
                                    key={value}
                                    onClick={() => handleOptionClick(value)}
                                    className={`cursor-pointer ${optionClassname} ${textColor}`}
                                    data-testid={testidOpions}
                                >
                                    {value}
                                </div>
                            )))
                        : <div>{noDataMessage}</div>}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
