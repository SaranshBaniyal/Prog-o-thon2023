import React, { useRef, useState, useContext } from 'react';
import Webcam from 'react-webcam';
import { context } from '..';
const videoConstraints = {
    width: 300,
    facingMode: 'environment',
};

const Camera = () => {
    const { img, setImg } = useContext(context);

    const webcamRef = useRef(null);

    const [url, setUrl] = useState(null);

    const capturePhoto = async () => {
        const imgSrc = webcamRef.current.getScreenshot();
        console.log(imgSrc);
        if (imgSrc.startsWith('data:image/')) {
            const parts = imgSrc.split(',');

            if (parts.length === 2) {
                const base64Data = parts[1];
                setImg(base64Data)
                console.log(img);
            } else {
                console.error('Invalid data URL format');
            }
        } else {
            console.error('Not a data URL');
        }
    };

    const onUserMedia = (e) => {
        console.log(e);
    };

    return (
        <>
            <Webcam
                ref={webcamRef}
                screenshotFormat='image/png'
                videoConstraints={videoConstraints}
                mirrored={true}
                onUserMedia={onUserMedia}
            />
            <button onClick={capturePhoto}>Capture</button>
            <button onClick={() => setUrl(null)}>Refresh</button>

            {url && (
                <div>
                    <img src={url} alt='screenshot' />
                </div>
            )}
        </>
    );
};

export default Camera;
