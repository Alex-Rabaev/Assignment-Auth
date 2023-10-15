import React, { useState, useEffect } from 'react'
import axios from "axios";
import Button from '@mui/material/Button';
import './SingleOrganizationBlock.css';


function SingleOrganizationBlock({ orgName, token }) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [message, setMessage] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [email, setEmail] = useState("");

  const getUsersListHandler = async () => {
      try {
          const response = await axios.get(`${BASE_URL}/list-users-of-org`, {
              headers: {
                  'Authorization': 'Bearer ' + token
              },
              params: {
                  org_name: orgName
              }
          });
          setUsersList(response.data.users)
          console.log(response.data.users);
      } catch (error) {
          console.log(error);
      }
  };

  useEffect(() => {
    getUsersListHandler();
  }, [token, orgName]);


  const addUserToOrgHandler = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/add-user-to-org`, 
            { org_name: orgName,
              email: email }, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        setMessage(response.data.msg);
        console.log(response.data.msg);
        getUsersListHandler();
    } catch (error) {
        console.log(error);
        setMessage(error.response.data.msg);
    }
  };

  return (
    <div className="single-org">
        <h3 className='org-title'>Organization name: <br />{orgName}</h3>
        <div className="users-list">
            <h4>Members:</h4>
            {usersList.map((user, index) => (
                <p key={index}>{user}</p>
            ))}
        </div>
        <div className="add-user-container">
            <p className="question">Add user to this organization</p>
            <input 
                type="email" 
                placeholder="user email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-user-email-field"
                />
            <Button variant="contained" onClick={addUserToOrgHandler} >Add user</Button>
            {message && <p className="message">{message}</p>}
        </div>
    </div>
  )
}

export default SingleOrganizationBlock