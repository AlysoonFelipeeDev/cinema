import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components";
import axios from "axios";

export default function ChooseSeat(){
    const {idSessao} = useParams();
    const [chairs, setChairs] = useState({ seats: []});
    const [seatsClicked, setSeatsClicked] = useState([]);
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const navigate = useNavigate();

    
    function cliqueAssento(id , name, isAvailable) {
        if(!isAvailable){
            alert("Esse assento não está disponível.");
            return;
        }
        setSeatsClicked(prev => 
            prev.some(item => item.id === id) 
            ? prev.filter(item => item.id !== id) 
            : [...prev, {id, name}]
        );
        console.log(seatsClicked)
    }

    function submitForm(event){
        event.preventDefault()

        if(seatsClicked.length === 0){
            alert("escolha os assentos!")
            return;
        }
        const reserve = {
            ids: seatsClicked.map(s => s.id),
            name,
            cpf
        }
        axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", reserve)
        .then(res => {
            navigate("/sucesso", { 
                
                state: {
                    movieName: chairs.movie.title,
                    hour: chairs.name, 
                    date: chairs.day.date,
                    seatsClicked, 
                    name, 
                    cpf
                }
            });
        })
        .catch(err => console.log(err.response.data));
    }
        
    useEffect(() => {
        axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`)
        .then(res => setChairs(res.data))
        .catch(err => console.log(err.response.data))
    }, [idSessao])

    if(chairs.seats.length === 0) {
        return <div>Carregando...</div>
    }
    return (
        <ChooseArmchairs>
            <h2>Selecione o(s) assento(s)</h2>
            <Armchairs>
                {chairs.seats?.map(a => (
                    <Armchair key={a.id} 
                    onClick={()=>cliqueAssento(a.id, a.name, a.isAvailable)}
                    selected={seatsClicked.some(item => item.id === a.id)}
                    $isAvailable={a.isAvailable}
                    >
                        {a.name}
                    </Armchair>
                ))}
            </Armchairs>
                <Line></Line>
                <BuyerName onSubmit={submitForm}>
                    <Title htmlFor="name">Nome do comprador(a):</Title>
                    <input 
                    required
                    id="name" 
                    type="text" 
                    placeholder="Digite seu nome..." 
                    value= {name}
                    onChange={e => setName(e.target.value)}
                    />
                    <Title htmlFor="cpf">CPF do comprador(a):</Title>
                    <input
                    required 
                    id="cpf" 
                    type="text" 
                    placeholder="Digite seu CPF..." 
                    value={cpf}
                    onChange={e => setCpf(e.target.value)}
                    />
                    <Reserve type="submit"><p>Reservar assento(s)</p></Reserve>
                </BuyerName>
        </ChooseArmchairs>
    )
}

const ChooseArmchairs = styled.div`
    display:flex;
    flex-direction: column;
    h2 {
    text-align: center;
    color: #FFFFFF;
    margin-top: 30px;
    }
`;

const Line = styled.div`
    border: 1px solid #4E5A65;
    width: 280px;
    margin: 0 10px 10px 10px;
`;

const Armchairs = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 310px;
    margin-bottom: 30px;
`;

const Armchair = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid ${props => {
        if(props.selected) {
            return '#EE897F'
        } else if(props.$isAvailable) {
            return '#9DB899'
        } else {
            return '#2B2D36'
        }
    }}; 
    background-color: ${props => {
        if(props.selected) {
            return '#FADBC5'
        } else if(props.$isAvailable) {
            return '#9DB899'
        } else {
            return '#2B2D36'
        }
    }};    
    width: 20px;
    height: 20px;
    border-radius: 12px;
    margin: 20px 7px 0 0;
    text-align: center;
    font-size: 11px;
    text-decoration: none;
    color: #2B2D36;
`;

const BuyerName = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    width: 310px;
    input{
        border: 1px solid #D4D4D4;
        border-radius: 8px;
        width: 100%;
        padding: 10px;
    }
`;

const Title =styled.label`
    color: white;
    font-size: 16px;
    margin: 10px 0;
`;

const Reserve = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #EE897F;
    width: 310px;
    margin: 30px 0 ;
    padding: 10px;
    color: #2B2D36;
    font-size: 18px;
    font-weight: 700;
    border-radius: 8px;
    border: none;
    cursor: pointer;
`