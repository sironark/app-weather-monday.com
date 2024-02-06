import axios from "axios";

const apiKey = "72825a950759a7d4c33af19f08e2843b"
const apiForecast = 'https://api.openweathermap.org/data/2.5/forecast';
const apiWeather = 'https://api.openweathermap.org/data/2.5/weather';
const apiCoord = 'https://api.openweathermap.org/geo/1.0/direct';

export const apiImage = 'https://openweathermap.org/img/wn/';



async function getCityCoordinates(city){
    const response = await axios.get(`${apiCoord}?q=${city}&limit=1&appid=${apiKey}`);
    return response;
}

async function getWeather(lat, lon){
    
    const response = await axios.get(`${apiWeather}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`)
    return response;
}

async function getForecast(lat, lon){
    const response = await axios.get(`${apiForecast}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    return response;
}

export const api = {
    getCityCoordinates,
    getWeather,
    getForecast
}