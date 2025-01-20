import "./inputField.css";
function InputField({ label, id, error, ...props }) {
  const inputClassName = error ? "input error" : "input";
  return (
    <div className="input-field">
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <input id={id} name={id} {...props} className={inputClassName} />
      {error && <div className="error">{error}</div>}
      {/* Display the error message */}
    </div>
  );
}
export default InputField;
