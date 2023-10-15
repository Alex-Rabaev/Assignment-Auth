import React, { useState } from 'react';
import axios from "axios";
import Navbar from '../components/Navbar'
import Button from '@mui/material/Button';
import './OrganizationCreate.css';

function OrganizationCreate({ token }) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const handleCreate = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/create-org`, {name: name}, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
      });
      if (response.status === 201) {
        console.log(response.data.msg);
        setMessage(response.data.msg);
      } else {
        console.error(response.data.msg);
        setMessage(response.data.msg);
      }
    } catch (error) {
      console.error('Error creating organization:', error);
      setMessage(error.response.data.msg);
    }
  };


  return (
    <>
    <Navbar />
    <div className="org-create-container">
      <h2>Create new organization</h2>
      <p className="question">Organization name</p>
      <input 
        type="text" 
        placeholder="organization" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input-orgname-field"
        />
      <Button variant="contained" onClick={handleCreate} >Confirm</Button>
      {message && <p className="message">{message}</p>}
    </div>
    </>
  )
}

export default OrganizationCreate