export default function getMovementHistory(current, previous) {
  let previousPosition = previous.squareId;
  let currentPosition = current.squareId;
  let chesspiece = previous.chessPiece.substring(1, 2);

  // if not pawn
  if (chesspiece !== "P") {
    previousPosition = chesspiece + previousPosition;
  }

  // if piece is taking another piece
  if (current.chessPiece && previous.chessPiece) {
    return `${previousPosition} x ${currentPosition}`;
  } else {
    return `${previousPosition} -> ${currentPosition}`;
  }
}
