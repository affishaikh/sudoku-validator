const generateArrayIndex = function*(orderOfSudoku) {
  let c = 0;
  let diff = 0;
  while (c < orderOfSudoku) {
    let a = 0;
    while (a < orderOfSudoku) {
      let b = 0;
      let actualValue = diff;
      while (b < orderOfSudoku) {
        b++;
        yield actualValue++;
      }
      a++;
    }
    c++;
    diff += orderOfSudoku;
  }
};

module.exports = { generateArrayIndex };
