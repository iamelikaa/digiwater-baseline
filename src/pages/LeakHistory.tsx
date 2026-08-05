import React, { useState, useMemo } from 'react';
import Card from '../components/Card';
import { districts, leakReports } from '../data/mockData';

const PAGE_SIZE = 5;

export const LeakHistory: React.FC = () => {
  const [filterDraft, setFilterDraft] = useState({
    city: '',
    district: '',
    type: '',
    fromDate: '',
    toDate: '',
  });

  const [appliedFilters, setAppliedFilters] = useState({
    city: '',
    district: '',
    type: '',
    fromDate: '',
    toDate: '',
  });

  const [currentPage, setCurrentPage] = useState(1);

  const topLevelMunicipalities = districts.filter(d => !d.parentId);
  const districtOptions = filterDraft.city 
    ? districts.filter(d => d.parentId === filterDraft.city) 
    : districts.filter(d => d.parentId);

  const handleSearch = () => {
    setAppliedFilters(filterDraft);
    setCurrentPage(1); // Reset to first page on search
  };

  // Helper to format Date string YYYY-MM-DD to DD/MM/YYYY
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  };

  // Helper to get name
  const getName = (id: string) => {
    const item = districts.find(d => d.id === id);
    return item ? item.name : id;
  };

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    // Filter
    const result = leakReports.filter(report => {
      if (appliedFilters.city && report.city !== appliedFilters.city) return false;
      if (appliedFilters.district && report.district !== appliedFilters.district) return false;
      if (appliedFilters.type && report.type !== appliedFilters.type) return false;
      if (appliedFilters.fromDate && report.date < appliedFilters.fromDate) return false;
      if (appliedFilters.toDate && report.date > appliedFilters.toDate) return false;
      return true;
    });

    // Sort by date descending
    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // Newest first
    });

    return result;
  }, [appliedFilters, leakReports.length]); // Adding leakReports.length to trigger re-render on new reports

  // Paginate
  const totalResults = filteredAndSortedData.length;
  const totalPages = Math.ceil(totalResults / PAGE_SIZE) || 1;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentData = filteredAndSortedData.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className="leak-history-page animate-fade-in">
      <header className="page-header">
        <h2>Leak History</h2>
        <p className="page-subtitle">All recorded leak interventions and reports</p>
      </header>

      <Card className="history-filter-card">
        <div className="filter-bar">
          <div className="filter-group">
            <label htmlFor="filter-city">City</label>
            <select 
              id="filter-city" 
              value={filterDraft.city} 
              onChange={(e) => {
                setFilterDraft({ ...filterDraft, city: e.target.value, district: '' });
              }}
            >
              <option value="">All cities</option>
              {topLevelMunicipalities.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="filter-district">District</label>
            <select 
              id="filter-district" 
              value={filterDraft.district} 
              onChange={(e) => setFilterDraft({ ...filterDraft, district: e.target.value })}
              disabled={!filterDraft.city}
            >
              <option value="">All districts</option>
              {districtOptions.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="filter-type">Type</label>
            <select 
              id="filter-type" 
              value={filterDraft.type} 
              onChange={(e) => setFilterDraft({ ...filterDraft, type: e.target.value })}
            >
              <option value="">Internal/External</option>
              <option value="INTERNAL">Internal</option>
              <option value="EXTERNAL">External</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="filter-from">From Date</label>
            <div className="date-input-wrapper">
              <input 
                type="date" 
                id="filter-from" 
                value={filterDraft.fromDate} 
                onChange={(e) => setFilterDraft({ ...filterDraft, fromDate: e.target.value })}
              />
            </div>
          </div>

          <div className="filter-group">
            <label htmlFor="filter-to">To Date</label>
            <div className="date-input-wrapper">
              <input 
                type="date" 
                id="filter-to" 
                value={filterDraft.toDate} 
                onChange={(e) => setFilterDraft({ ...filterDraft, toDate: e.target.value })}
              />
            </div>
          </div>

          <div className="filter-action">
            <button className="search-btn" onClick={handleSearch} aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>

        <div className="table-responsive-wrapper history-table-wrapper">
          <table className="issues-table history-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>City</th>
                <th>District</th>
                <th>Address</th>
                <th>Date</th>
                <th>Type</th>
                <th>Material</th>
                <th>Ø</th>
                <th>Reported By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((report) => (
                  <tr key={report.id} className="issue-row">
                    <td className="id-cell">{report.id}</td>
                    <td>{getName(report.city)}</td>
                    <td>{getName(report.district)}</td>
                    <td className="address-cell">{report.address}</td>
                    <td>{formatDate(report.date)}</td>
                    <td>
                      <span className={`type-badge type-${report.type.toLowerCase()}`}>
                        {report.type === 'INTERNAL' ? 'Internal' : 'External'}
                      </span>
                    </td>
                    <td>{report.material || '-'}</td>
                    <td>{report.diameter || '-'}</td>
                    <td>{report.reportedBy}</td>
                    <td>
                      <button className="view-link-btn">View +</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="empty-state">
                    No leak reports found matching the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination-bar">
          <span className="pagination-info">
            Showing {totalResults === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + PAGE_SIZE, totalResults)} of {totalResults} results
          </span>
          <div className="pagination-controls">
            <button 
              className="page-btn" 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              ← Prev
            </button>
            <button 
              className="page-btn" 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next →
            </button>
          </div>
        </div>
      </Card>

      <button className="export-data-btn">
        Export data
      </button>
    </div>
  );
};

export default LeakHistory;
