import React, { useState } from 'react';
import axios from 'axios';
import './AddEmployee.css';

const AddEmployeeForm = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({
    empid: 1020,
    emptype: '', uno: 0, divno: 0, deptno: 0, secno: 0, sex: '', marital_status: '',
    ename: '', fname: '', dob: new Date().toISOString().slice(0, 10), pob: '', bgroup: '', mother_toungue: '', idfm1: '', idfm2: '',
    lang_known: '', cadd_sa: '', cadd_city: '', cadd_state: '', cadd_phone: '', cadd_mobile: '',
    cadd_pin: '', cadd_email: '', padd_sa: '', padd_city: '', padd_state: '', padd_phone: '',
    padd_mobile: '', padd_pin: '', padd_email: '', uname: '', divname: '', deptname: '', secname: '',
    sameAsComm: false, created_by: 'admin', created: new Date().toISOString().slice(0, 10)
  });

  const [familyDetails, setFamilyDetails] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFamilyChange = (index, field, value) => {
    const updated = [...familyDetails];
    updated[index][field] = value;
    setFamilyDetails(updated);
  };

  const addFamilyRow = () => {
    setFamilyDetails([...familyDetails, { name: '', relation: '', age: '', occupation: '' }]);
  };

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setFormData(prev => ({
        ...prev,
        sameAsComm: true,
        padd_sa: prev.cadd_sa,
        padd_city: prev.cadd_city,
        padd_state: prev.cadd_state,
        padd_phone: prev.cadd_phone,
        padd_mobile: prev.cadd_mobile,
        padd_pin: prev.cadd_pin,
        padd_email: prev.cadd_email
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        sameAsComm: false,
        padd_sa: '', padd_city: '', padd_state: '', padd_phone: '', padd_mobile: '', padd_pin: '', padd_email: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = { ...formData, familyDetails };
      await axios.post('http://localhost:5000/api/employees/add-employee', payload, {
        headers: { 'Content-Type': 'application/json' }
      });
      alert('Employee and family details added successfully.');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form.');
    }
  };

  return (
    <div className="employee-master-container">
      <div className="tab-container">
        <button className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`} onClick={() => setActiveTab('personal')}>Personal</button>
        <button className={`tab-button ${activeTab === 'family' ? 'active' : ''}`} onClick={() => setActiveTab('family')}>Family</button>
      </div>

      <form onSubmit={handleSubmit}>
        {activeTab === 'personal' && (
          <div className="issue-section">
            <div className="issue-header">Add Employee</div>
            <div className="form-row">
              <input type="number" name="empid" value={formData.empid} onChange={handleChange} placeholder="Employee ID" />
              <input type="text" name="ename" value={formData.ename} onChange={handleChange} placeholder="Employee Name" />
              <input type="text" name="emptype" value={formData.emptype} onChange={handleChange} placeholder="Employee Type" />
              <input type="number" name="uno" value={formData.uno} onChange={handleChange} placeholder="UNO" />
              <input type="number" name="divno" value={formData.divno} onChange={handleChange} placeholder="Division No" />
            </div>
            {/* Other rows ... */}
            <div className="address-section">
              <h3>Address Details</h3>
              <div className="address-grid">
                <div className="address-block">
                  <h4>Communication Address</h4>
                  <input type="text" name="cadd_sa" placeholder="Street" value={formData.cadd_sa} onChange={handleChange} />
                  <input type="text" name="cadd_city" placeholder="City" value={formData.cadd_city} onChange={handleChange} />
                  <input type="text" name="cadd_state" placeholder="State" value={formData.cadd_state} onChange={handleChange} />
                  <input type="text" name="cadd_phone" placeholder="Phone" value={formData.cadd_phone} onChange={handleChange} />
                  <input type="text" name="cadd_mobile" placeholder="Mobile" value={formData.cadd_mobile} onChange={handleChange} />
                  <input type="text" name="cadd_pin" placeholder="PIN" value={formData.cadd_pin} onChange={handleChange} />
                  <input type="email" name="cadd_email" placeholder="Email" value={formData.cadd_email} onChange={handleChange} />
                </div>

                <div className="address-checkbox">
                  <label>
                    <input type="checkbox" checked={formData.sameAsComm} onChange={handleCheckboxChange} />
                    Same as Communication Address
                  </label>
                </div>

                <div className="address-block">
                  <h4>Permanent Address</h4>
                  <input type="text" name="padd_sa" placeholder="Street" value={formData.padd_sa} onChange={handleChange} />
                  <input type="text" name="padd_city" placeholder="City" value={formData.padd_city} onChange={handleChange} />
                  <input type="text" name="padd_state" placeholder="State" value={formData.padd_state} onChange={handleChange} />
                  <input type="text" name="padd_phone" placeholder="Phone" value={formData.padd_phone} onChange={handleChange} />
                  <input type="text" name="padd_mobile" placeholder="Mobile" value={formData.padd_mobile} onChange={handleChange} />
                  <input type="text" name="padd_pin" placeholder="PIN" value={formData.padd_pin} onChange={handleChange} />
                  <input type="email" name="padd_email" placeholder="Email" value={formData.padd_email} onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'family' && (
          <div className="issue-section">
            <div className="issue-header">Family Details</div>
            {familyDetails.map((member, index) => (
              <div key={index} className="form-row">
                <input type="text" placeholder="Name" value={member.name} onChange={(e) => handleFamilyChange(index, 'name', e.target.value)} />
                <input type="text" placeholder="Relation" value={member.relation} onChange={(e) => handleFamilyChange(index, 'relation', e.target.value)} />
                <input type="number" placeholder="Age" value={member.age} onChange={(e) => handleFamilyChange(index, 'age', e.target.value)} />
                <input type="text" placeholder="Occupation" value={member.occupation} onChange={(e) => handleFamilyChange(index, 'occupation', e.target.value)} />
              </div>
            ))}
            <button type="button" className="go-btn" onClick={addFamilyRow}>+ Add Row</button>
          </div>
        )}

        <div className="form-row">
          <button type="submit" className="go-btn">Save</button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeeForm;