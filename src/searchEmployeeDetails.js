import React, { useState } from 'react';
import axios from 'axios';
import './searchEmployeeDetails.css';

const SearchEmployeeDetails = () => {
  const [formData, setFormData] = useState({
    expCurrentBranch: '',
    expCurrentBranch2: '',
    expService: '',
    expService2: '',
    namePattern: '',
    empNo: '',
    jobCategory: ''
  });

  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let endpoint = '';
    let params = {};

    if (formData.namePattern) {
      endpoint = 'http://localhost:3001/api/employeeSearch/byName';
      params = { name: formData.namePattern };
    } else if (formData.empNo) {
      endpoint = 'http://localhost:3001/api/employeeSearch/byNumber';
      params = { number: formData.empNo };
    } else if (formData.jobCategory) {
      endpoint = 'http://localhost:3001/api/employeeSearch/byCategory';
      params = { category: formData.jobCategory };
    } else if (formData.expCurrentBranch) {
      endpoint = 'http://localhost:3001/api/employeeSearch/experienceGreaterThan';
      params = { years: formData.expCurrentBranch };
    } else if (formData.expCurrentBranch2) {
      endpoint = 'http://localhost:3001/api/employeeSearch/experienceLessThan';
      params = { years: formData.expCurrentBranch2 };
    } else if (formData.expService) {
      endpoint = 'http://localhost:3001/api/employeeSearch/pastExperienceGreaterThan';
      params = { years: formData.expService };
    } else if (formData.expService2) {
      endpoint = 'http://localhost:3001/api/employeeSearch/pastExperienceLessThan';
      params = { years: formData.expService2 };
    }

    try {
      const response = await axios.get(endpoint, { params });
      setSearchResults(response.data);
      console.log('Search results:', response.data);
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  return (
    <div className="search-container">
      <h3 className="heading3">Search Employee Details</h3>
      <form onSubmit={handleSubmit}>
        <table className="search-table">
          <tbody>
            <tr>
              <td>
                <h4>Search Employee By Experience of Current Branch:</h4>
                <div className="form-group">
                  <label htmlFor="expCurrentBranch">Experience greater than:</label>
                  <input type="text" name="expCurrentBranch" value={formData.expCurrentBranch} onChange={handleChange} />
                  <span> years</span>
                </div>
                <div className="form-group">
                  <label htmlFor="expCurrentBranch2">Experience less than:</label>
                  <input type="text" name="expCurrentBranch2" value={formData.expCurrentBranch2} onChange={handleChange} />
                  <span> years</span>
                </div>
              </td>
              <td>
                <h4>Search Employee By Service Experience:</h4>
                <div className="form-group">
                  <label htmlFor="expService">Experience greater than:</label>
                  <input type="text" name="expService" value={formData.expService} onChange={handleChange} />
                  <span> years</span>
                </div>
                <div className="form-group">
                  <label htmlFor="expService2">Experience less than:</label>
                  <input type="text" name="expService2" value={formData.expService2} onChange={handleChange} />
                  <span> years</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <h4>Search Employee By Name Pattern:</h4>
                <div className="form-group">
                  <label htmlFor="namePattern">By Name:</label>
                  <input type="text" name="namePattern" value={formData.namePattern} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="empNo">By Employee No:</label>
                  <input type="text" name="empNo" value={formData.empNo} onChange={handleChange} />
                </div>
              </td>
              <td>
                <h4>Search Employee By Job Category:</h4>
                <div className="form-group">
                  <label htmlFor="jobCategory">By Job Category:</label>
                  <select name="jobCategory" value={formData.jobCategory} onChange={handleChange}>
                    <option value="">Select Job Category</option>
                    <option value="category1">Category 1</option>
                    <option value="category2">Category 2</option>
                    <option value="category3">Category 3</option>
                    <option value="category4">Category 4</option>
                    <option value="category5">Category 5</option>
                  </select>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="button-group">
          <button className="submit-button" type="submit">Submit</button>
          <button className="reset-button" type="reset" onClick={() => setFormData({
            expCurrentBranch: '',
            expCurrentBranch2: '',
            expService: '',
            expService2: '',
            namePattern: '',
            empNo: '',
            jobCategory: ''
          })}>Reset</button>
        </div>
      </form>

      {searchResults.length > 0 && (
        <div className="results-table">
          <h4>Search Results:</h4>
          <table>
            <thead>
              <tr>
                <th>Employee No</th>
                <th>Name</th>
                <th>Address</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Civil Status</th>
                <th>Present Branch</th>
                <th>Position</th>
                <th>Start Date</th>
                <th>Grade</th>
                <th>Category</th>
                <th>Appointment Date</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((employee) => (
                <tr key={employee.empNo}>
                  <td>{employee.empNo}</td>
                  <td>{employee.empName}</td>
                  <td>{employee.Address}</td>
                  <td>{employee.Gender}</td>
                  <td>{employee.Dob}</td>
                  <td>{employee.civilStatus}</td>
                  <td>{employee.presentBranch}</td>
                  <td>{employee.Position}</td>
                  <td>{employee.startDate}</td>
                  <td>{employee.Grade}</td>
                  <td>{employee.Category}</td>
                  <td>{employee.appointmentDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchEmployeeDetails;
