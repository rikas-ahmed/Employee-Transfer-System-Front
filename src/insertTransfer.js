import React, { useState } from 'react';
import axios from 'axios';
import './employeeForm.css';

const InsertTransfer = () => {
  const [formData, setFormData] = useState({
    empNo: '',
    description: '',
    reqDate: '',
    title: '',
    type: '',
    lastRoutePosi: '',
    status: '',
    cycleId: '',
    hrDecision: '',
    hrComment: ''
  });

  const [popupMessage, setPopupMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/insertTransfer', formData);
      console.log('Transfer request created:', response.data);
      setPopupMessage('Transfer request created successfully!');
      showPopup();
    } catch (error) {
      console.error('Error creating transfer request:', error);
      setPopupMessage('Error creating transfer request.');
      showPopup();
    }
  };

  const showPopup = () => {
    const popup = document.getElementById('popup');
    popup.classList.add('show');
    setTimeout(() => {
      popup.classList.remove('show');
    }, 3000);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '100px', height: '100vh' }}>
      <div className="form-container">
        <p className="heading3">Insert Transfer Request</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="empNo">Employee No:</label>
            <input type="text" id="empNo" value={formData.empNo} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input type="text" id="description" value={formData.description} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="reqDate">Request Date:</label>
            <input type="date" id="reqDate" value={formData.reqDate} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="type">Type:</label>
            <input type="text" id="type" value={formData.type} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="lastRoutePosi">Last Route Position:</label>
            <input type="text" id="lastRoutePosi" value={formData.lastRoutePosi} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <input type="text" id="status" value={formData.status} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="cycleId">Cycle ID:</label>
            <input type="text" id="cycleId" value={formData.cycleId} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="hrDecision">HR Decision:</label>
            <input type="text" id="hrDecision" value={formData.hrDecision} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="hrComment">HR Comment:</label>
            <input type="text" id="hrComment" value={formData.hrComment} onChange={handleChange} required />
          </div>
          <div className="button-group">
            <button className="submit-button" type="submit">Submit</button>
            <button className="reset-button" type="reset" onClick={() => setFormData({
              empNo: '',
              description: '',
              reqDate: '',
              title: '',
              type: '',
              lastRoutePosi: '',
              status: '',
              cycleId: '',
              hrDecision: '',
              hrComment: ''
            })}>Reset</button>
          </div>
        </form>
        <div id="popup" className="popup">{popupMessage}</div>
      </div>
    </div>
  );
};

export default InsertTransfer;
