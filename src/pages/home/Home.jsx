import React from "react";
import Button from "../../components/common/inputs/Button";

const Home = () => {
  return (
    <>
      {/* Main Content Area */}
      <div className="center h-full">
        <div className="flex flex-col items-center ">
          <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard!</h1>
          <p className="mb-8">You are logged in to the dashboard</p>

          <Button
            onClick={() => {
              localStorage.removeItem("accessToken");
              window.location.reload();
            }}
          >
            Log Out
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
