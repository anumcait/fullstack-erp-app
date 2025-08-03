import React, { useState, useEffect } from 'react';
import {
  InputAdornment,TextField, Typography, Button, FormControl, InputLabel, Select,
  MenuItem, Dialog, DialogTitle, DialogContent, IconButton, Grid, Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './OnDutyForm.css';
import axios from 'axios';
import OnDutyPreview from './OnDutyPreview';
import SearchIcon from '@mui/icons-material/Search';
import { useToast } from '../../context/ToastContext';
import EmployeeSelectDialog from "../Employee/EmployeeSelectDialog"; 

const OnDutyForm = () => {
  const { showToast } = useToast();
  
  const getCurrentISTDateTime = () => {
    const nowUTC = new Date(Date.now());
    const istDate = new Date(nowUTC.getTime());
    const yyyy = istDate.getFullYear();
    const mm = String(istDate.getMonth() + 1).padStart(2, '0');
    const dd = String(istDate.getDate()).padStart(2, '0');
    const hh = String(istDate.getHours()).padStart(2, '0');
    const min = String(istDate.getMinutes()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  };

  const [formData, setFormData] = useState({
    movement_id:'' ,
    movement_date: getCurrentISTDateTime(),
    empid: '',
    ename: '',
    unit: '',
    division: '',
    designation: '',
    shift: '',
    act_date: '',
    perm_ftime: '',
    perm_ttime: '',
    no_of_hrs: '',
    reason_perm: ''
  });

  const [showEmpPopup, setShowEmpPopup] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTimeChange = () => {
    if (formData.perm_ftime && formData.perm_ttime) {
      const from = new Date(`1970-01-01T${formData.perm_ftime}`);
      const to = new Date(`1970-01-01T${formData.perm_ttime}`);
      const diff = (to - from) / 1000 / 3600;
      setFormData((prev) => ({ ...prev, no_of_hrs: diff.toFixed(2) }));
    }
  };

  useEffect(() => {
    handleTimeChange();

  }, [formData.perm_ftime, formData.perm_ttime]);
  
useEffect(() => {
  fetchNextMovementId();
}, []);
  useEffect(() => {
    const handleKey = (e) => {
      // If the key pressed is F9 (key === "F9" OR keyCode === 120)
      if (e.key === "F9" || e.keyCode === 120) {
        e.preventDefault();          // optional: stop browser default
        openEmpPopup();              // your existing function
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey); // cleanup
  }, []);     

//   useEffect(() => {
//   const fetchNextId = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_API_URL}/onduty/next-id`);
//       setFormData((prev) => ({ ...prev, movement_id: res.data.nextMovementId }));
//     } catch (err) {
//       console.error('Failed to fetch next movement ID', err);
//     }
//   };

//   fetchNextId();
// }, []);

//   const openEmpPopup = async () => {
//   try {
//     const response = await axios.get(`${import.meta.env.VITE_API_URL}/employees`);
//     setEmployeeList(response.data); // assuming API returns array of employees
//     setShowEmpPopup(true);
//   } catch (err) {
//     console.error("Error fetching employee list:", err);
//     showToast("❌ Failed to load employees", "error");
//   }
// };

const openEmpPopup = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/employees`);
  setEmployeeList(response.data);
  setShowEmpPopup(true);
};

  const selectEmployee = (emp) => {
    setFormData({
      ...formData,
      empid: emp.empid,
      ename: emp.ename,
      unit: emp.uname,
      division: emp.divname,
      designation: emp.designation
    });
    setShowEmpPopup(false);
  };

  const previewPermissionReport = async () => {
    if (!formData.empid) {
      alert('Please select an employee');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/jasper/report', {
        responseType: 'blob',
        params: { movid: formData.empid }
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to generate report');
    }
  };
const fetchNextMovementId = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/onduty/next-id`);
    const nextId = response.data.nextMovementId;

    // Initialize the form
    setFormData({
      movement_id: nextId,
      movement_date: getCurrentISTDateTime(),
      empid: '',
      ename: '',
      unit: '',
      division: '',
      designation: '',
      shift: '',
      act_date: '',
      perm_ftime: '',
      perm_ttime: '',
      no_of_hrs: '',
      reason_perm: ''
    });
  } catch (error) {
    console.error('Failed to fetch next movement ID:', error);
  }
};

// const validateForm = () => {
//   const {
//     empid, ename, movement_date, act_date,
//     perm_ftime, perm_ttime, no_of_hrs, reason_perm
//   } = formData;

//   if (!empid || !ename || !movement_date || !act_date) {
//     showToast("Please fill all mandatory fields", "error");
//     return false;
//   }

//   if (!perm_ftime || !perm_ttime || !no_of_hrs) {
//     showToast("Permission time fields are required", "error");
//     return false;
//   }

//   return true;
// };

// const saveOnDuty = async () => {
//   try {
//     const response = await axios.post(`${import.meta.env.VITE_API_URL}/onduty/save`, formData);
//     const savedId = response.data.movement_id;

//     showToast(`✅ On Duty Saved. ID: ${savedId}`, "success");

//     // Reset form after save (optional)
//     setFormData({
//       movement_id: '',
//       movement_date: getCurrentISTDateTime(),
//       empid: '',
//       ename: '',
//       unit: '',
//       division: '',
//       designation: '',
//       shift: '',
//       act_date: '',
//       perm_ftime: '',
//       perm_ttime: '',
//       no_of_hrs: '',
//       reason_perm: ''
//     });

//     fetchNextMovementId(); // to get next available ID

//   } catch (err) {
//     console.error('Save error:', err);
//     showToast('❌ Error saving On Duty application', "error");
//   }
// };
const saveOnDuty = async () => {
  // ✅ Basic validation
  if (!formData.empid || !formData.ename || !formData.movement_date || !formData.act_date || !formData.perm_ftime || !formData.perm_ttime) {
    showToast("❌ Please fill all required fields.", "error");
    return;
  }

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/onduty/save`, formData);
    const savedId = response.data.movement_id;

    showToast(`✅ Onduty Saved. ID: ${savedId}`, "success");

    // ✅ Clear form but retain movement_id until fetchNextMovementId runs
    setFormData(prev => ({
      ...prev,
      movement_date: getCurrentISTDateTime(),
      empid: '',
      ename: '',
      unit: '',
      division: '',
      designation: '',
      shift: '',
      act_date: '',
      perm_ftime: '',
      perm_ttime: '',
      no_of_hrs: '',
      reason_perm: ''
    }));

    // ✅ Get next available ID after save
    fetchNextMovementId();

  } catch (err) {
    console.error('Save error:', err);
    showToast('❌ Error saving On Duty application', "error");
  }
};


  return (
    <>
      {!showPreview && (
        <div className="onduty-container">
          <div className="form-header">

            <Typography variant="h6">On Duty Permission Form</Typography>

            <button className="close-btn">✖</button>
          </div>

          <Box className="onduty-container">
            <div className="onduty-header">
              <h2>On Duty Permission</h2>
              {/* <Button variant="contained" color="primary">Save</Button> */}
               {/* Buttons */}
          <div className="action-buttons">
            <Button variant="contained" color="primary" onClick={previewPermissionReport} style={{ marginRight: '10px' }}>
              Preview Report
            </Button>
            {/* <Button variant="contained" color="primary">Save</Button> */}
            <Button variant="contained" color="primary" onClick={saveOnDuty}>Save</Button>
            <Button variant="contained" color="primary" onClick={() => setShowPreview(true)} style={{ marginLeft: '10px' }}>
              Custom Preview
            </Button>
          </div>
            </div>

            <Grid container spacing={2} className="onduty-form">
              {/* Row 1 */}
              <Grid item xs={12} md={6}>
                <div className="form-row">
                  <label>App No</label>
                  <TextField size="small" fullWidth disabled value={formData.movement_id} />
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div className="form-row">
                  <label>Entry Date</label>
                  <TextField size="small" fullWidth disabled type="datetime-local" value={formData.movement_date} />
                </div>
              </Grid>

              {/* Row 2 */}
              <Grid item xs={12} md={3}>
                <div className="form-row">
                   <label>Emp ID *</label>
                  <TextField

  size="small"
  required
  fullWidth
  value={formData.empid}
  onClick={openEmpPopup}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <SearchIcon
          onClick={openEmpPopup}
          style={{ cursor: 'pointer', verticalAlign: 'middle' }}
        />
      </InputAdornment>
    )
  }}
/>
                   
                 {/* <label>Emp Id</label>
                   <div className="combo-box">
              <div className="combo-section combo-input-section">
                <input type="text" className="combo-input" value={formData.empid} readOnly />
              </div>
              <div className="combo-section combo-icon-section" onClick={() => openEmpPopup(true)}>
                <SearchIcon fontSize="small" />
              </div>
              
            </div> */}
 
                </div>
              
              </Grid>
              <Grid item xs={12} md={3}>
                <div className="form-row">
                  <label>Name</label>
                  <TextField size="small" fullWidth disabled value={formData.ename} />
                </div>
              </Grid>
              <Grid item xs={12} md={3}>
                <div className="form-row">
                  <label>Unit</label>
                  <TextField size="small" fullWidth disabled value={formData.unit} />
                </div>
              </Grid>
              <Grid item xs={12} md={3}>
                <div className="form-row">
                  <label>Division</label>
                  <TextField size="small" fullWidth disabled value={formData.division} />
                </div>
              </Grid>

              {/* Row 3 */}
              <Grid item xs={12} md={4}>
                <div className="form-row">
                  <label>Designation</label>
                  <TextField size="small" fullWidth disabled value={formData.designation} />
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className="form-row">
                  <label>Movement Date</label>
                  <TextField name="act_date" type="date" value={formData.act_date} onChange={handleChange} size="small" fullWidth />
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className="form-row">
                  <label>Shift</label>
                  <FormControl size="small" fullWidth>
                    {/* <InputLabel>Shift</InputLabel> */}
                    <Select name="shift" value={formData.shift} onChange={handleChange}>
                      <MenuItem value="A">A</MenuItem>
                      <MenuItem value="B">B</MenuItem>
                      <MenuItem value="C">C</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </Grid>

              {/* Row 4 */}
              <Grid item xs={12} md={3}>
                <div className="form-row">
                  <label>From Time</label>
                  <TextField type="time" name="perm_ftime" value={formData.perm_ftime} onChange={handleChange} size="small" fullWidth />
                </div>
              </Grid>
              <Grid item xs={12} md={3}>
                <div className="form-row">
                  <label>To Time</label>
                  <TextField type="time" name="perm_ttime" value={formData.perm_ttime} onChange={handleChange} size="small" fullWidth />
                </div>
              </Grid>
              <Grid item xs={12} md={3}>
                <div className="form-row">
                  <label>No of Hours</label>
                  <TextField size="small" fullWidth disabled value={formData.no_of_hrs} />
                </div>
              </Grid>
              <Grid item xs={12} md={3}>
                <div className="form-row">
                  <label>Reason</label>
                  {/* <TextField name="reason_perm" value={formData.reason_perm} onChange={handleChange} size="small" fullWidth multiline rows={2} /> */}
       
                           
                       <TextField
                                   
                                   name="reason_perm"  
                                   multiline
                                     rows={2}
                                    value={formData.reason_perm} onChange={handleChange} 
                                     
                                     fullWidth
                                     variant='outlined'
                                     size="small"
                                     width="100%"
                                     sx={{ minWidth: 300 }}
                                     InputProps={{
                                       sx: {
                                         padding: 0,
                                         '& textarea': {
                                           padding: '8px',
                                           fontSize: '0.875rem',
                                           backgroundColor: 'transparent',
                                           resize: 'none'
                                         }
                                       }
                                     }}
                                   />
                
                          
                </div>
              </Grid>
            </Grid>
          </Box>

         

          {/* Employee Popup */}
          <EmployeeSelectDialog
  open={showEmpPopup}
  onClose={() => setShowEmpPopup(false)}
  onSelect={selectEmployee}
  data={employeeList}
/>


        </div>
      )}

      {showPreview && <OnDutyPreview formData={formData} onClose={() => setShowPreview(false)} />}
    </>
  );
};

export default OnDutyForm;
