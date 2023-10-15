import React from 'react'
import Navbar from '../components/Navbar'
import './HomePage.css';

function HomePage({ user }) {
  return (
    <>
      <Navbar />
      <div className="profile-container">
        <h1>Profile</h1>
        <h3>Your email:</h3>
        <h2>{user}</h2>
      </div>
    </>
  )
}

export default HomePage