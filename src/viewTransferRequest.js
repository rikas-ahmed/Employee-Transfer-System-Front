import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './employeeForm.css';
import { RestCaller } from './API/RestCaller';

const ViewTransfer = () => {
  const [activeTab, setActiveTab] = useState('view');
  const [transferRequests, setTransferRequests] = useState([]);
  const [popupMessage, setPopupMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    const fetchTransferRequests = async () => {
      try {
        const response = await RestCaller.get('http://localhost:3001/api/viewTransfer');
        setTransferRequests(response.data);
      } catch (error) {
        console.error('Error fetching transfer requests:', error);
        setPopupMessage('Error fetching transfer requests.');
        setMessageType('error');
      }
    };

    fetchTransferRequests();
  }, []);

  const renderTableRows = () => {
    return transferRequests.map((data, index) => (
      <tr key={index}>
        <td>{data.empNo}</td>
        <td>{data.Description}</td>
        <td>{data.reqDate}</td>
        <td>{data.Title}</td>
        <td>{data.Type}</td>
        <td>{data.lastRoutePosi}</td>
        <td>{data.Status}</td>
        <td>{data.cycleId}</td>
        <td>{data.hrDecision}</td>
        <td>{data.hrComment}</td>
        <td>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '10px' }}>
            <button className='link-button' onClick={() => window.location.href = '/rejectTransferRequest'}>Reject Transfer Request</button>
            <button className='link-button' onClick={() => window.location.href = '/makeTentativeTransferSchedule'}>Make Tentative Transfer Schedule</button>
          </div>
        </td>
      </tr>
    ));
  };

  const renderForm = () => {
    return (
      <>
        <p className='heading3'>Received Transfer Request</p>
        <table className="employee-table">
          <thead>
            <tr>
              <th>Employee No</th>
              <th>Description</th>
              <th>Request Date</th>
              <th>Title</th>
              <th>Transfer Type</th>
              <th>Transfer Route Position</th>
              <th>Status</th>
              <th>Transfer Cycle ID</th>
              <th>HR Decision</th>
              <th>HR Comment</th>
              <th>HR Decision Options</th>
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
        <button onClick={() => setActiveTab('search')}>Search Employee</button>
        <button onClick={() => setActiveTab('appeal')}>Appeal Option</button>
        <button onClick={() => setActiveTab('transferOption')}>Transfer Option</button>
        <button onClick={() => setActiveTab('view')}>View Information</button>
      </div>
      {activeTab === 'insert' && <div>View Information form goes here</div>}
      {activeTab === 'update' && <div>Update Information form goes here</div>}
      {activeTab === 'search' && <div>Search for Employee</div>}
      {activeTab === 'appeal' && <div>Appeal Option</div>}
      {activeTab === 'transferOption' && <div>View transfer option form goes here</div>}
      {activeTab === 'view' && renderForm()}
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
    </div>
  );
};

export default ViewTransfer;
