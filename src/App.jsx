import React from "react";
import { useState, useEffect } from "react";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import { WeatherContext } from "./context/weatherContext";
import MainPage from "./pages/MainPage";
import Loading from "./components/LoaderMonday";
import Alert from "./components/AlertMonday";

const monday = mondaySdk();

const App = () => {
  const [dataWeather, setDataWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    monday.execute("valueCreatedForUser");
    monday.listen("context", (res) => {
      setDataWeather(res.data);
    });
  }, []);

  return (
    
      <WeatherContext.Provider value={
        {dataWeather, setDataWeather, 
        forecast, setForecast, 
        isLoading, setIsLoading}}>
        <Loading/>
        <Alert/>
        <MainPage/>
      </WeatherContext.Provider>
    
  );
};

export default App;
