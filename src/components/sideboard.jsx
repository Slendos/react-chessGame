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
    console.log(this.props);
    if (isReverse) turn = !turn;
    return (
      <div>
        <div
          className={`sideboard-turn ${isReverse ? "white" : "black"} ${turn &&
            "turn-invisible"}`}
        />
        <div className="parentTime">
          <div
            className="moveBoard"
            style={{ border: history.length > 0 && "2px solid black" }}
          >
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
