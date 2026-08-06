import React, { useState } from 'react';
import Card from '../components/Card';
import { districts, leakReports, type LeakReport } from '../data/mockData';

export const ReportLeak: React.FC = () => {
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState<'INTERNAL' | 'EXTERNAL'>('INTERNAL');
  const [material, setMaterial] = useState('');
  const [diameter, setDiameter] = useState('');
  const [notes, setNotes] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const topLevelMunicipalities = districts.filter(d => !d.parentId);
  const districtOptions = city ? districts.filter(d => d.parentId === city) : [];

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
    setDistrict('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city || !district || !address || !date || !type) return;

    // Match the seeded "#001" / "#002" style IDs instead of a raw timestamp,
    // so newly submitted reports look consistent with existing data.
    const nextNumber = leakReports.length + 1;
    const newReport: LeakReport = {
      id: `#${String(nextNumber).padStart(3, '0')}`,
      city,
      district,
      address,
      date,
      type,
      material: material || undefined,
      diameter: diameter || undefined,
      reportedBy: 'operator@digiwater.it',
      notes: notes || undefined,
    };

    leakReports.push(newReport);
    
    // Reset form
    setCity('');
    setDistrict('');
    setAddress('');
    setDate('');
    setType('INTERNAL');
    setMaterial('');
    setDiameter('');
    setNotes('');
    
    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="report-leak-page animate-fade-in">
      <header className="page-header">
        <h2>Report Leak</h2>
        <p className="page-subtitle">Record and submit a new verified leak intervention</p>
      </header>

      <Card className="report-leak-card">
        <div className="card-header">
          <h3>Leak Intervention Form</h3>
          <p className="card-subtitle">Fill in all required fields to record this intervention.</p>
        </div>

        {showSuccess && (
          <div className="toast-success">
            Report submitted successfully!
          </div>
        )}

        <form className="leak-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <select id="city" value={city} onChange={handleCityChange} required>
                <option value="" disabled>Select city...</option>
                {topLevelMunicipalities.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="district">District</label>
              <select id="district" value={district} onChange={(e) => setDistrict(e.target.value)} required disabled={!city}>
                <option value="" disabled>Select district...</option>
                {districtOptions.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="address">Address of the fix</label>
              <input 
                type="text" 
                id="address" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                placeholder="e.g. Via Roma 12, Marene" 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date of intervention</label>
              <input 
                type="date" 
                id="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                required 
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group toggle-group">
              <label className="label-uppercase">
                TYPE OF REPORTING <span className="label-subtext">(reported by citizens or external parties)</span>
              </label>
              <div className="segmented-toggle">
                <button 
                  type="button" 
                  className={`toggle-btn ${type === 'INTERNAL' ? 'active' : ''}`}
                  onClick={() => setType('INTERNAL')}
                >
                  <span className="toggle-icon">{type === 'INTERNAL' ? '●' : '○'}</span> INTERNAL
                </button>
                <button 
                  type="button" 
                  className={`toggle-btn ${type === 'EXTERNAL' ? 'active' : ''}`}
                  onClick={() => setType('EXTERNAL')}
                >
                  <span className="toggle-icon">{type === 'EXTERNAL' ? '●' : '○'}</span> EXTERNAL
                </button>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="material" className="label-uppercase">PIPE MATERIAL <span className="label-subtext">— optional</span></label>
              <select id="material" value={material} onChange={(e) => setMaterial(e.target.value)}>
                <option value="" disabled>ACCIAIO / PEAD / FCA</option>
                <option value="ACCIAIO">ACCIAIO</option>
                <option value="PEAD">PEAD</option>
                <option value="FCA">FCA</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="diameter" className="label-uppercase">PIPE DIAMETER <span className="label-subtext">— optional</span></label>
              <input 
                type="text" 
                id="diameter" 
                value={diameter} 
                onChange={(e) => setDiameter(e.target.value)} 
                placeholder="e.g. 110 mm" 
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="notes" className="label-uppercase">ADDITIONAL NOTES <span className="label-subtext">— optional</span></label>
            <textarea 
              id="notes" 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
              placeholder="Any additional context or observations..."
              rows={4}
            />
          </div>

          <button type="submit" className="submit-report-btn">
            Submit Report
          </button>
        </form>
      </Card>
    </div>
  );
};

export default ReportLeak;
