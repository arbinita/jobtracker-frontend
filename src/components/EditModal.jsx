import { Pencil } from 'lucide-react';
import { STATUS_OPTIONS } from '../constants/statusOptions';

function EditModal({
  companyName, setCompanyName,
  position, setPosition,
  status, setStatus,
  appliedDate, setAppliedDate,
  notes, setNotes,
  jobUrl, setJobUrl,
  onSubmit, onCancel
}) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content edit-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-header-icon"><Pencil size={18} /></span>
          <h3>Edit Application</h3>
        </div>

        <form onSubmit={onSubmit}>
          <div className="edit-grid">
            <div className="form-field">
              <label htmlFor="edit-company">Company</label>
              <input id="edit-company" placeholder="Company name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            </div>

            <div className="form-field">
              <label htmlFor="edit-position">Position</label>
              <input id="edit-position" placeholder="Job title" value={position} onChange={(e) => setPosition(e.target.value)} />
            </div>

            <div className="form-field">
              <label htmlFor="edit-status">Status</label>
              <select id="edit-status" value={status} onChange={(e) => setStatus(e.target.value)}>
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="edit-date">Applied date</label>
              <input id="edit-date" type="date" value={appliedDate} onChange={(e) => setAppliedDate(e.target.value)} />
            </div>

            <div className="form-field span-2">
              <label htmlFor="edit-url">Job URL</label>
              <input id="edit-url" placeholder="https://..." value={jobUrl} onChange={(e) => setJobUrl(e.target.value)} />
            </div>

            <div className="form-field span-2">
              <label htmlFor="edit-notes">Notes</label>
              <textarea id="edit-notes" rows="3" placeholder="Anything worth remembering" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
          </div>

          <div className="modal-actions">
            <button type="submit">Update Application</button>
            <button type="button" className="secondary" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;