import { showValidMoves } from "./showValidMoves";
import isChecked from "./isChecked";

// kings is checked and we are trying to move with every figure, if there are no possible moves -> checkmate
export default function isCheckmate(board, color) {
  let copyBoard = [...board];
  let figures = copyBoard.filter(
    b => b.chessPiece && b.chessPiece.substring(0, 1) === color
  );
  let length = figures.length;
  let valid;
  let isEnd = true;
  for (let i = 0; i < length; i++) {
    if (!isEnd) break;
    valid = showValidMoves(figures[i], copyBoard);
    if (valid.length === 0 || valid === undefined) continue;

    for (let j = 0; j < valid.length; j++) {
      if (valid[j] === undefined) continue;

      // copy before moving previous figure position and current figure position
      let previousPosition = { ...board[figures[i].id] };
      let validCopy = { ...valid[j] };

      // move pieces
      copyBoard[valid[j].id].chessPiece = figures[i].chessPiece;
      copyBoard[figures[i].id].chessPiece = 0;

      // check if the position still has check
      if (!isChecked(copyBoard, color)) {
        isEnd = false;
      }

      // move pieces back to previous position
      copyBoard[previousPosition.id].chessPiece = previousPosition.chessPiece;
      copyBoard[validCopy.id].chessPiece = validCopy.chessPiece;

      if (!isEnd) break;
    }
  }
  return isEnd;
}
