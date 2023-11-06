import React from "react";
import { FaSearch, FaHome, FaChartBar, FaCog } from "react-icons/fa";
// import Button from "../../components/common/inputs/Button";
import { Outlet } from "react-router-dom";
// import Cookies from "js-cookie";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-[25%_75%] bg-[#FBFBFB]">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white flex flex-col px-8 py-4 h-screen overflow-auto w-full">
        <h1 className="heading-secondary mb-16">Logo</h1>
        {/* Sidebar Icons and Text */}
        {arr.map((el, i) => (
          <SideBarLink el={el} key={i} />
        ))}
      </div>

      {/* Main Content */}
      <div className=" h-screen overflow-auto  flex flex-col">
        {/* Navbar */}
        <nav className="bg-white border-b p-4">
          <div className="flex items-center justify-between">
            {/* Search Bar */}
            <div className="flex items-center">
              <FaSearch className="mr-2" size={16} />
              <input
                type="text"
                placeholder="Search..."
                className="border p-2 rounded-md"
              />
            </div>

            {/* User Profile */}
            <div className="flex items-center">
              <img
                src="https://tse1.mm.bing.net/th?id=OIP.xn4yG10rX6X4uhzIgvk93QAAAA&pid=Api&rs=1&c=1&qlt=95&w=121&h=121"
                alt="User"
                className="w-8 h-8 rounded-full mr-2"
              />
              {/* <FaUser size={18} /> */}
            </div>
          </div>
        </nav>

        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

const SideBarLink = ({ el }) => {
  return (
    <div className="my-4 flex items-center gap-4 cursor-pointer">
      {/* <FaHome size={18} /> */}
      {el.icon}
      <span className="text-xs">{el.text}</span>
    </div>
  );
};
const arr = [
  {
    text: "Home",
    icon: <FaHome size={18} />,
  },

  {
    text: "Home",
    icon: <FaCog size={18} />,
  },

  {
    text: "Settings",
    icon: <FaChartBar size={18} />,
  },
];
