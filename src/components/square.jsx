import React, { Component } from "react";

class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dragOver: []
    };
  }

  // generate colored board
  getWhiteSquare = data => {
    const white = ["a", "c", "e", "g"];

    if (white.some(i => i === data.squareId.substring(0, 1))) {
      if (data.squareId.substring(1, 2) % 2 === 0) return true;
      return false;
    } else {
      if (data.squareId.substring(1, 2) % 2 === 1) return true;
      return false;
    }
  };

  isDraggable(turn, data) {
    let color = data.chessPiece.substring(0, 1);
    if (color === "w" && turn) {
      return true;
    } else if (color === "b" && !turn) {
      return true;
    }
    return false;
  }

  render() {
    //prettier-ignore
    const { data, handleClick, handleMove, validMoves, reverse, clicked, turn_white } = this.props;

    let images = require.context("../images", true);
    let piece = data.chessPiece && images(`./${data.chessPiece}.png`);
    let isWhite = this.getWhiteSquare(data);

    let higlighted =
      validMoves[0] && validMoves.find(v => v && v.id === data.id);

    const square = isWhite ? "black-square" : "white-square";

    // if we clicked and valid moves are shown handleMove is called otherwise is called handleClick
    return (
      <div
        onClick={() => (!clicked ? handleClick(data) : handleMove(data))}
        className={`${square} ${higlighted && "validMove"}`}
        title={data.squareId}
        onDragOver={e => e.preventDefault()}
        onDrop={e => handleMove(data)}
        draggable="false"
      >
        {data.chessPiece !== 0 && (
          <img
            className={`chessPieceImg ${reverse && "reverse"}`}
            src={piece}
            alt={data.squareId}
            draggable={this.isDraggable(turn_white, data)}
            onDragStart={() => handleClick(data)}
          />
        )}
      </div>
    );
  }
}
export default Square;
