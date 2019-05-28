import React from "react";

const Num = ({ reverse }) => {
  let numbers = [8, 7, 6, 5, 4, 3, 2, 1];
  reverse && numbers.reverse();
  return (
    <div className={`numParent`}>
      {numbers.map(n => (
        <div className="num" key={n}>
          <span>{n}</span>
        </div>
      ))}
    </div>
  );
};

export default Num;
