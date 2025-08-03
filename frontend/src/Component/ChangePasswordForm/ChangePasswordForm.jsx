import React, { useState } from 'react';
import './ChangePasswordForm.css';

const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    // Add your API logic here
    alert("Password changed successfully!");
  };

  return (
    <div className="cp-wrapper">
      <div className="cp-box">
        <div className="cp-title">CHANGE PASSWORD</div>
        <form onSubmit={handleChangePassword}>
          <div className="cp-group">
            <label>Type your old password<span>*</span></label>
            <input
              type="password"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="cp-group">
            <label>Type the new password<span>*</span></label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="cp-group">
            <label>Type the new password again to confirm<span>*</span></label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="cp-button">CHANGE PASSWORD</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
