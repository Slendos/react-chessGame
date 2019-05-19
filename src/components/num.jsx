import React from "react";

const Num = props => {
  let { numbers, reverse } = props;
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
