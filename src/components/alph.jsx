import React from "react";

const Alph = ({ reverse }) => {
  let letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
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
