import React, { useState } from 'react';
import Card from '../components/Card';
import { currentUser } from '../data/mockData';

export const Settings: React.FC = () => {
  const [fullName, setFullName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [role, setRole] = useState(currentUser.role);
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate save
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    // Note: since it's just a UI task, we don't really persist this.
  };

  return (
    <div className="settings-page animate-fade-in">
      <header className="page-header">
        <h2>User Profile</h2>
        <p className="page-subtitle">Manage your account and security settings</p>
      </header>

      {showSuccess && (
        <div className="toast-success">
          Profile updated successfully!
        </div>
      )}

      <form className="settings-form" onSubmit={handleSubmit}>
        <Card className="settings-avatar-card">
          <div className="avatar-section">
            <div className="avatar-large">{currentUser.initials}</div>
            <a href="#" className="change-photo-link" onClick={(e) => e.preventDefault()}>Change profile photo &rarr;</a>
          </div>
          <div className="avatar-info-section">
            <h3 className="avatar-name">{currentUser.name}</h3>
            <p className="avatar-email">{currentUser.email}</p>
            <span className="badge badge-success avatar-badge">{currentUser.role}</span>
          </div>
        </Card>

        <Card className="settings-section-card">
          <div className="settings-section-header">
            <h3>Personal Information</h3>
          </div>
          <hr className="settings-divider" />
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName" className="label-uppercase">FULL NAME</label>
              <input 
                type="text" 
                id="fullName" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
                placeholder="e.g. Luca Bianchi" 
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="label-uppercase">EMAIL ADDRESS</label>
              <input 
                type="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="operator@digiwater.it" 
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone" className="label-uppercase">PHONE NUMBER</label>
              <input 
                type="tel" 
                id="phone" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="+39 ..." 
              />
            </div>
            <div className="form-group">
              <label htmlFor="role" className="label-uppercase">ROLE / POSITION</label>
              <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="" disabled>Select Role...</option>
                <option value="Operator">Operator</option>
                <option value="Manager">Manager</option>
                <option value="Engineer">Engineer</option>
              </select>
            </div>
          </div>
        </Card>

        <Card className="settings-section-card">
          <div className="settings-section-header">
            <h3>Security & Password</h3>
          </div>
          <hr className="settings-divider" />
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="currentPassword" className="label-uppercase">CURRENT PASSWORD</label>
              <input 
                type="password" 
                id="currentPassword" 
                value={currentPassword} 
                onChange={(e) => setCurrentPassword(e.target.value)} 
                placeholder="........" 
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword" className="label-uppercase">NEW PASSWORD</label>
              <input 
                type="password" 
                id="newPassword" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                placeholder="Min 8 characters" 
              />
            </div>
          </div>
        </Card>

        <button type="submit" className="settings-save-btn">
          Save changes
        </button>

        <p className="settings-footer-caption">
          Last login: 07 Apr 2026 - 09:42 &middot; Turin, IT
        </p>
      </form>
    </div>
  );
};

export default Settings;
