import React, { useState } from "react";
import axios from "axios";

const Popover = (props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [userName, setUserName] = useState();

  const handleButtonClick = async (e) => {
    e.preventDefault();

    setIsPopoverOpen(!isPopoverOpen);
    const userToken = localStorage.getItem("user-token");
    try {
      const { data } = await axios.get("http://localhost:3001/username", {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      setUserName(data.username);
    } catch (error) {}
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={handleButtonClick}
        type="button"
        className="transition-all cursor-pointer border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-md py-1 px-3 duration-300"
      >
        {
          userName ? userName : "username"
        }
      </button>

      <div
        className={`${
          isPopoverOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
        } flex items-center justify-center transform transition-all ease-in-out duration-300 origin-top-right absolute right-0 z-10 w-[100px] h-[100px] bg-white border rounded shadow-lg mt-2`}
      >
        <button
          onClick={props.onLogoutHandler}
          className="cursor-pointer border border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white rounded-md py-1 px-3 duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Popover;
