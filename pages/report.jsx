import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

import { Report } from "../components";

const report = () => {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <Report ref={componentRef} />
    </div>
  );
};

export default report;
