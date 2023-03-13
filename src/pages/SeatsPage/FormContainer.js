import react from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FormContainer({
  seats,
  clientName,
  setClientName,
  clientCPF,
  setClientCPF,
  numeroDosAssentos
}) {
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <StyledFormContainer>
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
                numeroDosAssentos.push(seat.name);
              }
            });
            const promise = axios.post(
              "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many",
              {
                ids: selectedSeats,
                name: { clientName },
                cpf: { clientCPF },
              }
            );
            promise.then(() =>
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
    </StyledFormContainer>
  );
}

const StyledFormContainer = styled.div`
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
