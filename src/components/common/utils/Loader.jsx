import React from "react";
import { Bars } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="center">
      <Bars
        height="24"
        width="24"
        color="#fff"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
