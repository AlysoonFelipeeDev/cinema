import { useLocation } from "react-router-dom"
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function RequestFinalized(){
    const location = useLocation();
    const {movieName, date, hour, name, cpf, seatsClicked} =location.state
    
    return (
        <Finalized>
                <h2>Pedido finalizado!</h2>
            <TicketsFinalized>
                    <Title>Filme e sessão</Title>
                    <Line></Line>
                    <Information>{movieName}</Information>
                    <Information>{date} às {hour}</Information>
                    <Title>Ingressos</Title>
                    <Line></Line>
                    {seatsClicked.map((polt, index) => <Information key={(index)}>assento :  {polt.name}</Information>)}
                    <Title>Comprador(a)</Title>
                    <Line></Line>
                    <Information>Nome: {name}</Information>
                        <Information>CPF: {cpf}</Information>
            </TicketsFinalized>
                    <HomeScreen to="/">Voltar para a tela inicial</HomeScreen>
        </Finalized>
    )
}

const Finalized = styled.div`
    display: flex;
    flex-direction: column;
    h2 {
    text-align: center;
    color: #9DB899;
    margin-top: 30px;
    }
`
const Line = styled.div`
    border: 1px solid #4E5A65;
    width: 260px;
    margin-bottom: 10px;
`;
const TicketsFinalized = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #2B2D36;
    width: 270px;
    padding: 20px;
    border-radius: 8px;
    margin-top: 30px;
    `;
    const Title = styled.h3`
        color: #EE897F;
        font-size: 22px;
        font-weight: 700;
        margin: 20px 0 10px 0;
    `;

    const Information = styled.div`
        display: flex;
        color: white;
        font-size: 18px;
        margin-bottom: 20px;
    `;

    const HomeScreen = styled(Link)`
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #EE897F;
        width: 270px;
        margin: 30px 0;
        padding: 10px 20px;
        color: #2B2D36;
        font-size: 18px;
        font-weight: 700;
        border-radius: 8px;
        text-decoration: none;
        cursor: pointer;
    `; 