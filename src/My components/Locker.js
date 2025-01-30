import React from "react";

const Locker = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={`Locker ${props.status}`}
      // style={{
      //   width: "auto",
      //   height: "50px",
      //   backgroundColor: "lightgray",
      //   border: "1px solid black",
      //   margin: "5px",
      //   cursor: "pointer",
      //   display: "flex",
      //   justifyContent: "center",
      //   alignItems: "center",
      // }}
    >
      {props.status}
    </div>
  );
};

export default Locker;
