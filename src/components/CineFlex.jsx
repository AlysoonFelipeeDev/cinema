import React from "react";
import styled from "styled-components";
import {Link, BrowserRouter, Routes, Route} from 'react-router-dom';
import imgFilme from "../images/img-filme.png"
import ListMovies from "../components/ListMovies";
import MovieSession from "../components/MovieSession";
import ChooseSeat from "../components/ChooseSeat";
import RequestFinalized from "./RequestFinalized";

export default function CineFlex(){
    return (
            <BrowserRouter>
                <Header to="/">
                    <img src={imgFilme} alt="" />
                    <h1>Cineflex</h1>
                </Header>
                <Container>
                        <Routes>
                            <Route path="/" element={<ListMovies/>}/>
                            <Route path="/sessoes/:idFilme" element={<MovieSession/>}/>
                            <Route path="/assentos/:idSessao" element={<ChooseSeat />}/>
                            <Route path="/sucesso" element={<RequestFinalized />}/>
                        </Routes>
                </Container>
            </BrowserRouter>
        
    )
}

const Header =  styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 60px;
    background-color: #EE897F;
    font-family: "Raleway", sans-serif;
    font-weight: 600;
    font-size: 34px;
    color: white;
    text-decoration: none;
    position: fixed;
    top: 0;
    left: 0;
    h1 {
        color:#FADBC5;
        margin-left: 10px;
    }
    img {
        width: 35px;
    }
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: "Sarala", sans-serif;
    font-weight: 400;
    font-size: 24px;
    margin-top: 60px;
    margin-bottom: 20px;
`;