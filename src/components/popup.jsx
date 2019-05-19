import React, { Component } from "react";
import ChessPiece from "./chessPiece";
class Popup extends Component {
  render() {
    const { handleClick, popupItems } = this.props;
    const pieces = ["Q", "R", "B", "N"];

    return (
      <div className="popup-wrapper">
        <div style={{ display: "table-cell", verticalAlign: "middle" }}>
          {pieces.map(piece => (
            <ChessPiece
              key={piece}
              handleClick={handleClick}
              piece={`${popupItems.color}${piece}`}
              popupItems={popupItems}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Popup;
