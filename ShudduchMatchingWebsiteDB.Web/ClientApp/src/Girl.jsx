import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css';


const Girl = () => {


    const [girls, setGirls] = useState([]);
    const [searchedGirls, setSearchedGirls] = useState([]);
    const [filteredGirls, setFilteredGirls] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState(null);
    const [location, setLocation] = useState('');
    const [height, setHeight] = useState(null);
    const [id, setId] = useState(null);
    const [schools, setSchools] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [dataChanged, setDataChanged] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [searchValue, setSearchValue] = useState(null);
    const [noShow, setNoShow] = useState(false);
    const [filterValue, setFilterValue] = useState(null);

    useEffect(() => {
        const loadConfirmed = async () => {
            const { data } = await axios.get('/api/shudduchmatchinggirl/getAllGirls');
            setGirls(data);
        }
        loadConfirmed();
    }, [][dataChanged]);


    const onAddClick = async () => {
        await axios.post('/api/shudduchmatchinggirl/addgirl', {
            firstName,
            lastName,
            age,
            location,
            schools,
            height,
        });
        setDataChanged(!dataChanged);

        setShowModal(false);
    }


    const openModal = () => {
        resetInputs();
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditMode(false);
    };

    const onEditClick = (b) => {
        setEditMode(true);
        setShowModal(true);

        setFirstName(b.firstName);
        setLastName(b.lastName);
        setAge(b.age);
        setLocation(b.location);
        setSchools(b.schools);
        setHeight(b.height)
        setId(b.id)
    }

    const onUpdateClick = async () => {
        await axios.post('/api/shudduchmatchinggirl/updateGirl', {
            firstName,
            lastName,
            age,
            location,
            schools,
            height,
            id
        });
        setDataChanged(!dataChanged);

        setShowModal(false);
    }

    const onDeleteClick = async (g) => {
        await axios.post('/api/shudduchmatchinggirl/deleteGirl', {
            id: g.id
        });
        setDataChanged(!dataChanged);
    }

    const toggleBusyStatus = (g) => {
        const updatedGirls = girls.map((girl) => {
            if (girl.id === g.id) {
                return {
                    ...girl,
                    busy: !girl.busy,
                };
            }
            return girl;
        });
        setGirls(updatedGirls);
    };


    const onBusyChange = (g) => {
        toggleBusyStatus(g);

        axios.post('/api/shudduchmatchinggirl/updateBusyStatus', {
            busy: !g.busy,
            id: g.id,
        });
        setDataChanged(!dataChanged);
    };


    const onHowLongChange = async (e, g) => {
        const newHowLong = e.target.value;
        await axios.post('/api/shudduchMatchingGirl/updateHowLong', {
            howLong: newHowLong,
            id: g.id
        })
    }

    const onSearchTextChange = (e) => {
        const searchValue = e.target.value.toLowerCase().trim();
        const filteredGirls = girls.filter((g) => {
            const fullName = `${g.firstName} ${g.lastName}`.toLowerCase();
            return fullName.includes(searchValue);
        });
        setSearchedGirls(filteredGirls);
        setSearchValue(searchValue);
        setFilterValue(searchValue);
        if (filteredGirls.length === 0) {
            setNoShow(true);
        }
        if (filteredGirls.length === girls.length) {
            resetInputs();
        }
    }
    const OnFilterChange = async (e) => {
        const filterValue = e.target.value ? e.target.value.toLowerCase().trim() : '';

        const filterGirls = girls.filter((g) => {
            const howLong = g.howLong ? g.howLong.toLowerCase().trim() : '';
            return howLong === filterValue;
        });

        setFilteredGirls(filterGirls);

        if (filterValue === "") {
            setFilteredGirls(girls);
            resetInputs();
        }

        if (filterGirls.length === 0 && filterValue !== "") {
            setNoShow(true);
            setSearchValue(filterValue);
        } else {
            setNoShow(false);
        }
    };


    const resetInputs = () => {
        setFirstName('');
        setLastName('');
        setAge('')
        setLocation('');
        setHeight('');
        setSchools('');
        setSearchValue(null);
        setFilterValue(null);
        setNoShow(false);
        setSearchedGirls([]);
        setFilteredGirls([]);

    };
    const renderTableRows = (girlsToRender) => (
        girlsToRender.map((g) => (
            <tr key={g.id}>
                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{g.firstName}</td>
                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{g.lastName}</td>
                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{g.age}</td>
                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{g.location}</td>
                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{g.schools}</td>
                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{g.height}</td>
                <td>
                    <input style={{
                        backgroundColor: g.busy ? 'lightgrey' : 'white',
                        border: g.busy ? '1px solid grey' : '1px solid transparent'
                    }} className="form-check-input custom-checkbox" type="checkbox" checked={g.busy} onChange={() => onBusyChange(g)} />
                </td>
                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                    <select value={g.howLong} className="form-select" onChange={(e) => onHowLongChange(e, g)} name="howlong">
                        <option>Choose...</option>
                        <option>Working part time</option>
                        <option>1-2 years</option>
                        <option>2-3 years</option>
                        <option>4-7 years</option>
                        <option>As long as possible</option>
                        <option>Forever</option>

                    </select>
                </td>
                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                    <Link to={`/addtionalInfoGirls/${g.id}`} type="button" className="btn btn-light">More Info</Link>
                </td>
                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                    <button type="button" className="btn btn-light" style={{ marginRight: '10px' }} onClick={() => onEditClick(g)}>Edit</button>
                  
                </td>
                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                    <button type="button" className="btn btn-light" style={{ marginRight: '10px' }} onClick={() => onDeleteClick(g)}>Delete</button>
                </td>
                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>  <Link to={`/girlideas/${g.id}`} className="btn btn-light">Ideas</Link>  </td>
                {
                    g.busy ?
                        <td>
                            <Link to={`/girlbusy/${g.id}`} type="button" className="btn btn-light">Busy</Link>
                        </td> : null
                }
            </tr>
        ))
    );

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <button style={{ color: "dimgrey" }} className="btn info" onClick={openModal}>
                        Add Girl
                    </button>
                </div>

                <div className="col-md-6" >
                    <input
                        onChange={onSearchTextChange}
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Search Girls"
                    />
                </div>
                {filterValue == null ?
                    <div className="col-md-3">
                        <select className="form-select" onChange={OnFilterChange}>
                            <option value="">Show All</option>
                            <option value="Working part time">Working part time</option>
                            <option value="1-2 years">1-2 YR Learner</option>
                            <option value="2-3 years">2-3 YR Learner</option>
                            <option value="4-7 years">4-7 YR Learner</option>
                            <option value="As long as possible">As long as possible</option>
                            <option value="Forever">Forever</option>

                        </select>
                    </div> : null
                }

            </div>

            <div className="modal" tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"> {!editMode ? "Add Girl" : "Edit Girl"}</h5>
                            <button type="button" className="close" onClick={closeModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>

                                <div className="form-group mb-3">
                                    <input type="text" className="form-control" id="firstName" placeholder="Enter First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </div>


                                <div className="form-group mb-3">
                                    <input type="text" className="form-control" id="lastName" placeholder="Enter Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <input type="number" className="form-control" id="age" placeholder="Enter Age" value={age} onChange={(e) => setAge(e.target.value)}
                                    />
                                </div>


                                <div className="form-group mb-3">
                                    <input type="text" className="form-control" id="location" placeholder="Enter Location" value={location} onChange={(e) => setLocation(e.target.value)}
                                    />
                                </div>


                                <div className="form-group mb-3">
                                    <input type="text" className="form-control" id="schools" placeholder="Enter Schools" value={schools} onChange={(e) => setSchools(e.target.value)}
                                    />
                                </div>


                                <div className="form-group mb-3">
                                    <input type="number" className="form-control" id="height" placeholder="Enter Height" value={height} onChange={(e) => setHeight(e.target.value)}
                                    />
                                </div>



                            </form>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                            {!editMode ?
                                <button type="button" className="btn btn-primary" onClick={() => { onAddClick(); closeModal(); }}>Save</button>
                                :
                                <button type="button" className="btn btn-primary" onClick={() => { onUpdateClick(); closeModal(); }}>Update</button>}


                        </div>
                    </div>
                </div>

            </div>
            <div  className="row" style={{ marginTop: "20px" }}>

                <table className="table table-hover table-striped table-bordered" color="blue">
                <thead>
                    <tr>
                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">First Name</th>
                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Last Name</th>
                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Age</th>
                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Location</th>
                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Schools</th>
                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Height</th>
                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Busy</th>
                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">How long of a learner</th>
                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">More Information</th>
                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Edit</th>
                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Delete</th>
                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Ideas</th>
                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Busy</th>
                    </tr>
                </thead>
                <tbody>
                    {searchedGirls.length > 0 ? (
                        renderTableRows(searchedGirls)
                    ) : searchValue !== null && noShow == true ? (
                        <tr>
                            <td colSpan="10">No matching results found for "{searchValue}"</td>
                        </tr>
                    ) : (
                        renderTableRows(filteredGirls.length > 0 ? filteredGirls : girls)
                    )}
                </tbody>
            </table>
            </div>
        </div>
    );
}



export default Girl;