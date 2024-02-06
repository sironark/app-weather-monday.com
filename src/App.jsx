import React from "react";
import { useState, useEffect } from "react";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
import { WeatherContext } from "./context/weatherContext";
import MainPage from "./pages/MainPage";
import { LoadingContext } from "./context/loadingContext";
import Loading from "./components/LoadingComponent";

// Usage of mondaySDK example, for more information visit here: https://developer.monday.com/apps/docs/introduction-to-the-sdk/
const monday = mondaySdk();

const App = () => {
  const [dataWeather, setDataWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Notice this method notifies the monday platform that user gains a first value in an app.
    // Read more about it here: https://developer.monday.com/apps/docs/mondayexecute#value-created-for-user/
    monday.execute("valueCreatedForUser");

    // TODO: set up event listeners, Here`s an example, read more here: https://developer.monday.com/apps/docs/mondaylisten/
    monday.listen("context", (res) => {
      setDataWeather(res.data);
    });
  }, []);

  //Some example what you can do with context, read more here: https://developer.monday.com/apps/docs/mondayget#requesting-context-and-settings-data
  //const attentionBoxText = `Ready to start my app journey by building a view!`;
  

  return (
    <LoadingContext.Provider value={{isLoading, setIsLoading}}>
      <WeatherContext.Provider value={{dataWeather, setDataWeather, forecast, setForecast}}>
        <Loading/>
        <MainPage/>
      </WeatherContext.Provider>
    </LoadingContext.Provider>
  );
};

export default App;
