import {useEffect, useContext} from 'react';
import styled from "styled-components"
import { standardLat, standardLon } from '../presentation/constants/standardCities';
import { WeatherContext } from '../context/weatherContext';
import SidebarSearch from '../components/SidebarSearch';
import WeatherBoard from '../components/WeatherBoard';
import { api } from '../services/api';

export default function MainPage() {
    const {setDataWeather, setIsLoading, isLoading} = useContext(WeatherContext);

    useEffect( () => {
        setIsLoading(true)
        api.getWeather(standardLat, standardLon)
        .then(res => {
            console.log(isLoading)
            setIsLoading(false)
            setDataWeather(res.data ? res.data : res.data.main);
    })
       .catch(error => {
        setIsLoading(false)
    }) 
        // eslint-disable-next-line
    },[]) 
   

    
    return (
        <MainPageContainer>
            <SidebarSearch/>
            <WeatherBoard/>
        </MainPageContainer>
    )
}

const MainPageContainer = styled.div`
    display: flex;
    box-sizing: border-box;
    height: 100vh;
    align-items: center;
    background-color: white;
    @media (max-width:615px)  {
        flex-direction: column;
    }
`