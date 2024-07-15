/* eslint-disable no-new */
/* eslint-disable max-len */
import React, { useEffect } from 'react';

const MapLocator = ({ markers }) => {
    useEffect(() => {
        console.log(markers);
        const initMap = () => {
            if (!markers || markers.length === 0) return;

            // Create the map centered at the first marker's position
            const map = new window.google.maps.Map(document.getElementById('mapDiv'), {
                zoom: 15,
                center: { lat: Number(markers[0].latitude), lng: Number(markers[0].longitude) },
                mapTypeId: 'terrain' // Change map type here ('terrain', 'roadmap', 'satellite', 'hybrid')
            });

            // Add a marker for each location in the markers array
            markers.forEach(({ latitude, longitude, title }) => {
                new window.google.maps.Marker({
                    position: { lat: Number(latitude), lng: Number(longitude) },
                    map,
                    title: title || 'Marker'
                });
            });
        };

        // Call initMap when the Google Maps API is loaded
        window.initMap = initMap;
    }, [markers]);

    return (
        <>
            <div id="mapDiv" style={{ height: '400px', width: '100%', display: `${(markers) ? '' : 'none'}` }}></div>
        </>);
};

export default MapLocator;
