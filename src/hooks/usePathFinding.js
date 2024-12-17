import { useState, useEffect } from "react";
import { findPathWithSteps, findPoint } from '../utils/pathFinding';
import { toast } from 'react-hot-toast';

function usePathFinding(grid, setGrid, animationSpeed) {
  const [pathFindingSteps, setPathFindingSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPathAnimating, setIsPathAnimating] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  function submitGrid() {
    const startPoint = findPoint(grid, 'start');
    const endPoint = findPoint(grid, 'end');

    if (!startPoint || !endPoint) {
      toast.error('Please set both start and end points', { duration: 3000, position: 'top-center' });
      return;
    }

    setStart(startPoint);
    setEnd(endPoint);

    const { steps, shortestPath } = findPathWithSteps(grid, startPoint, endPoint);

    if (shortestPath) {
      setPathFindingSteps(steps);
      setCurrentStep(0);
      setIsAnimating(true);
      setIsPathAnimating(false);
    } else {
      toast.error('No valid path!', { duration: 3000, position: 'top-center' });
    }
  }

  // Animate grid during pathFinding
  function animatePathFinding() {
    if (isAnimating && currentStep < pathFindingSteps.length) {
      const timer = setTimeout(() => {
        const newGrid = grid.map(row => [...row]);
        const currentStepData = pathFindingSteps[currentStep];

        markVisitedCells(newGrid, currentStepData.visited);
        highlightCurrentCell(newGrid, currentStepData.current);

        // If path animation should start
        if (currentStepData.path) {
          setIsAnimating(false);
          setIsPathAnimating(true);
          setCurrentStep(0);
        }

        setGrid(newGrid);
        setCurrentStep(prev => prev + 1);
      }, animationSpeed);

      return () => clearTimeout(timer);
    }
  }

  function animateShortestPath() {
    if (isPathAnimating) {
      const pathSteps = pathFindingSteps[pathFindingSteps.length - 1].path;
      
      if (currentStep < pathSteps.length) {
        const timer = setTimeout(() => {
          const newGrid = grid.map(row => [...row]);
          
          // Highlight the path up to the current step, stopping before the end point
          highlightPath(newGrid, pathSteps.slice(0, currentStep + 1));
          setGrid(newGrid);
          setCurrentStep(prev => prev + 1);
          
          // Stop path animation when reaching the last step before the end point
          if (currentStep === pathSteps.length - 2) {
            setIsPathAnimating(false);
          }
        }, animationSpeed * 3);
        
        setIsFinished(true);
        return () => clearTimeout(timer);
      }
    }
  }

  function markVisitedCells(newGrid, visitedCells) {
    if (visitedCells) {
      visitedCells.forEach(cell => {
        if (newGrid[cell.y][cell.x].type === 'empty') {
          newGrid[cell.y][cell.x] = { ...newGrid[cell.y][cell.x], type: 'visited' };
        }
      });
    }
  }

  function highlightCurrentCell(newGrid, currentCell) {
    if (currentCell) {
      const { x, y } = currentCell;
      if (newGrid[y][x].type !== 'start' && newGrid[y][x].type !== 'end') {
        newGrid[y][x] = { ...newGrid[y][x], type: 'current' };
      }
    }
  }

  function highlightPath(newGrid, path) {
    path.forEach(cell => {
      if (cell.x !== start.x || cell.y !== start.y) {
        newGrid[cell.y][cell.x] = { ...newGrid[cell.y][cell.x], type: 'path' };
      }
    });
  }

  useEffect(() => {
    animatePathFinding();
  }, [currentStep, isAnimating, pathFindingSteps, grid]);

  useEffect(() => {
    animateShortestPath();
  }, [currentStep, isPathAnimating, pathFindingSteps, start, end, grid]);

  const resetPathFinding = () => {
    setPathFindingSteps([]);
    setCurrentStep(0);
    setIsAnimating(false);
    setIsPathAnimating(false);
    setStart(null);
    setEnd(null);
    setIsFinished(false);
  };

  return {
    submitGrid,
    resetPathFinding,
    isAnimating,
    isPathAnimating,
    isFinished
  };
}

export default usePathFinding;
