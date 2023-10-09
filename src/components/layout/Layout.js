import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Popover from "../popover/Popover";

const Layout = (props) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        localStorage.getItem("user-token");
        setShow(true);
    }, []);

  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/logout",
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user-token")}`
          }
        }
      );

      // === hide layout ===
      props.setShowLayout(false);

      //  === remove user-token in localstorage ===
      localStorage.removeItem("user-token");

      //   === redirect to auth page ===
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      {props.showLayout && show &&  (
        <div className="z-50 flex items-center justify-between px-8 fixed top-0 left-0 right-0 w-screen h-[80px] bg-white backdrop-filter backdrop-blur-md shadow-lg">
          <div>
            <h1 className="text-2xl font-bold">Logo</h1>
          </div>

          <div className="flex items-center space-x-4">
            
            <Popover onLogoutHandler={logoutHandler} />

          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Layout;
