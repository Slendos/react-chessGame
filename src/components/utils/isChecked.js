import { showValidMoves } from "./showValidMoves";

export default function isChecked(board, color) {
  let attackedPositions = [];
  let abc;
  // filtering all /color/ pieces
  let chessPieces = board.filter(
    b => b.chessPiece && b.chessPiece.substring(0, 1) !== color
  );
  for (let i = 0; i < chessPieces.length; i++) {
    abc = showValidMoves(chessPieces[i], board);
    for (let j = 0; j < abc.length; j++) {
      if (abc[j] !== undefined) attackedPositions.push(abc[j]);
    }
  }

  // checking if any figure is checking king
  let check = attackedPositions.find(pos => pos.chessPiece === `${color}K`);

  return check ? true : false;
}
