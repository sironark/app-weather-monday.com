import styled from "styled-components"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import { useContext, useEffect } from "react";
import { standardLat, standardLon } from "../presentation/constants/standardCities";
import {api} from '../services/api.js'
import { ABREVIATED_WEEKDAYS } from "../presentation/constants/daysOfWeek";
import CustomTooltip from "./CustomTooltip";
import { WeatherContext } from "../context/weatherContext.jsx";

export default function ForecastTable({city}){
    const {forecast, setForecast} = useContext(WeatherContext)

    useEffect(() => {
        const lat = city ? city.lat : standardLat;
        const lon = city ? city.lon : standardLon;
        
            api.getForecast(lat,lon)
            .then(res => {
                convertDate(res.data)
            })
            .catch(err => {console.log(err)})
            // eslint-disable-next-line
    }, [city]) 
    

    function convertDate(data){
      
        if(data.list){
            const newForecast = [...data.list] // eslint-disable-next-line
            newForecast.map((info) => {
                const date = new Date(info.dt * 1000)
                let dateOfMonth = date.getDate();
                if(dateOfMonth < 10){
                    dateOfMonth = `0${dateOfMonth}`
                }
                let month = date.getMonth() + 1;
                if(month < 10){
                    month = `0${month}`
                }
                const day = ABREVIATED_WEEKDAYS[date.getDay()]
                info.formatDate = `${dateOfMonth}/${month}(${day})`
            })
            setForecast(newForecast)
        }
    }    
    return(
        <ComponentContainer>
            <LineChart
                width={1000}
                height={440}
                data={forecast}
                margin={{
                    top: 20,
                    right: 20,
                    left: 20,
                    bottom: 20,
                }}
            >
            <CartesianGrid stroke="#F5F5F5" />
            <XAxis dataKey="formatDate" allowDuplicatedCategory={true} allowDecimals={true} allowDataOverflow={false}/>
            <YAxis unit={'°C'}/>
            <Tooltip content={<CustomTooltip/>}/>
            <Line type="linear" dataKey="main.temp" stroke="#4D4494" />
        </LineChart>

        </ComponentContainer>
    )
}

const ComponentContainer = styled.div`
    box-sizing: border-box;
    background-color: white;
`
