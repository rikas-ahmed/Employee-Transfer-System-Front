import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './employeeForm.css';

const ViewBranchInfo = () => {
  const [branches, setBranches] = useState([]);
  const [popupMessage, setPopupMessage] = useState('');
  const [activeTab, setActiveTab] = useState('view'); 

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/viewBranch');
        setBranches(response.data);
      } catch (error) {
        console.error('Error fetching branch data:', error);
        setPopupMessage('Error fetching branch data.');
        showPopup();
      }
    };
    fetchBranches();
  }, []);

  const showPopup = () => {
    alert(popupMessage);
  };

  const renderTableRows = () => {
    return branches.map((branch, index) => (
      <tr key={index}>
        <td>{branch.branchNo}</td>
        <td>{branch.branchName}</td>
        <td>{branch.address}</td>
        <td>{branch.areaMgrID}</td>
      </tr>
    ));
  };

  const renderForm = () => {
    return (
      <>
        <p className="heading3"> View Employee Details</p>
        <table className="employee-table">
          <thead>
            <tr>
              <th>Branch No</th>
              <th>Branch Name</th>
              <th>Address</th>
              <th>Area Manager ID</th>
            </tr>
          </thead>
          <tbody>
            {renderTableRows()}
          </tbody>
        </table>
      </>
    );
  };

  return (
    <div className="employee-details-container">
      <div className="button-group">
        <button onClick={() => setActiveTab('insert')}>Insert Information</button>
        <button onClick={() => setActiveTab('update')}>Update Information</button>
        <button onClick={() => setActiveTab('view')}>View Information</button>
      </div>
      {activeTab === 'insert' && <div>Insert Information form goes here</div>}
      {activeTab === 'update' && <div>Update Information form goes here</div>}
      {activeTab === 'view' && renderForm()}
    </div>
  );
};

export default ViewBranchInfo;
