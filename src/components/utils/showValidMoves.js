import pieces from "./figuresMovement";

export function showValidMoves(clickedPiece, board, lastMove) {
  let pieceName = clickedPiece.chessPiece.substring(1, 2);
  let piece = new pieces(board, clickedPiece, lastMove);
  return piece[pieceName]();
}
