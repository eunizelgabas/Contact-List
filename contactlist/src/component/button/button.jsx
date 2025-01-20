import './button.css';
function Button({ children, textOnly, icon, className, ...props }) {
  let cssClasses = textOnly ? "text-button" : icon ? "icon" : "button";
  cssClasses += " " + className;

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}
export default Button;
