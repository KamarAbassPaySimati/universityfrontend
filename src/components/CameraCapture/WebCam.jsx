/* eslint-disable max-len */
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import Button2 from '../Button2/Button2';
import Button from '../Button/Button';
import { handleUpload } from '../S3Upload/S3Functions';
import { v4 as uuidv4 } from 'uuid';
import { dataURLtoFile } from '../../CommonMethods/dataURLtoFile';

export default function WebCam ({ handleStates, handleClose }) {
    const videoConstraints = {
        width: 1280,
        height: 600,
        facingMode: 'user'
    };
    const canvasRef = useRef(null);
    const [image, setImage] = React.useState(null);
    const [loading, setLoading] = useState(false);
    const webcamRef = React.useRef(null);
    const capture = React.useCallback(
        () => {
            setImage(webcamRef.current.getScreenshot());
        },
        [webcamRef]
    );

    const handleCapture = async () => {
        if (image) {
            setLoading(true);
            const fileName = `image-${uuidv4()}.jpeg`;
            const file = dataURLtoFile(image, fileName);
            const capture = await handleUpload(file, uuidv4());
            handleStates(`public/${capture.key}`, 'capture');
            handleClose();
            setLoading(false);
            setImage(null);
        }
    };

    return (
        <>
            <div className='mx-[200px] border rounded-lg border-[#000] capture-img'>
                {((image !== null)
                    ? <img src={image} alt="captured" />
                    : <div>
                        <Webcam audio={false} height={720} ref={webcamRef} screenshotFormat="image/src" width={1280} videoConstraints={videoConstraints} />
                    </div>

                )}
            </div>

            {<div className='flex justify-center mt-8'>
                {image !== null && <Button2
                    text={'Re-capture'}
                    onClick={() => setImage(null)}
                    testId={'re_capture_selfie'}
                    disabled={loading}
                    className={'border-primary-normal text-primary-normal py-2 px-[35px] h-10'}
                />}
                {<Button
                    text={image === null ? 'Capture' : 'Submit'}
                    testId= {image === null ? 'capture_selfie' : 'selfie_looks_good'}
                    className = 'max-w-[200px] h-10 ml-4 px-[51px]'
                    onClick={image === null ? capture : handleCapture}
                    isLoading={loading}
                    disabled={loading}
                />}
            </div>}
            <canvas ref={canvasRef} style={{ display: 'none' }} />

        </>

    );
}
