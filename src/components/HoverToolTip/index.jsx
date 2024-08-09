import React from 'react';
import { Tooltip } from 'react-tooltip';

export default function HoverToolTip ({ id }) {
    return (
        <div>
            <Tooltip
                id={id}
                className='my-tooltip z-30'
                place="top"
                content="Export"
            />
        </div>
    );
}
