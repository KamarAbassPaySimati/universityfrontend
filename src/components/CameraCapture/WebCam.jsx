/* eslint-disable max-len */
import React from 'react';
import Webcam from 'react-webcam';
import Button2 from '../Button2/Button2';
import Button from '../Button/Button';
import { handleUpload } from '../S3Upload/S3Functions';

export default function WebCam ({ handleStates, handleClose }) {
    const videoConstraints = {
        width: 1280,
        height: 600,
        facingMode: 'user',
        'border-radius': '8px !important'
    };
    const [image, setImage] = React.useState(null);
    const webcamRef = React.useRef(null);
    const capture = React.useCallback(
        () => {
            setImage(webcamRef.current.getScreenshot());
        },
        [webcamRef]
    );
    const handleSubmit = async () => {
        console.log('submit');
        handleStates(await handleUpload(image), 'capture');
        handleClose();
        setImage(null);
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
                    className={'border-primary-normal text-primary-normal py-2 px-[35px] h-10'}
                />}
                {<Button
                    text={image === null ? 'Capture' : 'Submit'}
                    testId= 'submit_button'
                    className = 'max-w-[200px] h-10 ml-4 px-[51px]'
                    onClick={image === null ? capture : handleSubmit()}
                    isLoading={false}
                />}
            </div>}

        </>

    );
}
