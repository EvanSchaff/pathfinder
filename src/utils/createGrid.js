export function createGrid(size) {
    const newGrid = [];
    for (let row = 0; row < size.rows; row++) {
      const rowCells = [];
      for (let col = 0; col < size.cols; col++) {
        rowCells.push({x: col, y: row, type:'empty'});
      }
      newGrid.push(rowCells);
    }
    return newGrid;
  }