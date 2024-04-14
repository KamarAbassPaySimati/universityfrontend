import React from 'react';
import { Modal } from 'react-responsive-modal';

export default function IframeModal ({ isOpen, handleClose, link }) {
    return (
        <Modal center open={isOpen} closeIcon={<div style={{ color: 'white' }} disabled></div>}>
            <iframe src="https://via.placeholder.com/500"
                allowfullscreen
                sandbox='allow-scripts allow-modal'
                loading='lazy'
                title='Custom title' >
            </iframe>
        </Modal>
    );
}
