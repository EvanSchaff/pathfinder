const DIRECTIONS = [
  { dx: 1, dy: 0 },   // Move right
  { dx: 0, dy: 1 },   // Move down
  { dx: -1, dy: 0 },  // Move left
  { dx: 0, dy: -1 }   // Move up
];

export function findPoint(grid, type) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x].type === type) {
        return { x, y };
      }
    }
  }
  return null; 
}

function reconstructPath(previous, start, end) {
  const path = [];
  let current = { ...end };

  // Reconstruct path by following the previous cells from the end to the start
  while (current.x !== start.x || current.y !== start.y) {
    path.unshift(current); // Add current position to the front of the path
    current = previous[current.y][current.x];

    if (!current) return null;
  }

  // Add the start point to the path
  path.unshift(start);
  return path;
}

export function findPathWithSteps(grid, start, end) {
  const rows = grid.length;
  const cols = grid[0].length;
  const steps = [];

  // Initialize distance and previous arrays
  const distances = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const previous = Array.from({ length: rows }, () => Array(cols).fill(null));

  // Priority queue initialized with the start point
  const queue = [{ ...start, distance: 0 }];
  distances[start.y][start.x] = 0;

  while (queue.length > 0) {
    // Sort queue by distance and get the closest cell
    queue.sort((a, b) => a.distance - b.distance);
    const current = queue.shift();

    // Collect visited cells for visualization
    const visitedCells = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (distances[y][x] !== Infinity) {
          visitedCells.push({ x, y });
        }
      }
    }

    // Add current step for visualization
    steps.push({ current, visited: visitedCells });

    // If the end point is found, reconstruct the path and return
    if (current.x === end.x && current.y === end.y) {
      const shortestPath = reconstructPath(previous, start, end);
      steps.push({ current, visited: visitedCells, path: shortestPath });
      return { steps, shortestPath };
    }

    // Check neighboring cells to continue the search
    for (const direction of DIRECTIONS) {
      const nextX = current.x + direction.dx;
      const nextY = current.y + direction.dy;

      // Skip walls and out-of-bounds cells
      if (
        nextX >= 0 && nextX < cols &&
        nextY >= 0 && nextY < rows &&
        grid[nextY][nextX].type !== 'wall'
      ) {
        const newDistance = current.distance + 1;

        // If a shorter path to the neighbor is found, update and add it to the queue
        if (newDistance < distances[nextY][nextX]) {
          distances[nextY][nextX] = newDistance;
          previous[nextY][nextX] = current;
          queue.push({
            x: nextX,
            y: nextY,
            distance: newDistance
          });
        }
      }
    }
  }

  // If no path is found, return empty steps and null path
  return { steps: [], shortestPath: null };
}
