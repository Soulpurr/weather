import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

import Image from "next/image";
function Sidebar({
  weather,
  convertTemperature,
  switchTemperatureUnit,
  searchQuery,
  handleInputChange,
  handleSearch,
  loading,
}) {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const formattedDate = `${now.getDate()}-${
        now.getMonth() + 1
      }-${now.getFullYear()}`;
      setCurrentDate(formattedDate);
    };

    // Update date when the component mounts
    updateDate();

    // Update date every minute (60,000 milliseconds)
    const intervalId = setInterval(updateDate, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours % 12 || 12}:${minutes < 10 ? "0" : ""}${minutes} ${
      hours < 12 ? "AM" : "PM"
    }`;
  };

  return (
    <div className="md:w-[35%] flex flex-col m-8 ">
      <div className="flex items-center justify-center">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 absolute  bg-[#ededef] py-1 px-12 outline-none focus:ring focus:border-blue-500 rounded-2xl"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button
          className="z-10 ml-[17rem] text-white ml- rounded-r px-4 py-2"
          onClick={handleSearch}
        >
          <AiOutlineSearch size={20} color="blue" />
        </button>
      </div>

      <div className="flex justify-center mt-12">
        <div className="relative w-40 h-40">
          <Image
            src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`}
            alt="Weather Icon"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      {loading && (
        <div className="flex justify-center text-3xl mt-4">Loading...</div>
      )}
      {weather && (
        <div className="flex justify-center text-6xl font-medium mt-4">
          {convertTemperature(weather.main.temp)}
        </div>
      )}
      {weather && (
        <div className="flex justify-center text-3xl mt-4 ">
          {weather.weather[0].description?.toUpperCase()}
        </div>
      )}
      <div className="flex justify-center mt-8">
        <hr className="w-[65%] " />
      </div>
      <div className="text-center mt-4">
        <p>{currentDate}</p>
        <p>{getCurrentTime()}</p>
        {weather && (
          <p className="mt-8 text-4xl font-bold">
            {weather.name?.toUpperCase()}
          </p>
        )}
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={switchTemperatureUnit}
        >
          Switch Unit
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
