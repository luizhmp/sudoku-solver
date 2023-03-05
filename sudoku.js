/* 
Write a function that will solve a 9x9 Sudoku puzzle. The function will take one argument consisting of 
the 2D puzzle array, with the value 0 representing an unknown square. The Sudokus tested against your 
function will be "easy" (i.e. determinable; there will be no need to assume and test possibilities 
on unknowns) and can be solved with a brute-force approach.  

Example:

var puzzle = [
            [5,3,0,0,7,0,0,0,0],
            [6,0,0,1,9,5,0,0,0],
            [0,9,8,0,0,0,0,6,0],
            [8,0,0,0,6,0,0,0,3],
            [4,0,0,8,0,3,0,0,1],
            [7,0,0,0,2,0,0,0,6],
            [0,6,0,0,0,0,2,8,0],
            [0,0,0,4,1,9,0,0,5],
            [0,0,0,0,8,0,0,7,9]];

sudoku(puzzle);
 Should return
[[5,3,4,6,7,8,9,1,2],
[6,7,2,1,9,5,3,4,8],
[1,9,8,3,4,2,5,6,7],
[8,5,9,7,6,1,4,2,3],
[4,2,6,8,5,3,7,9,1],
[7,1,3,9,2,4,8,5,6],
[9,6,1,5,3,7,2,8,4],
[2,8,7,4,1,9,6,3,5],
[3,4,5,2,8,6,1,7,9]]

var puzzle2 = [ [3, 0, 6, 5, 0, 8, 4, 0, 0],
[5, 2, 0, 0, 0, 0, 0, 0, 0],
[0, 8, 7, 0, 0, 0, 0, 3, 1],
[0, 0, 3, 0, 1, 0, 0, 8, 0],
[9, 0, 0, 8, 6, 3, 0, 0, 5],
[0, 5, 0, 0, 9, 0, 6, 0, 0], 
[1, 3, 0, 0, 0, 0, 2, 5, 0],
[0, 0, 0, 0, 0, 0, 0, 7, 4],
[0, 0, 5, 2, 0, 6, 3, 0, 0] ]

should return

[[3 1 6 5 7 8 4 9 2],
[5 2 9 1 3 4 7 6 8],
[4 8 7 6 2 9 5 3 1],
[2 6 3 4 1 5 9 8 7],
[9 7 4 8 6 3 1 2 5],
[8 5 1 7 9 2 6 4 3],
[1 3 8 9 4 7 2 5 6],
[6 9 2 3 5 1 8 7 4],
[7 4 5 2 8 6 3 1 9]]
*/

const sudokuMatrix = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const solvedSudokuMatrix = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

const sudokuMatrix2 = [
  [3, 0, 6, 5, 0, 8, 4, 0, 0],
  [5, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 8, 7, 0, 0, 0, 0, 3, 1],
  [0, 0, 3, 0, 1, 0, 0, 8, 0],
  [9, 0, 0, 8, 6, 3, 0, 0, 5],
  [0, 5, 0, 0, 9, 0, 6, 0, 0],
  [1, 3, 0, 0, 0, 0, 2, 5, 0],
  [0, 0, 0, 0, 0, 0, 0, 7, 4],
  [0, 0, 5, 2, 0, 6, 3, 0, 0],
];

const solvedSudokuMatrix2 = [
  [3, 1, 6, 5, 7, 8, 4, 9, 2],
  [5, 2, 9, 1, 3, 4, 7, 6, 8],
  [4, 8, 7, 6, 2, 9, 5, 3, 1],
  [2, 6, 3, 4, 1, 5, 9, 8, 7],
  [9, 7, 4, 8, 6, 3, 1, 2, 5],
  [8, 5, 1, 7, 9, 2, 6, 4, 3],
  [1, 3, 8, 9, 4, 7, 2, 5, 6],
  [6, 9, 2, 3, 5, 1, 8, 7, 4],
  [7, 4, 5, 2, 8, 6, 3, 1, 9],
];

const sudokuMatrix3 = [
  [0, 0, 0, 6, 0, 0, 4, 0, 0],
  [7, 0, 0, 0, 0, 3, 6, 0, 0],
  [0, 0, 0, 0, 9, 1, 0, 8, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 5, 0, 1, 8, 0, 0, 0, 3],
  [0, 0, 0, 3, 0, 6, 0, 4, 5],
  [0, 4, 0, 2, 0, 0, 0, 6, 0],
  [9, 0, 3, 0, 0, 0, 0, 0, 0],
  [0, 2, 0, 0, 0, 0, 1, 0, 0],
];

