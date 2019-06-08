export default function movePiece(board, current, previous) {
  // move piece
  board[current.id].chessPiece = previous.chessPiece;
  // remove piece from previous position
  board[previous.id].chessPiece = 0;
  board[current.id].moved = true;
  return board;
}
