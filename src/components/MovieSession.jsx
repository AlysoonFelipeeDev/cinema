import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

export default function MovieSession (){
    const {idFilme} = useParams()
    const [session, setSession] = useState([])

    useEffect(() => {
        axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`)
        .then(res => setSession(res.data))
        .catch(err => console.log(err.response.data))
    }, [idFilme])

    if(session === null){
        return <div>Carregando...</div>
    }
    return (
        <Sessions>
            <h2>Selecione o horário</h2>
                {session.days?.map((s, index) => (
            <SessionsSchedules key={index}>
                    <p>{s.weekday}, {s.date}</p>
                    <Line></Line>
                    <ChooseSchedule>
                        {s.showtimes.map((showtime) => (
                        <Time  key={showtime.id} to={`/assentos/${showtime.id}`} >
                            {showtime.name}
                        </Time>
                        ))}
                    </ChooseSchedule>        
            </SessionsSchedules>
                ))}
        </Sessions>
    );
}

const Sessions = styled.div`
    display: flex;
    flex-direction: column;
    h2 {
    text-align: center;
    color: white;
    margin-top: 30px;
    }
`;

const Line = styled.div`
    border: 1px solid #4E5A65;
    width: 260px;
    margin-bottom: 10px;
`;

const SessionsSchedules = styled.div `
    display: flex;
    flex-direction: column;
    background-color: #2B2D36;
    width: 280px;
    margin-left: 20px;
    margin-top: 20px;
    padding: 10px;
    border-radius: 10px;
    p {
        color: white;
        font-size: 18px;
        padding: 20px;
    }
`;  


const ChooseSchedule = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    width: 150px
`;

const Time = styled(Link)`
    border: 2px solid #EE897F;
    color: #EE897F;
    font-size: 16px;
    padding: 10px;
    text-decoration: none;
`;