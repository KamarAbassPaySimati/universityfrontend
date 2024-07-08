/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import MapLocator from '../../components/MapLocator/MapLocator';
import { GOOGLE_API } from '../../config';

const POC = () => {
    const [location, setLocation] = useState([{ longitude: -122.0843428, latitude: 37.4222804 }, { latitude: 37.4232804, longitude: -122.0843428 }]);
    const [address, setAddress] = useState('');

    useEffect(() => {
        // Create a script element
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API}&libraries=places&callback=initMap&loading=async`;
        script.defer = true;
        script.async = true; // Optionally, set async to true if needed
        script.onload = () => {
            console.log('Script loaded successfully!');
        };

        // Append the script element to the document body
        document.body.appendChild(script);

        // Clean up function to remove the script when the component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, [location]);

    const handleMark = async () => {
        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API}`;

        try {
            const res = await fetch(apiUrl);
            const data = await res.json();

            if (data.status === 'OK') {
                console.log(data, 'data');
                const location = data.results[0].geometry.location;
                console.log(location, 'location');
                const latitude = location.lat;
                const longitude = location.lng;
                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            } else {
                console.error('Geocoding API error:', data.status);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    return (
        <div className='p-10 w-full'>
            <div>POC</div>
            <div className="flex items-center my-5">
                <input
                    className="p-2 text-base rounded border border-gray-300 mr-4"
                    type="text"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                />
                <button
                    className="p-2 text-base rounded bg-blue-500 text-white hover:bg-blue-600"
                    onClick={handleMark}
                >
                    Mark
                </button>
            </div>
            <MapLocator markers={location} />
        </div>
    );
};

export default POC;
