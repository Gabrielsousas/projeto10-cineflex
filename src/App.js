import styled from "styled-components";
import HomePage from "./pages/HomePage/HomePage";
import SeatsPage from "./pages/SeatsPage/SeatsPage";
import SessionsPage from "./pages/SessionsPage/SessionsPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export default function App() {
  const [clientName, setClientName] = useState("");
  const [clientCPF, setClientCPF] = useState("");
  const [imgMovie, setImgMovie] = useState([
    "https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif",
  ]);
  const [sessionWeekday, setSessionWeekday] = useState("");
  const [sessionTime, setsessionTime] = useState("");
  const [movieName, setMovieName] = useState("");
  const [divisor, setDivisor] = useState("");
  const [horario, setHorario] = useState("");
  const numeroDosAssentos = [];

  return (
    <>
      <NavContainer>CINEFLEX</NavContainer>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/assentos/:idSessao"
            element={
              <SeatsPage
                horario={horario}
                divisor={divisor}
                clientName={clientName}
                setClientName={setClientName}
                clientCPF={clientCPF}
                setClientCPF={setClientCPF}
                imgMovie={imgMovie}
                setImgMovie={setImgMovie}
                sessionWeekday={sessionWeekday}
                setSessionWeekday={setSessionWeekday}
                sessionTime={sessionTime}
                setsessionTime={setsessionTime}
                movieName={movieName}
                setMovieName={setMovieName}
                numeroDosAssentos={numeroDosAssentos}
              />
            }
          />
          <Route
            path="/sessoes/:idFilme"
            element={
              <SessionsPage
            setSessionWeekday={setSessionWeekday}
                setDivisor={setDivisor}
                setHorario={setHorario}
                movieName={movieName}
                setMovieName={setMovieName}
                sessionTime={sessionTime}
                sessionWeekday={sessionWeekday}
                setImgMovie={setImgMovie}
              />
            }
          />
          <Route
            path="/sucesso"
            element={
              <SuccessPage
                setHorario={setHorario}
                setDivisor={setDivisor}
                setSessionWeekday={setSessionWeekday}
                horario={horario}
                clientName={clientName}
                clientCPF={clientCPF}
                movieName={movieName}
                sessionTime={sessionTime}
                sessionWeekday={sessionWeekday}
                numeroDosAssentos={numeroDosAssentos}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

const NavContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c3cfd9;
  color: #e8833a;
  font-family: "Roboto", sans-serif;
  font-size: 34px;
  position: fixed;
  top: 0;
  a {
    text-decoration: none;
    color: #e8833a;
  }
`;
