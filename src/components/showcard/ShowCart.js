import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import CartDetail from "../cartdetail/CartDetail";

const ShowCart = () => {
  const [allCart, setAllCart] = useState([]);
  const [visibleData, setVisibleData] = useState([]);

  const getData = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/list", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-token")}`
        }
      });
      setAllCart(data?.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setVisibleData(allCart.slice(0, 6));
  }, [allCart]);

  console.log(allCart);

  const loadMoreData = () => {
    const remainingData = allCart?.slice(visibleData?.length);
    const newData = remainingData.slice(0, 3);
    setVisibleData((prevData) => [...prevData, ...newData]);
  };


  return (
    <Fragment>

      <div className="w-[80%] text-[#000] mt-20 mx-auto h-[100px] flex items-center justify-between">
        <p className="font-bold">Viewed: {visibleData?.length}</p>
        <p className="font-bold">Total: {allCart?.length}</p>
      </div>
    

    <div className="w-full min-h-screen bg-[#f1f1f1] p-8 grid grid-cols-1 md:grid-cols-3 grid-rows-1 gap-4">
      
      {visibleData?.map((item, index) => (
        <CartDetail item={item} key={index} />
      ))}

      <div className="w-screen mx-auto container flex items-center justify-center">
        {visibleData.length < allCart?.length && (
          <button
            className="transition-all cursor-pointer border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-md py-1 px-3 duration-300 mr-16 py-2 px-4 rounded mt-4"
            onClick={loadMoreData}
          >
             Load More
          </button>
        )}
      </div>
    </div>
    </Fragment>
  );
};

export default ShowCart;
