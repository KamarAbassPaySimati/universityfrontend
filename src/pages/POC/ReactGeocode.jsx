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
    const [zoom, setZoom] = useState(6);
    const [apiresponse, setApiResponse] = useState();
    const [error, setError] = useState(null);
    const [selectedDistricts, setSelectedDistricts] = useState();

    const districts = [
        { name: 'Lilongwe', lat: -13.9632, lng: 33.7741 },
        { name: 'Blantyre', lat: -15.7667, lng: 35.0167 },
        { name: 'Zomba', lat: -15.3833, lng: 35.3333 },
        { name: 'Mzuzu', lat: -11.4656, lng: 34.0209 },
        { name: 'Karonga', lat: -9.9328, lng: 33.9333 },
        { name: 'Kasungu', lat: -13.0333, lng: 33.4833 },
        { name: 'Mangochi', lat: -14.4782, lng: 35.2646 },
        { name: 'Mchinji', lat: -13.7982, lng: 32.8802 },
        { name: 'Nkhotakota', lat: -12.9163, lng: 34.2941 },
        { name: 'Salima', lat: -13.7804, lng: 34.4584 },
        { name: 'Balaka', lat: -14.9794, lng: 34.9556 },
        { name: 'Chikwawa', lat: -16.0297, lng: 34.8009 },
        { name: 'Chiradzulu', lat: -15.6784, lng: 35.1707 },
        { name: 'Dedza', lat: -14.378, lng: 34.3319 },
        { name: 'Dowa', lat: -13.6549, lng: 33.9379 },
        { name: 'Likoma', lat: -12.0733, lng: 34.7378 },
        { name: 'Machinga', lat: -14.9667, lng: 35.5167 },
        { name: 'Mulanje', lat: -16.0333, lng: 35.5 },
        { name: 'Mwanza', lat: -15.6167, lng: 34.5167 },
        { name: 'Neno', lat: -15.3987, lng: 34.6532 },
        { name: 'Ntcheu', lat: -14.8167, lng: 34.6333 },
        { name: 'Ntchisi', lat: -13.3833, lng: 33.9 },
        { name: 'Phalombe', lat: -15.8, lng: 35.65 },
        { name: 'Rumphi', lat: -11.0178, lng: 33.8575 },
        { name: 'Thyolo', lat: -16.0667, lng: 35.1333 },
        { name: 'Chitipa', lat: -9.7167, lng: 33.2667 }
    ];

    const handleDistrictChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setSelectedDistricts(selectedOptions);

        const selectedDistrict = districts.find(district => district.name === selectedOptions[0]);
        if (selectedDistrict) {
            setCenter({ lat: selectedDistrict.lat, lng: selectedDistrict.lng });
            setZoom(10); // Adjust zoom level as necessary
        }
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleGeocode = async () => {
        try {
            const response = await geocode(RequestType.ADDRESS, address);
            console.log(response);
            const { lat, lng } = response.results[0].geometry.location;
            console.log(lat, 'latitude');
            console.log(lng, 'latitude');
            setApiResponse({ lat, lng });
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
            <select
                value={selectedDistricts}
                onChange={handleDistrictChange}
                className="p-2 text-base rounded border border-gray-300 mb-4 w-full max-w-md"
            >
                {districts.map((district) => (
                    <option key={district.name} value={district.name}>
                        {district.name}
                    </option>
                ))}
            </select>
            {apiresponse?.lat && apiresponse?.lng && (
                <div className="mb-4">
                    <p>Latitude: {apiresponse.lat}</p>
                    <p>Longitude: {apiresponse.lng}</p>
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
                    zoom={zoom}
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
            <div className='h-10'></div>
            {apiresponse?.lat && apiresponse?.lng && <div style={{ height: '50vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: GOOGLE_API,
                        libraries: ['places'],
                        language: 'en',
                        region: 'us',
                        mapTypeId: 'terrain' // Change map type here ('terrain', 'roadmap', 'satellite', 'hybrid')
                    }} // Replace with your actual Google Maps API key
                    center={apiresponse}
                    defaultZoom={zoom}
                >
                    <CustomMarker
                        lat={apiresponse.lat}
                        lng={apiresponse.lng}
                        text={`${address}`}
                    />
                </GoogleMapReact>
            </div>}
        </div>
    );
};

export default GeocodeComponent;
