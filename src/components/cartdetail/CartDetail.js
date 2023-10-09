import React, { Fragment, useState } from "react";
import classes from "./CartDetail.module.css";

import airplane from "../images/airplane.png";
import OpenCart from "../opencart/OpenCart";

const CartDetail = (props) => {
  const [openFlightDetail, setOpenFlightDetail] = useState(false);

  const { item } = props;

  // === Formated time and date for Dst ===
  const timestampDst = item?.dst?.time;
  const dateTimeDst = new Date(timestampDst);

  const dateFormatOptionsDst = { month: "long", day: "numeric" };
  const formattedDateDst = new Intl.DateTimeFormat(
    "default",
    dateFormatOptionsDst
  ).format(dateTimeDst);

  const timeFormatOptionsDst = {
    hour: "numeric",
    minute: "numeric",
    hour12: false
  };
  const formattedTimeDst = new Intl.DateTimeFormat(
    "default",
    timeFormatOptionsDst
  ).format(dateTimeDst);

  // === Formated time and date for Src ===
  const timestampSrc = item?.src?.time;
  const dateTimeSrc = new Date(timestampSrc);

  const dateFormatOptionsSrc = { month: "long", day: "numeric" };
  const formattedDateSrc = new Intl.DateTimeFormat(
    "default",
    dateFormatOptionsSrc
  ).format(dateTimeSrc);

  const timeFormatOptionsSrc = {
    hour: "numeric",
    minute: "numeric",
    hour12: false
  };
  const formattedTimeSrc = new Intl.DateTimeFormat(
    "default",
    timeFormatOptionsSrc
  ).format(dateTimeSrc);

  // === Boarding ===
  // تابع برای تبدیل زمان به دقیقه
  const convertToMinutes = (time) => {
    const [hours, minutes] = time.split(":");
    return parseInt(hours) * 60 + parseInt(minutes);
  };

  // تابع برای تبدیل دقیقه به زمان
  const convertToTime = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, "")}h ${String(minutes).padStart(
      2,
      "0"
    )} min`;
  };

  // تبدیل زمان به دقیقه
  const minutes1 = convertToMinutes(formattedTimeSrc);
  const minutes2 = convertToMinutes(formattedTimeDst);

  // محاسبه اختلاف دو زمان به دقیقه
  const differenceMinutes = Math.abs(minutes1 - minutes2);

  // تبدیل اختلاف به فرمت ساعت:دقیقه
  const differenceTime = convertToTime(differenceMinutes);

  const openMoreDetailHandler = () => {
    setOpenFlightDetail((prev) => !prev);
  };

  // ===boarding ===
  const serverTime = item.boarding;

  // استخراج ساعت و دقیقه از رشته
  const hours = serverTime.substring(0, 2);
  const minutes = serverTime.substring(2, 4);

  // تبدیل به عدد
  const hoursInt = parseInt(hours, 10);
  const minutesInt = parseInt(minutes, 10);

  // ایجاد یک شی Date با استفاده از زمان استخراج شده
  const dateObject = new Date();
  dateObject.setHours(hoursInt);
  dateObject.setMinutes(minutesInt);

  // حالا می‌توانید از شی Date برای نمایش ساعت و دقیقه استفاده کنید
  const formattedTimeBoarding = dateObject.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  return (
    <div
      className={`${
        classes["cart-container"]
      } transition duration-300 rounded-xl ${
        openFlightDetail ? "h-[300px]" : ""
      }`}
    >
      {/* === section one === */}
      {openFlightDetail ? (
        <OpenCart onOpenFlight={openMoreDetailHandler} item={item} />
      ) : (
        <div
          onClick={openMoreDetailHandler}
          className="shadow-xl cursor-pointer relative overflow-hidden md:my-0 px-8 rounded-xl bg-white"
        >
          <p className="capitalize top-[12%] left-[-8%] px-[25px] bg-red-500 text-white absolute transform -rotate-45">
            {item.class}
          </p>

          <div className="flex items-center justify-between">
            <img
              className="w-[80px] h-[80px]"
              src={item.logoSrc}
              alt="flight-logo"
              style={item.logoStyle}
            />

            <div className="w-[60%] flex items-center justify-between">
              <div className="text-center">
                <p className="text-gray-500 text-[12px]">Bengaluru</p>
                <p className="text-[#000] font-bold text-md">
                  {formattedTimeSrc}
                </p>
                <p className="text-gray-500 text-[12px]">{formattedDateSrc}</p>
              </div>

              <div>
                <img
                  className="w-[40px] md:w-[30px] h-[30px]"
                  src={airplane}
                  alt="airplane"
                />
              </div>

              <div className="text-center">
                <p className="text-gray-500 text-[12px]">New Delhi</p>
                <p className="text-[#000] font-bold text-md">
                  {formattedTimeDst}
                </p>
                <p className="text-gray-500 text-[12px]">{formattedDateDst}</p>
              </div>
            </div>
          </div>

          <p className="rounded-md border-dotted border-2 border-gray-500 text-center mx-auto w-[30%] font-bold">
            ${item.price}
          </p>
        </div>
      )}

      {/* === section two === */}
      <div
        className={`${classes["flight-detail"]} ${
          openFlightDetail ? classes["open"] : ""
        } w-full shadow-xl cursor-pointer space-y-4 border-t-2 border-dotted border-gray-500 px-8 py-4 rounded-xl bg-white`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <p className="font-bold text-md md:text-lg">
              {formattedTimeSrc} - {formattedTimeDst}
            </p>
            <p className="text-[12px] text-gray-500">Flight Time</p>
          </div>

          <div>
            <p className="font-bold text-md md:text-lg">{differenceTime}</p>
            <p className="text-[12px] text-gray-500">Duration</p>
          </div>

          <div>
            <p className="font-bold text-md md:text-lg">
              {formattedTimeBoarding}
            </p>
            <p className="text-[12px] text-gray-500">Boarding</p>
          </div>
        </div>

        <div className="w-full flex items-center justify-between">
          <div>
            <p className="font-bold text-md md:text-lg">
              {item.transfer ? "Yes" : "No"}
            </p>
            <p className="text-[12px] text-gray-500">Transfer</p>
          </div>

          <div className="font-bold text-md md:text-lg">
            <p>{item.gates}</p>
            <p className="text-[12px] text-gray-500">Gate</p>
          </div>
          <div>
            <p className="font-bold text-md md:text-lg">{item.seat}</p>
            <p className="text-[12px] text-gray-500">Seat</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDetail;
