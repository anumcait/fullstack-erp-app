import React, { useState, useEffect, useRef } from "react";
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import * as XLSX from "xlsx";
import "./EmployeeMasterReport.css";

const EmployeeMasterReport = () => {
  const [filters, setFilters] = useState({
    division: "",
    department: "",
    section: "",
    maritalStatus: "",
    sex: "",
  });

  const [employeeData, setEmployeeData] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [sections, setSections] = useState([]);
  const [maritalStatuses, setMaritalStatuses] = useState([]);
  const [sexes, setSexes] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("http://localhost:5000/api/employees")
      .then((res) => res.json())
      .then((data) => setEmployeeData(data));

    fetch("http://localhost:5000/api/filters/divisions")
      .then((res) => res.json())
      .then((data) => setDivisions(["All", ...data]));

    fetch("http://localhost:5000/api/filters/departments")
      .then((res) => res.json())
      .then((data) => setDepartments(["All", ...data]));

    fetch("http://localhost:5000/api/filters/sections")
      .then((res) => res.json())
      .then((data) => setSections(["All", ...data]));

    fetch("http://localhost:5000/api/filters/marital-status")
      .then((res) => res.json())
      .then((data) => setMaritalStatuses(["All", ...data]));

    fetch("http://localhost:5000/api/filters/sexes")
      .then((res) => res.json())
      .then((data) => setSexes(["All", ...data]));
  }, []);

  const filteredData = employeeData.filter((emp) => {
    return (
      (filters.division === "" || filters.division === "All" || emp.divname === filters.division) &&
      (filters.department === "" || filters.department === "All" || emp.deptname === filters.department) &&
      (filters.section === "" || filters.section === "All" || emp.secname === filters.section) &&
      (filters.maritalStatus === "" || filters.maritalStatus === "All" || emp.marital_status === filters.maritalStatus) &&
      (filters.sex === "" || filters.sex === "All" || emp.sex === filters.sex)
    );
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
const handleExport = (type) => {
  // if (type === "PDF") {
  //   const doc = new jsPDF();

  //   // Header Title
  //   doc.setFontSize(16);
  //   doc.text("Employee Master Report", 14, 20);
  //   doc.setFontSize(11);
  //   doc.setTextColor(100);

  //   // Table Columns and Rows
  //   const tableColumn = ["Emp ID", "Name", "Sex", "DOB", "Division", "Department", "Section"];
  //   const tableRows = filteredData.map(emp => [
  //     emp.empid,
  //     emp.ename,
  //     emp.sex,
  //     emp.dob,
  //     emp.divname || "-",
  //     emp.deptname || "-",
  //     emp.secname || "-"
  //   ]);

  //   autoTable(doc, {
  //     startY: 30,
  //     head: [tableColumn],
  //     body: tableRows,
  //     theme: 'grid',
  //     styles: { fontSize: 9 },
  //     headStyles: { fillColor: [0, 117, 178], textColor: 255 },
  //   });

  //   doc.save("EmployeeMasterReport.pdf");
  // }

  // if (type === "Excel") {
  //   const worksheetData = filteredData.map(emp => ({
  //     "Emp ID": emp.empid,
  //     "Name": emp.ename,
  //     "Sex": emp.sex,
  //     "DOB": emp.dob,
  //     "Division": emp.divname || "-",
  //     "Department": emp.deptname || "-",
  //     "Section": emp.secname || "-",
  //   }));

  //   const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

  //   XLSX.writeFile(workbook, "EmployeeMasterReport.xlsx");
  // }
};



  return (
    <div className="employee-container">
      <div className="employee-section">
        <div className="employee-header">
          <span>Employee Master Report</span>
          <div className="header-buttons">
            <button className="btn" onClick={() => handleExport("Excel")}>Export to Excel</button>
            <button className="btn" onClick={() => handleExport("PDF")}>Export to PDF</button>
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Division</label>
            <select value={filters.division} onChange={(e) => setFilters({ ...filters, division: e.target.value })}>
              {divisions.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>

          <div className="form-field">
            <label>Department</label>
            <select value={filters.department} onChange={(e) => setFilters({ ...filters, department: e.target.value })}>
              {departments.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>

          <div className="form-field">
            <label>Section</label>
            <select value={filters.section} onChange={(e) => setFilters({ ...filters, section: e.target.value })}>
              {sections.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div className="form-field">
            <label>Marital Status</label>
            <select value={filters.maritalStatus} onChange={(e) => setFilters({ ...filters, maritalStatus: e.target.value })}>
              {maritalStatuses.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>

          <div className="form-field">
            <label>Gender</label>
            <select value={filters.sex} onChange={(e) => setFilters({ ...filters, sex: e.target.value })}>
              {sexes.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Emp ID</th>
                <th>Name</th>
                <th>Sex</th>
                <th>DOB</th>
                <th>Division</th>
                <th>Department</th>
                <th>Section</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((emp) => (
                <tr key={emp.empid}>
                  <td>{emp.empid}</td>
                  <td>{emp.ename}</td>
                  <td>{emp.sex}</td>
                  <td>{emp.dob}</td>
                  <td>{emp.divname || "-"}</td>
                  <td>{emp.deptname || "-"}</td>
                  <td>{emp.secname || "-"}</td>
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>No records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeMasterReport;
