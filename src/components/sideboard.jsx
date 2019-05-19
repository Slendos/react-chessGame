import React, { Component } from "react";
import Movement from "./movement";

class Sideboard extends Component {
  render() {
    const {
      boardHistory,
      history,
      historySearch,
      turn_white,
      isReverse
    } = this.props;

    let turn = turn_white;

    if (isReverse) turn = !turn;
    return (
      <div>
        <div
          className={`sideboard-turn ${isReverse ? "white" : "black"} ${turn &&
            "turn-invisible"}`}
        />
        <div className="parentTime">
          <div className="moveBoard">
            <div>
              <Movement
                history={history}
                boardHistory={boardHistory}
                historySearch={historySearch}
              />
            </div>
          </div>
        </div>
        <div
          className={`sideboard-turn ${
            !isReverse ? "white" : "black"
          } ${!turn && "turn-invisible"}`}
        />
      </div>
    );
  }
}

export default Sideboard;
