import React from 'react';
import { motion } from 'framer-motion';

const Image = ({ src, alt, type, className, id, onClick, toolTipId }) => {
    return (
        <motion.img
            id={id}
            data-tooltip-id={toolTipId}
            onClick={onClick}
            className={className}
            src={`/images/${src}.${type || 'svg'}`}
            alt={alt || src}
            loading='lazy'
        />
    );
};

export default Image;
