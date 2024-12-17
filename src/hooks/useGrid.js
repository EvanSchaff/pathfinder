import { useState } from "react";
import { createGrid } from '../utils/createGrid';

function useGrid(gridSize) {
  const [grid, setGrid] = useState(createGrid(gridSize));

  function resetGrid() {
    const initialGrid = createGrid(gridSize);
    setGrid(initialGrid);
  }

  return { grid, setGrid, resetGrid };
}

export default useGrid;
