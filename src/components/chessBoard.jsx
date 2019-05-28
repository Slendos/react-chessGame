import React from "react";
import Popup from "./popup";
import Square from "./square";
import Alph from "./alph";
import Num from "./num";
const ChessBoard = ({
  board,
  clicked,
  handleClick,
  handleMove,
  validMoves,
  reverse,
  turn_white,
  popupChoice,
  popupItems,
  handlePawnChange
}) => {
  return (
    <div className="parent">
      <div className={`chessboard ${reverse && "reverse"}`}>
        {board.map(square => (
          <Square
            key={square.squareId}
            data={square}
            clicked={clicked}
            handleClick={handleClick}
            handleMove={handleMove}
            validMoves={validMoves}
            reverse={reverse}
            board={board}
            turn_white={turn_white}
          />
        ))}
      </div>
      {popupChoice && (
        <Popup popupItems={popupItems} handleClick={handlePawnChange} />
      )}
      <Num reverse={reverse} />
      <Alph reverse={reverse} />
    </div>
  );
};

export default ChessBoard;
