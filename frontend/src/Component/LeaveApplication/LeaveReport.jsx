import React, { useState, useEffect } from "react";
import axios from "axios";
import SmartTable from "../../Component/Common/SmartTable";
import LeavePreview from "./LeavePreview";

const LeaveTable = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/leave/report`);
        const formatted = res.data.map((row, index) => ({
          sno: index + 1,
          _expanded: false,
          ...row,
        }));
        setData(formatted);
      } catch (err) {
        console.error("Failed to fetch leave data:", err);
      }
    };
    fetchLeaveData();
  }, []);

  const handleExpand = (targetRow) => {
    const updated = data.map((row) =>
      row.leave_id === targetRow.leave_id
        ? { ...row, _expanded: !row._expanded }
        : row
    );
    setData(updated);
  };

  const columns = [
    { header: "S.No.", field: "sno" },
    { header: "Leave ID", field: "leave_id" },
    { header: "Emp ID", field: "empid" },
    { header: "Name", field: "ename" },
    { header: "Unit", field: "unit" },
    { header: "Type", field: "leave_type" },
    { header: "From", field: "from_date" },
    { header: "To", field: "to_date" },
    { header: "Reason", field: "reason", expandable: true },
  ];

  return (
    <>
      <SmartTable
        title="Leave Report"
        columns={columns}
        data={data}
        onPreview={(row) => {
          setSelectedRecord(row);
          setShowForm(true);
        }}
        onToggleExpand={handleExpand}
      />

      {showForm && (
        <LeavePreview data={selectedRecord} onClose={() => setShowForm(false)} />
      )}
    </>
  );
};

export default LeaveTable;

// import React, { useState, useEffect, useMemo } from "react";
// import {
//   Box,
//   Button,
//   Stack,
//   TextField,
//   Typography,
//   Divider,
//   Paper
// } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import axios from "axios";

// const LeaveReport = () => {
//   const [rows, setRows] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");

//   const columns = useMemo(
//     () => [
//       { field: "empid", headerName: "Emp ID", flex: 1, width: 100 },
//       { field: "ename", headerName: "Name", flex: 2, width: 150 },
//       { field: "pofl", headerName: "Purpose", flex: 2,width: 150 },
//       { field: "frmdt", headerName: "From Date", flex: 2,width: 120 },
//       { field: "todate", headerName: "To Date", flex: 2,width: 120 },
//       { field: "nod", headerName: "Days", flex: 2,width: 80 },
//       { field: "remarks", headerName: "Remarks", flex: 3, minWidth: 150  }
//     ],
//     []
//   );

//   useEffect(() => {
//     const fetchReport = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API_URL}/leave/report`);
//         const flatData = res.data.flatMap((app) =>
//           app.leaveDetails.map((detail) => ({
//             empid: app.empid,
//             ename: app.ename,
//             pofl: app.pofl,
//             frmdt: detail.frmdt,
//             todate: detail.todate,
//             nod: detail.nod,
//             remarks: detail.remarks,
//             id: `${app.empid}-${detail.frmdt}-${detail.todate}`
//           }))
//         );
//         setRows(flatData);
//       } catch (err) {
//         console.error("Failed to fetch leave report:", err);
//       }
//     };

//     fetchReport();
//   }, []);

//   const filteredRows = useMemo(() => {
//     return rows.filter((row) => {
//       const matchesSearch = Object.values(row).some((value) =>
//         String(value).toLowerCase().includes(searchText.toLowerCase())
//       );

//       const matchesDate =
//         (!fromDate || new Date(row.frmdt) >= new Date(fromDate)) &&
//         (!toDate || new Date(row.todate) <= new Date(toDate));

//       return matchesSearch && matchesDate;
//     });
//   }, [rows, searchText, fromDate, toDate]);

//   const groupedData = useMemo(() => {
//     const grouped = {};
//     filteredRows.forEach((row) => {
//       const key = `${row.empid} - ${row.ename}`;
//       if (!grouped[key]) grouped[key] = [];
//       grouped[key].push(row);
//     });
//     return grouped;
//   }, [filteredRows]);

//   const exportToExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(filteredRows);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "LeaveReport");
//     XLSX.writeFile(wb, "LeaveReport.xlsx");
//   };

//   const exportToPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Leave Report", 14, 10);
//     autoTable(doc, {
//       startY: 20,
//       head: [["Emp ID", "Name", "Purpose", "From", "To", "Days", "Remarks"]],
//       body: filteredRows.map((row) => [
//         row.empid,
//         row.ename,
//         row.pofl,
//         row.frmdt,
//         row.todate,
//         row.nod,
//         row.remarks
//       ])
//     });
//     doc.save("LeaveReport.pdf");
//   };

//   return (
//     <Box sx={{ p: 2 }}>
//       <Typography variant="h4" gutterBottom>
//         Leave Application Report
//       </Typography>

//       <Stack
//   direction="row"
//   spacing={2}
//   mb={2}
//   flexWrap="wrap"
//   useFlexGap
//   alignItems="center"
// >
//         <TextField
//           label="Search"
//           size="small"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//         />
//         <TextField
//           label="From Date"
//           type="date"
//           size="small"
//           InputLabelProps={{ shrink: true }}
//           value={fromDate}
//           onChange={(e) => setFromDate(e.target.value)}
//         />
//         <TextField
//           label="To Date"
//           type="date"
//           size="small"
//           InputLabelProps={{ shrink: true }}
//           value={toDate}
//           onChange={(e) => setToDate(e.target.value)}
//         />
//         <Button variant="contained" onClick={exportToExcel}>
//           Export Excel
//         </Button>
//         <Button variant="outlined" onClick={exportToPDF}>
//           Export PDF
//         </Button>
//       </Stack>

//       {Object.entries(groupedData).map(([emp, leaves]) => (
//         <Box key={emp} sx={{ mb: 4 }}>
//           <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
//             {emp}
//           </Typography>
//           <Divider />
//          <Paper sx={{ width: '100%', '@media (max-width:600px)': {
//       '& .MuiDataGrid-columnHeaderTitle': {
//         fontSize: '0.75rem'
//       }
//     }}}>
//   <DataGrid
//     rows={leaves}
//     columns={columns}
//     autoHeight // this makes height based on row count
//     disableRowSelectionOnClick
//     hideFooterPagination
//     //disableColumnMenu
//     sx={{
//       '& .MuiDataGrid-columnHeaders': {
//         backgroundColor: '#f5f5f5',
//       },
//       '& .MuiDataGrid-columnHeader': {
//         backgroundColor: '#fffff5',
//         borderBottom: '4px solid #ccc !important' ,
//       },
//       '& .MuiDataGrid-columnHeaderTitle': {
//         color: '#1976d2',
//         fontWeight: 'bold',
//       },
//     }}

//   />
// </Paper>

//         </Box>
//       ))}
//     </Box>
//   );
// };

// export default LeaveReport;
