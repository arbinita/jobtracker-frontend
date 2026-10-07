import { ExternalLink, Pencil, Trash2 } from 'lucide-react';

function ApplicationsTable({ applications, onEdit, onDelete, getStatusClass }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Position</th>
            <th>Status</th>
            <th>Applied Date</th>
            <th>Notes</th>
            <th>Job URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.length === 0 ? (
            <tr>
              <td colSpan="7" className="empty-state">No applications found.</td>
            </tr>
          ) : (
            applications.map((app) => (
              <tr key={app.id}>
                <td><strong>{app.companyName}</strong></td>
                <td>{app.position}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(app.status)}`}>
                    {app.status}
                  </span>
                </td>
                <td>{app.appliedDate}</td>
                <td>{app.notes || '-'}</td>
                <td>
                  {app.jobUrl ? (
                    <a href={app.jobUrl} target="_blank" rel="noreferrer" className="job-link">
                      <ExternalLink size={14} /> Open
                    </a>
                  ) : '-'}
                </td>
                <td className="actions">
                  <button className="icon-action edit" onClick={() => onEdit(app)} title="Edit">
                    <Pencil size={15} />
                  </button>
                  <button className="icon-action delete" onClick={() => onDelete(app.id)} title="Delete">
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicationsTable;