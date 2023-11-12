import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './App.css';

import { useAuth } from './AuthContextComponent';


const Home = () => {

    const { user } = useAuth();
    return (


        <div className=" background-image">
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    flexDirection: 'column',
                }}
            >
                <h1
                    style={{
                        fontSize: '3em',
                        background: 'linear-gradient(45deg, lightpink, black)',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                    }}
                >
                    WELCOME TO THE SHUDDUCH MATCHING WEBSITE
                </h1>

                <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', margin: '30px 0' }}>
                    <div>
                        <style>
                            {`
                              @keyframes darken-pink {
                                from {
                                  color: pink;
                                }
                                to {
                                  color: black;
                                }
                              }
                            `}
                        </style>
                        <Link to="/girl" style={{ animation: 'darken-pink 3s linear infinite', fontSize: '1.5em', fontFamily: 'impact', textDecoration: 'none' }}>
                            Navigate to girls
                        </Link>
                    </div>
                    <div>
                        <style>
                            {`
                              @keyframes darken-blue {
                                from {
                                  color: blue;
                                }
                                to {
                                  color: black;
                                }
                              }
                            `}
                        </style>
                        <Link to="/boy" style={{ animation: 'darken-blue 3s linear infinite', fontSize: '1.5em', fontFamily: 'impact', textDecoration: 'none' }}>
                            Navigate to boys
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Home;