import './modal.css';
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <dialog open className="modal-dialog">
        <div className="modal-content">{children}</div>
      </dialog>
    </div>
  );
}
export default Modal;
