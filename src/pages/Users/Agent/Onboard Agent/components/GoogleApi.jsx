import React from 'react';
import GoogleComponent from 'react-google-autocomplete';
import { GOOGLE_API } from '../../../../../config';

const MyComponent = () => {
    const handlePlaceSelect = (place) => {
        console.log(place);
    };

    return (
        <div className='google-key'>
            <GoogleComponent
                apiKey={GOOGLE_API}
                options={{ types: ['(cities)'] }}
                onChange={handlePlaceSelect}
            />
        </div>
    );
};

export default MyComponent;
