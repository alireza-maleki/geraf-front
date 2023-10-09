import React from "react";
import classes from "./OpenCart.module.css";

import airline from "../images/airplane.png";

const OpenCart = (props) => {
  const { item } = props;

  return (
    <div
      onClick={props.onOpenFlight}
      className="relative py-4 w-full flex items-center justify-between shadow-xl cursor-pointer relative overflow-hidden  px-8 rounded-xl bg-white"
    >
      <p className="capitalize top-[12%] left-[-8%] px-[25px] bg-red-500 text-white absolute transform -rotate-45">
        {item.class}
      </p>

      <div className="text-center">
        <p className="text-blue-900 font-bold">From</p>
        <p className="text-xl font-bold">{item.src.iso3}</p>
        <p className="text-[12px] text-gray-500">{item.src.airline}</p>
      </div>

      <div className="text-center">
        <div
          className={`${classes["bullet-container"]} overflow-hidden text-center flex items-center justify-center`}
        >
          <div className={`${classes.bullet} w-full`}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <img
            className="mx-auto z-20 w-[40px] md:w-[30px] h-[30px]"
            src={airline}
            alt="airline"
          />
        </div>
        <p className="font-bold bg-gray-300 px-4 rounded-sm mt-3">
          ${item.price}
        </p>
      </div>

      <div className="text-center">
        <p className="text-blue-900 font-bold">To</p>
        <p className="text-xl font-bold">{item.dst.iso3}</p>
        <p className="text-[12px] text-gray-500">{item.dst.airline}</p>
      </div>
    </div>
  );
};

export default OpenCart;
