import styled from "styled-components"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import { useContext, useEffect, useState } from "react";
import { standardLat, standardLon } from "../presentation/constants/standardCities";
import {api} from '../services/api.js'
import { ABREVIATED_WEEKDAYS } from "../presentation/constants/daysOfWeek";
import CustomTooltip from "./CustomTooltip";
import { WeatherContext } from "../context/weatherContext.jsx";
import { Skeleton } from "monday-ui-react-core";

export default function ForecastTable({city}){
    const {forecast, setForecast} = useContext(WeatherContext)
    const [load, setLoad] = useState(false)

    useEffect(() => {
        const lat = city ? city.lat : standardLat;
        const lon = city ? city.lon : standardLon;
        setLoad(true)
            api.getForecast(lat,lon)
            .then(res => {
                setLoad(false)
                convertDate(res.data)
            })
            .catch(err => {
                console.log(err)
                setLoad(false)
            })
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
            <Skeleton fullWidth={true} height={440} className="skeleton" load = {load}/> 
            <LineChart
                width={1000}
                height={400}
                data={forecast}
                margin={{
                    top: 20,
                    right: 20,
                    left: 20,
                    bottom: 20,
                }}
                className="linechart"
                load = {load}
            >
            <CartesianGrid stroke="#F5F5F5" />
            <XAxis dataKey="formatDate" allowDuplicatedCategory={true} allowDecimals={true} allowDataOverflow={false}/>
            <YAxis unit={'°C'}/>
            <Tooltip content={<CustomTooltip/>} />
            <Line type="linear" dataKey="main.temp" stroke="#4D4494" />
        </LineChart>
        </ComponentContainer>
    )
}

const ComponentContainer = styled.div`
    box-sizing: border-box;
    background-color: white;
    .linechart{
        display: ${(prop) => prop.load ? 'none': 'inline'};
    }
    .skeleton{
        display: ${(prop) => prop.load ? 'inline': 'none'};
    }
`
