import { useState } from "react";
import PropTypes from "prop-types";
import Cell from './Cell';

function Grid({ grid, setGrid, disabled }) {
  const [isDrawing, setIsDrawing] = useState(false);

  // Handle Mouse Down Event
  function handleMouseDown(x, y, e) {
    if (!disabled) {
      if (e.button === 0) { // Left click
        if (e.shiftKey) {
          handleStartPosition(x, y);
        } else {
          setIsDrawing(true);
          handleLeftClick(x, y);
        }
      }
    }
  }

  // Handle Mouse Up Event
  function handleMouseUp() {
    setIsDrawing(false);
  }

  // Handle Mouse Enter Event for Dragging Walls
  function handleMouseEnter(x, y) {
    if (isDrawing) {
      const newGrid = [...grid];
      const cell = newGrid[y][x];
      if (cell.type !== 'start' && cell.type !== 'end') {
        cell.type = 'wall';
        setGrid(newGrid);
      }
    }
  }

  // Toggle Wall / Empty Cell on Left Click
  function handleLeftClick(x, y) {
    const newGrid = [...grid];
    const cell = newGrid[y][x];
    if (cell.type !== 'start' && cell.type !== 'end') {
      cell.type = cell.type === 'wall' ? 'empty' : 'wall';
      setGrid(newGrid);
    }
  }

  // Handle Right Click to Set End Position
  function handleRightClick(x, y, e) {
    e.preventDefault();
    if (!disabled) {
      const newGrid = [...grid];
      // Remove any previous end point
      newGrid.forEach(row => row.forEach(cell => {
        if (cell.type === 'end') cell.type = 'empty';
      }));
      newGrid[y][x].type = 'end';
      setGrid(newGrid);
    }
  }

  // Handle Shift + Left Click to Set Start Position
  function handleStartPosition(x, y) {
    const newGrid = [...grid];
    // Remove any previous start point
    newGrid.forEach(row => row.forEach(cell => {
      if (cell.type === 'start') cell.type = 'empty';
    }));
    newGrid[y][x].type = 'start';
    setGrid(newGrid);
  }

  return (
    <div
      className="bg-gray-100 rounded-lg p-2 shadow-md border-2 border-gray-200 inline-block"
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setIsDrawing(false)}
      onDragStart={(e) => e.preventDefault()}
    >
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell) => (
            <Cell
              key={`${cell.x}-${cell.y}`}
              x={cell.x}
              y={cell.y}
              type={cell.type}
              onMouseDown={handleMouseDown}
              onContextMenu={handleRightClick}
              onMouseEnter={handleMouseEnter}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

Grid.propTypes = {
  grid: PropTypes.array.isRequired,
  setGrid: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Grid;
