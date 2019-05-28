// !!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// P - PAWN
// B - BISHOP
// N - KNIGHT
// R - ROOK
// Q - QUEEN
// K - KING
//
// !!!!!!!!!!!!!!!!!!!!!!!!!!!

export default class pieces {
  constructor(data, piece, lastMove, isChecked) {
    this.data = data;
    this.piece = piece;
    this.lastMove = lastMove;
    this.isChecked = isChecked;
  }

  // PAWN's MOVES
  P() {
    if (this.piece.chessPiece === "wP") {
      return pMoves(this.data, this.piece, 10, this.lastMove);
    } else {
      return pMoves(this.data, this.piece, -10, this.lastMove);
    }
  }

  // BISHOP's MOVES
  B() {
    return bMovesRMoves(this.data, this.piece, [-11, 11, 9, -9]);
  }

  // KNIGHT's MOVES
  N() {
    let board = this.data;
    let move;
    let moves = [];
    let kingMoves = [-19, 19, 8, -8, 12, -12, 21, -21];
    for (let i = 0; i < 9; i++) {
      move = board.find(
        b =>
          b.calcId === this.piece.calcId + kingMoves[i] &&
          (b.chessPiece === 0 ||
            b.chessPiece.substring(0, 1) !==
              this.piece.chessPiece.substring(0, 1))
      );
      if (move) {
        moves.push(move);
      }
    }

    return moves;
  }

  // ROOK's MOVES
  R() {
    return bMovesRMoves(this.data, this.piece, [-10, 10, 1, -1]);
  }

  // QUEEN's MOVES
  Q() {
    let moves = [];
    // queen moves as bishop and rook together
    let rookPiece = new pieces(this.data, this.piece);
    moves = rookPiece.R();
    let bishopPiece = new pieces(this.data, this.piece);
    moves = moves.concat(bishopPiece.B());

    return moves;
  }

  // KING's moves
  K() {
    let board = this.data;
    let move;
    let moves = [];
    let kingMoves = [10, -10, 1, -1, 9, -9, 11, -11];

    // king can move around himself
    for (let i = 0; i < kingMoves.length; i++) {
      move = board.find(
        b =>
          b.calcId === this.piece.calcId + kingMoves[i] &&
          (b.chessPiece === 0 ||
            b.chessPiece.substring(0, 1) !==
              this.piece.chessPiece.substring(0, 1))
      );
      if (move) {
        moves.push(move);
      }
    }

    // if king is checked player can't do rochade
    if (this.isChecked) return moves;
    // SMALL ROCHADE
    let x1 = board.find(b => b.chessPiece === 0 && b.calcId === this.piece.calcId - 1); // prettier-ignore
    let x2 = board.find(b => b.chessPiece === 0 && b.calcId === this.piece.calcId - 2); // prettier-ignore
    let x3 = board.find(b => b.calcId === this.piece.calcId - 3); // prettier-ignore
    if (!this.piece.moved && x1 && x2 && x3.moved === false)
      moves.push(board.find(b => b.calcId === this.piece.calcId - 2));

    // BIG ROCHADE
    x1 = board.find(b => b.chessPiece === 0 && b.calcId === this.piece.calcId + 1); // prettier-ignore
    x2 = board.find(b => b.chessPiece === 0 && b.calcId === this.piece.calcId + 2); // prettier-ignore
    x3 = board.find(b => b.chessPiece === 0 && b.calcId === this.piece.calcId + 3); // prettier-ignore
    let x4 = board.find(b => b.calcId === this.piece.calcId + 4); // prettier-ignore;
    if (!this.piece.moved && x1 && x2 && x3 && x4.moved === false)
      moves.push(board.find(b => b.calcId === this.piece.calcId + 2));

    return moves;
  }
}

// PAWN MOVEMENT
function pMoves(data, piece, value, lastMove) {
  let moves = [];
  let board = data;
  let options = [piece.calcId + value - 1, piece.calcId + value + 1];
  let move;

  for (let i = 0; i < options.length; i++) {
    move = board.find(
      b =>
        b.calcId === options[i] &&
        b.chessPiece !== 0 &&
        b.chessPiece.substring(0, 1) !== piece.chessPiece.substring(0, 1)
    );
    move ? moves.push(move) : (move = false);
  }

  move = board.find(
    b => b.calcId === piece.calcId + value && b.chessPiece === 0
  );
  move ? moves.push(move) : (move = false);

  if (lastMove) {
    let previousNumber = lastMove.from.squareId.substring(1, 2);
    let currentNumber = lastMove.to.squareId.substring(1, 2);
    if (previousNumber === "2" && currentNumber === "4") {
      if (lastMove.to.calcId === piece.calcId + 1) {
        move = board.find(m => m.calcId === piece.calcId - 9);
        moves.push(move);
      } else if (lastMove.to.calcId === piece.calcId - 1) {
        move = board.find(m => m.calcId === piece.calcId - 11);
        moves.push(move);
      }
    } else if (previousNumber === "7" && currentNumber === "5") {
      if (lastMove.to.calcId === piece.calcId + 1) {
        move = board.find(m => m.calcId === piece.calcId + 11);
        moves.push(move);
      } else if (lastMove.to.calcId === piece.calcId - 1) {
        move = board.find(m => m.calcId === piece.calcId + 9);
        moves.push(move);
      }
    }
  }

  if (!move) return moves;
  if (!piece.moved) {
    move = board.find(
      b => b.calcId === piece.calcId + value * 2 && b.chessPiece === 0
    );
    moves.push(move);
  }

  return moves;
}

// BISHOP AND ROOK MOVEMENT
function bMovesRMoves(data, piece, moveCoordinates) {
  let board = [...data];
  let id = [piece.calcId, piece.calcId, piece.calcId, piece.calcId];
  let moves = [];
  let move;
  let failCount = 0;
  let obstacle = false;

  // bishop and rook are moving in 4 directions
  while (failCount < 4) {
    move = board.find(
      b =>
        b.calcId === id[failCount] + moveCoordinates[failCount] &&
        (b.chessPiece === 0 ||
          b.chessPiece.substring(0, 1) !== piece.chessPiece.substring(0, 1))
    );

    id[failCount] = id[failCount] + moveCoordinates[failCount];

    // check if we didn't find move or we found opponent's piece that we can take
    if (!move || obstacle) {
      failCount++;
      obstacle = false;
      continue;
    }
    moves.push(move);

    let chessPiece = move.chessPiece;
    let obstacleColor = chessPiece && chessPiece.substring(0, 1);
    let movingPieceColor = piece.chessPiece.substring(0, 1);
    // looking for opposite color of figure(obstacle)
    if (chessPiece !== 0 && obstacleColor !== movingPieceColor) {
      obstacle = true;
    }
  }

  return moves;
}
