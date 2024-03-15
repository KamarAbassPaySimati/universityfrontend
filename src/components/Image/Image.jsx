import React from 'react';
import { motion } from 'framer-motion';

const Image = ({ src, alt, type, className }) => {
    return (
        <motion.img
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={`/images/${src}.${type || 'svg'}`}
            alt={alt || src}
            loading='lazy'
        />
    );
};

export default Image;
