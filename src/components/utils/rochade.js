import isChecked from "./isChecked";

function smallRochade(board, clicked, color) {
  board[clicked.id + 1].chessPiece = 0;
  board[clicked.id - 1].chessPiece = `${color}K`;
  return board;
}

function bigRochade(board, clicked, color) {
  board[clicked.id - 2].chessPiece = 0;
  board[clicked.id + 1].chessPiece = `${color}K`;
  return board;
}

export default function rochadeMove(previous, clicked, board) {
  // deep copy
  let boardCopy = JSON.parse(JSON.stringify(board));

  let difference = previous.calcId - clicked.calcId;
  let color = previous.chessPiece.substring(0, 1);
  // SMALL ROCHADE
  if (difference === 2) {
    board = smallRochade(board, clicked, color);
    // check if king isn't going through checked squares
    let checked = isChecked(board, color);
    if (checked) {
      return board;
    } else {
      board[clicked.id - 1].chessPiece = `${color}R`;
      return board;
    }
  }
  // BIG ROCHADE
  if (difference === -2) {
    board = bigRochade(board, clicked, color);
    // check if king isn't going through checked squares
    let checked = isChecked(board, color);
    if (checked) {
      return board;
    } else {
      board[clicked.id + 1].chessPiece = `${color}R`;
      return board;
    }
  }

  return board;
}
