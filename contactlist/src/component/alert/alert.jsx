import './alert.css';
function Alert({message}) {
  return (
    <div className="alert">
      <span>{message}</span>
    </div>
  );
}
export default Alert;
