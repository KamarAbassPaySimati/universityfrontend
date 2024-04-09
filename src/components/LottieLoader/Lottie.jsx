import React from 'react';
import Lottie from 'lottie-react';

export default function LottieLoader ({
    animation,
    width,
    height,
    className
}) {
    return (
        <Lottie
            animationData={animation}
            loop={true}
            style={{ width, height }}
            className={className}
        />
    );
}
