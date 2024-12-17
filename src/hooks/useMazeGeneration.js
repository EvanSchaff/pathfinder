import { useState, useEffect } from "react";
import { generateMaze } from '../utils/mazeGenerator';
import { createGrid } from '../utils/createGrid';

function useMazeGeneration(grid, gridSize, setGrid, animationSpeed) {
  const [mazeSteps, setMazeSteps] = useState([]);
  const [currentMazeStep, setCurrentMazeStep] = useState(0);
  const [isMazeAnimating, setIsMazeAnimating] = useState(false);

  function generateRandomMaze() {
    const { steps } = generateMaze(createGrid(gridSize));

    const initialGrid = createGrid(gridSize);
    initializeGridWithWalls(initialGrid);

    setGrid(initialGrid);
    setMazeSteps(steps);
    setCurrentMazeStep(0);
    setIsMazeAnimating(true);
  }

  // Initialize the grid with walls
  function initializeGridWithWalls(grid) {
    for (let row = 0; row < gridSize.rows; row++) {
      for (let col = 0; col < gridSize.cols; col++) {
        grid[row][col].type = 'wall';
      }
    }
  }

  // Effect to animate the maze generation
  useEffect(() => {
    if (isMazeAnimating && currentMazeStep < mazeSteps.length) {
      const timer = setTimeout(() => {
        const newGrid = updateGridWithMazeStep(currentMazeStep);
        setGrid(newGrid);
        setCurrentMazeStep(prev => prev + 1);

        // If maze generation is complete, set start and end points
        if (currentMazeStep === mazeSteps.length - 1) {
          finalizeMaze(newGrid);
        }
      }, animationSpeed);

      return () => clearTimeout(timer);
    }
  }, [currentMazeStep, isMazeAnimating, mazeSteps, grid, setGrid]);

  // Update the grid with the current maze step
  function updateGridWithMazeStep(stepIndex) {
    const newGrid = grid.map(row => [...row]);
    const { x, y } = mazeSteps[stepIndex];

    newGrid[y][x].type = 'empty';

    return newGrid;
  }

  // Finalize the maze by setting start and end points
  function finalizeMaze(grid) {
    grid[1][0].type = 'start'; 
    grid[gridSize.rows - 2][gridSize.cols - 1].type = 'end';
    setIsMazeAnimating(false);
  }

  return { generateRandomMaze, isMazeAnimating };
}

export default useMazeGeneration;
