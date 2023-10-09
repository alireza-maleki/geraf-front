import React, { Fragment, useState } from "react";
import axios from "axios";

// === Backgrond Image ===
import loginBackground from "../images/2.jpg";

// === React Icons ===
import { BiSolidUser } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";

// === Modal ===
import Modal from "../modal/Modal";

import { useNavigate } from "react-router";

const Login = (props) => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const formDataHandler = async (e) => {
    e.preventDefault();

    if (userName && password && userName == "admin" && password == 123456) {
      setShowModal(false);
      try {
        const { data } = await axios.post("http://localhost:3001/login", {
          username: userName,
          password: password
        });

        // === set user-token in localStorage ===
        localStorage.setItem("user-token", data.token);

        // === clear input ===
        setUserName("");
        setPassword("");

        // === show layout when user login success ===
        props.setShowLayout(true);
        
        // === redirect to home page ===
        navigate("/home");
      } catch (error) {
        console.log(error);
      }
    } else {
      setShowModal(true);
    }
  };

  const hideModal = () => {
    setShowModal(false);
  }

  return (
    <Fragment>
      {showModal && <Modal onHideModal={hideModal} />}
      <div
        className="bg-cover bg-center h-screen flex items-center justify-center"
        style={{ backgroundImage: `url("${loginBackground}")` }}
      >
        <div className="flex flex-col items-center justify-center w-[90%] md:w-[45%] shadow-2xl bg-white bg-opacity-30 p-8 rounded-lg backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-[#000] mb-8">Login</h1>

          <div className="w-full mb-4">
            <label
              htmlFor="username"
              className="block text-md font-medium text-[#000]"
            >
              Username
            </label>
            <div className="flex items-center">
              <input
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                autoComplete="off"
                type="text"
                className="w-[90%] mt-1 p-2 rounded-sm border-l-4 border-blue-600 outline-none"
              />
              <BiSolidUser className="mt-[5px] p-3 text-white bg-blue-600 w-[40px] h-[42px] rounded-sm" />
            </div>
          </div>

          <div className="w-full mb-4">
            <label
              htmlFor="password"
              className="block text-md font-medium text-[#000]"
            >
              Password
            </label>

            <div className="flex items-center">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                autoComplete="off"
                type="password"
                className="w-[90%] mt-1 p-2 w-full rounded-sm border-l-4 border-blue-600 outline-none"
              />
              <RiLockPasswordFill className="mt-[4px] p-3 text-white bg-blue-600 w-[40px] h-[42px] rounded-sm" />
            </div>
          </div>

          <button
            type="submit"
            className="mt-12 w-[50%] bg-blue-600 text-white p-2 py-3 rounded-md hover:bg-blue-800 hover:-translate-y-2 transform transition duration-300"
            onClick={formDataHandler}
          >
            Login
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
