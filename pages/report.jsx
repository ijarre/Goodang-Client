import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import { DownloadIcon } from "@heroicons/react/outline";

import { Report } from "../components";

const ReportPage = () => {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => (
          <button className="mt-20 ml-10">
            <DownloadIcon className="flex w-5 h-5 bg-blue-300 rounded" />
          </button>
        )}
        content={() => componentRef.current}
      />
      <Report ref={componentRef} />
    </div>
  );
};

export default ReportPage;
