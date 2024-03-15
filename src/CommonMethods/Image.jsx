import React from 'react';
import { motion } from 'framer-motion';

const Image = ({ src, alt, type }) => {
    return (
        <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={`/images/${src}.svg`}
            alt={alt}
            loading='lazy'
        />
    );
};

export default Image;