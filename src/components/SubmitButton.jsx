import PropTypes from 'prop-types';

function SubmitButton({ onClick, disabled }) {
  const buttonClasses = `
    px-6 py-3 
    bg-green-600 
    text-white 
    rounded-lg 
    shadow-md 
    transition-all 
    duration-300 
    hover:bg-green-700 
    hover:shadow-lg 
    focus:outline-none 
    focus:ring-2 
    focus:ring-green-500 
    focus:ring-opacity-50
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
  `;

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      Submit
    </button>
  );
}

SubmitButton.propTypes = {
  onClick: PropTypes.func.isRequired,  
  disabled: PropTypes.bool.isRequired, 
};

export default SubmitButton;
