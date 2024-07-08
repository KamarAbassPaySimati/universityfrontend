/* eslint-disable max-len */
import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { setKey, geocode, RequestType } from 'react-geocode';
import { GOOGLE_API } from '../../config';
import CustomMarker from './CustomMarker';

// Set your API key
setKey(GOOGLE_API); // Replace with your actual API key

// const CustomMarker = ({ text }) => (
//     <div>
//         {/* <img src="https://maps.google.com/mapfiles/ms/icons/red-dot.png" alt="Marker" /> */}
//         <div className='h-3 w-3 rounded-full bg-red-600'></div>
//         {/* {text && <p className='text-red-700 bg-white z-20'>{text}</p>} */}
//     </div>
// );

const GeocodeComponent = () => {
    const [address, setAddress] = useState('');
    const [locations, setLocations] = useState([
        { lat: -13.9632, lng: 33.7741 }, // Lilongwe
        { lat: -15.7667, lng: 35.0167 }, // Blantyre
        { lat: -15.3833, lng: 35.3333 }, // Zomba
        { lat: -11.4656, lng: 34.0209 }, // Mzuzu
        { lat: -12.0419, lng: 34.8916 } // Lake Malawi
    ]);
    const [center, setCenter] = useState({ lat: -13.2543, lng: 34.3015 });
    const [error, setError] = useState(null);

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleGeocode = async () => {
        try {
            const response = await geocode(RequestType.ADDRESS, address);
            const { lat, lng } = response.results[0].geometry.location;
            setLocations({ lat, lng });
            setError(null);
        } catch (err) {
            setError('Failed to get coordinates. Please check the address and try again.');
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col items-center p-4 w-full">
            <input
                type="text"
                value={address}
                onChange={handleAddressChange}
                placeholder="Enter address"
                className="p-2 text-base rounded border border-gray-300 mb-4 w-full max-w-md"
            />
            <button
                onClick={handleGeocode}
                className="p-2 text-base rounded bg-blue-500 text-white hover:bg-blue-600 mb-4"
            >
                Get Coordinates
            </button>
            {locations.lat && locations.lng && (
                <div className="mb-4">
                    <p>Latitude: {locations.lat}</p>
                    <p>Longitude: {locations.lng}</p>
                </div>
            )}
            {error && (
                <div className="text-red-500 mt-4">
                    <p>{error}</p>
                </div>
            )}
            <div style={{ height: '50vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: GOOGLE_API,
                        libraries: ['places'],
                        language: 'en',
                        region: 'us',
                        mapTypeId: 'terrain' // Change map type here ('terrain', 'roadmap', 'satellite', 'hybrid')
                    }} // Replace with your actual Google Maps API key
                    center={center}
                    defaultZoom={6}
                >
                    {locations.map((location, index) => (
                        <CustomMarker
                            key={index}
                            lat={location.lat}
                            lng={location.lng}
                            text={`Marker ${index + 1}`}
                        />
                    ))}
                </GoogleMapReact>
            </div>
        </div>
    );
};

export default GeocodeComponent;
