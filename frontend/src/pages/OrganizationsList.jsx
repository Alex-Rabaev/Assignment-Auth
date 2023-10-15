import React, { useState, useEffect } from 'react'
import axios from "axios";
import Navbar from '../components/Navbar'
import SingleOrganizationBlock from '../components/SingleOrganizationBlock'
import './OrganizationsList.css';


function OrganizationsList({ token }) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [orgsList, setOrgsList] = useState([]);

  useEffect(() => {
    const getOrgsList = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/list-orgs-of-user`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
      });
        setOrgsList(response.data.orgs)
        console.log(response.data.orgs);
      } catch (error) {
        console.log(error);
      }
    }
    getOrgsList();
  }, [BASE_URL, token]);


  return (
    <>
      <Navbar />
      <div className="orgs-list-container">
        <h2>Organizations you are a member of:</h2>
        <div className="orgs-list">
          {orgsList.map((org, index) => (
            <SingleOrganizationBlock key={index} orgName={org} token={token}/>
          ))}
        </div>
      </div>
    </>
  )
}

export default OrganizationsList