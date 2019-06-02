import { showValidMoves } from "./showValidMoves";

export default function isChecked(board, color) {
  let attackedPositions = [];
  let validMoves;

  // picking all /color/ pieces
  let chessPieces = board.filter(
    b => b.chessPiece && b.chessPiece.substring(0, 1) !== color
  );

  // picking all positions that are pieces attacking
  for (let i = 0; i < chessPieces.length; i++) {
    validMoves = showValidMoves(chessPieces[i], board);
    for (let j = 0; j < validMoves.length; j++) {
      if (validMoves[j] !== undefined) attackedPositions.push(validMoves[j]);
    }
  }

  // checking if any figure is checking king
  let check = attackedPositions.find(pos => pos.chessPiece === `${color}K`);

  return check ? true : false;
}
