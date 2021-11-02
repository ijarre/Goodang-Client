import React from "react";

export const Component = React.forwardRef((props, ref) => {
  return (
    <div className="m-10" ref={ref}>
      <div className="flex text-xl justify-center">DAILY REPORT</div>
      <div></div>
      <div>Stock In Today = {}</div>
    </div>
  );
});
