import React from "react";

const ChessPiece = ({ piece, popupItems, handleClick }) => {
  let images = require.context("../images", true);
  const source = images(`./${piece}.png`);
  return (
    <img
      src={source}
      className="chessPieceImg"
      onClick={() => handleClick(piece, popupItems.clicked)}
      alt="chess-piece"
    />
  );
};

export default ChessPiece;
