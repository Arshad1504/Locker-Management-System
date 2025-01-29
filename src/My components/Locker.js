import React from "react";

const Locker = (props) => {
  return (
    <div
      onClick={props.onClick}
      style={{
        width: "auto",
        height: "50px",
        backgroundColor: "lightgray",
        border: "1px solid black",
        margin: "5px",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.status}
      {/* {props.status.charAt(0).toUpperCase()} */}
    </div>
  );
};

export default Locker;
