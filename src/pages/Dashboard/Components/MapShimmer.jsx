import React from 'react';

const MapShimmer = () => {
    const shimmerKeyframes = `
        @keyframes shimmerAnimation {
            0% {
                background-position: -200% 0;
            }
            100% {
                background-position: 200% 0;
            }
        }
    `;

    const shimmerContainerStyle = {
        height: '350px',
        width: '100%',
        position: 'relative',
        overflow: 'hidden'
    };

    const shimmerMapStyle = {
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to right, transparent 0%, #eeececf3 50%, transparent 100%)',
        backgroundSize: '200% 100%',
        animation: 'shimmerAnimation 1.5s infinite linear'
    };

    return (
        <div style={shimmerContainerStyle}>
            <style>{shimmerKeyframes}</style>
            <div style={shimmerMapStyle}></div>
        </div>
    );
};

export default MapShimmer;
