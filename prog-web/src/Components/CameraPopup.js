import React, { useContext, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './CameraPopup.css'; // Add your styling here
import { context } from '..';

const CameraPopup = ({ onClose, onSubmit }) => {
    const webcamRef = useRef(null);
    const { img, setImg, names, setNames, isReg, setIsReg, emails, setEmails } = useContext(context);
    const [imageSrc, setImageSrc] = useState(null);

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        // console.log(img)
        setImageSrc(imageSrc);
    };

    const handleSubmit = () => {
        onSubmit(imageSrc);
        setImg(imageSrc);
        onClose();
    };

    const handleReset = () => {
        setImageSrc(null);
    };

    return (
        <div className="camera-popup">
            <div className="camera-popup-content">
                {!imageSrc && 
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width="100%"
                />}
                {imageSrc && <img src={imageSrc} alt="Captured" />}
                <div>
                {!imageSrc && <button onClick={capture}>Capture Photo</button>}
                {imageSrc && (
                    <>
                        <button onClick={handleSubmit}>Submit</button>
                        <button onClick={handleReset}>Reset</button>
                    </>
                )}
                <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default CameraPopup;
