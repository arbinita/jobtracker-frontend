import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { getApplications, createApplication, updateApplication, deleteApplication } from './api/applicationApi';
import AddApplicationForm from './components/AddApplicationForm';
import StatusFilters from './components/StatusFilters';
import ApplicationsTable from './components/ApplicationsTable';
import EditModal from './components/EditModal';
import DeleteModal from './components/DeleteModal';
import { LogOut, ClipboardList } from 'lucide-react';

function App() {
  const navigate = useNavigate();
  const applicationsRef = useRef(null);

  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [companyName, setCompanyName] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('APPLIED');
  const [notes, setNotes] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [sortBy, setSortBy] = useState('date');
  const [appliedDate, setAppliedDate] = useState(new Date().toISOString().split('T')[0]);

  const fetchApplications = () => {
    getApplications()
      .then((res) => setApplications(res.data))
      .catch((err) => console.error('Error fetching applications:', err));
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const filteredApplications = applications
    .filter((app) => {
      const matchesSearch = app.companyName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.appliedDate) - new Date(a.appliedDate);
      if (sortBy === 'company') {
        return a.companyName.trim().toLowerCase().localeCompare(b.companyName.trim().toLowerCase());
      }
      return 0;
    });

  const stats = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  const resetForm = () => {
    setCompanyName('');
    setPosition('');
    setStatus('APPLIED');
    setNotes('');
    setJobUrl('');
    setEditingId(null);
    setAppliedDate(new Date().toISOString().split('T')[0]);
    setIsEditModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      companyName: companyName.trim(),
      position: position.trim(),
      status,
      appliedDate,
      notes,
      jobUrl
    };

    if (editingId) {
      updateApplication(editingId, payload)
        .then(() => { resetForm(); fetchApplications(); })
        .catch((err) => console.error('Error updating application:', err));
    } else {
      createApplication(payload)
        .then(() => { resetForm(); fetchApplications(); })
        .catch((err) => console.error('Error adding application:', err));
    }
  };

  const handleEdit = (app) => {
    setEditingId(app.id);
    setCompanyName(app.companyName);
    setPosition(app.position);
    setStatus(app.status);
    setNotes(app.notes || '');
    setJobUrl(app.jobUrl || '');
    setAppliedDate(app.appliedDate);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    deleteApplication(deleteId)
      .then(() => { setDeleteId(null); fetchApplications(); })
      .catch((err) => console.error('Error deleting application:', err));
  };

  const getStatusClass = (status) => status.toLowerCase();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    setTimeout(() => {
      applicationsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  return (
    <div className="container">
      <header className="app-header">
        <div>
          <h1>Job Tracker</h1>
          <p className="app-subtitle">Track your applications and keep your job search organized.</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={16} /> Log Out
        </button>
      </header>

      <AddApplicationForm
        companyName={companyName} setCompanyName={setCompanyName}
        position={position} setPosition={setPosition}
        status={status} setStatus={setStatus}
        appliedDate={appliedDate} setAppliedDate={setAppliedDate}
        notes={notes} setNotes={setNotes}
        jobUrl={jobUrl} setJobUrl={setJobUrl}
        editingId={editingId}
        onSubmit={handleSubmit}
        onCancel={resetForm}
      />

      {isEditModalOpen && (
        <EditModal
          companyName={companyName} setCompanyName={setCompanyName}
          position={position} setPosition={setPosition}
          status={status} setStatus={setStatus}
          appliedDate={appliedDate} setAppliedDate={setAppliedDate}
          notes={notes} setNotes={setNotes}
          jobUrl={jobUrl} setJobUrl={setJobUrl}
          onSubmit={handleSubmit}
          onCancel={resetForm}
        />
      )}

      <StatusFilters
        applications={applications}
        stats={stats}
        statusFilter={statusFilter}
        setStatusFilter={handleStatusFilterChange}
      />

      <section className="applications-section" ref={applicationsRef}>
        <div className="section-header">
          <span className="section-icon"><ClipboardList size={18} /></span>
          <h2>Applications <span className="count-badge">({applications.length})</span></h2>
        </div>

        <div className="filters">
          <input
            type="text"
            placeholder="Search company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Sort by Date</option>
            <option value="company">Sort by Company</option>
          </select>
        </div>

        <ApplicationsTable
          applications={filteredApplications}
          onEdit={handleEdit}
          onDelete={handleDelete}
          getStatusClass={getStatusClass}
        />
      </section>

      {deleteId && (
        <DeleteModal
          onConfirm={confirmDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}

export default App;