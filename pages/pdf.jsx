import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

import { Component } from "./Component";

const pdf = () => {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <Component ref={componentRef} />
    </div>
  );
};

export default pdf;
