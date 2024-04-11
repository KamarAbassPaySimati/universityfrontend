import React, { useState } from 'react';
import Image from '../Image/Image';

export default function InputSearch ({ testId, id, handleInput, handleSearchItem }) {
    const [options, setOptions] = useState([]);
    const [search, setSearch] = useState('');
    const [timer, setTimer] = useState(null);

    const handleSearch = (e) => {
        const newValue = e.target.value;
        setSearch(newValue);
        clearTimeout(timer);
        const newTimer = setTimeout(() => {
            setOptions(handleSearchItem(id, newValue));
        }, 500);
        setTimer(newTimer);
    };
    return (
        <div className='google-key relative'>
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
                border border-[#E5E4E5] !top-3 h-fit transform-none 
                ${options.length > 0 ? 'show' : 'hidden'}`} aria-labelledby="patient-dropdownMenuButton1"
                style={{ inset: 'auto auto 0px 0px', transform: 'translate(0px, 60px)' }}>
                {options.map((item, index = 0) => (
                    <li onClick={(e) => {
                        e.preventDefault(); options([]);
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
    );
}
