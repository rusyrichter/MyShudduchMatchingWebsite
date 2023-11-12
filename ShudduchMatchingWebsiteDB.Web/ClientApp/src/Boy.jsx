import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';
import './App.css';


const Boy = () => {


    const [boys, setBoys] = useState([]);
    const [searchedBoys, setSearchedBoys] = useState([]);
    const [filteredBoys, setFilteredBoys] = useState([]);
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
            const { data } = await axios.get('/api/shudduchmatching/getAllBoys');
            setBoys(data);
        }
        loadConfirmed();
    }, [][dataChanged]);


    const onAddClick = async () => {
        await axios.post('/api/shudduchmatching/addboy', {
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
        await axios.post('/api/shudduchmatching/updateBoy', {
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
        await axios.post('/api/shudduchmatching/deleteBoy', {
            id: g.id
        });
        setDataChanged(!dataChanged);
    }

    const toggleBusyStatus = (g) => {
        const updatedBoys = boys.map((boy) => {
            if (boy.id === g.id) {
                return {
                    ...boy,
                    busy: !boy.busy,
                };
            }
            return boy;
        });
        setBoys(updatedBoys);
    };


    const onBusyChange = (b) => {
        toggleBusyStatus(b);

        axios.post('/api/shudduchmatching/updateBusyStatus', {
            busy: !b.busy,
            id: b.id,
        });
        setDataChanged(!dataChanged);
    };


    const onHowLongChange = async (e, b) => {
        const newHowLong = e.target.value;
        await axios.post('/api/shudduchMatching/updateHowLong', {
            howLong: newHowLong,
            id: b.id
        })
    }

    const onSearchTextChange = (e) => {
        const searchValue = e.target.value.toLowerCase().trim();
        const filteredBoys = boys.filter((b) => {
            const fullName = `${b.firstName} ${b.lastName}`.toLowerCase();
            return fullName.includes(searchValue);
        });
        setSearchedBoys(filteredBoys);
        setSearchValue(searchValue);
        setFilterValue(searchValue);
        if (filteredBoys.length === 0) {
            setNoShow(true);
        }
        if (filteredBoys.length === boys.length) {
            resetInputs();
        }
    }
    const OnFilterChange = async (e) => {
        const filterValue = e.target.value ? e.target.value.toLowerCase().trim() : '';

        const filterBoys = boys.filter((b) => {
            const howLong = b.howLong ? b.howLong.toLowerCase().trim() : '';
            return howLong === filterValue;
        });

        setFilteredBoys(filterBoys);

        if (filterValue === "") {
            setFilteredBoys(boys);
            resetInputs();
        }

        if (filterBoys.length === 0 && filterValue !== "") {
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
        setSearchedBoys([]);
        setFilteredBoys([]);

    };
    const renderTableRows = (boysToRender) => (
        boysToRender.map((b) => (
            <tr key={b.id}>
                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{b.firstName}</td>
                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{b.lastName}</td>
                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{b.age}</td>
                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{b.location}</td>
                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{b.schools}</td>
                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{b.height}</td>
                <td>
                    <input style={{
                        backgroundColor: b.busy ? 'lightgrey' : 'white',
                        border: b.busy ? '1px solid grey' : '1px solid transparent'
                    }} className="form-check-input custom-checkbox" type="checkbox" checked={b.busy} onChange={() => onBusyChange(b)} />
                </td>
                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                    <select value={b.howLong} className="form-select" onChange={(e) => onHowLongChange(e, b)} name="howlong">
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
                    <Link to={`/addtionalInfo/${b.id}`} type="button" className="btn btn-light"> More Info</Link>
                </td>
                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                    <button type="button" className="btn btn-light" style={{ marginRight: '10px' }} onClick={() => onEditClick(b)}>Edit</button>
                   
                </td>
                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                    <button type="button" className="btn btn-light" style={{ marginRight: '10px' }} onClick={() => onDeleteClick(b)}>Delete</button>
                    </td>
                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>  <Link to={`/ideas/${b.id}`} className="btn btn-light">Ideas</Link>  </td>
                {
                    b.busy ?
                        <td>
                            <Link to={`/boybusy/${b.id}`} type="button" className="btn btn-light">Busy</Link>
                        </td> : null
                }

               
            </tr>
        ))
    );

    return (
           
        <div  className="container" style={{ marginTop: "80px" }}>
            <div className="row">
                <div className="col-md-3">
                    <button style={{ color: "dimgrey" }} className="btn btn info" onClick={openModal}>
                        Add Boy
                    </button>
                </div>

                <div className="col-md-6" >
                    <input
                        onChange={onSearchTextChange}
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Search Boys"
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
                            <h5 className="modal-title"> {!editMode ? "Add Boy" : "Edit Boy"}</h5>
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
                                    <input type="text" className="form-control" id="schools" placeholder="Enter Yeshivos" value={schools} onChange={(e) => setSchools(e.target.value)}
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
            <div className="row" style={{ marginTop: "20px" }}>
          
                <table className="table table-hover table-striped table-bordered">
                <thead>
                    <tr>
                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">First Name</th>
                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Last Name</th>
                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Age</th>
                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Location</th>
                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Yeshivos</th>
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
                    {searchedBoys.length > 0 ? (
                        renderTableRows(searchedBoys)
                    ) : searchValue !== null && noShow == true ? (
                        <tr>
                            <td colSpan="10">No matching results found for "{searchValue}"</td>
                        </tr>
                    ) : (
                        renderTableRows(filteredBoys.length > 0 ? filteredBoys : boys)
                    )}
                </tbody>
            </table>
            </div>
        </div>

    );
}



export default Boy;