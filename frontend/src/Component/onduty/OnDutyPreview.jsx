import React from "react";
import "./OnDutyPreview.css";
import logo from "../../assets/images/EQIC_Image.jpg";

// 📆 Utility: Format date to DD-MMM-YYYY
const formatDate = (dateStr) => {
  if (!dateStr) return "--";
  const date = new Date(dateStr);

  const pad = (num) => num.toString().padStart(2, '0');

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // Months are 0-indexed
  const year = date.getFullYear();

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${day}-${month}-${year} ${hours}:${minutes}`;
};

const formatMovDate = (dateStr) => {
  if (!dateStr) return "--";
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`; 
};
const formatTime = (timeStr) => {
  if (!timeStr) return "--";
  const date = new Date(`1970-01-01T${timeStr}`);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`; // Output: 21:00
};
const OnDutyPreview = ({ data = {}, onClose }) => {
  const {
    movement_id = "--",
    movement_date = "--",
    empid = "--",
    ename = "--",
    unit = "--",
    division = "--",
    designation = "--",
    section = "--",
    shift = "--",
    act_date="--",
    perm_ftime = "--",
    perm_ttime = "--",
    no_of_hrs = "--",
    reason_perm = "--"
  } = data;
let submissionStatus = "";
if (act_date && movement_date) {
  const movement = new Date(movement_date);
  const actual = new Date(act_date);
  if (actual > movement) {
    submissionStatus = "BEFORE SUBMISSION";
  } else {
    submissionStatus = "AFTER SUBMISSION";
  }
}
  return (
    <div className="onduty-print-overlay">
      <div className="onduty-print-container">
        {/* Header */}
        <div className="onduty-print-header">
          <img src={logo} alt="Logo" className="onduty-logo" />
          <div className="onduty-company-title">
            AUCTOR HOME APPLIANCES LLP
            <br />
            <span className="onduty-slip-title">ON DUTY PERMISSION SLIP</span>
          </div>
        {submissionStatus && (
  <div className="onduty-before-box">{submissionStatus}</div>
)}
        </div>

        {/* Details Table */}
        <table className="onduty-field-table">
          <tbody>
            <tr>
              <td className="label">S.No</td>
              <td className="colon">:</td>
              <td className="value">{movement_id}</td>

              <td className="label">Date</td>
              <td className="colon">:</td>
              <td className="value">{formatDate(movement_date)}</td>
            </tr>
            <tr>
              <td className="label">Emp Id</td>
              <td className="colon">:</td>
              <td className="value">{empid}</td>

              <td className="label">Emp Name</td>
              <td className="colon">:</td>
              <td className="value">{ename}</td>
            </tr>
            <tr>
              <td className="label">Unit</td>
              <td className="colon">:</td>
              <td className="value">{unit}</td>

              <td className="label">Division</td>
              <td className="colon">:</td>
              <td className="value">{division}</td>
            </tr>
            <tr>
              <td className="label">Designation</td>
              <td className="colon">:</td>
              <td className="value">{designation}</td>

              <td className="label">Section</td>
              <td className="colon">:</td>
              <td className="value">{section}</td>
            </tr>
            <tr>
              <td className="label">Shift</td>
              <td className="colon">:</td>
              <td className="value">{shift}</td>
              <td></td>
              <td className="colon"></td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <hr />

        {/* Movement Details (One Row) */}
        <table className="onduty-field-table">
          <tbody>
            <tr>
              <td className="label">Movement Date</td>
              <td className="colon">:</td>
              <td className="value">{act_date?.slice(0, 10).split('-').reverse().join('-')}</td>

              <td className="label">From</td>
              <td className="colon">:</td>
              <td className="value">{formatTime(perm_ftime)}</td>

              <td className="label">To</td>
              <td className="colon">:</td>
              <td className="value">{formatTime(perm_ttime)}</td>

              <td className="label">Hours</td>
              <td className="colon">:</td>
              <td className="value">{no_of_hrs}</td>
            </tr>
            <tr>
              <td className="label">Reason</td>
              <td className="colon">:</td>
              <td className="value" colSpan={9}>{reason_perm}</td>
            </tr>
            {/* <tr>
  <td className="label">Movement Date</td>
  <td className="colon">:</td>
  <td className="value" colSpan={6} style={{ whiteSpace: "nowrap" }}>
    {formatDate(movement_date)}&nbsp;&nbsp;
    <strong>From:</strong>&nbsp;{perm_ftime}&nbsp;&nbsp;
    <strong>To:</strong>&nbsp;{perm_ttime}&nbsp;&nbsp;
    <strong>Hours:</strong>&nbsp;{no_of_hrs || "--"}
  </td>
</tr> */}
          </tbody>
        </table>

        <hr />

        {/* Signatures */}
        <table className="onduty-signature-grid">
          <tbody>
            <tr>
              <td>
                <br /><br /><br />
                <strong>Employee</strong><br />
                Signature
              </td>
              <td>
                <strong>Recommended</strong><br />
                Name: <br />
                E.I.D No.: <br /><br />
                Signature
              </td>
              <td>
                <strong>Approved</strong><br />
                Name:<br />
                E.I.D No.:<br /><br />
                Signature
              </td>
              <td>
                <br /><br /><br />
                <strong>Authorized</strong><br />
                Signature
              </td>
              <td>
                <br /><br /><br />
                <strong>HRM</strong>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Notes */}
        <div className="onduty-note">
          * Up to Operators level approved signature is sufficient<br />
          * Above Operators level Authorized signature is also must
        </div>

        {/* Actions */}
        <div className="onduty-actions no-print">
          <button onClick={() => window.print()}>Print</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default OnDutyPreview; 