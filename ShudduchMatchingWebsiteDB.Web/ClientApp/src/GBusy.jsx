import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './App.css';

const GBusy = () => {

    const { id } = useParams();
    const [nameOfOtherSide, setName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [homePhone, setHomePhone] = useState('');
    const [cellPhone, setCellPhone] = useState('');
    const [comments, setComments] = useState('');
    const [saidYes, setSaidYes] = useState(false);
    const [gotAYes, setGotAYes] = useState(false);
    const [amountOfTimesWentOut, setAmountOfTimesWentOut] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');


    useEffect(() => {
        onloadConfirmed();
        onloadConfirmed2();
    }, []);


    const onloadConfirmed = async () => {
        const { data } = await axios.get(`/api/shudduchmatchinggirl/getBusy?girlid=${id}`);
        setName(data.nameOfOtherSide);
        setHomePhone(data.homePhone)
        setCellPhone(data.cellPhone);
        setComments(data.comments);
        setEmailAddress(data.emailAddress);
        setSaidYes(data.saidYes);
        setGotAYes(data.gotAYes)
        setAmountOfTimesWentOut(data.amountOfTimesWentOut)
    };

    const onloadConfirmed2 = async () => {
        const { data } = await axios.get(`/api/shudduchMatchinggirl/getgirlbyid?id=${id}`);
        setFirstName(data.firstName);
        setLastName(data.lastName);
    }

    const onSaidYesChange = async () => {
        setSaidYes(!saidYes);
    }

    const onGotAYesChange = async () => {
        setGotAYes(!gotAYes);
    }

    const onEditClick = () => {
        setEditMode(true);
    }
    const onCancelClick = () => {
        setEditMode(false);
        onloadConfirmed();
    }

    const onUpdateClick = async () => {
        await axios.post('/api/shudduchMatchinggirl/updateBusyInfo', {
            nameOfOtherSide,
            emailAddress,
            homePhone,
            cellPhone,
            comments,
            saidYes,
            gotAYes,
            amountOfTimesWentOut,
            girlid: id
        });
        setEditMode(false);
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
    return (

        <>
            <div style={cardStyle}>
                <h1 style={{ color: 'grey' }}> {firstName} {lastName} is Busy</h1>
            </div>

        <div className="pretty-table">
            <table className="table table-striped mt-5 table-bordered" style={{ background: 'white' }}>
                <thead>
                    <tr>
                        <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Name Of Other Side</th>
                        <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Parents Email Address</th>
                        <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Home Phone</th>
                        <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Cell Phone</th>
                        <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Comments after date {amountOfTimesWentOut}</th>
                        <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Said Yes</th>
                        <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Got A Yes</th>
                        <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Amount of Times Went Out</th>
                        <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Edit</th>
                       
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                            {editMode ? (
                                <input
                                    className="form-control"
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                    value={nameOfOtherSide}
                                    placeholder="Name"
                                />
                            ) : (
                                nameOfOtherSide
                            )}
                        </td>

                        <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                            {editMode ? (
                                <input
                                    className="form-control"
                                    type="text"
                                    onChange={(e) => setEmailAddress(e.target.value)}
                                    value={emailAddress}
                                    placeholder="Email Address"
                                />
                            ) : (
                                emailAddress
                            )}
                        </td>

                        <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                            {editMode ? (
                                <input
                                    className="form-control"
                                    type="text"
                                    onChange={(e) => setHomePhone(e.target.value)}
                                    value={homePhone}
                                    placeholder="Home Phone"
                                />
                            ) : (
                                homePhone
                            )}
                        </td>

                        <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                            {editMode ? (
                                <input
                                    className="form-control"
                                    type="text"
                                    onChange={(e) => setCellPhone(e.target.value)}
                                    value={cellPhone}
                                    placeholder="Cell Phone"
                                />
                            ) : (
                                cellPhone
                            )}
                        </td>

                        <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                            {editMode ? (
                                <textarea
                                    rows={4}
                                    value={comments}
                                    onChange={(e) => setComments(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        resize: 'none',
                                        border: 'none',
                                        background: 'url("https://example.com/path-to-linpaper.png")',
                                        color: 'black',
                                        backgroundColor: 'white'
                                    }}
                                    placeholder="Comments"
                                />
                            ) : (
                                comments
                            )}
                        </td>

                        <td>
                            <input
                                style={{
                                    backgroundColor:saidYes ? 'lightgrey' : 'white',
                                    border: saidYes? '1px solid grey' : '1px solid transparent'
                                }}
                                className="form-check-input custom-checkbox"
                                type="checkbox"
                                onChange={onSaidYesChange}
                                checked={saidYes}
                            />
                        </td>

                        <td>
                            <input
                                style={{
                                    backgroundColor: gotAYes ? 'lightgrey' : 'white',
                                    border: gotAYes ? '1px solid grey' : '1px solid transparent'
                                }}
                                className="form-check-input custom-checkbox"
                                type="checkbox"
                                onChange={onGotAYesChange}
                                checked={gotAYes}
                            />
                        </td>

                        <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                            {editMode ? (
                                <input
                                    className="form-control"
                                    type="number"
                                    onChange={(e) => setAmountOfTimesWentOut(e.target.value)}
                                    value={amountOfTimesWentOut}
                                />
                            ) : (
                                amountOfTimesWentOut
                            )}
                        </td>
                        <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                            <button
                                style={{ fontSize: '24px', padding: '5px 10px', marginBottom: '5px' }}
                                className="btn btn-light"
                                onClick={editMode ? onUpdateClick : onEditClick}
                            >
                                {editMode ? 'Update' : 'Edit'}
                            </button>
                            {editMode && (
                                <button
                                    style={{ fontSize: '24px', padding: '5px 10px', marginTop: '5px' }}
                                    className="btn btn-light"
                                    onClick={onCancelClick}
                                >
                                    Cancel
                                </button>
                            )}
                        </td>
                       
                    </tr>

                </tbody>
            </table>
            <div style={{ marginTop: '200px', textAlign: 'center' }}>
                <Link to={'/girl'} style={{ color: 'grey', textDecoration: 'none' }}>
                    <span style={{ marginRight: '5px' }}>&#8592;</span>
                    Back to Girls
                </Link>
            </div>
           
            </div>
        </>
    );

   
}

export default GBusy