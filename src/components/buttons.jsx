import React from "react";

const Buttons = props => {
  const { handleReset, handleRotation } = props;
  return (
    <div className="buttons-wrapper">
      <button className="button-reset" onClick={() => handleReset()}>
        Reset Game
      </button>
      <button className="button-rotate" onClick={() => handleRotation()}>
        Reverse board
      </button>
    </div>
  );
};

export default Buttons;
