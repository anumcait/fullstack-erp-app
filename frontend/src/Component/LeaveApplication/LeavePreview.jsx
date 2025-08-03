import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const LeavePreview = ({ data, onClose }) => {
  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Leave Preview
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1"><strong>Employee ID:</strong> {data.empid}</Typography>
        <Typography variant="body1"><strong>Name:</strong> {data.ename}</Typography>
        <Typography variant="body1"><strong>Leave Type:</strong> {data.leave_type}</Typography>
        <Typography variant="body1"><strong>From:</strong> {data.from_date}</Typography>
        <Typography variant="body1"><strong>To:</strong> {data.to_date}</Typography>
        <Typography variant="body1"><strong>Reason:</strong> {data.reason}</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default LeavePreview;
