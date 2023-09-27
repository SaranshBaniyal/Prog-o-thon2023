import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
    width: 300,
    facingMode: 'environment',
};

const Camera = () => {
    const webcamRef = useRef(null);

    const [url, setUrl] = useState(null);

    const capturePhoto = async () => {
        const imgSrc = webcamRef.current.getScreenshot();
        setUrl(imgSrc)
        console.log(imgSrc);
        // Send the captured image to the server
        // const response = await fetch('/upload', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ base64Image: imgSrc }),
        // });
        // // console.log();

        // if (response.status === 200) {
        //     // Image uploaded successfully
        //     setUrl(imgSrc);
        // } else {
        //     // Handle any error that occurs during the upload process
        //     console.error('Error uploading image');
        // }
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
