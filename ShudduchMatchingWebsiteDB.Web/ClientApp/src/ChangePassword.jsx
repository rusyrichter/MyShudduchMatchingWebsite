import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './App.css';

const ChangePassword = () => {
    const { token } = useParams();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [passwordChanged, setPasswordChanged] = useState(false);

    const onSubmitClick = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
        } else {
            await axios.post(`/api/account/updatePassword`,{
                token,
                password
            })
            setPasswordChanged(true);
        }
    };

    return (
        <div className="row" style={{ marginTop: "200px" }}>
            {!!passwordChanged &&
                <div className="row" style={{ marginTop: "75px" }}>
                    <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow" style={{ background: "lightgrey", justifyContent: "center", alignContent: "center" }}>
                        <div style={{ textAlign: "center", color: "#333" }}>"Password Updated Successfully"</div>
                    </div>
                </div>
            }

            {
                !!passwordChanged && <Link
                    to="/login"
                    style={{ padding: "10px", margin: "10px 0", color: 'grey', textAlign: "center", textDecoration: "none" }}
                >
                    Back to Login
                </Link>
            }
            
            {
                !passwordChanged && 
                <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow" style={{ background: "lightgray", color: "gray", justifyContent: "center", alignContent: "center" }}>
                    <h3 style={{ color: "gray" }}>Reset Password</h3>
                    <form onSubmit={onSubmitClick}>
                        <p>Enter a new password</p>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ padding: "10px", margin: "10px 0", color: "lightgray" }}
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                style={{ padding: "10px", margin: "10px 0", color: "lightgray" }}
                            />
                            {error && <p style={{ color: "red" }}>{error}</p>}
                            <button
                                type="submit"
                                style={{ padding: "10px", margin: "10px 0", color: 'grey', border: "none", cursor: "pointer" }}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                    <Link
                        to="/login"
                        style={{ padding: "10px", margin: "10px 0", color: 'grey', textAlign: "center", textDecoration: "none" }}
                    >
                        Back to Login
                    </Link>
                </div>
            }
           
        </div>
    );
};

export default ChangePassword;