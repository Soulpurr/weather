import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

import {
  IoIosPartlySunny,
  IoMdThunderstorm,
  IoMdRainy,
  IoIosSnow,
} from "react-icons/io";
import { TiWeatherCloudy, TiWeatherPartlySunny } from "react-icons/ti";
import { FaCloud, FaRegSun, FaSmog } from "react-icons/fa";
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
  const getWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case "01d":
        return <FaRegSun size={250} />;
      case "01n":
        return <FaRegSun size={250} />;
      case "02d":
        return <TiWeatherPartlySunny size={250} />;
      case "02n":
        return <TiWeatherPartlySunny size={250} />;
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        return <FaCloud size={250} />;
      case "09d":
      case "09n":
        return <IoMdRainy size={250} />;
      case "10d":
      case "10n":
        return <IoMdRainy size={250} />;
      case "11d":
      case "11n":
        return <IoMdThunderstorm size={250} />;
      case "13d":
      case "13n":
        return <IoIosSnow size={250} />;
      case "50d":
      case "50n":
        return <FaSmog size={250} />;
      default:
        return <IoIosPartlySunny size={250} />;
    }
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
        <p>27-09-2023</p>
        <p>Friday,12.44 PM</p>
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
