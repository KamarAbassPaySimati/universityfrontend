import React from 'react';

const GraphShimmer = () => {
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

    const shimmerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 60px 12px 60px',
        gap: '50px'
    };

    const shimmerElementStyle = {
        width: '200px',
        height: '200px',
        padding: '10px',
        background: 'linear-gradient(to right, transparent 0%, #eeececf3 50%, transparent 100%)',
        backgroundSize: '200% 100%',
        animation: 'shimmerAnimation 1.5s infinite linear'
    };

    return (
        <div>
            <style>{shimmerKeyframes}</style>
            <div style={shimmerStyle}>
                <div style={shimmerElementStyle}></div>
                <div style={shimmerElementStyle}></div>
                <div style={shimmerElementStyle}></div>
                <div style={shimmerElementStyle}></div>
                <div style={shimmerElementStyle}></div>
                <div style={shimmerElementStyle}></div>
                <div style={shimmerElementStyle}></div>
                <div style={shimmerElementStyle}></div>

            </div>
        </div>
    );
};

export default GraphShimmer;
