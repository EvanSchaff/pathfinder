import PropTypes from 'prop-types';

function GenerateButton({ onClick, disabled }) {
  return (
    <button
      type="button"
      className={`
        px-6 py-3
        bg-red-600
        text-white
        rounded-lg
        shadow-md
        transition-all
        duration-300
        hover:bg-red-700
        hover:shadow-lg
        focus:outline-none
        focus:ring-2
        focus:ring-red-500
        focus:ring-opacity-50
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      Generate
    </button>
  );
}

GenerateButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default GenerateButton;
