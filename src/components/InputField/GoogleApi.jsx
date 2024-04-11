import React from 'react';
import GoogleComponent from 'react-google-autocomplete';
import { GOOGLE_API } from '../../config';

const GoogleApi = ({ labelName, id, placeholder }) => {
    const handlePlaceSelect = (place) => {
        console.log(place);
    };

    return (
        <div className='mx-[10px]'>
            <label htmlFor={id} className='text-neutral-primary text-[14px] font-[500] leading-[16px] mr-4'>
                {labelName}
            </label>
            <div className='google-key'>
                <GoogleComponent
                    placeholder={placeholder}
                    apiKey={GOOGLE_API}
                    options={{ types: ['(cities)'] }}
                    onChange={handlePlaceSelect}
                    className='w-full mt-2'
                />
            </div>
        </div>
    );
};

export default GoogleApi;
