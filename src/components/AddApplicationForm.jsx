import { FileText, Plus } from 'lucide-react';
import { STATUS_OPTIONS } from '../constants/statusOptions';

function AddApplicationForm({
  companyName, setCompanyName,
  position, setPosition,
  status, setStatus,
  appliedDate, setAppliedDate,
  notes, setNotes,
  jobUrl, setJobUrl,
  editingId,
  onSubmit, onCancel
}) {
  return (
    <section className="add-section">
      <div className="section-header">
        <span className="section-icon"><FileText size={18} /></span>
        <h2>Add Application</h2>
      </div>

      <form onSubmit={onSubmit}>
        <div className="form-grid">
          <div className="form-field">
            <label>Company Name</label>
            <input placeholder="e.g. Google" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </div>
          <div className="form-field">
            <label>Position</label>
            <input placeholder="e.g. Frontend Engineer" value={position} onChange={(e) => setPosition(e.target.value)} />
          </div>
          <div className="form-field">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label>Applied Date</label>
            <input type="date" value={appliedDate} onChange={(e) => setAppliedDate(e.target.value)} />
          </div>
          <div className="form-field">
            <label>Notes</label>
            <input placeholder="Add notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
          <div className="form-field">
            <label>Job URL</label>
            <input placeholder="https://..." value={jobUrl} onChange={(e) => setJobUrl(e.target.value)} />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit">
            <Plus size={16} /> {editingId ? 'Update' : 'Add Application'}
          </button>
          {editingId && <button type="button" className="secondary" onClick={onCancel}>Cancel</button>}
        </div>
      </form>
    </section>
  );
}

export default AddApplicationForm;