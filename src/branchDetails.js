import React, { useState } from 'react';
import axios from 'axios';
import './employeeForm.css';
import { RestCaller } from './API/RestCaller';

const BranchDetails = () => {
  const [activeTab, setActiveTab] = useState('insert');
  const [popupMessage, setPopupMessage] = useState('');
  const [messageType, setMessageType] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      branchName: document.getElementById('branchName').value,
      address: document.getElementById('branchAddress').value,
      areaMgrID: document.getElementById('areaManagerID').value
    };
    try {
      const response = await RestCaller.post('http://localhost:3001/api/branch/insert', formData);
      setPopupMessage('Branch details added successfully!');
      setMessageType('success');
    } catch (error) {
      console.error('Error adding branch details:', error);
      setPopupMessage('Error adding branch details.');
      setMessageType('error');
    }
  };

  const renderForm = () => {
    return (
      <form className="form-container" onSubmit={handleSubmit}>
        <p className="heading3">Enter Branch Details</p>
        <div className="form-group">
          <label htmlFor="branchName">Branch Name:</label>
          <input type="text" id="branchName" required />
        </div>
        <div className="form-group">
          <label htmlFor="branchAddress">Branch Address:</label>
          <input type="text" id="branchAddress" required />
        </div>
        <div className="form-group">
          <label htmlFor="areaManagerID">Area Manager ID:</label>
          <input type="text" id="areaManagerID" required />
        </div>
        <div className="button-group">
          <button className="submit-button" type="submit">Submit</button>
          <button className="reset-button" type="reset">Reset</button>
        </div>
        {popupMessage && (
          <div style={{
            marginTop: '10px',
            padding: '10px',
            borderRadius: '5px',
            textAlign: 'center',
            width: '100%',
            backgroundColor: messageType === 'success' ? '#d4edda' : '#f8d7da',
            color: messageType === 'success' ? '#155724' : '#721c24',
            border: messageType === 'success' ? '1px solid #c3e6cb' : '1px solid #f5c6cb'
          }}>
            {popupMessage}
          </div>
        )}
      </form>
    );
  };

  return (
    <div className="employee-details-container">
      <div className="button-group">
        <button onClick={() => setActiveTab('insert')}>Insert Information</button>
        <button onClick={() => setActiveTab('update')}>Update Information</button>
        <button onClick={() => setActiveTab('view')}>View Information</button>
      </div>
      {activeTab === 'insert' && renderForm()}
      {activeTab === 'update' && <div>Update Information form goes here</div>}
      {activeTab === 'view' && <div>View Information form goes here</div>}
    </div>
  );
};

export default BranchDetails;
