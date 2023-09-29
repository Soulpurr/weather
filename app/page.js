"use client";
import Cards from "@/components/Cards";
import Sidebar from "@/components/Sidebar";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosPartlySunny } from "react-icons/io";

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [city, setCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [temperatureUnit, setTemperatureUnit] = useState("celsius");

  const apikey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  const fetchWeatherData = async () => {
    setLoading(true);

    try {
      console.log(lat, long);
      const response = await fetch(
        `${
          city.length == 0
            ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apikey}`
            : `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
        }`
      );

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(
          `Failed to fetch weather data: ${errorMessage.message}`
        );
      }

      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.log("Error fetching weather data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if the Geolocation API is supported by the browser
    if ("geolocation" in navigator) {
      // Get the user's current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);

          fetchWeatherData(); // Call fetchWeatherData after obtaining coordinates
        },
        (err) => {
          console.error(`Error getting location: ${err.message}`);
          // You can set default coordinates or handle the error as needed

          fetchWeatherData(); // Call fetchWeatherData with default or fallback coordinates
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
      // You can set default coordinates or handle the lack of support as needed
      fetchWeatherData(); // Call fetchWeatherData with default or fallback coordinates
    }
  }, [city, lat, long]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    setCity(searchQuery);
  };

  const switchTemperatureUnit = () => {
    setTemperatureUnit((prevUnit) => {
      switch (prevUnit) {
        case "celsius":
          return "fahrenheit";
        case "fahrenheit":
          return "kelvin";
        case "kelvin":
          return "celsius";
        default:
          return "celsius";
      }
    });
  };

  const convertTemperature = (temp) => {
    switch (temperatureUnit) {
      case "celsius":
        return `${(temp - 273.15)?.toFixed(2)}°C`;
      case "fahrenheit":
        return `${((temp - 273.15) * 1.8 + 32)?.toFixed(1)}°F`;
      case "kelvin":
        return `${temp?.toFixed(1)}K`;
      default:
        return `${temp?.toFixed(1)}°C`;
    }
  };

  const weatherFields = [
    {
      name: "Wind",
      value: weather?.wind.speed,
      extra: weather?.wind.deg,
      unit: "m/s",
    },
    {
      name: "Rain",
      value: weather?.rain ? weather?.rain["1h"] : 0,
      extra: null,
      unit: "mm",
    },
    { name: "Clouds", value: weather?.clouds.all, extra: null, unit: "%" },
    {
      name: "Visibility",
      value: weather?.visibility,
      extra: null,
      unit: "meters",
    },
    {
      name: "Pressure",
      value: weather?.main.pressure,
      extra: null,
      unit: "hPa",
    },
    { name: "Humidity", value: weather?.main.humidity, extra: null, unit: "%" },
    {
      name: "Temperature",
      value: weather?.main.temp,
      extra: null,
      unit: "°C",
    },
    {
      name: "Min Temperature",
      value: weather?.main.temp_min,
      extra: null,
      unit: "°C",
    },
    {
      name: "Max Temperature",
      value: weather?.main.temp_max,
      extra: null,
      unit: "°C",
    },
  ];
  const getBackgroundColor = (weatherCode) => {
    switch (weatherCode) {
      case "01d":
      case "01n":
        return "#ffdb58"; // yellow for clear sky
      case "02d":
      case "02n":
        return "#87cefa"; // light blue for partly cloudy
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        return "#a0a0a0"; // gray for cloudy
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        return "#6495ed"; // cornflower blue for rain
      case "11d":
      case "11n":
        return "#808080"; // gray for thunderstorm
      case "13d":
      case "13n":
        return "#ffffff"; // white for snow
      case "50d":
      case "50n":
        return "#d3d3d3"; // light gray for mist/smog
      default:
        return "#ededef"; // default background color
    }
  };
  
  return (
    <div className={`flex flex-col md:flex-row justify-center  h-screen`} style={{backgroundColor:`${getBackgroundColor(weather?.weather[0].icon)}`}}>
      <Sidebar
        weather={weather}
        convertTemperature={convertTemperature}
        switchTemperatureUnit={switchTemperatureUnit}
        searchQuery={searchQuery}
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
        loading={loading}
      />
      <div className="w-[65%] bg-[#ededef]   hidden md:block">
        <div className="flex flex-col text-xl font-extralight m-8">
          <div className="flex justify-between">
            <p className="">Today</p>
            <p className="">Tomorrow</p>
            <p className="">Next</p>
          </div>
          <Cards
            weatherFields={weatherFields}
            convertTemperature={convertTemperature}
          />
        </div>
      </div>
      <div className="md:hidden flex flex-col m-8 ">
        <div className="flex space-x-8 justify-between">
          <p className="text-xl font-bold">Today</p>
          <p>32</p>
        </div>
        <div className="flex space-x-8 justify-between">
          <p className="text-xl font-bold">Tomorrow</p>
          <p>42</p>
        </div>
      </div>
    </div>
  );
}
