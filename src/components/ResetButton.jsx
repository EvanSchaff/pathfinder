import PropTypes from 'prop-types';

function ResetButton({ onClick, disabled }) {
  return (
    <button
      type="button"
      className={`
        px-6 py-3
        bg-blue-600
        text-white
        rounded-lg
        shadow-md
        transition-all
        duration-300
        hover:bg-blue-700
        hover:shadow-lg
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:ring-opacity-50
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      Reset
    </button>
  );
}

ResetButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired, 
};

export default ResetButton;
