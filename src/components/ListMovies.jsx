import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link} from "react-router-dom";

export default function ListMovies(){
    const [movie, setMovie] = useState([])

    useEffect(() => {
        axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies")
        .then( res => setMovie(res.data))
        .catch(err => console.log(err.response.data))
    }, [])
    
    return (
        <ChooseMovies>
                <h2>Em Cartaz</h2>
            <Movies>
                {movie.map((m, index) => (
                    <Movie to={`/sessoes/${m.id}`} state={{movieName: m.title}} key={index} >
                        <img src={m.posterURL} alt={m.title} />
                    </Movie>
                ))}
            </Movies>
        </ChooseMovies>
    )
}

const ChooseMovies = styled.div`
    display:flex;
    flex-direction: column;
    h2 {
    text-align: center;
    color: #FFFFFF;
    margin-top: 30px;
    }
`

const Movies = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    width: 300px;
`;

const Movie = styled(Link)`
    img {
    background-color: white;
    width: 125px;
    height: 210px;
    margin: 20px 20px 0 0;
    border-radius: 10px;
    cursor: pointer;
    }
`;
