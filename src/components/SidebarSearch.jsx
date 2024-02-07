import {useState, useContext} from 'react';
import { WeatherContext } from '../context/weatherContext';
import styled from "styled-components"
import { CiSearch } from "react-icons/ci";
import { colorsOfWeather } from '../presentation/constants/weatherColors';
import { daysOfWeek } from '../presentation/constants/daysOfWeek';
import { api, apiImage } from '../services/api';

export default function SidebarSearch(){
    const {dataWeather, setDataWeather, setIsLoading} = useContext(WeatherContext);
    const [searchCity, setSearchCity] = useState("");

    async function getDataWeather(e){
        e.preventDefault()
        setIsLoading(true)
        const dataCity = await api.getCityCoordinates(searchCity)
        await api.getWeather(dataCity.data[0].lat, dataCity.data[0].lon)
            .then(res => {
            setIsLoading(false)
            setDataWeather(res.data)
    })
       .catch(error => {
        setIsLoading(false)
    }) 
        
    }

    function getDate() {
        const dataAtual = new Date();

        const month = dataAtual.getMonth() + 1; 
        const day = dataAtual.getDate();
        const year = dataAtual.getFullYear();
        const stringWeek  = daysOfWeek[dataAtual.getDay()];

        return {date: `${day}/${month}/${year}`, stringWeek}
    }
    return(
        <SidebarContainer>
            <InputLogoContainer>
            <Logo>
                <img src='/enel-logo.png' alt='logo enel'/>
                <p>Clima para serviço externo</p>
            </Logo>
            <Input onSubmit={getDataWeather}>
            <button type="submit">
                <CiSearch size='30px' color="#8B9CAF" className='cisearsh'/>
            </button>
            <input
                type='text'
                placeholder='Procure por uma cidade'
                id='seachCity'
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
            />
            </Input>
            </InputLogoContainer>

            <BriefWeather data={colorsOfWeather} status = {dataWeather.weather ? dataWeather.weather[0].main : ''}>
            <img src={`${apiImage}${dataWeather.weather ? dataWeather.weather[0].icon: '01d'}@2x.png`} alt="wheater" />
                <h2>{dataWeather.main ? (dataWeather.main.temp).toFixed(0) : 0}</h2>
                <p>°C</p>
            </BriefWeather>

            <WheaterData>{dataWeather.weather ? dataWeather.weather[0].description : ''}</WheaterData>
            <Line></Line>

            <Week>
                <h3>{getDate().date}</h3>
                <h3>{getDate().weekday}</h3>
                <h3>{getDate().stringWeek}</h3>
            </Week>

        </SidebarContainer>
    )
}
const InputLogoContainer = styled.div`
    @media (max-width:615px)  {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 40px;

    }
`;

const Week = styled.div`
    color: #222;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Poppins;
    font-size: 24px;
    font-weight: 400;
    line-height: 48px;
    letter-spacing: 0em;
    margin-top: 4vh;
    @media (max-width:615px)  {
            width:100%;
        }

`

const Line = styled.div`
    width: 20.6vw;
    height: 0.5vh;
    background: #EDEDED;
    border-radius: 3px;
    margin-top: 4vh;
`

const WheaterData = styled.p`
    color: #222;
    font-size: 1.7vw;
    font-style: normal;
    font-weight: 400;
    @media (max-width:615px)  {
            font-size: 20px;
        }
`

const BriefWeather = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    margin-top: 4vh;
    color: ${(props) => props.data[props.status]};
    img{
        width: 7.8vw;
        height: auto;
          @media (max-width:615px)  {
            width: 60px;
        }
    }
    h2{
        font-size: 7.8vw;
        font-style: normal;
        font-weight: 300;
        @media (max-width:615px)  {
            font-size: 40px;
        }
        
    }
    p{
        margin-bottom: 5.4vh;
        font-size: 6.3vw;
        font-style: normal;
        font-weight: 300;
        @media (max-width:615px)  {
            font-size: 30px;
        }
        
    }
`

const Input = styled.form`
    width: 26vw;
    height: 7.8vh;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-left: 1vw;
    border-radius: 24px;
    background: #EDEDEF;
    box-shadow: 0px 24px 48px 0px #314F7C14;
    margin-top: 4vh;
    @media (max-width:615px)  {
        width: 100%;
        height: 20px;
        margin-top: 0;
    }

    button{
        border:none;
        .cisearsh{
            @media (max-width:615px)  {
            width: 10px;
            height: 10px;
        }
            
        }
        
    }
    input:focus{
        outline: 0;
        border: none;
    }
    input{
        font-size: 1.1vw;
        font-style: normal;
        font-weight: 500;
        margin-left: 0.6vw;
        background-color: transparent;
        border: none;
        @media (max-width:615px)  {
            font-size: 10px;
         }
        
    }

`

const SidebarContainer = styled.div`
    width: 29vw;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 2vw;
    @media (max-width:615px)  {
        width: 100%;
        }
`
const Logo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    img{
        width: 6.25vw;
        height: auto;
        @media (max-width:615px)  {
            width: 30px;
         }

    }
    p{
        width: 22vw;
        font-size: 3.2vw;
        font-weight: 600;
        line-height: 2.7vw;
        letter-spacing: 0em;
        margin-left: 1vw;
        @media (max-width:615px)  {
            font-size: 18px;
            width: 100%;
            line-height: 15px;
         }
    }
`