import { useState } from "react";
import { Toaster } from 'react-hot-toast';
import Grid from './components/Grid';
import ResetButton from './components/ResetButton';
import SubmitButton from './components/SubmitButton';
import Legend from './components/Legend';
import SpeedControl from './components/SpeedControl';
import GenerateButton from './components/GenerateButton';
import usePathFinding from './hooks/usePathFinding';
import useMazeGeneration from './hooks/useMazeGeneration';
import useGrid from './hooks/useGrid';

function App() {
  const gridSize = { rows: 25, cols: 41 };
  const { grid, setGrid, resetGrid } = useGrid(gridSize);
  const [animationSpeed, setAnimationSpeed] = useState(40);

  // Path finding and maze generation hooks
  const {
    submitGrid,
    resetPathFinding,
    isAnimating,
    isPathAnimating,
    isFinished
  } = usePathFinding(grid, setGrid, animationSpeed);

  const { generateRandomMaze, isMazeAnimating } = useMazeGeneration(
    grid, gridSize, setGrid, animationSpeed
  );

  const handleResetGrid = () => {
    resetGrid();
    resetPathFinding();
  };

  return (
    <div className="mt-10">
      {/* Toast Notifications */}
      <Toaster />

      {/* Action Buttons */}
      <div className="flex flex-row justify-center gap-20">
        <SubmitButton 
          onClick={submitGrid} 
          disabled={isAnimating || isPathAnimating || isFinished || isMazeAnimating} 
        />
        <ResetButton 
          onClick={handleResetGrid} 
          disabled={isAnimating || isPathAnimating || isMazeAnimating} 
        />
        <GenerateButton 
          onClick={generateRandomMaze} 
          disabled={isAnimating || isPathAnimating || isFinished || isMazeAnimating} 
        />
      </div>

      {/* Main Grid and Controls Layout */}
      <div className="mt-10 grid grid-cols-[1fr_auto_1fr] gap-8 justify-center items-center">
        {/* Left Spacer */}
        <div></div>

        {/* Grid Display */}
        <div className="justify-self-center">
          <Grid
            gridSize={gridSize}
            grid={grid}
            setGrid={setGrid}
            disabled={isAnimating || isPathAnimating || isFinished || isMazeAnimating}
          />
        </div>

        {/* Right Controls (Speed Control & Legend) */}
        <div className="justify-self-start">
          <div>
            <SpeedControl 
              animationSpeed={animationSpeed} 
              setAnimationSpeed={setAnimationSpeed} 
            />
          </div>
          <div className="mt-6">
            <Legend />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
