import React, { useRef, useState, useContext } from 'react';
import Webcam from 'react-webcam';
import { context } from '..';
import axios from 'axios';
// import { context } from '..';
const videoConstraints = {
    width: 500,
    facingMode: 'environment',
};

const Camera = () => {
    const { img2, succeeded, setSuccess, setImg2, emails, setEmails } = useContext(context);

    const webcamRef = useRef(null);

    const [url, setUrl] = useState(null);
    const [dist, setDist] = useState();
    const [pass, setPass] = useState(false);
    const capturePhoto = async () => {

        const imgSrc = webcamRef.current.getScreenshot();
        console.log(imgSrc);
        setUrl(imgSrc)
        // Check if imgSrc is a data URL
        if (imgSrc.startsWith('data:image/')) {
            // Split the data URL at the comma to separate the metadata and the Base64 data
            const parts = imgSrc.split(',');

            if (parts.length === 2) {
                // The Base64 data is in parts[1]
                const base64Data = parts[1];
                setImg2(base64Data)
                console.log(img2);
                // Now, you can use base64Data as needed
                // For example, you can display it in an image element
                // document.getElementById('myImage').src = imgSrc;
            } else {
                console.error('Invalid data URL format');
            }
        } else {
            console.error('Not a data URL');
        }
    };
    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://057a-220-158-168-162.ngrok-free.app/api/faceid/', {
                email: emails,
                image_base64: img2
            })
            console.log(response.data);
            alert(response.data.result[0]);
            // alert('Face % is ', )
            setDist(response.data.face_distance[0]);
            // if(response)
            if (response.data.result[0] == true) {
                setSuccess(true)
            }
            // alert(response.face_distance)
        } catch (error) {
            console.error(error);
        }
    }
    const onUserMedia = (e) => {
        console.log(e);
    };

    return (
        <div className='camera'>
            <Webcam
                ref={webcamRef}
                screenshotFormat='image/png'
                videoConstraints={videoConstraints}
                mirrored={true}
                onUserMedia={onUserMedia}
                className='imgss'
            />
            <div className='btnss'>
                <button onClick={capturePhoto} className='btn12'>Capture</button>
                <button onClick={() => setUrl(null)} className='btn12'>Refresh</button>
            </div>

            {url && (
                <div className='imgss'>
                    <img src={url} alt='screenshot' />
                </div>
            )}
            <h1>{dist}</h1>
            {url && <button onClick={submit} className='btn12'>Verify Face</button>}
            {succeeded && <h1>Your face is verified , click below to vote for your favourite contestant</h1>}
        </div>
    );
};

export default Camera;
