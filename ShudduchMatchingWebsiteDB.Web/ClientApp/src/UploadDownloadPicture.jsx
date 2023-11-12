import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './App.css';

const UploadDownloadPicture = () => {
    const { id } = useParams();
    const [noPictureUploaded, setNoPictureUploaded] = useState(true);
    const fileRef = useRef(null);
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        loadConfirmed();
        loadConfirmed2();
    }, []);

    const loadConfirmed = async () => {
        const { data } = await axios.get(`/api/shudduchMatching/getPictureDownloaded?boyid=${id}`);
        if (data) {
            console.log(data);
            setNoPictureUploaded(false);
        } else {
            setNoPictureUploaded(true);
        }
    }

    const loadConfirmed2 = async () => {
        const { data } = await axios.get(`/api/shudduchMatching/getBoyById?id=${id}`);
        setFirstName(data.firstName);
    };


    const onUploadPictureClick = async () => {
        const file = fileRef.current.files[0];
        const base64 = await toBase64(file);
        await axios.post('/api/shudduchMatching/uploadPicture', { base64, name: file.name, boyid: id });
        setNoPictureUploaded(false);
    }

    const onUploadAnotherPicture = async () => {
        const { data } = await axios.get(`/api/shudduchMatching/getPictureDownloaded?boyid=${id}`);
        const name = data;
        await axios.post('/api/shudduchMatching/deletePictureupload', { boyid: id, name });
        setNoPictureUploaded(true);
    }
    const onDownloadPictureClick = async () => {
        if (!noPictureUploaded) {
            const { data } = await axios.get(`/api/shudduchMatching/getPictureDownloaded?boyid=${id}`);
            window.location.href = `/api/shudduchMatching/downloadPicture?pictureName=${data}`;
        } else {
            const file = fileRef.current.files[0];
            window.location.href = `/api/shudduchMatching/downloadPicture?pictureName=${file.name}`;

        }
    }


    const cardStyle = {
        textAlign: 'center',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ddd',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        padding: '20px',
        margin: '0 auto',
        width: '65%',
        marginTop: '5px'
    };

    const toBase64 = file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }


    return (
        <>
            <div style={cardStyle}>
                <h1 style={{ color: 'grey' }}>Download or Upload {firstName}'s Picture</h1>
            </div>

            <div style={{ ...cardStyle, padding: '20px', marginTop: '20px', marginBottom: '20px' }} className='row'>
                {noPictureUploaded ? (
                    <>
                        <div className='col-md-6'>
                            <input ref={fileRef} type='file' className='form-control' />
                        </div>
                        <div className='col-md-6' style={{ marginRight: '10px' }}>
                            <button className='btn btn-light mt-4' onClick={onUploadPictureClick}>Upload Picture</button>
                        </div>
                    </>
                ) : (
                    <div>


                        <div className='col-md-6' style={{ marginRight: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <button className='btn btn-light mt-4' onClick={onDownloadPictureClick}>Download Picture</button>
                        </div>
                        <div className='col-md-6' style={{ marginRight: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <button className='btn btn-light mt-4' onClick={onUploadAnotherPicture}>Upload Another Picture</button>
                        </div>
                       
                    </div>

                        
            

                )}
                
                          
            </div>

            <div style={{ marginTop: '300px', textAlign: 'center' }}>
                <Link to={`/addtionalInfo/${id}`} style={{ color: 'grey', textDecoration: 'none' }}>
                    <span style={{ marginRight: '5px' }}>&#8592;</span>
                         Back to Additional information for {firstName}
                </Link>
            </div>
        </>
    );
}

export default UploadDownloadPicture;