import React, { useState } from "react";
import { FaSearch, FaSlidersH } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faSort } from '@fortawesome/free-solid-svg-icons';
import "./SmartTable.css";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";

const SmartTable = ({ title, columns, data, onPreview, onToggleExpand }) => {
  const [visibleColumns, setVisibleColumns] = useState(columns.map(col => col.field));
  const [tempVisibleColumns, setTempVisibleColumns] = useState([...visibleColumns]);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [sortConfig, setSortConfig] = useState({ field: null, direction: 'asc' });
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const toggleTempColumn = (field) => {
    setTempVisibleColumns(prev =>
      prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
    );
  };

  const handleOpenSelector = () => {
    setTempVisibleColumns([...visibleColumns]);
    setShowColumnSelector(true);
  };

  const handleApplyColumns = () => {
    setVisibleColumns([...tempVisibleColumns]);
    setShowColumnSelector(false);
  };

  const handleSort = (field) => {
    setSortConfig((prev) => {
      if (prev.field === field) {
        return { field, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { field, direction: 'asc' };
    });
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setPage(0);
  };

  const sortedData = [...data].sort((a, b) => {
    const { field, direction } = sortConfig;
    if (!field) return 0;
    const aVal = a[field]?.toString().toLowerCase() ?? '';
    const bVal = b[field]?.toString().toLowerCase() ?? '';
    return aVal.localeCompare(bVal) * (direction === 'asc' ? 1 : -1);
  });

  const filteredData = sortedData.filter((row) => {
    return Object.entries(filters).every(([field, value]) =>
      row[field]?.toString().toLowerCase().includes(value.toLowerCase())
    );
  });

  const pagedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const exportToExcel = () => {
  const exportData = filteredData.map((row) => {
    const output = {};
    visibleColumns.forEach((col) => {
      const header = columns.find((c) => c.field === col)?.header || col;
      output[header] = row[col];
    });
    return output;
  });

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, `${title || "SmartTable"}_${new Date().toISOString()}.xlsx`);
};

const exportToPDF = () => {
  const doc = new jsPDF();

  const tableColumn = visibleColumns.map((col) => {
    const colHeader = columns.find(c => c.field === col)?.header || col;
    return colHeader;
  });

  const tableRows = filteredData.map((row) =>
    visibleColumns.map((col) => row[col] ?? "")
  );

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    styles: { fontSize: 8 },
    margin: { top: 20 }
  });

  doc.save(`${title || "SmartTable"}_${new Date().toISOString()}.pdf`);
};
  return (
    <div className="smart-table-wrapper">
      {/* Header */}
      <div className="smart-table-header">
  <div className="smart-table-title">{title}</div>



        <div className="smart-column-toggle">
<div className="smart-header-actions">
  <button onClick={exportToExcel} title="Export to Excel" className="icon-button excel-btn">
    <FaFileExcel size={16} />
  </button>
    <div className="vertical-divider" />
  <button onClick={exportToPDF} title="Export to PDF" className="icon-button pdf-btn">
    <FaFilePdf size={16} />
  </button>

  <div className="vertical-divider" />

  <button onClick={handleOpenSelector} title="Displayed Columns" className="icon-button">
    <FaSlidersH size={16} />
  </button>
</div>
       
          {showColumnSelector && (
            <div className="column-selector-dropdown">
              <div className="dropdown-header">Displayed columns</div>
              <div className="select-all-row checkbox-label">
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  checked={tempVisibleColumns.length === columns.length}
                  ref={(el) => {
                    if (el) {
                      el.indeterminate =
                        tempVisibleColumns.length > 0 &&
                        tempVisibleColumns.length < columns.length;
                    }
                  }}
                  onChange={() => {
                    if (tempVisibleColumns.length === columns.length) {
                      setTempVisibleColumns([]);
                    } else {
                      setTempVisibleColumns(columns.map(col => col.field));
                    }
                  }}
                />
                <span className="dropdown-count">
                  {tempVisibleColumns.length === columns.length
                    ? "All selected"
                    : tempVisibleColumns.length === 0
                    ? "Select all"
                    : `${tempVisibleColumns.length} of ${columns.length} selected`}
                </span>
              </div>
              <hr className="dropdown-separator" />
              <div className="dropdown-columns">
                {columns.map((col, i) => (
                  <label key={i} className="checkbox-label">
                    <input
                      type="checkbox"
                      className="custom-checkbox"
                      checked={tempVisibleColumns.includes(col.field)}
                      onChange={() => toggleTempColumn(col.field)}
                    />
                    <span>{col.header}</span>
                  </label>
                ))}
              </div>
              <div className="dropdown-actions">
                <button onClick={() => setShowColumnSelector(false)}>Cancel</button>
                <button onClick={handleApplyColumns}>OK</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="smart-table-container">
        <table className="smart-table">
          <thead>
            <tr>
              {columns.filter(col => visibleColumns.includes(col.field)).map((col, colIdx) => (
                <th
                  key={colIdx}
                  className="sortable-header"
                  onClick={() => handleSort(col.field)}
                >
                  {col.header}
                  <span className="sort-icon">
                    {sortConfig.field === col.field ? (
                      <FontAwesomeIcon icon={sortConfig.direction === 'asc' ? faArrowUp : faArrowDown} />
                    ) : (
                      <FontAwesomeIcon icon={faSort} />
                    )}
                  </span>
                  <br />
                  <input
                    type="text"
                    placeholder="Filter"
                    value={filters[col.field] || ""}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleFilterChange(col.field, e.target.value)}
                    style={{ width: '100%', fontSize: '14px', marginTop: '4px' }}
                  />
                </th>
              ))}
              <th>Preview</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pagedData.map((row) => (
              <tr key={row.movement_id}>
                {columns.filter(col => visibleColumns.includes(col.field)).map((col, colIdx) => (
                  <td key={colIdx}>
                    {col.expandable ? (
                      <div
                        className={`reason-container ${row._expanded ? "expanded" : ""}`}
                        title={!row._expanded ? row[col.field] : ""}
                      >
                        <span className="reason-text">{row[col.field]}</span>
                      </div>
                    ) : (
                      row[col.field]
                    )}
                  </td>
                ))}
                <td className="preview-icon-cell">
                  <a href="#" onClick={() => onPreview && onPreview(row)} title="Preview">
                    <FaSearch size={18} color="#007bff" />
                  </a>
                </td>
                <td className="expand-icon-cell">
                  <div
                    className="expand-wrapper"
                    title={row._expanded ? "Collapse row" : "View all row content"}
                    onClick={() => onToggleExpand && onToggleExpand(row)}
                  >
                    <svg
                      viewBox="0 0 18 18"
                      width="18"
                      height="18"
                      className={`unfold-icon ${row._expanded ? "rotated" : ""}`}
                    >
                      <path d="M3.5 4.5L2 6l7 7 7-7-1.5-1.5L9 10 3.5 4.5z" />
                    </svg>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
       <div className="pagination-row">
  <div className="pagination-controls">
    <label className="rows-per-page">
      {/* Rows per page:&nbsp; */}
      <select
        value={rowsPerPage}
        onChange={(e) => {
          setRowsPerPage(Number(e.target.value));
          setPage(0);
        }}
      >
        {[5, 10, 20, 50].map((size) => (
          <option key={size} value={size}>{size}</option>
        ))}
      </select>
    </label>

    <button disabled={page === 0} onClick={() => setPage(page - 1)}>Prev</button>
    <span>
      Page <strong>{page + 1}</strong> of <strong>{Math.max(1, Math.ceil(filteredData.length / rowsPerPage))}</strong>
    </span>
    <button
      disabled={(page + 1) * rowsPerPage >= filteredData.length}
      onClick={() => setPage(page + 1)}
    >
      Next
    </button>
  </div>
</div>


      </div>
    </div>
  );
};

export default SmartTable;
