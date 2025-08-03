import React, { useState, useEffect } from "react";
import axios from "axios";
import OnDutyPreview from "./OnDutyPreview";
import SmartTable from "../../Component/Common/SmartTable";

const OnDutyTable = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/onduty/all`);
        const formatted = res.data.map((row, index) => ({
          sno: index + 1,
          _expanded: false,
          ...row,
        }));
        setData(formatted);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };
    fetchData();
  }, []);

  const handleExpand = (targetRow) => {
    const updated = data.map((row) =>
      row.movement_id === targetRow.movement_id
        ? { ...row, _expanded: !row._expanded }
        : row
    );
    setData(updated);
  };

  const columns = [
    { header: "S.No.", field: "sno" },
    { header: "Movement ID", field: "movement_id" },
    { header: "Emp ID", field: "empid" },
    { header: "Name", field: "ename" },
    { header: "Unit", field: "unit" },
    { header: "Division", field: "division" },
    { header: "Designation", field: "designation" },
    { header: "Reason", field: "reason_perm", expandable: true },
  ];

  return (
    <>
      <SmartTable
        title="On Duty List"
        columns={columns}
        data={data}
        onPreview={(row) => {
          setSelectedRecord(row);
          setShowForm(true);
        }}
        onToggleExpand={handleExpand}
      />

      {showForm && (
        <OnDutyPreview data={selectedRecord} onClose={() => setShowForm(false)} />
      )}
    </>
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
