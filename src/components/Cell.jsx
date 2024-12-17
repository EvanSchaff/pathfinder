import PropTypes from 'prop-types';

function Cell({ x, y, type, onMouseDown, onContextMenu, onMouseEnter }) {
    function getCellType() {
        switch (type) {
            case 'wall':
                return 'bg-gray-800 border border-gray-700 transform transition-all duration-100 hover:scale-105';
            case 'empty':
                return 'bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-200';
            case 'end':
                return 'bg-red-500 text-white animate-pulse shadow-lg hover:bg-red-600 transition-all duration-300';
            case 'start':
                return 'bg-green-600 text-white animate-bounce shadow-md hover:bg-green-700 transition-all duration-300';
            case 'path':
                return 'bg-blue-600 animate-[wiggle_0.5s_ease-in-out] transform transition-all duration-200';
            case 'visited':
                return 'bg-blue-100 animate-[ping_1s_cubic-bezier(0,0,0.2,1)] transition-colors duration-100';
            case 'current':
                return 'bg-yellow-400 animate-[pulse_0.75s_cubic-bezier(0.4,0,0.6,1)_infinite] shadow-xl';
            default:
                return '';
        }
    }

    return (
        <div
            className={`w-6 h-6 ${getCellType()} rounded-sm cursor-pointer transition-all ease-in-out`}
            onMouseDown={(e) => onMouseDown(x, y, e)}
            onContextMenu={(e) => onContextMenu(x, y, e)}
            onMouseEnter={(e) => onMouseEnter(x, y, e)}
            onDragStart={(e) => e.preventDefault()}
        />
    );
}

Cell.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    onContextMenu: PropTypes.func.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
};

export default Cell;
