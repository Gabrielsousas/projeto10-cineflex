import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SeatsPage({
  clientName,
  setClientName,
  clientCPF,
  setClientCPF,
  imgMovie,
  setImgMovie,
  sessionWeekday,
  setSessonWeekday,
  sessionTime,
  setsessionTime,
  movieName,
  setMovieName,
  numeroDosAssentos
}) {
  const params = useParams();
  const idSessao = params.idSessao;
  const [response, setResponse] = useState([]);
  const [seats, setSeats] = useState([]);

  const navigate = useNavigate();

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

  function handleSeatClick(seatName) {
    const newSeats = seats.map((seat) => {
      if (seat.name === seatName) {
        return { ...seat, isSelected: !seat.isSelected };
      } else {
        return seat;
      }
    });
    setSeats(newSeats);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  console.log("seats", response);

  return (
    <PageContainer>
      Selecione o(s) assento(s)
      <SeatsContainer>
        {seats.map((seat) => (
          <SeatItem 
            data-test="seat"
            key={seat.name}
            isAvailable={seat.isAvailable}
            isSelected={seat.isSelected}
            onClick={() => {
              if (seat.isAvailable) {
                handleSeatClick(seat.name);
              } else {
                alert("Esse assento não está disponível");
              }
            }}
          >
            {seat.name}
          </SeatItem>
        ))}
      </SeatsContainer>
      ...
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
        <form onSubmit={handleSubmit}>
          Nome do Comprador:
          <input 
            data-test="client-name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Digite seu nome..."
          />
          CPF do Comprador:
          <input
            data-test="client-cpf"
            value={clientCPF}
            onChange={(e) => setClientCPF(e.target.value)}
            placeholder="Digite seu CPF..."
          />
          <button
            data-test="book-seat-btn"
            type="Submit"
            required
            onClick={() => {
              const selectedSeats = [];
              const newSeats = seats.filter((seat) => {
                if (seat.isSelected) {
                  selectedSeats.push(seat.id);
                  numeroDosAssentos.push(seat.name)
                }
              });
              console.log("selected seats", selectedSeats);
              const promise = axios.post(
                "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many",
                {
                  ids: selectedSeats,
                  name: { clientName },
                  cpf: { clientCPF },
                }
              );
              promise.then(() =>
                // console.log("sucesso", clientName, clientCPF)
                navigate("/sucesso")
              );

              promise.catch(() =>
                alert(
                  "Ops, algo deu errado. Por favor recarregue a página. Se o erro persistir entre em contato com a central de atendimento"
                )
              );
            }}
          >
            Reservar Assento(s)
          </button>
        </form>
      </FormContainer>
      <FooterContainer data-test="footer">
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
const SeatItem = styled.div`
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
