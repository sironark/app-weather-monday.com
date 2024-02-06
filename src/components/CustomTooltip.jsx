import styled from "styled-components"

export default function CustomTooltip({active, payload, label}){
    
    if (active && payload && payload.length){
        
        return(
            <Tooltip>
                <Day>{label}</Day>
                <Temp>{`${payload[0].value}°C`}</Temp>
                <Rain>{`${payload[0].payload.rain ? `${payload[0].payload.rain["3h"]}mm`: '0mm'}`}</Rain>
            </Tooltip>
        )
    }
    return (<></>)
}

const Tooltip = styled.div`
    background-color: gray;
    width: auto;
    height: 130px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    padding-left: 15px;
`

const Day = styled.p`
    color: #222;
    margin-bottom: 35px;
`

const Temp = styled.p`
    color: #4D4494;
`
const Rain = styled.p`
    color: #4D4494;
`