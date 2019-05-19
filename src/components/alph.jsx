import React from "react";

const Alph = props => {
  let { letters, reverse } = props;
  reverse && letters.reverse();
  return (
    <div className={`alphParent`}>
      {letters.map(l => (
        <div className="alph" key={l}>
          <span>{l}</span>
        </div>
      ))}
    </div>
  );
};

export default Alph;
