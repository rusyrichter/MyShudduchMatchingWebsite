import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './App.css';

const AdditionalInfoGirls = () => {

    const { id } = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [lookingFor, setLookingFor] = useState("");
    const [personality, setPersonality] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const fileRef = useRef(null);
    const [nothingUploaded, setNothingUploaded] = useState(true);
    const [lookingForeditMode, setLookingForEditMode] = useState(false);
    const [personalityEditMode, setPersonalityEditMode] = useState(false);
    const [contactInfoEditMode, setContactInfoEditMode] = useState(false);

    useEffect(() => {
        loadConfirmed();
        loadConfirmed2();
    }, []);

    const loadConfirmed = async () => {
        const { data } = await axios.get(`/api/shudduchMatchingGirl/getGirlById?id=${id}`);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        { data.lookingFor ? setLookingFor(data.lookingFor) : setLookingFor("") }
        { data.personality ? setPersonality(data.personality) : setPersonality("") }
        { data.contactInfo ? setContactInfo(data.contactInfo) : setContactInfo("") }


    };
    const loadConfirmed2 = async () => {
        const { data } = await axios.get(`/api/shudduchMatchingGirl/getFileDownloaded?girl=${id}`);
        if (data) {
            setNothingUploaded(false);
        } else {
            setNothingUploaded(true);
        }
    }

    const onEditMode = (string) => {
        if (string === 'lookingFor') {
            setLookingForEditMode(true);
        }
        if (string === 'personality') {
            setPersonalityEditMode(true);
        }
        if (string === 'contactInfo') {
            setContactInfoEditMode(true);
        }
    }

    const onCancelClick = (string) => {
        if (string === 'lookingFor') {
            setLookingForEditMode(false);
        }
        if (string === 'personality') {
            setPersonalityEditMode(false);
        }
        if (string === 'contactInfo') {
            setContactInfoEditMode(false);
        }
        loadConfirmed();
    }
    const onUpdateClick = async (string) => {

        await axios.post('/api/shudduchMatchingGirl/updateAdditionalInfo', {
            lookingFor,
            personality,
            contactInfo,
            id
        });
        if (string === 'lookingFor') {
            setLookingForEditMode(false);
        }
        if (string === 'personality') {
            setPersonalityEditMode(false);
        }
        if (string === 'contactInfo') {
            setContactInfoEditMode(false);
        }
    }

    const onUploadClick = async () => {
        const file = fileRef.current.files[0];
        const base64 = await toBase64(file);
        await axios.post('/api/shudduchMatchingGirl/upload', { base64, name: file.name, girl: id });
        setNothingUploaded(false);
    }



    const onUploadAnotherResume = async () => {
        const { data } = await axios.get(`/api/shudduchMatchingGirl/getFileDownloaded?girl=${id}`);
        const name = data;
        await axios.post('/api/shudduchMatchingGirl/deleteupload', { girl: id, name });
        setNothingUploaded(true);
    }


    const onDownloadClick = async () => {
        loadConfirmed2();
        if (!nothingUploaded) {
            const { data } = await axios.get(`/api/shudduchMatchingGirl/getFileDownloaded?girl=${id}`);
            window.location.href = `/api/shudduchMatchingGirl/download?fileName=${data}`;
        } else {
            const file = fileRef.current.files[0];
            window.location.href = `/api/shudduchMatchingGirl/download?fileName=${file.name}`;
        }
    }

    const toBase64 = file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const cardStyle = {
        textAlign: 'center',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ddd',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        padding: '20px',
        margin: '0 auto',
        width: '50%',
        marginTop: '5px'
    };

    const lookingForCardStyle = {
        textAlign: 'center',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ddd',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        padding: '20px',
        margin: '20px auto',
        width: '50%',
    };

    return (
        <>
            <div style={cardStyle}>
                <h1 style={{ color: 'grey' }}>Additional Information for {firstName} {lastName}</h1>
            </div>
            <div style={lookingForCardStyle}>
                <h5 style={{ color: 'grey' }}>Looking For</h5>

                {lookingForeditMode ? (
                    <div>
                        <textarea
                            rows={4}
                            value={lookingFor}
                            onChange={(e) => setLookingFor(e.target.value)}
                            style={{ width: '100%', padding: '10px', resize: 'none', border: '1px solid grey', color: 'black', backgroundColor: 'white', backgroundSize: 'cover' }}
                            placeholder="Enter what you're looking for">
                        </textarea>
                        <button
                            onClick={() => onUpdateClick('lookingFor')}
                            className="btn btn-light mt-4"
                            style={{ color: 'grey', fontSize: '12px', width: '100%', height: '30px', maxWidth: '200px', marginRight: '10px' }}
                        >
                            Save Changes

                        </button>
                        <button
                            onClick={() => onCancelClick('lookingFor')}
                            className="btn btn-light mt-4"
                            style={{ color: 'grey', fontSize: '12px', width: '100%', height: '30px', maxWidth: '200px', }}>
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {lookingFor == "" ? (
                            <p style={{ color: 'grey' }}> No information entered yet</p>
                        ) : (
                            <p style={{ color: 'grey' }}> {lookingFor}</p>
                        )}


                        <button
                            onClick={() => onEditMode('lookingFor')}
                            className="btn btn-light mt-2"
                            style={{ color: 'grey', fontSize: '12px', width: '100%', height: '30px', maxWidth: '200px', }}>
                            {lookingFor == "" ? 'Add' : 'Edit'}
                        </button>

                    </div>
                )}
            </div>

            <div style={lookingForCardStyle}>
                <h5 style={{ color: 'grey' }}>Personality</h5>

                {personalityEditMode ? (
                    <div>
                        <textarea
                            rows={4}
                            value={personality}
                            onChange={(e) => setPersonality(e.target.value)}
                            style={{ width: '100%', padding: '10px', resize: 'none', border: '1px solid grey', color: 'black', backgroundColor: 'white', backgroundSize: 'cover' }}
                            placeholder="Enter Personality">
                        </textarea>
                        <button
                            onClick={() => onUpdateClick('personality')}
                            className="btn btn-light mt-4"
                            style={{ color: 'grey', fontSize: '12px', width: '100%', height: '30px', maxWidth: '200px', marginRight: '10px' }}>
                            Save Changes
                        </button>
                        <button
                            onClick={() => onCancelClick('personality')}
                            className="btn btn-light mt-4"
                            style={{ color: 'grey', fontSize: '12px', width: '100%', height: '30px', maxWidth: '200px', }}>
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {personality == "" ? (
                            <p style={{ color: 'grey' }}> No information entered yet</p>
                        ) : (
                            <p style={{ color: 'grey' }}> {personality}</p>
                        )}

                        <button
                            onClick={() => onEditMode('personality')}
                            className="btn btn-light mt-2"
                            style={{ color: 'grey', fontSize: '12px', width: '100%', height: '30px', maxWidth: '200px', }}>
                            {personality == "" ? 'Add' : 'Edit'}
                        </button>
                    </div>
                )}
            </div>
            <div style={lookingForCardStyle}>
                <h5 style={{ color: 'grey' }}>Contact Info</h5>

                {contactInfoEditMode ? (
                    <div>
                        <textarea
                            rows={4}
                            value={contactInfo}
                            onChange={(e) => setContactInfo(e.target.value)}
                            style={{ width: '100%', padding: '10px', resize: 'none', border: '1px solid grey', color: 'black', backgroundColor: 'white', backgroundSize: 'cover' }}
                            placeholder="Enter contact Information">
                        </textarea>
                        <button
                            onClick={() => onUpdateClick('contactInfo')}
                            className="btn btn-light mt-4"
                            style={{ color: 'grey', fontSize: '12px', width: '100%', height: '30px', maxWidth: '200px', marginRight: '10px' }}>
                            Save Changes
                        </button>
                        <button
                            onClick={() => onCancelClick('contactInfo')}
                            className="btn btn-light mt-4"
                            style={{ color: 'grey', fontSize: '12px', width: '100%', height: '30px', maxWidth: '200px', }}>
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {contactInfo == "" ? (
                                <p style={{ color: 'grey' }}> No information entered yet</p>
                            ) : (
                                <p style={{ color: 'grey' }}> {contactInfo}</p>
                            )}

                            <button
                                onClick={() => onEditMode('contactInfo')}
                                className="btn btn-light mt-2"
                                style={{ color: 'grey', fontSize: '12px', width: '100%', height: '30px', maxWidth: '200px', }}>
                                {contactInfo == "" ? 'Add' : 'Edit'}
                            </button>
                        </div>

                    </div>
                )}
            </div>

            <div style={{ marginRight: '15px' }}></div>

            <div style={cardStyle}>
                <Link to={`/addViewReferencesGirl/${id}`} type="button" className="btn btn-light mt-4"> Add/View References </Link>
            </div>


            <div style={{ ...cardStyle, padding: '20px', marginTop: '20px', marginBottom: '20px' }} className='row'>
                {nothingUploaded ? (
                    <>
                        <div className='col-md-6'>
                            <input ref={fileRef} type='file' className='form-control' />
                        </div>
                        <div className='col-md-6' style={{ marginRight: '10px' }}>
                            <button className='btn btn-light mt-4' onClick={onUploadClick}>Upload Resume</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='col-md-6' style={{ marginRight: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <button className='btn btn-light mt-4' onClick={onDownloadClick}>Download {firstName}'s Resume</button>
                        </div>
                        <div className='col-md-6' style={{ marginRight: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <button className='btn btn-light mt-4' onClick={onUploadAnotherResume}>Upload Another Resume</button>
                        </div>
                    </>
                )}
            </div>

            <div style={{ ...cardStyle, padding: '20px', marginTop: '20px', marginBottom: '20px' }} className='row'>
                <Link to={`/GirluploadDownloadPicture/${id}`} type="button" className="btn btn-light mt-4">Download or Upload {firstName}'s Picture</Link>
            </div>

            <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <Link to={'/girl'} style={{ color: 'grey', textDecoration: 'none' }}>
                    <span style={{ marginRight: '5px' }}>&#8592;</span>
                    Back to Girls
                </Link>
            </div>

        </>
    );

}
export default AdditionalInfoGirls;