const { generateArrayIndex } = require("./generator");

const isRowValid = function(row) {
  return function(isValid, number) {
    if (!isValid) return isValid;
    if (row.includes(number)) return false;
    row.push(number);
    return true;
  };
};

const areAllRowsValid = function(sudoku) {
  return sudoku.every(row => row.reduce(isRowValid([]), true));
};

const transpose = function([...matrix]) {
  const transposeMatrix = new Array(matrix[0].length).fill(1).map(() => []);

  for (let row = 0; row < matrix[0].length; row++) {
    for (let col = 0; col < matrix.length; col++) {
      transposeMatrix[row][col] = matrix[col][row];
    }
  }
  return transposeMatrix;
};

const areAllColsValid = function(sudoku) {
  const transposeSudoku = transpose(sudoku);
  return areAllRowsValid(transposeSudoku);
};

const transformer = function(partialResult, row) {
  let lowerLimit = 0;
  let upperLimit = 3;
  for (let i = 0; i < row.length / 3; i++) {
    partialResult.result[
      partialResult.generator.next().value
    ] = partialResult.result[i].concat(row.slice(lowerLimit, upperLimit));
    lowerLimit += 3;
    upperLimit += 3;
  }
  return partialResult;
};

const transformGridsToRow = function(sudoku) {
  const orderOfSudoku = sudoku.length / 3;
  const generator = generateArrayIndex(orderOfSudoku);
  const result = new Array(orderOfSudoku * orderOfSudoku)
    .fill(() => 1)
    .map(() => []);
  return sudoku.reduce(transformer, { result, generator });
};

const areAllGridsValid = function(sudoku) {
  const transformedSudoku = transformGridsToRow(sudoku);
  return areAllRowsValid(transformedSudoku.result);
};

const sudoku1 = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9]
];

const sudoku2 = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24, 25, 26, 27],
  [28, 29, 30, 31, 32, 33, 34, 35, 36],
  [37, 38, 39, 40, 41, 42, 43, 44, 45],
  [46, 47, 48, 49, 50, 51, 52, 53, 54],
  [55, 56, 57, 58, 59, 60, 61, 62, 63],
  [64, 65, 66, 67, 68, 69, 70, 71, 72],
  [73, 74, 75, 76, 77, 78, 79, 80, 81]
];

const isSudokuValid = function(sudoku) {
  return (
    areAllRowsValid(sudoku) &&
    areAllColsValid(sudoku) &&
    areAllGridsValid(sudoku)
  );
};

console.log(isSudokuValid(sudoku2));
