import pieces from "./figuresMovement";

export function showValidMoves(clickedPiece, board, lastMove, check) {
  let pieceName = clickedPiece.chessPiece.substring(1, 2);
  let piece = new pieces(board, clickedPiece, lastMove, check);
  return piece[pieceName]();
}
