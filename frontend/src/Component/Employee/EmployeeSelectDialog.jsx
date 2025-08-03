import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Table, TableHead, TableRow, TableCell, TableBody,
  TextField
} from '@mui/material';

export default function EmployeeSelectDialog({ open, onClose, onSelect, data = [] }) {
  const [searchText, setSearchText] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const tableRef = useRef(null);

  const filteredData = data.filter(emp =>
    emp.empid.toString().includes(searchText) ||
    emp.ename.toLowerCase().includes(searchText.toLowerCase()) ||
    emp.unit?.toLowerCase().includes(searchText.toLowerCase()) ||
    emp.division?.toLowerCase().includes(searchText.toLowerCase()) ||
    emp.designation?.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!open) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex(prev => Math.min(prev + 1, filteredData.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex(prev => Math.max(prev - 1, 0));
      }
      if (e.key === "Enter" && highlightedIndex >= 0) {
        e.preventDefault();
        onSelect(filteredData[highlightedIndex]);
      }
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, highlightedIndex, filteredData, onClose, onSelect]);

  useEffect(() => {
    if (highlightedIndex >= 0 && tableRef.current) {
      const row = tableRef.current.querySelector(`tr[data-index="${highlightedIndex}"]`);
      row?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Select Employee</DialogTitle>
      <DialogContent dividers>
        <TextField
          fullWidth
          placeholder="Search by ID, Name, Unit, Division..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setHighlightedIndex(0);
          }}
          size="small"
          sx={{ mb: 2 }}
        />
        <Table size="small" ref={tableRef}>
          <TableHead>
            <TableRow>
              <TableCell>Emp ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Division</TableCell>
              <TableCell>Designation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((emp, index) => (
              <TableRow
                key={emp.empid}
                data-index={index}
                hover
                selected={index === highlightedIndex}
                onClick={() => onSelect(emp)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>{emp.empid}</TableCell>
                <TableCell>{emp.ename}</TableCell>
                <TableCell>{emp.unit}</TableCell>
                <TableCell>{emp.division}</TableCell>
                <TableCell>{emp.designation}</TableCell>
              </TableRow>
            ))}
            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">No matching records</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close (ESC)</Button>
      </DialogActions>
    </Dialog>
  );
}
