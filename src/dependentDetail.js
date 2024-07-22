import React, { useState } from 'react';
import axios from 'axios';
import './employeeForm.css';
import { RestCaller } from './API/RestCaller';

const DependentDetail = () => {
  const [activeTab, setActiveTab] = useState('insert');
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const renderForm = () => {
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = {
        empNo: document.getElementById('employeeNo').value,
        depName: document.getElementById('address').value,
        gender: document.getElementById('gender').value,
        dob: document.getElementById('birthDate').value,
        relationship: document.getElementById('civilStatus').value
      };
      try {
        const response = await RestCaller.post('/dependents/insert', formData);
        setPopupMessage('Dependent details added successfully!');
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      } catch (error) {
        console.error('Error adding dependent details:', error);
        setPopupMessage('Error adding dependent details.');
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      }
    };

    return (
      <form className="form-container" onSubmit={handleSubmit}>
        <p className="heading3">Enter Dependent Details</p>
        <div className="form-group">
          <label htmlFor="employeeNo">Employee No:</label>
          <input type="text" id="employeeNo" />
        </div>
        <div className="form-group">
          <label htmlFor="address">Dependent Name:</label>
          <input type="text" id="address" />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select id="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="birthDate">Date of Birth:</label>
          <input type="date" id="birthDate" />
        </div>
        <div className="form-group">
          <label htmlFor="civilStatus">Relationship:</label>
          <input type="text" id="civilStatus" />
        </div>
        <div className="button-group">
          <button className="submit-button" type="submit">Submit</button>
          <button className="reset-button" type="reset">Reset</button>
        </div>
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
      {showPopup && <div className="popup">{popupMessage}</div>}
    </div>
  );
};

export default DependentDetail;
