import React from 'react';
import image from '../loader.json';
import LottieLoader from './Lottie';

export default function LoadingDot () {
    return (
        <LottieLoader
            animation={image}
            width="152px"
            className='absolute top-6 -left-7'
        />
    );
}
