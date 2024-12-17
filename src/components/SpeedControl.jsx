import PropTypes from 'prop-types';

function SpeedControl({ animationSpeed, setAnimationSpeed }) {
  // Function to handle the change in the animation speed
  const handleSpeedChange = (e) => {
    const newSpeed = 101 - parseInt(e.target.value, 10);
    setAnimationSpeed(newSpeed);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col items-center space-y-3">
        <label className="text-lg font-medium text-gray-700">Animation Speed</label>
        <div className="w-full max-w-[200px]">
          <input 
            type="range"
            min="1"
            max="100"
            value={101 - animationSpeed} // Invert the speed for the range input
            onChange={handleSpeedChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>Slow</span>
            <span>Fast</span>
          </div>
        </div>
      </div>
    </div>
  );
}

SpeedControl.propTypes = {
  animationSpeed: PropTypes.number.isRequired, 
  setAnimationSpeed: PropTypes.func.isRequired, 
};

export default SpeedControl;
