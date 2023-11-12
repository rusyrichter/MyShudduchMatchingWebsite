import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContextComponent';



const Login = () => {
    const { setUser } = useAuth();

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValidLogin] = useState(true);

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.post('/api/account/login', { email, password });
        const isValid = !!data;
        setIsValidLogin(isValid);
        if (isValid) {
            navigate('/');
            setUser(data);
        }
    };

    return (
        <div
            className="row"
            style={{marginTop: "200px"} }
        >
            <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow" style={{ background: "lightgray", color: "gray", justifyContent: "center", alignContent: "center" }}>
                {isValid ? null : <span className='text-danger'>Invalid username/password. Please try again.</span>}
                <h3 style={{ color: "gray" }}>Log in to your account</h3>
                <form onSubmit={onFormSubmit}>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="text"
                        name="email"
                        placeholder="Email"
                        className="form-control"
                        style={{ backgroundColor: "lightgray", color: "gray" }}
                    />
                    <br />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control"
                        style={{ backgroundColor: "lightgray", color: "gray" }}
                    />
                    <br />
                    <button className="btn btn-primary" style={{ backgroundColor: "gray", color: "lightgray", border: 'white' }}>Login</button>
                </form>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Link to="/forgot" style={{ color: "gray" }}>Forgot Password?</Link>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Link to="/signup" style={{ color: "gray", marginTop: '30px' }}>Don't have an account?</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;

