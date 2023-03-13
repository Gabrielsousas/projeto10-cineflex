import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Seats from "./Seats";
import Footer from "../Footer/Footer";
import FormContainer from "./FormContainer";

export default function SeatsPage({
  clientName,
  setClientName,
  clientCPF,
  setClientCPF,
  imgMovie,
  setImgMovie,
  sessionWeekday,
  setSessionWeekday,
  sessionTime,
  setsessionTime,
  movieName,
  setMovieName,
  numeroDosAssentos,
  divisor,
  horario,
}) {
  const params = useParams();
  const idSessao = params.idSessao;
  const [response, setResponse] = useState([]);
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`
    );
    promise.then((response) => {
      setResponse(response.data);
      setImgMovie(response.data.movie.posterURL);
      setSessionWeekday(response.data.day.weekday);
      setsessionTime(response.data.day.date);
      setSeats(response.data.seats);
      setMovieName(response.data.movie.title);
    });
  }, []);

  return (
    <PageContainer>
      Selecione o(s) assento(s)
      <Seats seats={seats} setSeats={setSeats}></Seats>
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
      <FormContainer
        seats={seats}
        numeroDosAssentos={numeroDosAssentos}
        setClientCPF={setClientCPF}
        clientCPF={clientCPF}
        setClientName={setClientName}
        clientName={clientName}
      ></FormContainer>
      <Footer
        setSessionWeekday={setSessionWeekday}
        horario={horario}
        divisor={divisor}
        imgMovie={imgMovie}
        movieName={movieName}
        sessionWeekday={sessionWeekday}
        sessionTime={sessionTime}
      ></Footer>
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

const CaptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: space-between;
  margin: 20px;
`;
const CaptionCircle = styled.div`
  border: ${(seat) =>
    seat.isSelected
      ? "1px solid #0E7D71"
      : seat.isAvailable
      ? "1px solid #808F9D"
      : "1px solid #F7C52B"}; // Essa cor deve mudar
  background-color: ${(seat) =>
    seat.isSelected
      ? "#1AAE9E"
      : seat.isAvailable
      ? "#C3CFD9  "
      : "#FBE192"}; // Essa cor deve mudar
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
