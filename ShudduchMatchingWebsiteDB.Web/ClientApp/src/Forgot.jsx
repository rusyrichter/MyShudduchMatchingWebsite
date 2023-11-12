import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContextComponent';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


    const Forgot = () => {
        const [email, setEmail] = useState('');
        const [message, setMessage] = useState('');
        const [isSent, setIsSent] = useState(false); 

        const sendPasswordResetEmail = async () => {
            const token = generateRandomToken();
            const experationTime = Date.now() + 3600000;

            await axios.post(`/api/account/updateUser`, {
                email,
                experationTime,
                token
            });
           

            try {              
                const response = await fetch('/api/account/forgotPassword', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email, ResetLink: `http://localhost:3000/changepassword/${token}` })
                });

                if (response.ok) {
                    setMessage('Email sent. Please check your inbox for a reset link.');
                    setIsSent(true);
     
                } else {
                    setMessage('There was a problem sending the reset link. Please try again.');
                    setIsSent(true);
                }
            } catch (error) {
                setMessage('There was an error connecting to the server.');
                console.error('Error sending password reset email', error);
            }
        };

        const generateRandomToken = () => {
            return uuidv4();
        }
    return (
        <div className="row" style={{ marginTop: "200px" }}>

            {!!isSent && 
                <div className="row" style={{ marginTop: "75px" }}>
                    <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow" style={{ background: "lightgrey", justifyContent: "center", alignContent: "center" }}>
                        <div style={{ textAlign: "center", color: "#333" }}>{message}</div>
                    </div>
                </div>
            }
            {
                !!isSent && <div style={{ marginTop: '100px', textAlign: 'center' }}>
                    <Link to={'/login'} style={{ color: 'grey', textDecoration: 'none' }}>
                        <span style={{ marginRight: '5px' }}>&#8592;</span>
                        Back to Login
                    </Link>
                </div>
            }
            { !isSent && 
                <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow" style={{ background: "lightgray", color: "gray", justifyContent: "center", alignContent: "center" }}>
                    <h3 style={{ color: "gray" }}>Forgot Password</h3>
                    <p>Enter your user name and we'll send you a password reset link. </p>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <input
                            type="text"
                            placeholder="User Name"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ padding: "10px", margin: "10px 0", color: "darkgray" }}
                        />
                        <button
                            onClick={sendPasswordResetEmail}
                            style={{ padding: "10px", margin: "10px 0", color: 'grey', border: "none", cursor: "pointer" }}
                        >
                            Send Reset Link
                        </button>
                        <Link
                            to="/login"
                            style={{ padding: "10px", margin: "10px 0", color: 'grey', textAlign: "center", textDecoration: "none" }}
                        >
                            Back to Login
                        </Link>
                    </div>
                </div>
            }

           
        </div>
    );
};

export default Forgot;