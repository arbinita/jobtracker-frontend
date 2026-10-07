import { BarChart3, Inbox, RefreshCw, CheckCircle, XCircle } from 'lucide-react';

function StatusFilters({ applications, stats, statusFilter, setStatusFilter }) {
  return (
    <section className="status-section">
      <div className="section-header">
        <span className="section-icon"><BarChart3 size={18} /></span>
        <h2>Application Status</h2>
      </div>

      <div className="status-cards">

        <div
          className={`status-card all ${statusFilter === 'ALL' ? 'active' : ''}`}
          onClick={() => setStatusFilter('ALL')}
        >
          <div className="status-card-icon"><Inbox size={20} /></div>
          <div className="status-card-info">
            <span className="status-card-label">All</span>
            <span className="status-card-value">{applications.length}</span>
          </div>
        </div>

        <div
          className={`status-card applied ${statusFilter === 'APPLIED' ? 'active' : ''}`}
          onClick={() => setStatusFilter(statusFilter === 'APPLIED' ? 'ALL' : 'APPLIED')}
        >
          <div className="status-card-icon"><Inbox size={20} /></div>
          <div className="status-card-info">
            <span className="status-card-label">Applied</span>
            <span className="status-card-value">{stats.APPLIED || 0}</span>
          </div>
        </div>

        <div
          className={`status-card interview ${statusFilter === 'INTERVIEW' ? 'active' : ''}`}
          onClick={() => setStatusFilter(statusFilter === 'INTERVIEW' ? 'ALL' : 'INTERVIEW')}
        >
          <div className="status-card-icon"><RefreshCw size={20} /></div>
          <div className="status-card-info">
            <span className="status-card-label">Interview</span>
            <span className="status-card-value">{stats.INTERVIEW || 0}</span>
          </div>
        </div>

        <div
          className={`status-card offer ${statusFilter === 'OFFER' ? 'active' : ''}`}
          onClick={() => setStatusFilter(statusFilter === 'OFFER' ? 'ALL' : 'OFFER')}
        >
          <div className="status-card-icon"><CheckCircle size={20} /></div>
          <div className="status-card-info">
            <span className="status-card-label">Offer</span>
            <span className="status-card-value">{stats.OFFER || 0}</span>
          </div>
        </div>

        <div
          className={`status-card rejected ${statusFilter === 'REJECTED' ? 'active' : ''}`}
          onClick={() => setStatusFilter(statusFilter === 'REJECTED' ? 'ALL' : 'REJECTED')}
        >
          <div className="status-card-icon"><XCircle size={20} /></div>
          <div className="status-card-info">
            <span className="status-card-label">Rejected</span>
            <span className="status-card-value">{stats.REJECTED || 0}</span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default StatusFilters;