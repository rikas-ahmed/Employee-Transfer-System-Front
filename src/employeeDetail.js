import React, { useState } from 'react';
import axios from 'axios';
import './employeeForm.css';
import { RestCaller } from './API/RestCaller';

const EmployeeDetails = () => {
  const [activeTab, setActiveTab] = useState('insert');
  const [formData, setFormData] = useState({
    empNo: '',
    empName: '',
    address: '',
    gender: '',
    dob: '',
    civilStatus: '',
    presentBranch: '',
    position: '',
    startDate: '',
    grade: '',
    category: '',
    appointmentDate: ''
  });

  const [popupMessage, setPopupMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestCaller.post('http://localhost:3001/api/employeeDetails/insert', formData);
      console.log('Employee details inserted:', response.data);
      setPopupMessage('Employee details inserted successfully!');
      showPopup();
    } catch (error) {
      console.error('Error inserting employee details:', error);
      setPopupMessage('Error inserting employee details.');
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

  const renderForm = () => {
    return (
      <div className="form-container">
        <p className="heading3">Enter Employee Details</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="empNo">Employee No:</label>
            <input type="text" id="empNo" value={formData.empNo} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="empName">Employee Name:</label>
            <input type="text" id="empName" value={formData.empName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select id="gender" value={formData.gender} onChange={handleChange} required>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth:</label>
            <input type="date" id="dob" value={formData.dob} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="civilStatus">Civil Status:</label>
            <input type="text" id="civilStatus" value={formData.civilStatus} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="presentBranch">Present Branch:</label>
            <input type="text" id="presentBranch" value={formData.presentBranch} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="position">Position:</label>
            <input type="text" id="position" value={formData.position} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Current Start Date:</label>
            <input type="date" id="startDate" value={formData.startDate} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="grade">Grade:</label>
            <input type="text" id="grade" value={formData.grade} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input type="text" id="category" value={formData.category} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="appointmentDate">Appointment Date:</label>
            <input type="date" id="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required />
          </div>

          <div className="button-group">
            <button className="submit-button" type="submit">Submit</button>
            <button className="reset-button" type="reset" onClick={() => setFormData({
              empNo: '',
              empName: '',
              address: '',
              gender: '',
              dob: '',
              civilStatus: '',
              presentBranch: '',
              position: '',
              startDate: '',
              grade: '',
              category: '',
              appointmentDate: ''
            })}>Reset</button>
          </div>
        </form>
        <div id="popup" className="popup">{popupMessage}</div>
      </div>
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

export default EmployeeDetails;
