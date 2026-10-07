function DeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Delete Application</h3>
        <p>Are you sure you want to delete this application?</p>
        <div className="modal-actions">
          <button type="button" className="danger" onClick={onConfirm}>Delete</button>
          <button type="button" className="secondary" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;