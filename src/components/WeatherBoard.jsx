import styled from "styled-components"
import {useContext} from 'react';
import { WeatherContext } from "../context/weatherContext";
import ForecastTable from "./WeatherTable";

export default function WeatherBoard() {
    const {dataWeather, forecast} = useContext(WeatherContext);
    const forecastRain = Object.values(forecast);
    if(forecast.length > 0 && forecast[0].rain) console.log(forecast[0].rain)
    
    return (
        <MainContainer>
            <Title>
                <p>Previsão do tempo para...</p>
                <h1>{dataWeather.name? dataWeather.name: ''}</h1>
                <div>
                    <p>Latitude: {dataWeather.coord ? (dataWeather.coord.lat).toFixed(2) : ''}°</p>
                    <p>Longitude: {dataWeather.coord ? (dataWeather.coord.lon).toFixed(2) : ''}°</p>
                </div>
            </Title>

            <Frame>
                <div>
                    <p>Mínima</p>
                    <h1>{dataWeather.main? dataWeather.main.temp_min.toFixed(0): 0}°C</h1>
                </div>
                <div>
                    <p>Máxima</p>
                    <h1>{dataWeather.main? dataWeather.main.temp_max.toFixed(0): 0}°C</h1>
                </div>
                <div>
                    <p>Chuva</p>
                    <h1>{ forecast.length > 0 && forecast[0].rain ? forecast[0].rain['3h'] : 0 } mm</h1>
                </div>
                <div>
                    <p>Vento</p>
                    <h1>{dataWeather.main? dataWeather.wind.speed.toFixed(0): 0} m/s</h1>
                </div>
            </Frame>

            {forecastRain[0]?
              <Tip>Tempo chuvoso, tome cuidado!</Tip>: 
              <Tip>Não há previsão de chuva para hoje!</Tip>}

            <TitleTable>
                <p>Próximos dias</p>
            </TitleTable>

            <ForecastTable city ={dataWeather.coord ? dataWeather.coord : ''}/>

        </MainContainer>
    )
}
const TitleTable = styled.p`
    margin-right: 2vw;
    margin-top: 3vh;
    color: #222222;
    font-size: 1.5vw;
    font-weight: 400;
    line-height: 4.7vh;
    letter-spacing: 0em;
    text-align: left;
     @media (max-width:615px)  {
            font-size: 20px;
            margin-top: 0px;
            }
`


const Tip = styled.p`
    padding-top: 2vh;
    box-sizing: border-box;
    color: #4D4494;
    font-size: 1.3vw;
    font-style: italic;
    font-weight: 400;
    margin-bottom: 2.7vh;
     @media (max-width:615px)  {
            font-size: 20px;
            margin-bottom: 0;
            }
`

const Frame = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    div{
        padding: 2vh;
        box-sizing: border-box;
        width: 13vw;
        height: 12vh;
        border-radius: 1.7vw;
        background: linear-gradient(117.33deg, #4D4494 22.83%, #4F43AE 90.03%);
        box-shadow: 0px 24px 48px 0px #314F7C14;
        margin-top: 3vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
         @media (max-width:615px)  {
            width: 70px;
            height: 50px;
            margin-top: 0px;
            padding: 0px;
            }
        p{
            color: #FFF;
            font-size: 1.3vw;
            font-style: normal;
            font-weight: 700;
             @media (max-width:615px)  {
            font-size: 10px;
            }
        }
        h1{
            margin-top: 0.5vh;
            color: #FFF;
            font-size: 2.4vw;
            font-style: normal;
            font-weight: 600;
        }

    }
`

const Title = styled.div`
    width:38.8vw;
    height: 18.8vh;
     @media (max-width:615px)  {
            width:100%;
            height: auto;
        }
    div{
        display: flex;
        max-width: 100%;
        overflow: hidden;
        p{
            margin-right: 2vw;
            margin-top: 3vh;
            color: #222222;
            font-size: min(1.5vw, calc(100vw / 25));
            white-space: nowrap;
            display: inline-block;
            font-weight: 400;
            line-height: 4.7vh;
            letter-spacing: 0em;
            text-align: left;
             @media (max-width:615px)  {
            font-size: 10px;
            margin-top: 0px;
            }
             
        }
    }
    h1{
        margin-top: 2vh;
        font-size: 5.2vw;
        font-weight: 400;
        line-height: 4.7vh;
        letter-spacing: 0em;
        text-align: left;
        color: #222222;
        @media (max-width:615px)  {
            font-size: 40px;
            margin-top: 0px;
            }
    }
    p{
        font-size: 1.6vw;
        font-weight: 400;
        line-height: 4.7vh;
        letter-spacing: 0em;
        text-align: left;
        color: #222222;
        margin-top: 5px;
        @media (max-width:615px)  {
            font-size: 15px;
            margin-top: 0px;
            }
    }
`
const MainContainer = styled.div`
    background-color: #e7e7e7;
    width: 100vw;
    height: 100vh;
    border: 1px solid #D8D8D8;
    padding-left: 2.6vw;
    padding-right : 5.8vw;
    padding-top: 2.6vh;
    padding-bottom: 2.6vh;
    box-sizing: border-box;
     @media (max-width:615px)  {
            padding-top: 0;
        }
`