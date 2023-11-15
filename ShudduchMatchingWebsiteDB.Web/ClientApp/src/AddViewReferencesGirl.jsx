import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './App.css';

const AddViewReferencesGirl = () => {

    const { id } = useParams();
    const [name, setName] = useState('');
    const [relation, setRelation] = useState('');
    const [phoneNumber, setPhoneNumber] = useState("");
    const [addRefMode, setAddRefMode] = useState(false);
    const [refs, setRefs] = useState([]);
    const [viewMode, setViewMode] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [refId, setRefId] = useState(0);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('')

    useEffect(() => {
        const loadConfirmed = async () => {
            const { data } = await axios.get(`api/shudduchmatchingGirl/getReferencesbyGirlid?girlid=${id}`)
            setRefs(data);
        };

        loadConfirmed();
        loadConfirmed2();
    }, []);

    const loadConfirmed2 = async () => {
        const { data } = await axios.get(`/api/shudduchMatchingGirl/getGirlById?id=${id}`);
        setFirstName(data.firstName);
        setLastName(data.lastName);
    }

    const onAddReferenceClick = () => {
        setViewMode(false);
        setAddRefMode(true);
    }

    const onSaveClick = async () => {
        await axios.post('/api/shudduchmatchingGirl/addReferenceToGirl', {
            name,
            relation,
            phoneNumber,
            girlid: id
        });
        setAddRefMode(false);
        setName("");
        setRelation("");
        setPhoneNumber("");
    }
    const onCancelClick = () => {
        setAddRefMode(false);
    }

    const onViewClick = async () => {
        setAddRefMode(false);
        setViewMode(true);
        const { data } = await axios.get(`/api/shudduchmatchingGirl/getReferencesbyGirlid?girlid=${id}`);
        setRefs(data);
    }

    const onDeleteClick = async (r) => {
        await axios.post('/api/shudduchmatchinggirl/deleteReference', {
            id: r.id
        });
        const { data } = await axios.get(`/api/shudduchmatchinggirl/getReferencesbyGirlid?girlid=${id}`);
        setRefs(data);
    }
    const onEditClick = async (r) => {
        setName(r.name);
        setRelation(r.relation);
        setPhoneNumber(r.phoneNumber);
        setRefId(r.id);
        setEditModalOpen(true);

    }
    const closeModal = () => {
        setEditModalOpen(false);
        setName("");
        setRelation("");
        setPhoneNumber("");
    };
    const onUpdateClick = async () => {
        setEditModalOpen(false);
        await axios.post('/api/shudduchmatchinggirl/updateReference', {
            name,
            relation,
            phoneNumber,
            id: refId,
        });
        const { data } = await axios.get(`/api/shudduchmatchinggirl/getReferencesbyGirlid?girlid=${id}`);
        setRefs(data);
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
    return (
        <div>

            <div style={cardStyle}>
                <h1 style={{ color: 'grey' }}> {firstName} {lastName}'s References</h1>
            </div>

            <div className="modal" tabIndex="-1" role="dialog" style={{ display: editModalOpen ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick={closeModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>

                                <div className="form-group mb-3">
                                    <input type="text" className="form-control" placeholder="Enter First Name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>


                                <div className="form-group mb-3">
                                    <input type="text" className="form-control" placeholder="Enter Last Name" value={relation} onChange={(e) => setRelation(e.target.value)}
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <input type="text" className="form-control" placeholder="Enter PhoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                            </form>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>

                            <button type="button" className="btn btn-info" onClick={() => { onUpdateClick(); closeModal(); }}>Update</button>

                        </div>
                    </div>
                </div>

            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button className="btn btn-light btn-lg" onClick={onViewClick}>View References</button>
                <button className="btn btn-light btn-lg" onClick={onAddReferenceClick}>Add Reference</button>
            </div>
            {addRefMode ? (
                <div className="card">
                    <p style={{ color: 'grey' }}> Contact Information </p>
                    <div className="input-container">
                        <div className="input-group">
                            <input type="text" id="name" value={name} placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="input-group" style={{ margin: '10px 0' }}>
                            <input type="text" id="relation" value={relation} placeholder="Enter Relation" onChange={(e) => setRelation(e.target.value)} />
                        </div>
                        <div className="input-group" style={{ margin: '10px 0' }}>
                            <input type="text" id="phoneNumber" value={phoneNumber} placeholder="Enter Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>
                    </div>
                    <button disabled={!name || !relation || !phoneNumber} className="btn btn-light mt-4" onClick={onSaveClick}>Save</button>
                    <button className="btn btn-light mt-2" onClick={onCancelClick}>Cancel</button>
                </div>
            ) : null

            }
            {
                viewMode ? (
                    <div className="pretty-table">
                        <table className="table table-striped mt-4 table table-bordered" color='grey'>
                            <thead>
                                <tr>
                                    <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Name</th>
                                    <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Relation</th>
                                    <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Phone Number</th>
                                    <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Edit</th>
                                    <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {refs.map((r) => (
                                    <tr key={r.id}>
                                        <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{r.name}</td>
                                        <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{r.relation}</td>
                                        <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{r.phoneNumber}</td>
                                        <td style={{ verticalAlign: 'middle', textAlign: 'center' }}><button type="button" className="btn btn-light" style={{ marginRight: '10px' }} onClick={() => onEditClick(r)}>Edit</button></td>
                                        <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>  <button type="button" className="btn btn-light" style={{ marginRight: '10px' }} onClick={() => onDeleteClick(r)}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : null
            }

            <div style={{ marginTop: '300px' }}>
                <Link to={`/addtionalInfoGirls/${id}`} style={{ color: 'grey', textDecoration: 'none' }}>
                    <span style={{ marginRight: '5px' }}>&#8592;</span>
                    Back
                </Link>
            </div>


        </div>


    );
}
export default AddViewReferencesGirl;