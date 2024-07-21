import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './employeeForm.css';

const DeleteTransfer = () => {
  const [activeTab, setActiveTab] = useState('insert');
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [transferDetails, setTransferDetails] = useState({});
  const [popupMessage, setPopupMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/deleteTransfer')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('Error fetching employee list:', error);
      });
  }, []);

  const handleEmployeeChange = (e) => {
    const empNo = e.target.value;
    setSelectedEmployee(empNo);

    axios.get(`http://localhost:3001/api/deleteTransfer/${empNo}`)
      .then(response => {
        setEmployeeDetails(response.data);
      })
      .catch(error => {
        console.error(`Error fetching employee details for empNo ${empNo}:`, error);
      });

    axios.get(`http://localhost:3001/api/deleteTransfer/transfer/${empNo}`)
      .then(response => {
        setTransferDetails(response.data);
      })
      .catch(error => {
        console.error(`Error fetching transfer request for empNo ${empNo}:`, error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:3001/api/deleteTransfer/${selectedEmployee}`);
      setPopupMessage('Transfer request deleted successfully!');
      setMessageType('success');
    } catch (error) {
      console.error('Error deleting transfer request:', error);
      setPopupMessage('Error deleting transfer request.');
      setMessageType('error');
    }
  };

  const calculateServiceRecord = (startDate) => {
    if (!startDate) return '';
    const start = new Date(startDate);
    const today = new Date();
    const diffTime = Math.abs(today - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    return `${years} years and ${months} months`;
  };

  const showPopup = () => {
    const popup = document.getElementById('popup');
    if (popup) {
      popup.classList.add('show');
      setTimeout(() => {
        popup.classList.remove('show');
      }, 3000);
    }
  };

  const renderForm = () => {
    return (
      <div className="form-container">
        <p className="heading3">Delete Transfer Request</p>
        <div className="form-group">
          <label htmlFor="employeeNo">Employee No:</label>
          <select id="employeeNo" onChange={handleEmployeeChange}>
            <option value="">Select Employee</option>
            {employees.map(employee => (
              <option key={employee.empNo} value={employee.empNo}>
                {employee.empNo}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="employeeName">Employee Name:</label>
          <input type="text" id="employeeName" value={employeeDetails.empName || ''} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" value={employeeDetails.address || ''} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <input type="text" id="gender" value={employeeDetails.gender || ''} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="birthDate">Date of Birth:</label>
          <input type="date" id="birthDate" value={employeeDetails.dob || ''} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="civilStatus">Civil Status:</label>
          <input type="text" id="civilStatus" value={employeeDetails.civilStatus || ''} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="presentBranch">Present Branch:</label>
          <input type="text" id="presentBranch" value={employeeDetails.presentBranch || ''} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="startDatePresent">Start Date in Present Branch:</label>
          <input type="date" id="startDatePresent" value={employeeDetails.startDate || ''} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="serviceRecord">Service Record:</label>
          <input type="text" id="serviceRecord" value={calculateServiceRecord(employeeDetails.startDate)} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="requestDescription">Request Description:</label>
          <textarea id="requestDescription" value={transferDetails.Description || ''} readOnly cols="50" rows="4" className="form-control"></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="CommentOfHrOfficer">Comment of HR Officer:</label>
          <textarea id="CommentOfHrOfficer" value={transferDetails.hrComment || ''} readOnly cols="50" rows="4" className="form-control"></textarea>
        </div><br /><br />
        <div className="textBox">
          <input type="text" id="employee-ID" />
          <input type="text" id="transferCycleID" />
        </div><br /><br />
        <div className="button-group">
          <button className="submit-button" onClick={handleSubmit}>Submit</button>
          <button className="reset-button" onClick={() => setSelectedEmployee('')}>Reset</button>
        </div>
        <div id="popup" className={`popup ${messageType}`}>{popupMessage}</div>
      </div>
    );
  };

  return (
    <div className="employee-details-container">
      <div className="button-group">
        <button onClick={() => setActiveTab('insert')}>Insert Information</button>
        <button onClick={() => setActiveTab('update')}>Update Information</button>
        <button onClick={() => setActiveTab('search')}>Search Employee</button>
        <button onClick={() => setActiveTab('appeal')}>Appeal Option</button>
        <button onClick={() => setActiveTab('transferOption')}>Transfer Option</button>
        <button onClick={() => setActiveTab('view')}>View Information</button>
      </div>
      {activeTab === 'insert' && renderForm()}
      {activeTab === 'update' && <div>Update Information form goes here</div>}
      {activeTab === 'search' && <div>Search for Employee</div>}
      {activeTab === 'appeal' && <div>Appeal Option</div>}
      {activeTab === 'transferOption' && <div>View transfer option form goes here</div>}
      {activeTab === 'view' && <div>View Information form goes here</div>}
    </div>
  );
};

export default DeleteTransfer;
