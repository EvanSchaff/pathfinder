const DIRECTIONS = [
  { dx: 1, dy: 0 },   // Move right
  { dx: 0, dy: 1 },   // Move down
  { dx: -1, dy: 0 },  // Move left
  { dx: 0, dy: -1 }   // Move up
];

export function generateMaze(grid) {
  const height = grid.length;
  const width = grid[0].length;
  const steps = [];

  // Set the start and end points
  grid[1][0].type = "start"; 
  grid[height - 2][width - 1].type = "end";

  // Initialize all cells to walls except start and end points
  for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
          if (grid[y][x].type !== 'start' && grid[y][x].type !== 'end') {
              grid[y][x].type = 'wall';
          }
      }
  }

  // Start carving passages from the point (1, 1)
  carvePassage(1, 1, grid, steps);
  
  // Mark the start and end points as empty spaces (paths)
  grid[1][1].type = 'empty';
  grid[height - 2][width - 2].type = 'empty';
  
  return { grid, steps }; 
}

// Recursively carve passages 
function carvePassage(y, x, grid, steps) {
  // Shuffle directions 
  DIRECTIONS.sort(() => Math.random() - 0.5);

  // Try each direction
  for (const direction of DIRECTIONS) {
      const newY = y + (direction.dy * 2);
      const newX = x + (direction.dx * 2);

      // Check if the new position is within bounds and is a wall
      if (newY > 0 && newY < grid.length - 1 && 
          newX > 0 && newX < grid[0].length - 1 && 
          grid[newY][newX].type === 'wall') {

          // Carve the passage by marking the new cell and the connecting cell as empty
          grid[newY][newX].type = 'empty';
          grid[y + direction.dy][x + direction.dx].type = 'empty';

          // Record the steps taken
          steps.push({ y: newY, x: newX }); 
          steps.push({ y: y + direction.dy, x: x + direction.dx }); 
          
          // Recursively carve from the new position
          carvePassage(newY, newX, grid, steps);
      }
  }
}
