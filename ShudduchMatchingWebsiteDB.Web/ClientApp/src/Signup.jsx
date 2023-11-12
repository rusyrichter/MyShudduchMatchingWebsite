import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [isDuplicateUser, setIsDuplicateUser] = useState(false); 

    const isEmailValid = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };

    const onFormSubmit = async (e) => {
        e.preventDefault();

        if (!isEmailValid(email)) {
            alert('Invalid Email Address');
            return;
        }

        const { data } = await axios.post('/api/account/signup', { firstName, lastName, email, password });
        if (data) {
            setIsDuplicateUser(true);
        } else {
            navigate('/login');
        }
        
    };

    return (
        <div
            className="row"
            style={{
                minHeight: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow" style={{ background: "lightgray", color: "gray" }}>
                <h3 style={{ color: "gray" }}>Sign up for a new account</h3>
                <form onSubmit={onFormSubmit}>

                    {isDuplicateUser && (
                        <span style={{ color: "red" }}>This User already exists</span>
                    )}

                    <input
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className="form-control"
                        style={{ color: "grey" }}
                    />
                    <br />
                    <input
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className="form-control"
                        style={{ color: "gray" }}
                    />
                    <br />
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="text"
                        name="email"
                        placeholder="Email"
                        className="form-control"
                        style={{color: "gray" }}
                    />
                    <br />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control"
                        style={{color: "gray" }}
                    />
                    <br />
                    <button disabled={!password || !email || !lastName || !firstName } className="btn btn-primary" style={{ backgroundColor: "gray", color: "lightgray", border: 'white' }}>Signup</button>
                </form>
            </div>
            <div style={{ marginTop: '100px', textAlign: 'center' }}>
                <Link to={'/login'} style={{ color: 'grey', textDecoration: 'none' }}>
                    <span style={{ marginRight: '5px' }}>&#8592;</span>
                    Back to Login
                </Link>
            </div>
        </div>
    );
};

export default Signup;