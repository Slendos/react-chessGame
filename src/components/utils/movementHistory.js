export default function getMovementHistory(current, previous) {
  let previousPosition = previous.squareId;
  let currentPosition = current.squareId;
  let chesspiece = previous.chessPiece.substring(1, 2);

  if (chesspiece !== "P") {
    previousPosition = chesspiece + previousPosition;
  }
  if (current.chessPiece && previous.chessPiece) {
    return `${previousPosition} x ${currentPosition}`;
  }

  return `${previousPosition} -> ${currentPosition}`;
}
