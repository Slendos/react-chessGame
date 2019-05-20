export function prepareBoard() {
  let wholeBoard = Array(120);
  let board = Array(64);

  // prettier-ignore
  let startBoard = [
      "wR", "wN", "wB", "wK", "wQ", "wB", "wN", "wR",
      "wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP",
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      "bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP",
      "bR", "bN", "bB", "bK", "bQ", "bB", "bN", "bR"
    ];

  let letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
  let numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];
  for (let i = 0; i < wholeBoard.length; i++) {
    wholeBoard[i] = i;
  }

  let count = 0;

  // getting only inside of the array
  for (let i = 21; i < wholeBoard.length - 21; i++) {
    if (wholeBoard[i] % 10 === 0 || wholeBoard[i] % 10 === 9) continue;
    board[count] = wholeBoard[i];
    count++;
  }

  let c = 0;
  let obj = [];
  letters.reverse();
  // [positionOnBoard, numberedPosition, chessPiece]
  for (let k = 0; k < numbers.length; k++) {
    for (let i = 0; i < letters.length; i++) {
      obj.push({
        squareId: `${letters[i]}${numbers[k]}`,
        calcId: board[c],
        chessPiece: startBoard[c],
        id: board.length - c - 1,
        moved: false
      });
      c++;
    }
  }
  return obj.reverse();
}
