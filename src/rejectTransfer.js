import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './employeeForm.css';

const RejectTransfer = () => {
  const [activeTab, setActiveTab] = useState('insert');
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [formData, setFormData] = useState({
    decisionOfHrOfficer: '',
    commentOfHrOfficer: ''
  });
  const [popupMessage, setPopupMessage] = useState('');
  const [messageType, setMessageType] = useState(''); 

  useEffect(() => {
    axios.get('http://localhost:3001/api/rejectTransfer')
      .then(response => {
        console.log('Employee list fetched:', response.data);
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('Error fetching employee list:', error);
      });
  }, []);

  const handleEmployeeChange = (e) => {
    const empNo = e.target.value;
    setSelectedEmployee(empNo);

    axios.get(`http://localhost:3001/api/rejectTransfer/${empNo}`)
      .then(response => {
        console.log(`Employee details fetched for empNo ${empNo}:`, response.data);
        setEmployeeDetails(response.data);
      })
      .catch(error => {
        console.error(`Error fetching employee details for empNo ${empNo}:`, error);
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    try {
      const response = await axios.post(`http://localhost:3001/api/rejectTransfer/update/${selectedEmployee}`, {
        hrDecision: formData.decisionOfHrOfficer,
        hrComment: formData.commentOfHrOfficer,
      });
      console.log('Transfer request updated:', response.data);
      setPopupMessage('Transfer request rejected successfully!');
      setMessageType('success');
      showPopup();
    } catch (error) {
      console.error('Error rejecting transfer request:', error);
      setPopupMessage('Error rejecting transfer request.');
      setMessageType('error');
      showPopup();
    }
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
        <p className="heading3">Reject Transfer Request</p>
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
          <label htmlFor="birthDate">Date of Birth:</label>
          <input type="date" id="birthDate" value={employeeDetails.dob || ''} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="position">Position:</label>
          <input type="text" id="position" value={employeeDetails.position || ''} readOnly />
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
          <label htmlFor="grade">Grade:</label>
          <input type="text" id="grade" value={employeeDetails.grade || ''} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="decisionOfHrOfficer">HR Decision:</label>
          <textarea id="decisionOfHrOfficer" value={formData.decisionOfHrOfficer} onChange={handleChange} cols="50" rows="4" className="form-control"></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="commentOfHrOfficer">Comment of HR Officer:</label>
          <textarea id="commentOfHrOfficer" value={formData.commentOfHrOfficer} onChange={handleChange} cols="50" rows="4" className="form-control"></textarea>
        </div>
        <div className="button-group">
          <button className="submit-button" onClick={handleSubmit}>Submit</button>
          <button className="reset-button" onClick={() => setFormData({ decisionOfHrOfficer: '', commentOfHrOfficer: '' })}>Reset</button>
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

export default RejectTransfer;
