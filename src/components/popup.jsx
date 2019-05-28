import React, { Component } from "react";
import ChessPiece from "./chessPiece";
class Popup extends Component {
  render() {
    const { handleClick, popupItems } = this.props;
    const pieces = ["Q", "R", "B", "N"];

    return (
      <div className="popup-wrapper">
        <div className="popup-container">
          {pieces.map(piece => (
            <div className="popup-item">
              <ChessPiece
                key={piece}
                handleClick={handleClick}
                piece={`${popupItems.color}${piece}`}
                popupItems={popupItems}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Popup;
