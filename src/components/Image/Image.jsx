import React from 'react';
import { motion } from 'framer-motion';

const Image = ({ src, alt, type, className, id, onClick, toolTipId, testId, cdnImg }) => {
    return (
        <motion.img
            id={id}
            data-testid={testId}
            data-tooltip-id={toolTipId}
            onClick={onClick}
            className={className}
            src={cdnImg ? `${src}` : `/images/${src}.${type || 'svg'}`}
            alt={alt || src}
            loading='lazy'
        />
    );
};

export default Image;
