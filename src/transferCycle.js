import React, { useState } from 'react';
import axios from 'axios';
import './employeeForm.css';
import { RestCaller } from './API/RestCaller';

const TransferCycle = () => {
  const [activeTab, setActiveTab] = useState('insert');
  const [popupMessage, setPopupMessage] = useState('');

  const renderForm = () => {
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = {
        closeDate: document.getElementById('closingDate').value
      };
      try {
        const response = await RestCaller.post('http://localhost:3001/api/transferCycle/insert', formData);
        console.log('Transfer cycle inserted:', response.data);
        setPopupMessage('Transfer cycle inserted successfully!');
        showPopup();
      } catch (error) {
        console.error('Error inserting transfer cycle:', error);
        setPopupMessage('Error inserting transfer cycle.');
        showPopup();
      }
    };

    const showPopup = () => {
      alert(popupMessage);
    };

    return (
      <form className="form-container" onSubmit={handleSubmit}>
        <p className="heading3">Enter Transfer Cycle ID</p>
        <div className="form-group">
          <label htmlFor="closingDate">Closing Date:</label>
          <input type="date" id="closingDate" />
        </div>
        <div className="button-group">
          <button className="submit-button" type="submit">Submit</button>
          <button className="reset-button" type="reset">Reset</button>
        </div>
        {popupMessage && <p>{popupMessage}</p>}
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

export default TransferCycle;
