import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './App.css';


const GirlIdeas = () => {


    const { id } = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [boys, setBoys] = useState([]);
    const [selectedboyid, setSelectedBoyId] = useState('');
    const [addMode, setAddMode] = useState(false);
    const [viewMode, setViewMode] = useState(false);
    const [selectedBoys, setSelectedBoys] = useState([]);
    const [comments, setComments] = useState('');
    const [editMode, setEditMode] = useState(false);


    useEffect(() => {
        loadConfirmed();
        loadConfirmed2();
        loadConfirmed3();
    }, []);

    const loadConfirmed = async () => {
        const { data } = await axios.get('/api/shudduchmatching/getAllBoys');
        setBoys(data);
    }
    const loadConfirmed2 = async () => {
        const { data } = await axios.get(`/api/shudduchMatchingGirl/getGirlById?id=${id}`);
        setFirstName(data.firstName);
        setLastName(data.lastName);
    }
    const loadConfirmed3 = async () => {
        const { data } = await axios.get(`/api/shudduchMatchingGirl/getSelectedIdeas?girlid=${id}`);
        console.log(data);
        const comments = data[0].comments;
        console.log(comments);
        setComments(comments);
    }


    const onAddClick = async () => {
        await axios.post('/api/shudduchMatchingGirl/addIdea', {
            girlid: id,
            boyid: selectedboyid,
        });
        onViewClick();
        
    };
    const onRemoveClick = async (boyid) => {
        console.log(id, boyid);
        await axios.post('/api/shudduchMatchinggirl/removeIdea', {
            girlid: id,
            boyid,
        })
        onViewClick();
    }

    const onAddModeClick = () => {
        setAddMode(true);
        setViewMode(false);
    };

    const onEditClick = () => {
        setEditMode(true);
    }

    const onUpdateCommentsClick = async (boyid) => {
        await axios.post('/api/shudduchMatchinggirl/updateIdea', {
            girlid: id,
            boyid,
            comments,
        })
        onViewClick();
    }

    const onViewClick = async () => {
        setViewMode(true);
        setAddMode(false);
        const { data } = await axios.get(`/api/shudduchMatchinggirl/getSelectedIdeas?girlid=${id}`);
        setSelectedBoys(data);
        setEditMode(false);
    };
    const cardStyle = {
        textAlign: 'center',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ddd',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        padding: '20px',
        margin: '0 auto',
        width: '65%',
        marginTop: '5px',
    };

   

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button className="btn btn-light btn-lg" onClick={onViewClick}>
                    View Ideas
                </button>
                <button className="btn btn-light btn-lg" onClick={onAddModeClick}>
                    Add Ideas
                </button>
            </div>

            <div style={cardStyle}>
                <h1 style={{ color: 'grey' }}> Ideas for {firstName} {lastName}</h1>
            </div>

            {addMode && (
                <div className="select-container">
                    <div className="select-element-container">
                        <select className="select-element" onChange={(e) => setSelectedBoyId(e.target.value)} value={selectedboyid}>
                            <option value="">Choose...</option>
                            {boys.map((boy) => (
                                <option key={boy.id} value={boy.id}>
                                    {`${boy.firstName} ${boy.lastName}`}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="button-container">
                        <button className="btn btn-light button" onClick={onAddClick}>
                            Add
                        </button>
                    </div>
                </div>
            )}

            {addMode && selectedboyid ? (
                <Link className="additional-info-link" style={{ color: 'grey', textAlign: 'center' }} to={`/addtionalInfo/${selectedboyid}`}>
                    See selected boy's Info
                </Link>
            ) : (
                    null
               
            )}

            {viewMode && (
                <table className="table table-striped mt-4 table table-bordered" color="grey">
                    <thead>
                        <tr>
                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">First Name</th>
                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Last Name</th>
                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Age</th>
                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Location</th>
                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Schools</th>
                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Additional Details</th>
                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Notes</th> 
                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className="text-secondary">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedBoys.map((b) => (
                            <tr key={b.boyId}>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{b.firstName}</td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{b.lastName}</td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{b.age}</td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{b.location}</td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{b.schools}</td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                   
                                        <Link style={{ color: 'grey' }} to={`/addtionalInfo/${b.boyId}`}>
                                            See Additional Details for {b.firstName}
                                        </Link> 
                                  
                                   
                                </td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                    {editMode ? (
                                        <div>
                                            <textarea
                                                rows={4}
                                                value={comments}
                                                onChange={(e) => setComments(e.target.value)}
                                                style={{
                                                    width: '100%',
                                                    padding: '10px',
                                                    resize: 'none',
                                                    border: '1px solid grey',
                                                    color: 'black',
                                                    backgroundColor: 'white',
                                                    backgroundSize: 'cover'
                                                }}
                                                placeholder="Enter Notes"
                                            />
                                            <button className="btn btn-light" onClick={() => onUpdateCommentsClick(b.boyId)}>Update</button>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <div style={{ marginBottom: '10px' }}>
                                                {b.comments}
                                            </div>
                                            <button className="btn btn-light btn-sm" onClick={onEditClick}>Edit</button>
                                        </div>
                                    )}
                                </td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                    <button className="btn btn-light" onClick={() => onRemoveClick(g.girlId)}>Remove</button>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div style={{ marginTop: '100px', textAlign: 'center' }}>
                <Link to={'/girl'} style={{ color: 'grey', textDecoration: 'none' }}>
                    <span style={{ marginRight: '5px' }}>&#8592;</span>
                    Back to Girls
                </Link>
            </div>
        </>
    );
};

export default GirlIdeas;
