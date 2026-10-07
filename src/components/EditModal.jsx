export const STATUS_OPTIONS = ['APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED', 'WITHDRAWN'];

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
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Edit Application</h3>
        <form onSubmit={onSubmit}>
          <input placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          <input placeholder="Position" value={position} onChange={(e) => setPosition(e.target.value)} />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>
))}
          </select>
          <input type="date" value={appliedDate} onChange={(e) => setAppliedDate(e.target.value)} />
          <input placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
          <input placeholder="Job URL" value={jobUrl} onChange={(e) => setJobUrl(e.target.value)} />
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