const solvedSudokuMatrix3 = [
  [5, 8, 1, 6, 7, 2, 4, 3, 9],
  [7, 9, 2, 8, 4, 3, 6, 5, 1],
  [3, 6, 4, 5, 9, 1, 7, 8, 2],
  [4, 3, 8, 9, 5, 7, 2, 1, 6],
  [2, 5, 6, 1, 8, 4, 9, 7, 3],
  [1, 7, 9, 3, 2, 6, 8, 4, 5],
  [8, 4, 5, 2, 1, 9, 3, 6, 7],
  [9, 1, 3, 7, 6, 8, 5, 2, 4],
  [6, 2, 7, 4, 3, 5, 1, 9, 8],
];

function checkIfCellIsEmpty(value) {
  return value === 0;
}

function transformRowsIntoColumns(matrix) {
  let [row] = matrix;

  return row.map((_, column) => matrix.map((row) => row[column]));
}

function checkIfRowHasDuplicates(row) {
  let hasDuplicates = false;
  for (rowValueIndex = 0; rowValueIndex < row.length; rowValueIndex++) {
    const rowValue = row[rowValueIndex];
    const isCellEmpty = checkIfCellIsEmpty(rowValue);

    if (isCellEmpty) {
      continue;
    }

    for (
      nextRowValueIndex = rowValueIndex + 1;
      nextRowValueIndex < row.length;
      nextRowValueIndex++
    ) {
      const nextRowValue = row[nextRowValueIndex];

      const isNextCellEmpty = checkIfCellIsEmpty(nextRowValue);

      if (isNextCellEmpty) {
        continue;
      }

      hasDuplicates = rowValue === nextRowValue;

      if (hasDuplicates) {
        return (hasDuplicates = true);
      }
    }
  }

  return hasDuplicates;
}

function checkIfHasDuplicatesInAllRows(matrix) {
  let hasDuplicates = false;
  for (rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    const currentRow = matrix[rowIndex];

    hasDuplicates = checkIfRowHasDuplicates(currentRow);

    if (hasDuplicates) {
      return (hasDuplicates = true);
    }
  }

  return hasDuplicates;
}

function checkIfHasDuplicatesInColumns(matrix) {
  const rowsIntoColumnsMatrix = transformRowsIntoColumns(matrix);

  const hasDuplicates = checkIfHasDuplicatesInAllRows(rowsIntoColumnsMatrix);

  return hasDuplicates;
}

function checkIfHasDuplicatesInBlocks(matrix) {
  const BOX_SIZE = 9;
  let startRowValueIndex = 0;

  let endOfBlockColumnIndex = 3;
  let hasDuplicates = false;
  let matrixBlockInRow = [];

  for (rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    const isLastRowInMatrix = rowIndex === matrix.length - 1;

    const currentRow = matrix[rowIndex];

    for (
      currentRowValueIndex = startRowValueIndex;
      currentRowValueIndex < endOfBlockColumnIndex;
      currentRowValueIndex++
    ) {
      const currentRowValue = currentRow[currentRowValueIndex];

      matrixBlockInRow.push(currentRowValue);
    }

    const isEndOfBlock = matrixBlockInRow.length === BOX_SIZE;

    if (isEndOfBlock) {
      const hasDuplicatesInBlock = checkIfRowHasDuplicates(matrixBlockInRow);

      if (hasDuplicatesInBlock) {
        return (hasDuplicates = true);
      }

      matrixBlockInRow = [];
    }

    const isLastBlock = startRowValueIndex === 6;
    const shouldResetAndContinue = isLastRowInMatrix && !isLastBlock;

    if (shouldResetAndContinue) {
      rowIndex = -1;
      startRowValueIndex += 3;
      endOfBlockColumnIndex += 3;
    }
  }

  return hasDuplicates;
}

function solveSudoku(sudokuMatrix) {
  for (let rowIndex = 0; rowIndex < sudokuMatrix.length; rowIndex++) {
    const currentRow = sudokuMatrix[rowIndex];
    for (
      let columnIndex = 0;
      columnIndex < sudokuMatrix.length;
      columnIndex++
    ) {
      const currentRowValue = currentRow[columnIndex];
      const isCellEmpty = checkIfCellIsEmpty(currentRowValue);

      if (isCellEmpty) {
        for (let value = 1; value <= 9; value++) {
          sudokuMatrix[rowIndex][columnIndex] = value;

          const isNumberValid =
            !checkIfHasDuplicatesInAllRows(sudokuMatrix) &&
            !checkIfHasDuplicatesInColumns(sudokuMatrix) &&
            !checkIfHasDuplicatesInBlocks(sudokuMatrix);

          if (isNumberValid) {
            if (solveSudoku(sudokuMatrix)) {
              return sudokuMatrix;
            }
          }
          sudokuMatrix[rowIndex][columnIndex] = 0;
        }

        return false;
      }
    }
  }

  return sudokuMatrix;
}

console.log("Sudoku matrix to be solved:");
console.table(solveSudoku(sudokuMatrix));
console.log("Solved sudoku matrix:");
console.table(solvedSudokuMatrix);
