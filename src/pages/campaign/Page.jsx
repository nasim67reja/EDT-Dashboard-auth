import React from "react";
import Button from "../../components/common/inputs/Button";
import sad from "../../assets/campaign/sad.svg";
import { DialogCustomAnimation } from "../../components/common/feedback/Dialog";

const Page = () => {
  return (
    <div className="px-[4rem] py-10 flex-1 flex flex-col">
      <h3 className="heading-tertiary font-bold pb-10 border-b border-[#DDDDE0]">
        All Campaign
      </h3>
      <div className="flex-1 center">
        <div className="flex flex-col items-center gap-4">
          <img src={sad} className="border-b border-[#DDDDE0]" alt="" />
          <p className="text-large text-secondary">No campaign available</p>
          {/* <Button className="rounded-md !px-4 !py-[10px] text-large">
            Add Campaign +
          </Button> */}
          <DialogCustomAnimation />
        </div>
      </div>
    </div>
  );
};

export default Page;
