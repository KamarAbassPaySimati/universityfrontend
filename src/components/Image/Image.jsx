import React from 'react';
import { motion } from 'framer-motion';

const Image = ({ src, alt, type, className, onClick }) => {
    return (
        <motion.img
            onClick={onClick}
            className={className}
            src={`/images/${src}.${type || 'svg'}`}
            alt={alt || src}
            loading='lazy'
        />
    );
};

export default Image;
