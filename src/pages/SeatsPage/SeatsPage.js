import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SeatsPage() {
  const params = useParams();
  const idSessao = params.idSessao;
  const [response, setResponse] = useState([]);
  const [seats, setSeats] = useState([]);
  const [imgMovie, setImgMovie] = useState([
    "https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif",
  ]);
  const [sessionWeekday, setSessonWeekday] = useState("loading");
  const [sessionTime, setsessionTime] = useState("loading...");
  const [movieName, setMovieName] = useState("");


  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`
    );
    promise.then((response) => {
      setResponse(response.data);
      setImgMovie(response.data.movie.posterURL);
      setSessonWeekday(response.data.day.weekday);
      setsessionTime(response.data.day.date);
      setSeats(response.data.seats);
      setMovieName(response.data.movie.title);
    });
  }, []);

  console.log("seats", response);

  return (
    <PageContainer>
      Selecione o(s) assento(s)
      <SeatsContainer>
        {seats.map((seat) => (
          <SeatItem
            key={seat.name}
            isAvailable={seat.isAvailable}
          >
            {seat.name}
          </SeatItem>
        ))}
      </SeatsContainer>
      <CaptionContainer>
        <CaptionItem>
          <CaptionCircle isSelected={true} />
          Selecionado
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle isAvailable={true} />
          Disponível
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle />
          Indisponível
        </CaptionItem>
      </CaptionContainer>
      <FormContainer>
        Nome do Comprador:
        <input placeholder="Digite seu nome..." />
        CPF do Comprador:
        <input placeholder="Digite seu CPF..." />
        <button>Reservar Assento(s)</button>
      </FormContainer>
      <FooterContainer>
        <div>
          <img src={imgMovie} />
        </div>
        <div>
          <p>{movieName}</p>
          <p>
            {sessionWeekday} - {sessionTime}
          </p>
        </div>
      </FooterContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
`;
const SeatsContainer = styled.div`
  width: 330px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
const FormContainer = styled.div`
  width: calc(100vw - 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  font-size: 18px;
  button {
    align-self: center;
  }
  input {
    width: calc(100vw - 60px);
  }
`;
const CaptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: space-between;
  margin: 20px;
`;
const CaptionCircle = styled.div`
  border: ${seat => seat.isSelected ? '#0E7D71' : (seat.isAvailable ? '1px solid #808F9D' : '1px solid #F7C52B')}; // Essa cor deve mudar
  background-color:  ${seat =>seat.isSelected ? '#1AAE9E' : (seat.isAvailable ? '#C3CFD9  ' : '#FBE192')}; // Essa cor deve mudar
  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;
const CaptionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
`;
const SeatItem = styled.div`
  border:${seat => seat.isSelected ? '#0E7D71' : (seat.isAvailable ? '1px solid #808F9D' : '1px solid #F7C52B')};; // Essa cor deve mudar
  background-color: ${seat =>seat.isSelected ? '#1AAE9E' : (seat.isAvailable ? '#C3CFD9  ' : '#FBE192')};; // Essa cor deve mudar
  height: 25px;
  width: 25px;
  border-radius: 25px;
  font-family: "Roboto";
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;
const FooterContainer = styled.div`
  width: 100%;
  height: 120px;
  background-color: #c3cfd9;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  position: fixed;
  bottom: 0;

  div:nth-child(1) {
    box-shadow: 0px 2px 4px 2px #0000001a;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin: 12px;
    img {
      width: 50px;
      height: 70px;
      padding: 8px;
    }
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    p {
      text-align: left;
      &:nth-child(2) {
        margin-top: 10px;
      }
    }
  }
`;
