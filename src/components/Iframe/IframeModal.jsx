import React from 'react';
import { Modal } from 'react-responsive-modal';
import { CDN } from '../../config';
import FullScreenImage from '../FullScreenImage/FullScreenImage';

export default function IframeModal ({ isOpen, handleClose, link, labelValue }) {
    // useEffect(() => {
    //     const handleContextMenu = (event) => {
    //         if (event.target) {
    //             event.preventDefault();
    //             alert('Context menu is not allowed');
    //         }
    //     };

    //     document.addEventListener('contextmenu', handleContextMenu);

    //     return () => {
    //         document.removeEventListener('contextmenu', handleContextMenu);
    //     };
    // }, [isOpen]);
    const imageTypes = ['png', 'jpeg', 'jpg'];
    return (
        <>
            {!imageTypes.includes(link?.split('.')[link?.split('.').length - 1])
                ? <Modal center open={isOpen} onClose={handleClose} closeIcon={<div style={{ color: 'white' }} disabled></div>}>
                    <div className='w-[700px] h-fit'>
                        <iframe src={`${CDN}${link}` + '#toolbar=0'}
                            type="application/pdf"
                            height={600}
                            width={700}
                            id='embed'
                        >
                        </iframe>
                        {/* <embed
                    src={`${CDN}${link}` + '#toolbar=0'}
                    type="application/pdf"
                    height={600}
                    width={700}
                    id='embed'
                /> */}
                        {/* <Document
                    file={`https://dev-cdn.paymaart.net/public/${link}`}
                    onContextMenu={(e) => e.preventDefault()}
                    className="pdf-container"
                >
                    <Page pageNumber={1} />
                </Document> */}
                    </div>

                    {/* <iframe src="https://dev-cdn.paymaart.net/public/undefined/front/dummy.pdf"
                width="800" height="600"></iframe> */}

                </Modal>
                : (isOpen &&
                    <FullScreenImage
                        labelValue={labelValue}
                        onClose={handleClose}
                        imagevalue={`${CDN}${link}`}
                        cdnImg
                    />
                )
            }
        </>
    );
}
