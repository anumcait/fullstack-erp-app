import React, { useState, useEffect } from "react";
import { FaDownload, FaPrint, FaSearch } from "react-icons/fa";
import axios from "axios";
import './onDutyTable.css';
import OnDutyPreview from "./OnDutyPreview";

const OnDutyTable = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // 🔄 Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/onduty/all`);
        const formatted = response.data.map((row, index) => ({
          sno: index + 1,
          ...row
        }));
        setData(formatted);
      } catch (err) {
        console.error("❌ Failed to fetch On Duty data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="onduty-table-wrapper">
      <div className="onduty-table-header">
        <div className="onduty-table-title">On Duty List</div>
        <div className="onduty-table-icons">
          <FaDownload className="icon" title="Download" />
          <FaPrint className="icon" title="Print" />
        </div>
      </div>

      <div className="onduty-table-container">
        <table className="onduty-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Movement ID</th>
              <th>Entry Date</th>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Unit</th>
              <th>Division</th>
              <th>Designation</th>
              <th>Mov.Date</th>
              <th>From Time</th>
              <th>To Time</th>
              <th>Hours</th>
              <th>Reason</th>
              <th>Preview</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.movement_id}>
                <td>{row.sno}</td>
                <td>{row.movement_id}</td>
                <td>{row.movement_date
                                        ? new Date(row.movement_date).toLocaleString('en-GB', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: false
                                          }).replace(',', '')
                                        : '--'}</td>
                <td>{row.empid}</td>
                <td>{row.ename}</td>
                <td>{row.unit}</td>
                <td>{row.division}</td>
                <td>{row.designation}</td>
                <td>{row.act_date?.slice(0, 10).split('-').reverse().join('-')}</td>
                <td>{row.perm_ftime?.slice(0,5)}</td>
                <td>{row.perm_ttime?.slice(0,5)}</td>
                <td>{row.no_of_hrs}</td>
                <td>{row.reason_perm}</td>
                <td className="preview-icon-cell">
                  <a href="#" onClick={() => { setSelectedRecord(row); setShowForm(true); }}>
                    <FaSearch size={18} color="#007bff" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔍 Preview Popup */}
      {showForm && (
        <OnDutyPreview data={selectedRecord} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
};

export default OnDutyTable;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Box,
//   Stack,
//   Typography,
//   IconButton,
// } from "@mui/material";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { FaSearch } from "react-icons/fa";
// import OnDutyPreview from "./OnDutyPreview";

// const OnDutyTable = () => {
//   const [rows, setRows] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [selectedRecord, setSelectedRecord] = useState(null);

//   // 🔄 Fetch On Duty data from backend
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API_URL}/onduty/all`);
//         const formatted = res.data.map((row, index) => ({
//           id: row.movement_id,
//           sno: index + 1,
//           ...row,
//         }));
//         setRows(formatted);
//       } catch (err) {
//         console.error("❌ Failed to fetch On Duty data:", err);
//       }
//     };
//     fetchData();
//   }, []);

//   // 📊 Define DataGrid columns
//   const columns = [
//     { field: "sno", headerName: "S.No.", width: 80 },
//     { field: "movement_id", headerName: "Movement ID", width: 120 },
//     {
//       field: "movement_date",
//       headerName: "Movement Date",
//       width: 130,
//       valueFormatter: (params) => params.value?.slice(0, 10),
//     },
//     { field: "empid", headerName: "Emp ID", width: 100 },
//     { field: "ename", headerName: "Name", width: 150 },
//     { field: "unit", headerName: "Unit", width: 80 },
//     { field: "division", headerName: "Division", width: 120 },
//     { field: "designation", headerName: "Designation", width: 150 },
//     {
//       field: "act_date",
//       headerName: "Actual Date",
//       width: 130,
//       valueFormatter: (params) => params.value?.slice(0, 10),
//     },
//     { field: "shift", headerName: "Shift", width: 90 },
//     { field: "perm_ftime", headerName: "From Time", width: 110 },
//     { field: "perm_ttime", headerName: "To Time", width: 110 },
//     { field: "no_of_hrs", headerName: "Hours", width: 90 },
//     { field: "reason_perm", headerName: "Reason", width: 200 },
//     {
//       field: "preview",
//       headerName: "Preview",
//       width: 90,
//       sortable: false,
//       renderCell: (params) => (
//         <IconButton
//           onClick={() => {
//             setSelectedRecord(params.row);
//             setShowForm(true);
//           }}
//         >
//           <FaSearch size={16} color="#1976d2" />
//         </IconButton>
//       ),
//     },
//   ];

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h6" fontWeight={600}>
//           On Duty List
//         </Typography>
//       </Stack>

//       {/* 🧾 Data Grid */}
//       <Box sx={{ height: 'calc(100vh - 180px)', width: '100%', overflow: 'auto' }}>
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           pageSize={10}
//           rowsPerPageOptions={[10, 25, 50]}
//           checkboxSelection
//           disableSelectionOnClick
//           components={{ Toolbar: GridToolbar }}
//           sx={{
//             bgcolor: "#fff",
//             border: "1px solid #ccc",
//             "& .MuiDataGrid-columnHeaders": {
//               backgroundColor: "#f5f5f5",
//               fontWeight: "bold",
//               position: "sticky",
//               top: 0,
//               zIndex: 1,
//             },
//             "& .MuiDataGrid-virtualScroller": {
//               overflowX: "auto",
//             },
//             "& .MuiDataGrid-cell": {
//               textAlign: "center",
//             },
//             "& .MuiDataGrid-columnHeaderTitle": {
//               textAlign: "center",
//               width: "100%",
//             },
//           }}
//         />
//       </Box>

//       {/* 🔍 Preview Popup */}
//       {showForm && (
//         <OnDutyPreview data={selectedRecord} onClose={() => setShowForm(false)} />
//       )}
//     </Box>
//   );
// };

// export default OnDutyTable;
