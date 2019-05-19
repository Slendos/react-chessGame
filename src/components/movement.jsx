import React from "react";

const Movement = props => {
  const { history, boardHistory, historySearch } = props;
  const count = boardHistory.length;

  return (
    <div className="history-parent">
      {history.map((m, i) => (
        <div
          className="history"
          onClick={() => historySearch(boardHistory[i], count, i)}
          key={`${m}${m}${i}`}
        >
          <span style={{ float: "left", marginLeft: "5px" }}>{i + 1 + "."}</span>
          <span>{`${m}`}</span>
        </div>
      ))}
    </div>
  );
};

export default Movement;
