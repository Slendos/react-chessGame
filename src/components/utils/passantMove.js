export default function passantMove(board, lastMove, current, previous) {
  let currentIndex = parseInt(lastMove.from.squareId.substring(1, 2));
  let prevIndex = parseInt(lastMove.to.squareId.substring(1, 2));
  let color = lastMove.from.chessPiece.substring(0, 1);

  if (prevIndex - currentIndex === 2 || prevIndex - currentIndex === -2) {
    if (
      lastMove.to.calcId + 10 === current.calcId ||
      lastMove.to.calcId - 10 === current.calcId
    ) {
      if (previous.calcId + 1 === lastMove.to.calcId || previous.calcId - 1 === lastMove.to.calcId) {
        if (color === "w") {
          board[lastMove.to.id].chessPiece = 0;
        } else {
          board[lastMove.to.id].chessPiece = 0;
        }
      }
    }
  }
  return board;
}